import type { Author } from "../../../reused/Participants/schema";

type Props = {
  author: Author;
  onDelete: (member: Author) => void;
}

const Recipient = ({ author, onDelete }: Props) => {
  return (
    <div className="flex flex-row justify-between gap-2">
      <span
        className="btn btn-soft btn-outline btn-xs grow"
      >
        {author.alias}
      </span>
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
