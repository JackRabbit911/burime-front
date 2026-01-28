import type { Author } from "../../../reused/Participants/schema";

type Props = {
  author: Author;
  onClick: (alias: string) => void;
  onDelete: (member: Author) => void;
}

const Recipient = ({ author, onClick, onDelete }: Props) => {

  return (
    <div className="flex flex-row justify-between gap-2">
      <button
        type="button"
        className="btn btn-soft btn-outline btn-xs grow"
        onClick={() => {
          onClick(author.alias)
        }}
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

export default Recipient
