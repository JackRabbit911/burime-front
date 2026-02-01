import { useFormContext } from "react-hook-form"
import { avatarSrc } from "../../common/utils"

const Header = () => {
  const { getValues } = useFormContext()

  const id = getValues('id')
  const file = getValues('file')
  const srcAvatar = `avatar/user/${id}`

  return (
    <div className="text-end -mb-4 mt-4">
      <div
        className="avatar aspect-square size-24"
        style={{ cursor: 'pointer' }}
      >
        <img src={avatarSrc(file, srcAvatar)} />
      </div>
    </div>
  )
}

export default Header
