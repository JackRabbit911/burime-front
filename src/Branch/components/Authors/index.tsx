import AuthorsWrapper from "./components/AuthorsWrapper"
import { useUnit } from "effector-react";
import MembersPermissions from "./components/MembersPermissions";
import type { Bootstrap } from "../../schema/input";
import { $memberId } from "../../../reused/Participants/store/authors";
import { useEffect } from "react";
import { referenceRecived } from "../../../reused/Participants/store/reference";
import { getGroupReferenceUri } from "../../../common/constants";

type Props = {
  bootstrap: Bootstrap;
}

const Authors = ({ bootstrap }: Props) => {
  const memberId = useUnit($memberId)

  useEffect(() => {
    referenceRecived(getGroupReferenceUri)
  }, [])

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {memberId === 0
        ? <AuthorsWrapper bootstrap={bootstrap} />
        : <MembersPermissions authorId={memberId} />
      }
    </div>
  )
}

export default Authors
