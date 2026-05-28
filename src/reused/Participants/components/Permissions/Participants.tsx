import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { memberIdResetted, memberIdSetted, membersViewSetted } from "reused/Participants/store/authors";

import type { GetText } from "common/i18n/types";
import type { Member } from "reused/Participants/types";

type Props = {
  __: GetText;
  members: Member[];
  member: Member | null;
}

const Participants = ({ __, members, member}: Props) => {
  const { setValue } = useFormContext()
  
  const onClose = () => {
    memberIdResetted()
    membersViewSetted(true)
    setValue('mask', 0)
  }
  
  useEffect(() => {
      setValue('mask', member?.role)
      const index = members.findIndex(item => item.id === member?.id)
      const target = `members.${index}.role`
      setValue(target, member?.role)
  }, [member])

  return (
    <>
      <h3>
        {__('Participants')}
      </h3>
      {members.sort((a: Member, b: Member) => a.role > b.role ? -1 : 1)
        .map((author: Member) => (
          <button
            key={author.id}
            className="btn btn-soft btn-sm"
            disabled={author.id === member?.id}
            onClick={() => {memberIdSetted(author.id)}}
          >
            {author.alias}
          </button>
        )
      )}
      <button
        className="btn btn-sm btn-outline w-full mt-2"
        onClick={() => onClose()}
      >
        {__('To authors choice')}
      </button>
    </>
  )
}

export default Participants
