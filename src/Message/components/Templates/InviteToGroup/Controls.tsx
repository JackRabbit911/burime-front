import { useParams } from "react-router";
import { getGroupStatusFx, setGroupStatusFx } from "./store";
import { useEffect, useState } from "react";
import type { GetText } from "common/i18n/types";

type Props = {
  group: string | number;
  author: string | number;
  __: GetText;
}

const Controls = ({ __, group, author }: Props) => {
  const [status, setStatus] = useState(110)
  const { box } = useParams()
  const disabledBoth = box === 'in' ? false : true

  const disabledRefuse = disabledBoth || status === 80
  const disabledAccept = disabledBoth || status === 200

  const onClick = (status: number) => () => {
    setGroupStatusFx({
      parent_id: group,
      child_id: author,
      status: status,
    })
    setStatus(status)
  }

  useEffect(() => {
      getGroupStatusFx({
        group: group,
        author: author,
      }).then((response) => response.data)
        .then((data) => data.result)
        .then((result) => result.status)
        .then((status) => {
          setStatus(status)
        })
  }, [])


  return (
    <div className="flex justify-center gap-2">
      <button
        className="btn btn-error"
        disabled={disabledRefuse}
        onClick={onClick(80)}
      >
        {__('Refuse')}
      </button>
      <button
        className="btn btn-success"
        disabled={disabledAccept}
        onClick={onClick(200)}
      >
        {__('Accept')}
      </button>
    </div>
  )
}

export default Controls
