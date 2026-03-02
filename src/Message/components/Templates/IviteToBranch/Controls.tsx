import { t } from "common/i18n/utils";
import { useInviteStatus } from "./hook";

type Props = {
  branch: string | number;
  author?: number;
}

const Controls = ({ branch, author }: Props) => {
  const { onClick, disabledAccept, disabledRefuse } = useInviteStatus(branch, author)

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
