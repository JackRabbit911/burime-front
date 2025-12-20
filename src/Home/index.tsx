import Book from "../reused/icons/Book"
import Heart from "../reused/icons/Heart"
import Message from "../reused/icons/Message"
import Stat from "../reused/Stat"

const Home = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Stat
          path="/my/books"
          color="primary"
          title="My Нетленки"
          value={8}
          icon={<Book />}
          desc="Уже неплохо"
        />
        <Stat
          path="/my/authors"
          color="secondary"
          title="My authors"
          value={8}
          icon={<Heart />}
          desc="Уже неплохо"
        />
        <Stat
          path="/my/messages"
          color="info"
          title="My messages"
          value={8}
          icon={<Message />}
          desc="Уже неплохо"
        />
        <Stat
          path="/my/friends"
          color="success"
          title="My Friends"
          value={8}
          icon={<Heart />}
          desc="Уже неплохо"
        />
        <Stat
          path="/my/favorites"
          title="My Favorites"
          value={14}
          icon={<Heart />}
          desc="Уже неплохо"
        />
        <Stat
          path="/my/profile"
          title="My Profile"
          value="75%"
          icon={<Book />}
          desc="Уже неплохо"
        />
      </div>
    </>
  )
}

export default Home
