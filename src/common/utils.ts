import { host } from "./ajax";

export const isObjectEmpty = (obj: object) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export const getObjectProp = (object: object, key: string) => {
  let obj = object as any
  const arr = key.split('.')
  const f = arr.shift() as string

  let m = obj[f]

  arr.forEach((val) => {
    if (m) {
      m = m[val]
    }
  })

  return m;
}

export const fileToUrl = (file: File | null) => file ? URL.createObjectURL(file) : ''

export const avatarSrc = (
    file: File | null | undefined,
    src: string | undefined): string => {
    return file ? fileToUrl(file) :
        (src ? `${host}/${src}` :
            `${host}/avatar/no_avatar.jpg`)
}
