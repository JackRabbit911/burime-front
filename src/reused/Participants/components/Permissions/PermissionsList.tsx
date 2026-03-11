import PermissionCheckBox from "./PermissionCheckBox";
import { isPermission } from "reused/Participants/utils";

import type { Member } from "reused/Participants/types";
import type { GetText } from "common/i18n/types";

type Props = {
  __: GetText;
  member: Member | null;
  permissions: {
    [index: string]: number;
} | undefined;
  handler: (val: number, id: number, isAdd: boolean) => void;
}

const PermissionsList = ({ __, member, permissions, handler }: Props) => {
  const checked = (value: number): boolean => isPermission(member?.role || 0, value)

  return (
    <>
      <h3>
        {__('Permissions')}
      </h3>
      {Object.entries(permissions ?? {}).reverse().map(([label, value]) => (
        <PermissionCheckBox
          handler={handler}
          member={member}
          label={label}
          key={`${label}.${member?.id}`}
          value={value}
          checked={checked(value)}
        />
      ))}
    </>
  )
}

export default PermissionsList
