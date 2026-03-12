import type { GetText } from "common/i18n/types";
import type { Member } from "reused/Participants/types"

type Props = {
  __: GetText;
  member: Member | null;
  statuses: { [index: string]: number } | undefined;
}

const Status = ({ __, member, statuses }: Props) => {
  if (!statuses || !member) {
    return null
  }

  const status = Object.keys(statuses).find(k => statuses[k] === member.status);

  return (
    <>
      <h3>
        {__('Status')}
      </h3>
      <div className="text-center text-lg">
        {status ? __(status) : null}
      </div>
    </>
  )

}

export default Status
