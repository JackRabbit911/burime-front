import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import BitMask from "reused/BitMask";
import type { GetText } from "common/i18n/types";
import type { Member } from "reused/Participants/types";


type Props = {
  __: GetText;
  member: Member | null;
  permissions: {
    [index: string]: number;
  } | undefined;
}

const PermissionsList = ({ __, member, permissions }: Props) => {
  const { control, setValue, watch } = useFormContext()

  const options = useMemo(() => (
    Object.entries(permissions ?? {}).reverse().map(([label, value]) => ({
      label: label,
      value: value,
    }))
  ), [])

  const target = useMemo(() => {
    const members: Member[] = watch('members')
    const index = members.findIndex(item => item.id === member?.id)
    return `members.${index}.role`
  }, [member])

  const mask = watch('mask')
  
  useEffect(() => {
    setValue(target, mask)
  }, [mask]);

  useEffect(() => {
    setValue('mask', member?.role || 0)
  }, [member]);

  return (
    <>
      <h3>
        {__('Permissions')}
      </h3>
      <BitMask
        __={__}
        name="mask"
        control={control}
        options={options}
      />
    </>
  )
}

export default PermissionsList
