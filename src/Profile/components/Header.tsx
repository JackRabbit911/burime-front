import { useFormContext } from "react-hook-form"
import { avatarSrc } from "common/utils"
import { srcAvatar } from "common/constants"
import { host } from "common/ajax"

const Header = () => {
  const { getValues, formState: { errors } } = useFormContext()

  const id = getValues('id')
  const file = getValues('file')

  const src = Object.hasOwn(errors, 'file') ?
    `${host}/avatar/figa.png` :
    avatarSrc(file, srcAvatar + id)

  return (
    <div className="text-end -mb-4 mt-4">
      <div
        className="avatar aspect-square size-24"
        style={{ cursor: 'pointer' }}
      >
        {id && <img src={src} />}
      </div>
    </div>
  )
}

export default Header
