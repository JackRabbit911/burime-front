import { t } from "common/i18n/utils";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ajax from "common/ajax";
import { getBranchAuthorStatusUri, setBranchAuthorStatusUri } from "common/constants";

type Props = {
  branch: string | number;
  author: string | number;
}

const Controls = ({ branch, author }: Props) => {
  const [status, setStatus] = useState(110)
  const { box } = useParams()
  const disabledBoth = box === 'in' ? false : true

  const disabledRefuse = disabledBoth || status === 80
  const disabledAccept = disabledBoth || status === 200

  const onClick = (status: number) => () => {
    ajax.postForm(setBranchAuthorStatusUri, {
      branch_id: branch,
      author_id: author,
      status: status,
    })

    setStatus(status)
  }

  useEffect(() => {
    const uri = [getBranchAuthorStatusUri, branch].join('/')
    const params = { author: author }
    ajax.get(uri, { params: params })
      .then((response) => response.data)
      .then((data) => data.result.status)
      .then((status) => {
        setStatus(status)
      })
  }, [])


  return (
    <div className="flex justify-center gap-2 mt-2">
      <button
        className="btn btn-error"
        disabled={disabledRefuse}
        onClick={onClick(80)}
      >
        {t('Refuse')}
      </button>
      <button
        className="btn btn-success"
        disabled={disabledAccept}
        onClick={onClick(200)}
      >
        {t('Accept')}
      </button>
    </div>
  )
}

export default Controls
