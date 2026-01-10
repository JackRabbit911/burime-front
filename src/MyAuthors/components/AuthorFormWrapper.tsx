import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formOutputSchema, formInputSchema, type MyAuthor, type FormInputType } from "../schema"
import { avatarSrc } from "../utils"
import { $myMembers, $ownAuthors, authorSubmitted } from "../store"
import AuthorForm from "./AuthorForm"
import Controls from "./Controls"
import { useState } from "react"
import Participants from "./Participants"
import { useUnit } from "effector-react"

type Props = {
  defaultAuthor?: MyAuthor;
}

const AuthorFormWrapper = ({ defaultAuthor }: Props) => {
  const members = useUnit($myMembers)
  const ownAuthors = useUnit($ownAuthors)
  const [view, setView] = useState('form')

  const methods = useForm({
    resolver: zodResolver(formInputSchema),
    mode: "all",
    defaultValues: {
      author: defaultAuthor,
      members: members,
      masterId: ownAuthors[0]?.id ?? 0
    }
  })

  const handleSwitchBtn = (data: string) => {
    setView(data)
  }

  const { author, file } = methods.watch()

  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    const valid = formOutputSchema.safeParse(data)

    if (valid?.error) {
      console.log(valid.error, data, methods.getValues())
    }

    if (valid?.success && valid?.data) {
      authorSubmitted(valid.data)
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-row gap-4">
        <div
          className="avatar aspect-square size-24"
          onClick={() => { setView('form') }}
          style={{ cursor: 'pointer' }}
        >
          <img src={avatarSrc(file, author?.avatar)} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl">
            {author?.alias}
          </h2>
          <p className="flex italic h-full items-center">{author?.info.slogan}</p>
        </div>
      </div>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <fieldset className="fieldset w-full">
          {view === 'form' ?
            <AuthorForm
              members={methods.getValues('members')}
            /> :
            <Participants />
          }
          <Controls
            status={author?.openclosed ?? 2}
            view={view}
            setView={handleSwitchBtn}
          />
        </fieldset>
      </form>
    </FormProvider>
  )
}

export default AuthorFormWrapper
