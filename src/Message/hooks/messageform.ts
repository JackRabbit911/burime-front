import { useEffect, useState } from "react"
import { useUnit } from "effector-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { $isPending, msgSubmitted } from "../store"
import { messageForm, messageOut, type MessageForm } from "../schema"
import { $ownAuthors, getOwnAuthorsFx } from "../../common/store/ownAuthors"

export const useMessageForm = (defaultMsg: MessageForm) => {
  const [view, setView] = useState('choice')
  const [ownAuthors, isPending] = useUnit([$ownAuthors, $isPending])

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

    if (methods.getValues('recipients').length > 0) {
      setView('form')
    }
  }, [])
  
  
  useEffect(() => {
    const from = methods.getValues('message.from')
    methods.setValue('message.from', from || ownAuthors[0].id)
  }, [ownAuthors])

  return { methods, ownAuthors, onSubmit, view, setView }
}
