import { t } from "../../../common/i18n/utils";
import type { Member } from "../../../reused/Participants/types";
import InvitedAuthors from "../../../reused/Participants/components/InvitedAuthors";

type Props = {
  members: Member[];
  onDelete: (member: Member) => void;
}

const Members = ({ members, onDelete }: Props) => {
  return (
    <>
      <div>
        <legend className="fieldset-legend">
          <span>{t('Pemissions & status')}</span>
        </legend>
      </div>
      <div className="flex flex-col gap-2">
          {members.map(
            (author: Member) => (
              <InvitedAuthors
                key={author.id}
                author={author}
                onDelete={onDelete}
              />
            )
          )}
      </div>
    </>
  )
}

export default Members
