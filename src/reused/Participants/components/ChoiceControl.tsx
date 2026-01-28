import type { Author } from "../schema"
import type { Member } from "../types";
import { isInvited } from "../utils";

type Props = {
  author: Author;
  members: Member[] | [];
  handler: (author: Author) => void;
}

const ChoiceControl = ({ author, members, handler }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-soft btn-outline btn-sm"
      disabled={isInvited(members, author.id)}
      onClick={() => {
        handler(author)
      }}
    >
      {author.alias}
    </button>
  )
}

export default ChoiceControl
