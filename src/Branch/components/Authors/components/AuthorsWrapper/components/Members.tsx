import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { getMasterAlias } from "../../../../../utils";
import { t } from "../../../../../../common/i18n/utils";
import { changeMaster, getSimpleMembers } from "../../../utils";
import type { OwnAuthors } from "../../../../../schema/authors";
import type { Member } from "../../../../../../reused/Participants/types";
import { memberIdSetted } from "../../../../../../reused/Participants/store/authors";
import InvitedAuthors from "../../../../../../reused/Participants/components/InvitedAuthors";

type Props = {
  ownAuthors: OwnAuthors;
}

const Members = ({ ownAuthors }: Props) => {
  const { setValue, watch } = useFormContext()
  const masterId = Number(watch('masterId'))
  const members = watch('members')
  const authors = getSimpleMembers(members, ownAuthors)
  const masterAlias = getMasterAlias(ownAuthors, masterId)

  const onDelete = (member: Member) => {
    const newMembers = members.filter((item: Member) => item.id !== member.id)
    setValue('members', newMembers)
  }

  useEffect(() => {
    const newMembers = changeMaster(members, ownAuthors, masterId)
    setValue('members', newMembers)
  }, [masterId])

  return (
    <>
      <div>
        <legend className="fieldset-legend">
          <span>{t('Pemissions & status')}</span>
        </legend>
      </div>
      <div className="flex flex-col gap-2">
        <button className="btn btn-soft btn-outline btn-xs"
          onClick={() => memberIdSetted(masterId)}
        >
          {masterAlias}
        </button>
        {authors.map(
          (author: Member) => (
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
