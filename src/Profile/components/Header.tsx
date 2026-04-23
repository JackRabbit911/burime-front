import { useFormContext } from "react-hook-form"
import { avatarSrc } from "common/utils"
import { srcAvatar } from "common/constants"

const Header = () => {
  const { getValues } = useFormContext()

  const id = getValues('id')
  const file = getValues('file')

  return (
    <div className="text-end -mb-4 mt-4">
      <div
        className="avatar aspect-square size-24"
        style={{ cursor: 'pointer' }}
      >
        <img src={avatarSrc(file, srcAvatar + id)} />
      </div>
    </div>
  )
}

export default Header
