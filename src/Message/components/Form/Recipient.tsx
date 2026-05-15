import type { Author } from "reused/Participants/schema";

type Props = {
  author: Author;
  onClick: (alias: string) => void;
  onDelete: (member: Author) => void;
}

const Recipient = ({ author, onClick, onDelete }: Props) => {

  return (
    <div className="flex flex-row justify-between gap-2">
      <div
        key={author.id}
        onClick={() => onClick(author.alias)}
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

export default Recipient
