import { useUnit } from "effector-react";
import { useFormContext } from "react-hook-form";

import Status from "./Status";
import { t } from "common/i18n/utils";
import { getCurrentMember } from "reused/Participants/utils";
import { $referenceBooks } from "reused/Participants/store/reference";
import { $memberId, memberIdResetted } from "reused/Participants/store/authors";
import Participants from "reused/Participants/components/Permissions/Participants";
import PermissionsList from "reused/Participants/components/Permissions/PermissionsList";

import type { Member } from "reused/Participants/types";

const MembersPermissions = () => {
  const onClose = useUnit(memberIdResetted)
  const authorId = useUnit($memberId)
  const referenceBooks = useUnit($referenceBooks)
  const authorsPermissions = referenceBooks?.authorsPermissions

  const { getValues, setValue } = useFormContext()
  const members = getValues('members') || []
  const currentAuthor = getCurrentMember(members, authorId)

  const handleCheck = (val: number, id: number, isAdd: boolean) => {
      const newMembers = members.map((value: Member) => {
        if (value.id === id) {
          value.role = isAdd ? value.role | val : value.role &= ~val
        }
  
        return value
      })
  
      setValue('members', newMembers)
    }

  return (
    <>
      <div className="md:col-span-3">
        <h2 className="text-lg">
          {currentAuthor?.alias || authorId}
        </h2>
      </div>
      <fieldset className="fieldset">
        <Participants
          members={members}
          authorId={authorId}
        />
      </fieldset>
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <fieldset className="fieldset">
          <PermissionsList
            member={currentAuthor}
            handler={handleCheck}
            permissions={authorsPermissions}
          />
        </fieldset>
        <fieldset className="fieldset">
          <Status
            member={currentAuthor}
            statuses={referenceBooks?.authorsStatuses}
          />
        </fieldset>
        <button className="md:col-span-2 btn btn-sm"
          onClick={onClose}
        >
          {t('Close')}
        </button>
      </div>
    </>
  )
}

export default MembersPermissions
