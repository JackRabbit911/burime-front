import Grid3Cols from "../../../reused/Wrapper/Grid3Cols"
import { FormProvider } from "react-hook-form"
import AuthorsChoiceWrapper from "./AuthorsChoiceWrapper"
import Recipients from "./Recipients"
import { useState } from "react"
import Select from "../../../reused/Participants/components/Select"
import Controls from "./Controls"
import Form from "."
import CheckBox from "../../../reused/CheckBox"
import { t } from "../../../common/i18n/utils"
import { useMessageForm } from "../../hooks"

const MessageFormWrapper = () => {
  const [view, setView] = useState('choice')
  const handleSwitchBtn = (data: string) => {
    setView(data)
  }

  const { methods, ownAuthors, onSubmit } = useMessageForm()

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
            <Recipients />
          </div>
          <div className="md:col-span-2">
            {view === 'form' ? <Form /> :
              <AuthorsChoiceWrapper />
            }
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
