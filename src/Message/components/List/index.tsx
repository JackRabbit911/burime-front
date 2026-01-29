import { useEffect } from "react"
import { getMessageListFx, msgResetted } from "../../store"
import { Link } from "react-router"
import Inbox from "./Inbox"
import Outbox from "./Outbox"
import Delbox from "./Delbox"

type Props = {
  box: string;
}

const List = ({ box }: Props) => {
  let component

  switch (box) {
    case 'inbox':
      component = <Inbox />
      break
    case 'outbox':
      component = <Outbox />
      break
    case 'deleted':
      component = <Delbox />
      break
    default:
      component = `Invalid segment: ${box}`
  }

  useEffect(() => {
    msgResetted()
    getMessageListFx()
  }, [])

  
  return (
    <>
      <div className="text-end">
        <Link to='/message/form'>
          <button className="link">
            New message
          </button>
        </Link>
      </div>
      {component}
    </>
  )
}

export default List
