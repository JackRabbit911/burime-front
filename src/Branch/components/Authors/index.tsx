import AuthorsWrapper from "./components/AuthorsWrapper"
import { useUnit } from "effector-react";
import MembersPermissions from "./components/MembersPermissions";
import type { Bootstrap } from "../../schema/input";
import { $memberId } from "../../store/authors";

type Props = {
  bootstrap: Bootstrap;
}

const Authors = ({ bootstrap }: Props) => {
  const memberId = useUnit($memberId)

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
