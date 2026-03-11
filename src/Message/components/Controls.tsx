import { Link, useParams } from "react-router"

import { removeMsg } from "Message/utils";
import type { GetText } from "common/i18n/types";

type Props = {
  __: GetText;
  link: string;
  label: string;
}

const Controls = ({ __, link, label }:Props) => {
  const { id } = useParams()

  return (
    <div className="flex justify-end gap-2 mt-1">
      <Link to={link}>
        <button
          className="btn"
        >
          {__('Back to message list')}
        </button>
      </Link>
      <button
        className="btn btn-error"
        onClick={() => removeMsg(id)}
      >
        {__(label)}
      </button>
    </div>
  )
}

export default Controls
