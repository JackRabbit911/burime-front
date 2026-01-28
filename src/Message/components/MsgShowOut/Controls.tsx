import { Link, useParams } from "react-router"
import { t } from "../../../common/i18n/utils"
import { removeMsg } from "../../utils"

const Controls = () => {
  const { id } = useParams()

  return (
    <div className="flex justify-end gap-2 mt-1">
      <Link to="/message/list">
        <button
          className="btn"
        >
          {t('Back to message list')}
        </button>
      </Link>
      <button
        className="btn btn-error"
        onClick={() => removeMsg(id)}
      >
        {t('Delete from everyone')}
      </button>
    </div>
  )
}

export default Controls
