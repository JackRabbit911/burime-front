import { useForm, useFormContext, type SubmitHandler } from "react-hook-form"
import { messageForm, messageOut, type MessageForm, type NewRecipient } from "./schema"
import { helpBtnClicked } from "../reused/Help/store"
import { modalOpened } from "../reused/Modal/store"
import { isObjectEmpty } from "../common/utils"
import { helper } from "../reused/Help"
import { confirmDialog } from "../reused/InModal/ConfirmDialog"
import { useUnit } from "effector-react"
import { $ownAuthors, getOwnAuthorsFx } from "../common/store/ownAuthors"
import { zodResolver } from "@hookform/resolvers/zod"
import { msgSubmitted } from "./store"
import { useEffect } from "react"

export const useControls = (setView: (data: string) => void) => {
    const { getValues, watch, formState: { errors } } = useFormContext()
    const recipients = getValues('recipients') as NewRecipient[]

    const onHelpClick = (path: string) => () => {
        helpBtnClicked(path)
        modalOpened(helper({ path }))
    }

    const onChoiceClick = () => {
        setView('choice')
    }

    const onFormClick = () => {
        setView('form')
    }

    const onCancel = () => {
        modalOpened(
            confirmDialog({
                text: 'Message creation will be cancelled',
                link: '/message/list',
            })
        )
    }

    const submitDisabled = (
        !isObjectEmpty(errors) ||
        recipients.length === 0 ||
        watch('message.subject') === '' ||
        watch('message.subject') === undefined
    )

    const formBtnDisabled = recipients.length === 0

    return {
        onHelpClick,
        onChoiceClick,
        onFormClick,
        onCancel,
        submitDisabled,
        formBtnDisabled
    }
}

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
        const valid = messageOut.safeParse(data)
    
        if (valid?.error) {
          console.log(valid.error, data)
        }
    
        if (valid?.success && valid?.data) {
          msgSubmitted(valid.data)
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
