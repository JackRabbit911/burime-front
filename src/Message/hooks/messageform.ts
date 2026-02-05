import { useEffect, useState } from "react"
import { useUnit } from "effector-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { $isPending, $msgForm, msgFormResetted, msgSubmitted } from "../store"
import { messageForm, messageOut, type MessageForm } from "../schema"
import { $ownAuthors, getOwnAuthorsFx } from "../../common/store/ownAuthors"

export const useMessageForm = () => {
  const [view, setView] = useState('choice')
  const [ownAuthors, isPending] = useUnit([$ownAuthors, $isPending])
  const defaultMsg = useUnit($msgForm)

  const methods = useForm({
    resolver: zodResolver(messageForm),
    mode: 'all',
    defaultValues: defaultMsg,
  })

  const onSubmit: SubmitHandler<MessageForm> = (data) => {
    if (!isPending) {
      const valid = messageOut.safeParse(data)

      if (valid?.error) {
        console.log(valid.error, data)
      }

      if (valid?.success && valid?.data) {
        msgSubmitted(valid.data)
      }

    }
  }

  useEffect(() => {
    getOwnAuthorsFx()

    if (defaultMsg.recipients.length > 0) {
      setView('form')
    }

    msgFormResetted()
  }, [])

  useEffect(() => {
    const from = methods.getValues('message.from')

    if (ownAuthors.length > 0 && !from) {
      methods.setValue('message.from', ownAuthors[0].id || 0)
    }

  }, [ownAuthors])

  return { methods, ownAuthors, onSubmit, view, setView }
}
