import { host } from "common/ajax";

import type { GetText } from "common/i18n/types";
import type { Member } from "reused/Participants/types";
import { useStatus } from "../../status";

type Props = {
  __: GetText;
  member: Member | null;
}

const Status = ({ __, member }: Props) => {
  const {
    permissions,
    enable,
    statusObj,
    status,
    addPermission,
    setStatus,
    deleteMember
  } = useStatus(member)

  return (
    <>
      <h3>{__('Status')} {__(status)}</h3>
      <button
        className="btn btn-soft btn-sm"
        onClick={addPermission(permissions.MANAGE | permissions.MODERATE)}
        disabled={!enable.moderator()}
      >
        {__('Make moderator')}
      </button>
      <button
        className="btn btn-soft btn-sm"
        onClick={setStatus(statusObj.invited)}
        disabled={!enable.accept()}
      >
        {__('Accept to project')}
      </button>
      <button
        className="btn btn-soft btn-sm"
        onClick={setStatus(statusObj.denied)}
        disabled={!enable.deny()}
      >
        {__('Deny')}
      </button>
      <button
        className="btn btn-soft btn-error btn-sm"
        disabled={!enable.ban()}
      >
        {__('Ban')}
      </button>
      <button
        className="btn btn-soft btn-error btn-sm"
        onClick={deleteMember(member)}
        disabled={!enable.delete()}
      >
        {__('Delete')}
      </button>
      <button
        className="btn btn-soft btn-sm"
        onClick={() => {window.open(`${host}/author/${member?.id}`, '_blank')}}
      >
        {__('Show profile')}
      </button>
    </>
  )
}

export default Status
