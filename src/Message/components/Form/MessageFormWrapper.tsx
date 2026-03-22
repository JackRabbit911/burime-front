import { FormProvider } from "react-hook-form"

import Form from "."
import Controls from "./Controls"
import Recipients from "./Recipients"
import CheckBox from "reused/CheckBox"
import { setMsgView } from "Message/store"
import Grid3Cols from "reused/Wrapper/Grid3Cols"
import { useTranslate } from "common/i18n/hooks"
import AuthorsChoiceWrapper from "./AuthorsChoiceWrapper"
import Select from "reused/Participants/components/Select"
import { useMessageForm } from "Message/hooks/messageform"
import { useMessageTemplate } from "Message/hooks/messageTemplate"

const MessageFormWrapper = () => {
  const { message, isPending } = useMessageTemplate()
  const { methods, ownAuthors, onSubmit, view } = useMessageForm(message)

  const handleSwitchBtn = (data: string) => {
    setMsgView(data)
  }

  const Component = view === 'form' ? <Form message={message} /> : <AuthorsChoiceWrapper />
  const __ = useTranslate()
  
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Grid3Cols>
          <div>
            <Select
              fieldName="message.from"
              label={__('Message sender')}
              options={ownAuthors}
            />
            <div className="mt-2">
              <CheckBox
                fieldName="important"
                label={__('Mark as important')}
              />
            </div>
            <Recipients __={__} />
          </div>
          <div className="md:col-span-2">
            {!isPending ? Component : null}
          </div>
        </Grid3Cols>
        <Controls
          __={__}
          view={view}
          setView={handleSwitchBtn}
        />
      </form>
    </FormProvider>
  )
}

export default MessageFormWrapper
