import { useParams } from "react-router";
import type { Message } from "../types";
import MsgShowDel from "./MsgShowDel";
import MsgShowIn from "./MsgShowIn";
import MsgShowOut from "./MsgShowOut";

const component = (box: string | undefined, message: Message | null) => {
  if (message) {
    switch (box) {
      case 'in':
        return <MsgShowIn message={message} />
      case 'out':
        return <MsgShowOut message={message} />
      case 'del':
        return <MsgShowDel message={message} />
      default:
        return `Invalid condition: ${box}`
    }
  } else {
    return null
  }
}

type Props = {
  message: Message | null;
}

const MsgShowWrapper = ({ message }: Props) => {
  const { box } = useParams()

  return component(box, message)
}

export default MsgShowWrapper
