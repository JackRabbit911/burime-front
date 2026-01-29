import { Link, useParams } from "react-router"
import { t } from "../../../common/i18n/utils"
import { deleteMsg } from "../../utils"

type Props = {
  recipient: number;
}

const Controls = ({ recipient }: Props) => {
  const { id } = useParams()

  return (
    <div className="flex justify-end gap-2 mt-1">
      <button
        className="btn btn-success"
      >
        {t('Reply to sender')}
      </button>
      <Link to="/message/inbox">
        <button
          className="btn"
        >
          {t('Back to message list')}
        </button>
      </Link>
      <button
        className="btn btn-error"
        onClick={() => deleteMsg(id, recipient)}
      >
        {t('Delete')}
      </button>
    </div>
  )
}

export default Controls
