import Pagination from "./Pagination"
import type { Author } from "../schema";
import type { AuthorsPayload, Member } from "../types";
import AuthorSearch from "./AuthorSearch";
import ChoiceControl from "./ChoiceControl";

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
          <ChoiceControl
            author={author}
            members={members}
            handler={handler}
            key={key}
          />
        ))}
      </div>
      <Pagination />
    </>
  )
}

export default AuthorsChoice
