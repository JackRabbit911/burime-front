import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { changeMaster } from "../Form/utils";
import { getBranchReferenceUri } from "common/constants";
import Members from "reused/Participants/components/Members";
import MembersPermissions from "./components/MembersPermissions";
import AuthorsWrapper from "reused/Participants/components/AuthorsWrapper";

import type { Bootstrap } from "Branch/schema/input";

type Props = {
  bootstrap: Bootstrap;
}

const Authors = ({ bootstrap: { ownAuthors } }: Props) => {
  const { watch, setValue } = useFormContext()
  const members = watch('members') || []
  const masterId = watch('masterId')

  useEffect(() => {
    const newMembers = changeMaster(members, ownAuthors, masterId)
    setValue('members', newMembers)
  }, [masterId])

  return (
    <AuthorsWrapper
      ownAuthors={ownAuthors}
      choiceList={<Members />}
      permissions={<MembersPermissions/>}
      referenceUri={getBranchReferenceUri}
  />)
}

export default Authors
