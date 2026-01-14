import { t } from "../../../../common/i18n/utils";
import { memberIdSetted } from "../../store/authors";
import type { Member } from "../../types";

type Props = {
  members: Member[];
  authorId: number;
}

const Participants = ({ members, authorId}: Props) => {
  return (
    <>
      <h3>
        {t('Participants')}
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
