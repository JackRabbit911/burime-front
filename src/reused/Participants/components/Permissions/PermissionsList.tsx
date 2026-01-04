import PermissionCheckBox from "./PermissionCheckBox";
import { isPermission } from "../../utils";
import { t } from "../../../../common/i18n/utils";
import type { Member } from "../../types";

type Props = {
  member: Member | null;
  permissions: {
    [index: string]: number;
} | undefined;
  handler: (val: number, id: number, isAdd: boolean) => void;
}

const PermissionsList = ({ member, permissions, handler }: Props) => {
  const checked = (value: number): boolean => isPermission(member?.role || 0, value)

  return (
    <>
      <h3>
        {t('Permissions')}
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
