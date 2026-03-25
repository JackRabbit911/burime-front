import { useEffect } from "react"
import { useUnit } from "effector-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { messageForm, messageOut, type MessageForm } from "../schema"
import { $ownAuthors, getOwnAuthorsFx } from "../../common/store/ownAuthors"
import { $isPending, $viewMsgForm, msgSubmitted, setMsgView, toAliasSetted } from "../store"
import { $authorsPayload } from "reused/Participants/store/athorsPayload"
import { getAuthorsFx } from "reused/Participants/store/authors"

export const useMessageForm = (message: MessageForm) => {
  const view = useUnit($viewMsgForm)
  const [ownAuthors, isPending] = useUnit([$ownAuthors, $isPending])
  const authorsPayload = useUnit($authorsPayload)

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
    if (ownAuthors.length === 0) {
      getOwnAuthorsFx()
    }
  }, [])

  useEffect(() => {
    if (message.recipients.length > 0) {
      setMsgView('form')
    }
  }, [message.recipients])

  useEffect(() => {
    if (message.recipients.length > 0) {
      toAliasSetted(message.recipients[0].alias)
    }

    if (message.message.from === null) {
      message.message.from = ownAuthors[0]?.id || null
    }

    methods.setValue('message', message.message)
    methods.setValue('recipients', message.recipients)
    methods.setValue('important', message.important)
    methods.setValue('_csrf', message._csrf)
  }, [message])

  useEffect(() => {
    getAuthorsFx(authorsPayload)
  }, [authorsPayload])

  return { methods, ownAuthors, onSubmit, view }
}
