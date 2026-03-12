import { useUnit } from "effector-react";
import { useFormContext } from "react-hook-form";

import { host } from "common/ajax";
import { buttonEnabled } from "./utils";
import { getStatusString } from "../../permissions";
import { $permissions, $statusObj } from "Branch/store/bootstrap";
import { memberIdResetted } from "reused/Participants/store/authors";

import type { GetText } from "common/i18n/types";
import type { Member } from "reused/Participants/types";

type Props = {
  __: GetText;
  member: Member | null;
}

const Status = ({ __, member }: Props) => {
  const permissions = useUnit($permissions)
  const statusObj = useUnit($statusObj)
  const { getValues, setValue } = useFormContext()

  const enable =  new buttonEnabled(permissions, statusObj, member)

  const members = getValues('members')
  const status = getStatusString(statusObj, member?.status || 0)

  const addPermission = (permission: number) => () => {
    const newMembers = members.map((value: Member) => {
      if (value.id === member?.id) {
        value.role = value.role | permission
      }

      return value
    })

    setValue('members', newMembers)
  }

  const setStatus = (status: number) => () => {
    const newMembers = members.map((value: Member) => {
      if (value.id === member?.id) {
        value.status = status
      }

      return value
    })

    setValue('members', newMembers)
  }

  const deleteMember = (author: Member | null) => () => {
    if (author) {
      setValue('members', members.filter((item: Member) => item.id !== author.id))
      memberIdResetted()
    }
  }

  return (
    <>
      <h3>{__('Status')} {__(status)} {member?.status}</h3>
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
        {__('Accept to project')} {statusObj.invited} qq
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
