import { useFormContext } from "react-hook-form"
import { avatarSrc } from "common/utils"
import { srcAvatar } from "common/constants"
import { host } from "common/ajax"

const Header = () => {
  const { getValues, formState: { errors } } = useFormContext()

  const id = getValues('id')
  const file = getValues('file')
  const name = getValues('name')

  const src = Object.hasOwn(errors, 'file') ?
    `${host}/avatar/figa.webp` :
    avatarSrc(file, srcAvatar + id)

  console.log(getValues())

  return (
    <div className="text-end -mb-4 mt-4">
      <div
        className="avatar aspect-square size-24"
        style={{ cursor: 'pointer' }}
      >
        {id && <img src={src} alt={name}/>}
      </div>
    </div>
  )
}

export default Header
