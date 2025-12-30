import { useFormContext } from "react-hook-form";
import InvitedAuthors from "../../../reused/Participants/components/InvitedAuthors";
import type { Member } from "../../../reused/Participants/schema";
import { t } from "../../../common/i18n/utils";

const Members = () => {
  const { watch } = useFormContext()
  const members = watch('members') || []

  return (
    <>
      <div>
        <legend className="fieldset-legend">
          <span>{t('Pemissions & status')}</span>
        </legend>
      </div>
      <div className="flex flex-col gap-2">
          {members.map(
            (author: Member) => (
              <InvitedAuthors author={author} key={author.id} />
            )
          )}
      </div>
    </>
  )
}

export default Members
