import { useFormContext } from "react-hook-form";
import { t } from "../../../common/i18n/utils";
import type { Member } from "../types";
import InvitedAuthors from "./InvitedAuthors";

const Members = () => {
  const { watch, setValue } = useFormContext()
  const members = watch('members') || []

  const onDelete = (member: Member) => {
    const newMembers = members.filter((item: Member) => item.id !== member.id)
    setValue('members', newMembers)
  }

  return (
    <>
      <div>
        <legend className="fieldset-legend">
          <span>{t('Participants')}</span>
        </legend>
      </div>
      <div className="flex flex-col gap-2">
          {members.sort((a: Member, b: Member) => a.role > b.role ? -1 : 1)
            .map((author: Member) => (
              <InvitedAuthors
                key={author.id}
                author={author}
                onDelete={onDelete}
              />
            )
          )}
      </div>
    </>
  )
}

export default Members
