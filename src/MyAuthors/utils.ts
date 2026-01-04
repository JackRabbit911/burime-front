import { host } from "../common/ajax"
import { fileToUrl } from "../common/utils"

export const avatarSrc = (
    file: File | null | undefined,
    src: string | undefined): string => {
    return file ? fileToUrl(file) :
        (src ? `${host}/${src}` :
            `${host}/avatar/no_avatar.jpg`)
}
