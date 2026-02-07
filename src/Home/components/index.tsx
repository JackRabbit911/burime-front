import { useEffect } from "react"
import { useUnit } from "effector-react"

import Stat from "reused/Stat"
import Book from "reused/icons/Book"
import Heart from "reused/icons/Heart"
import Message from "reused/icons/Message"
import { globalReset } from "common/store"
import { $myStat, getMyStatFx } from "Home/store"

const Home = () => {
  const stat = useUnit($myStat)

  useEffect(() => {
    globalReset()
    getMyStatFx()
  }, [])

  return (
    stat ?
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
        <Stat
          path="books"
          color="primary"
          title="My Нетленки"
          value={`${stat?.books.total}/${stat?.books.own}`}
          icon={<Book />}
          desc="Уже неплохо"
        />
        <Stat
          path="authors"
          color="secondary"
          title="My authors"
          value={`${stat?.authors.total}/${stat?.authors.own}`}
          icon={<Heart />}
          desc="Уже неплохо"
        />
        <Stat
          path="message/inbox"
          color="info"
          title="My messages"
          value={`${stat?.messages.total}/${stat?.messages.new}`}
          icon={<Message />}
          desc="Уже неплохо"
        />
        <Stat
          path="drafts"
          color="error"
          title="My Drafts"
          value={`${stat?.drafts}`}
          icon={<Book />}
          desc="Уже неплохо"
        />
        <Stat
          path="friends"
          color="success"
          title="My Friends"
          value={8}
          icon={<Heart />}
          desc="Уже неплохо"
        />
        <Stat
          path="favorites"
          color="accent"
          title="My Favorites"
          value={14}
          icon={<Heart />}
          desc="Уже неплохо"
        />
        <Stat
          path="profile"
          color="warning"
          title="My Profile"
          value={`${stat?.complete}%`}
          icon={<Book />}
          desc="Уже неплохо"
        />
      </div>
    </> : null
  )
}

export default Home
