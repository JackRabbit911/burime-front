import { useFormContext } from "react-hook-form";
import PermissionCheckBox from "./PermissionCheckBox";
import { useUnit } from "effector-react";
import { isPermission } from "../../utils";
import type { Member } from "../../schema";
import { t } from "../../../../common/i18n/utils";
import { $referenceBooks } from "../../store/reference";

type Props = {
  member: Member | null;
}

const PermissionsList = ({ member }: Props) => {
  const { authorsPermissions } = useUnit($referenceBooks)
  const { setValue, getValues } = useFormContext()

  const members = getValues('members')
  const checked = (value: number): boolean => isPermission(member?.role || 0, value)

  const handleCheck = (val: number, id: number, isAdd: boolean) => {
    const newAuthors = members.map((value: Member) => {
      if (value.id === id) {
        value.role = isAdd ? value.role | val : value.role &= ~val
      }

      return value
    })

    setValue('members', newAuthors)
  }

  console.log(authorsPermissions)

  return (
    <>
      <h3>
        {t('Permissions')}
      </h3>
      {Object.entries(authorsPermissions).reverse().map(([label, value]) => (
        <PermissionCheckBox
          handler={handleCheck}
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
