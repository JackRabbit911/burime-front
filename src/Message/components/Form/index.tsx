import { getMsgForm } from "Message/utils/components"
import type { MessageForm } from "Message/schema"

type Props = {
  message: MessageForm;
}

const Form = ({ message }: Props) => {
  const MainForm = getMsgForm(message)

  return <>{ MainForm }</>
}

export default Form
