import { memberIdSetted } from "../store/authors";
import type { Member } from "../types";

type Props = {
  author: Member;
  onDelete: (member: Member) => void;
}

const InvitedAuthors = ({ author, onDelete }: Props) => {
  return (
    <div className="flex flex-row justify-between gap-2 w-full overflow-hidden">
      <div
        key={author.id}
        onClick={() => memberIdSetted(author.id)}
        className="grow text-wrap text-center text-sm overflow-hidden text-ellipsis transition-colors bg-base-100 hover:bg-base-200 border rounded border-zinc-300 cursor-pointer hover:border-base-200">
        {author.alias}
      </div>
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
