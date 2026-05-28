import { useUnit } from "effector-react";
import { useFormContext } from "react-hook-form";

import Status from "./Status";
import { useTranslate } from "common/i18n/hooks";
import { getCurrentMember } from "reused/Participants/utils";
import { $memberId } from "reused/Participants/store/authors";
import { $referenceBooks } from "reused/Participants/store/reference";
import Participants from "reused/Participants/components/Permissions/Participants";
import PermissionsList from "reused/Participants/components/Permissions/PermissionsList";

const MembersPermissions = () => {
  const __ = useTranslate()
  const authorId = useUnit($memberId)
  const referenceBooks = useUnit($referenceBooks)
  const authorsPermissions = referenceBooks?.authorsPermissions

  const { getValues } = useFormContext()

  const members = getValues('members')

  const currentAuthor = getCurrentMember(members, authorId)
  
  return (
    <>
      <div className="md:col-span-3">
        <h2 className="text-lg">
          {currentAuthor?.alias || __('Participant not selected')}
        </h2>
      </div>
      <fieldset className="fieldset">
        <Participants
          __={__}
          members={members}
          member={currentAuthor}
        />
      </fieldset>
      <div className="md:col-span-2 grid grid-cols-2 gap-4">
        <fieldset className="fieldset">
          <PermissionsList
            __={__}
            member={currentAuthor}
            permissions={authorsPermissions}
          />
        </fieldset>
        <fieldset className="fieldset">
          <Status
            __={__}
            member={currentAuthor}
          />
        </fieldset>
      </div>
    </>
  )
}

export default MembersPermissions
