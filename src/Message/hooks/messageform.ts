import { useUnit } from "effector-react"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { $isPending, msgSubmitted, toAliasSetted } from "../store"
import { messageForm, messageOut, type MessageForm } from "../schema"
import { $ownAuthors, getOwnAuthorsFx } from "../../common/store/ownAuthors"

export const useMessageForm = (message: MessageForm) => {
  const [view, setView] = useState('choice')
  const [ownAuthors, isPending] = useUnit([$ownAuthors, $isPending])

  const methods = useForm({
    resolver: zodResolver(messageForm),
    mode: 'all',
    defaultValues: message,
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
  }, [])

  useEffect(() => {
    if (message.recipients.length > 0) {
      setView('form')
    }
  }, [message.recipients])

  useEffect(() => {
        if (message.recipients.length > 0) {
          toAliasSetted(message.recipients[0].alias)
        }
    
        methods.setValue('message', message.message)
        methods.setValue('recipients', message.recipients)
        methods.setValue('important', message.important)
      }, [message])

  return { methods, ownAuthors, onSubmit, view, setView }
}
