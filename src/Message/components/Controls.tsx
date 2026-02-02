import { Link, useParams } from "react-router"

import { removeMsg } from "../utils"
import { t } from "common/i18n/utils"

type Props = {
  link: string;
  label: string;
}

const Controls = ({ link, label }:Props) => {
  const { id } = useParams()

  return (
    <div className="flex justify-end gap-2 mt-1">
      <Link to={link}>
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
        {t(label)}
      </button>
    </div>
  )
}

export default Controls
