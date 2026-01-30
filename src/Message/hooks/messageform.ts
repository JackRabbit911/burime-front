import { useEffect } from "react"
import { useUnit } from "effector-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { msgSubmitted } from "../store"
import { throttle } from "../../common/utils/decorator"
import { messageForm, messageOut, type MessageForm } from "../schema"
import { $ownAuthors, getOwnAuthorsFx } from "../../common/store/ownAuthors"

export const useMessageForm = () => {
    const ownAuthors = useUnit($ownAuthors)
    
      const methods = useForm({
        resolver: zodResolver(messageForm),
        mode: 'all',
        defaultValues: {
          recipients: [],
          message: {},
          important: false,
        }
      })

      const onSubmit: SubmitHandler<MessageForm> = (data) => {
        const throttledSubmit = throttle(msgSubmitted, 1000);
        const valid = messageOut.safeParse(data)
    
        if (valid?.error) {
          console.log(valid.error, data)
        }
    
        if (valid?.success && valid?.data) {
          throttledSubmit(valid.data)
        }
      }
    
      useEffect(() => {
        getOwnAuthorsFx()
      }, [])
    
      useEffect(() => {
        if (ownAuthors.length > 0) {
          methods.setValue('message.from', ownAuthors[0].id || 0)
        }
    
      }, [ownAuthors])

      return { methods, ownAuthors, onSubmit }
}
