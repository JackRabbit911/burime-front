import { useInviteStatus } from "./hook";
import type { GetText } from "common/i18n/types";

type Props = {
  branch: string | number;
  author?: number;
  __: GetText;
}

const Controls = ({ __, branch, author }: Props) => {
  const { onClick, disabledAccept, disabledRefuse } = useInviteStatus(branch, author)

  return (
    <div className="flex justify-center gap-2 mt-2">
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
