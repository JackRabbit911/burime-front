import { FormProvider } from "react-hook-form"

import Form from "."
import Controls from "./Controls"
import Recipients from "./Recipients"
import { t } from "common/i18n/utils"
import CheckBox from "reused/CheckBox"
import Grid3Cols from "reused/Wrapper/Grid3Cols"
import AuthorsChoiceWrapper from "./AuthorsChoiceWrapper"
import Select from "reused/Participants/components/Select"
import { useMessageForm } from "Message/hooks/messageform"
import { useMessageTemplate } from "Message/hooks/messageTemplate"

const MessageFormWrapper = () => {
  const { message, isPending } = useMessageTemplate()
  const { methods, ownAuthors, onSubmit, view, setView } = useMessageForm(message)

  const handleSwitchBtn = (data: string) => {
    setView(data)
  }

  const Component = view === 'form' ? <Form message={message} /> : <AuthorsChoiceWrapper />
  
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Grid3Cols>
          <div>
            <Select
              fieldName="message.from"
              label="Message sender"
              options={ownAuthors}
            />
            <div className="mt-2">
              <CheckBox
                fieldName="important"
                label={t('Mark as important')}
              />
            </div>
            <Recipients setView={setView} />
          </div>
          <div className="md:col-span-2">
            {!isPending ? Component : null}
          </div>
        </Grid3Cols>
        <Controls
          view={view}
          setView={handleSwitchBtn}
        />
      </form>
    </FormProvider>
  )
}

export default MessageFormWrapper
