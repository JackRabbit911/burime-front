import { useParams } from "react-router"
import Cols3LayOut from "../../reused/Wrapper/Cols3Layout"

const MessageShow = () => {
  const { id } = useParams()

  return (
    <Cols3LayOut >
      <div>
        {id}
      </div>
      <div>
        {id}
      </div>
      <div>
        {id}
      </div>
    </Cols3LayOut >
  )
}

export default MessageShow
