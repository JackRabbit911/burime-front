import Pagination from "./Pagination"
import type { Author } from "../schema";
import type { AuthorsPayload, Member } from "../types";
import { isInvited } from "../utils";
import AuthorSearch from "./AuthorSearch";

type Props = {
  filters: string[];
  authors: Author[];
  members: Member[] | [];
  authorsPayload: AuthorsPayload;
  handler: (author: Author) => void;
}

const AuthorsChoice = ({ filters, authors, members, authorsPayload, handler }: Props) => {
  return (
    <>
      <AuthorSearch
        filters={filters}
        authorsPayload={authorsPayload}
      />
      <div className="flex flex-wrap gap-2 mt-1">
        {authors.map((author, key) => (
          <button
            type="button"
            className="btn btn-soft btn-outline btn-sm"
            disabled={isInvited(members, author.id)}
            onClick={() => {
              handler(author)
            }}

            key={key}
          >
            {author.alias}
          </button>
        ))}
      </div>
      <Pagination />
    </>
  )
}

export default AuthorsChoice
