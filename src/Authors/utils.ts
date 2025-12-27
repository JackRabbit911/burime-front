import { host } from "../common/ajax"
import { fileToUrl } from "../common/utils"

export const avatarSrc = (file: File | null | undefined, src: string): string => {
    return file ? fileToUrl(file) : `${host}/${src}`
}
