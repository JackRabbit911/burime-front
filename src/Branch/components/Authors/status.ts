import { useUnit } from "effector-react"
import { useFormContext } from "react-hook-form"

import { getStatusString } from "./permissions"
import { memberIdResetted } from "reused/Participants/store/authors"
import { buttonEnabled } from "./components/MembersPermissions/utils"
import { $permissions, $statusObj } from "reused/Participants/store/reference"

import type { Member } from "reused/Participants/types"

// type Props = {
//   member: Member | null;
// }

export const useStatus = (member: Member | null) => {
    const permissions = useUnit($permissions)
      const statusObj = useUnit($statusObj)
      const { getValues, setValue } = useFormContext()
    
      const enable = new buttonEnabled(permissions, statusObj, member)
    
      const members = getValues('members')
      const status = getStatusString(statusObj, member?.status || 0)
    
      const addPermission = (permission: number) => () => {
        const role =  member?.role || 1
        const newMask = role | permission
        setValue('mask', newMask)
      }
    
      const setStatus = (status: number) => () => {
        const newMembers = members.map((value: Member) => {
          if (value.id === member?.id) {
            value.status = status
          }
    
          return value
        })
    
        setValue('members', newMembers)
      }
    
      const deleteMember = (author: Member | null) => () => {
        if (author) {
          setValue('members', members.filter((item: Member) => item.id !== author.id))
          memberIdResetted()
        }
      }

      return {
        permissions,
        enable,
        statusObj,
        status,
        addPermission,
        setStatus,
        deleteMember
    }
}
