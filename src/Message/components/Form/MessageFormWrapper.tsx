import Grid3Cols from "../../../reused/Wrapper/Grid3Cols"
import { FormProvider, useForm } from "react-hook-form"
import AuthorsChoiceWrapper from "./AuthorsChoiceWrapper"
import Recipients from "./Recipients"
import { useUnit } from "effector-react"
import { $ownAuthors, getOwnAuthorsFx } from "../../../common/store/ownAuthors"
import { useEffect, useState } from "react"
import Select from "../../../reused/Participants/components/Select"
import Controls from "./Controls"

const MessageFormWrapper = () => {
  const ownAuthors = useUnit($ownAuthors)
  const [view, setView] = useState('choice')

  const methods = useForm({
    defaultValues: {
      recipients: [],
      from: 7,
    }
  })

  const handleSwitchBtn = (data: string) => {
    setView(data)
  }

  useEffect(() => {
    getOwnAuthorsFx()
  }, [])

  return (
    <>
      <FormProvider {...methods}>
        <Grid3Cols>
          <div>
            <Select
              fieldName="from"
              label="Message sender"
              options={ownAuthors}
            />
            <Recipients />
          </div>
          {view === 'form' ? null :
            <AuthorsChoiceWrapper />
          }
        </Grid3Cols>
        <Controls
          view={view}
          setView={handleSwitchBtn}
        />
      </FormProvider>
    </>
  )
}

export default MessageFormWrapper
