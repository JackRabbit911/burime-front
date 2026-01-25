import MembersPermissions from "./components/MembersPermissions";
import type { Bootstrap } from "../../schema/input";
import AuthorsWrapper from "../../../reused/Participants/components/AuthorsWrapper";
import Members from "../../../reused/Participants/components/Members";
import { getBranchReferenceUri } from "../../../common/constants";

type Props = {
  bootstrap: Bootstrap;
}

const Authors = ({ bootstrap: { ownAuthors } }: Props) => {
  return (
    <AuthorsWrapper
      ownAuthors={ownAuthors}
      choiceList={<Members />}
      permissions={<MembersPermissions/>}
      referenceUri={getBranchReferenceUri}
  />)
}

export default Authors
