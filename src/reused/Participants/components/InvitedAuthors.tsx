import { useFormContext } from "react-hook-form";
import { memberIdSetted } from "../store/authors";
import type { Member } from "../types";

type Props = {
  author: Member;
}

const InvitedAuthors = ({ author }: Props) => {
  const { setValue, watch } = useFormContext()

  const deleteMember = (author: Member) => () => {
    const members = watch('members').filter((item: Member) => item.id !== author.id)
    setValue('members', members)
  }

  return (
    <div className="flex flex-row justify-between gap-2">
      <button
        type="button"
        className="btn btn-soft btn-outline btn-xs grow"
        onClick={() => memberIdSetted(author.id)}
      >
        {author.alias}
      </button>
      <button
        type="button"
        className="btn btn-soft btn-square btn-xs"
        onClick={deleteMember(author)}
      >
        <span className=" text-red-600">X</span>
      </button>
    </div>
  )
}

export default InvitedAuthors
