import { useFormContext } from "react-hook-form";
import { useUnit } from "effector-react";
import { getCurrentMember } from "../../../reused/Participants/utils";
import PermissionsList from "../../../reused/Participants/components/Permissions/PermissionsList";
import Participants from "../../../reused/Participants/components/Permissions/Participants";
import { memberIdResetted } from "../../../reused/Participants/store/authors";
import { t } from "../../../common/i18n/utils";
import { useEffect } from "react";
import { referenceRecived } from "../../../reused/Participants/store/reference";
import { getGroupReferenceUri } from "../../../common/constants";

type Props = {
  authorId: number;
}

const MembersPermissions = ({ authorId }: Props) => {
  const onClose = useUnit(memberIdResetted)
  const { getValues } = useFormContext()
  const members = getValues('members') || []
  const currentAuthor = getCurrentMember(members, authorId)

  
  useEffect(() => {
    console.log('qq')
    referenceRecived(getGroupReferenceUri)
  }, [])

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
          />
        </fieldset>
        <fieldset className="fieldset">
          {/* <Status
            member={currentAuthor}
          /> */}
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
