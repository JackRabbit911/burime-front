import { host } from "common/ajax"
import type { CoverType, MyBook } from "../types"

type Props = {
  book: MyBook,
}

const Cover = ({ book }: Props) => {
  const cover = book.cover as CoverType

  const bgColorDefault = '#eeeeee'
  const textColorDefault = '#333333'
  const textSize = cover.text_size ?? 12

  const bgUrl = `${host}/img/branch/${book.id}/${cover.bg_img}`
  const coverUrl = `${host}/img/branch/${book.id}/${cover.cover}`
  const branchUrl = `${host}/branch/${book.id}`

  return (
    <a href={branchUrl}>
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ backgroundColor: cover.bg_color ?? bgColorDefault }}
      ></div>
      {Boolean(cover.bg_img) &&
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        ></div>
      }
      <div
        className="absolute top-0 left-0 flex flex-col justify-between text-center shadow overflow-hidden w-full h-full"
        style={{ color: cover.text_color ?? textColorDefault}}
      >
        <div style={{ fontSize: '6cqw' }}>
          {book.alias}
        </div>
        <div
          style={{
            fontSize: `${textSize}cqw`,
            lineHeight: 'normal',
          }}
        >
          {book.title}
        </div>
        <div
          style={{ fontSize: '5cqw' }}
        >
          {book.genreStr}
        </div>
      </div>
      {Boolean(cover.cover) &&
        <div
          className="absolute top-0 left-0 w-full h-full z-30"
        >
          <img src={coverUrl} className="w-full h-full" />
        </div>
      }
    </a>
  )
}

export default Cover
