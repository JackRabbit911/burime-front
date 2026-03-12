import type { Member } from "reused/Participants/types";
import { memberIdSetted } from "reused/Participants/store/authors";
import type { GetText } from "common/i18n/types";

type Props = {
  __: GetText;
  members: Member[];
  authorId: number;
}

const Participants = ({ __, members, authorId}: Props) => {
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
            disabled={author.id === authorId}
            onClick={() => {
              memberIdSetted(author.id)
            }}
          >
            {author.alias}
          </button>
        )
      )}
    </>
  )
}

export default Participants
