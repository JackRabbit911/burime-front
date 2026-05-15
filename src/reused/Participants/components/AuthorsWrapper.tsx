import { useUnit } from "effector-react"

import Select from "./Select"
import AuthorsChoice from "./AuthorsChoice"
import { $memberId } from "../store/authors"
import { useAuthorsWrapper } from "../hooks/authorsWrapper"

import type { OwnAuthor } from "../types"

type Props = {
  ownAuthors: OwnAuthor[];
  choiceList: React.ReactNode;
  permissions: React.ReactNode;
  referenceUri: string;
}

const AuthorsWrapper = ({ ownAuthors, choiceList, permissions, referenceUri }: Props) => {
  const memberId = useUnit($memberId)
  const [members, authorsPayload, onChoice] = useAuthorsWrapper(referenceUri)

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {memberId === 0 ?
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
