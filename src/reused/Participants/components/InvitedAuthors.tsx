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
        className="grow text-wrap text-center text-sm max-w-full truncate transition-colors bg-base-100 border rounded border-zinc-300 px-1">
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
