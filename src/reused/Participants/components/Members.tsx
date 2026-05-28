import { useFormContext } from "react-hook-form";

import { useTranslate } from "common/i18n/hooks";
import InvitedAuthors from "./InvitedAuthors";

import type { Member } from "../types";
import { memberIdResetted, membersViewSetted } from "../store/authors";

const Members = () => {
  const __ = useTranslate()
  const { watch, setValue } = useFormContext()
  const members = watch('members') || []

  const onDelete = (member: Member) => {
    const newMembers = members.filter((item: Member) => item.id !== member.id)
    setValue('members', newMembers)
  }

  const toPerms = () => {
    membersViewSetted(false)
    memberIdResetted()
  }

  return (
    <>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          <span>{__('Participants')}</span>
        </legend>
      </fieldset>
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
      <button
        className="md:col-span-2 btn btn-sm btn-outline w-full mt-2"
        onClick={() => toPerms()}
      >
        {__('To permissions')}
      </button>
    </>
  )
}

export default Members
