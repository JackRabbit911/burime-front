import { useFormContext } from "react-hook-form";
import { useUnit } from "effector-react";
import Members from "./components/Members";
import Select from "./components/Select";
import type { Bootstrap } from "../../../../schema/input";
import type { Author } from "../../../../../reused/Participants/schema";
import { addNewMember } from "../../../../../reused/Participants/utils";
import { $authors } from "../../../../../reused/Participants/store/authors";
import { $referenceBooks } from "../../../../../reused/Participants/store/reference";
import AuthorsChoice from "../../../../../reused/Participants/components/AuthorsChoice";
import { $authorsPayload } from "../../../../../reused/Participants/store/athorsPayload";

type Props = {
  bootstrap: Bootstrap;
}

const AuthorsWrapper = ({ bootstrap }: Props) => {
  const authors = useUnit($authors)
  const authorsPayload = useUnit($authorsPayload)
  const referenceBooks = useUnit($referenceBooks)
  const authorsFilters = referenceBooks?.authorsFilters

  const { getValues, setValue } = useFormContext()
  const members = getValues('members') || []

  const onChoice = (author: Author) => {
    const newMembers = addNewMember(members, author)
    setValue('members', newMembers, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <>
      <fieldset className="fieldset">
        <Select
          fieldName="masterId"
          label="Team leader"
          options={bootstrap.ownAuthors}
        />
        <Members
          ownAuthors={bootstrap.ownAuthors}
        />
      </fieldset>
      <div className="md:col-span-2">
        <AuthorsChoice
          filters={authorsFilters as string[]}
          authors={authors?.list}
          members={members}
          authorsPayload={authorsPayload}
          handler={onChoice}
        />
      </div>
    </>
  )
}

export default AuthorsWrapper
