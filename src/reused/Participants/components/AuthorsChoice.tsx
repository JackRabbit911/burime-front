import { useUnit } from "effector-react";

import Pagination from "./Pagination"
import type { Author } from "../schema";
import AuthorSearch from "./AuthorSearch";
import ChoiceControl from "./ChoiceControl";
import { $authorsList } from "../store/authors";
import { $referenceBooks } from "../store/reference";

import type { AuthorsPayload, Member } from "../types";

type Props = {
  members: Member[] | [];
  authorsPayload: AuthorsPayload;
  handler: (author: Author) => void;
}

const AuthorsChoice = ({ members, authorsPayload, handler }: Props) => {
  const authors = useUnit($authorsList)
  const referenceBooks = useUnit($referenceBooks)
  const filters = referenceBooks?.authorsFilters || []

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
