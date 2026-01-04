import { t } from "../../../common/i18n/utils";
import type { Member } from "../../../reused/Participants/types"

type Props = {
  member: Member | null;
  statuses: { [index: string]: number } | undefined;
}

const Status = ({ member, statuses }: Props) => {
  if (!statuses || !member) {
    return null
  }

  const status = Object.keys(statuses).find(k => statuses[k] === member.status);

  return (
    <>
      <h3>
        {t('Status')}
      </h3>
      <div className="text-center text-lg">
        {status ? t(status) : null}
      </div>
    </>
  )

}

export default Status
