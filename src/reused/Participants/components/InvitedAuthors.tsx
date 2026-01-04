import { memberIdSetted } from "../store/authors";
import type { Member } from "../types";

type Props = {
  author: Member;
  onDelete: (member: Member) => void;
}

const InvitedAuthors = ({ author, onDelete }: Props) => {
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
        onClick={() => onDelete(author)}
      >
        <span className=" text-red-600">X</span>
      </button>
    </div>
  )
}

export default InvitedAuthors
