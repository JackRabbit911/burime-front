import { useUnit } from "effector-react"

import Select from "./Select"
import AuthorsChoice from "./AuthorsChoice"
import { $membersView } from "../store/authors"
import { useAuthorsWrapper } from "../hooks/authorsWrapper"

import type { OwnAuthor } from "../types"

type Props = {
  ownAuthors: OwnAuthor[];
  choiceList: React.ReactNode;
  permissions: React.ReactNode;
}

const AuthorsWrapper = ({ ownAuthors, choiceList, permissions }: Props) => {
  const isMembers = useUnit($membersView)
  const [members, authorsPayload, onChoice] = useAuthorsWrapper()

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {isMembers ?
        <>
          <div>
            {ownAuthors.length > 0 ?
              <Select
                fieldName="masterId"
                label="Team leader"
                options={ownAuthors}
              /> : null}
            {choiceList}
          </div>
          <div className="md:col-span-2">
            <AuthorsChoice
              members={members}
              authorsPayload={authorsPayload}
              handler={onChoice}
            />
          </div>
        </> : permissions
      }
    </div>
  )
}

export default AuthorsWrapper
