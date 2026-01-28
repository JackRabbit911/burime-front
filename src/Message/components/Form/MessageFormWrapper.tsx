import Grid3Cols from "../../../reused/Wrapper/Grid3Cols"
import { FormProvider, useForm } from "react-hook-form"
import AuthorsChoiceWrapper from "./AuthorsChoiceWrapper"
import Recipients from "./Recipients"
import { useUnit } from "effector-react"
import { $ownAuthors, getOwnAuthorsFx } from "../../../common/store/ownAuthors"
import { useEffect, useState } from "react"
import Select from "../../../reused/Participants/components/Select"
import Controls from "./Controls"
import Form from "."
import { zodResolver } from "@hookform/resolvers/zod"
import { messageForm } from "../../schema"
import CheckBox from "../../../reused/CheckBox"
import { t } from "../../../common/i18n/utils"

const MessageFormWrapper = () => {
  const ownAuthors = useUnit($ownAuthors)
  const [view, setView] = useState('choice')

  const methods = useForm({
    resolver: zodResolver(messageForm),
    mode: 'all',
    defaultValues: {
      recipients: [],
      message: {},
      important: false,
    }
  })

  const handleSwitchBtn = (data: string) => {
    setView(data)
  }

  useEffect(() => {
    getOwnAuthorsFx()
  }, [])

  useEffect(() => {
    if (ownAuthors.length > 0) {
      methods.setValue('message.from', ownAuthors[0].id || 0)
    }

  }, [ownAuthors])

  return (
    <FormProvider {...methods}>
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
        {view === 'form' ? <Form /> :
          <AuthorsChoiceWrapper />
        }
      </Grid3Cols>
      <Controls
        view={view}
        setView={handleSwitchBtn}
      />
    </FormProvider>
  )
}

export default MessageFormWrapper
