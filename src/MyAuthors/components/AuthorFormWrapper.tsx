import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorOut, authorSchema, type MyAuthor } from "../schema"
import { avatarSrc } from "../utils"
import { authorSubmitted } from "../store"
import AuthorForm from "./AuthorForm"
import Controls from "./Controls"
import { useState } from "react"
import Members from "../../reused/Participants"

type Props = {
  author?: MyAuthor;
}

const AuthorFormWrapper = ({ author }: Props) => {
  const [view, setView] = useState('form')

  const methods = useForm({
    resolver: zodResolver(authorSchema),
    mode: "all",
    defaultValues: author
  })

  const handleSwitchBtn = (data: string) => {
    setView(data)
  }

  const { alias, info, file, avatar, openclosed } = methods.watch()

  const onSubmit: SubmitHandler<MyAuthor> = (data) => {
    const valid = authorOut.safeParse(data)

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
        <div className="avatar aspect-square size-24">
          <img src={avatarSrc(file, avatar)} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl">
            {alias}
          </h2>
          <p className="flex italic h-full items-center">{info.slogan}</p>
        </div>
      </div>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <fieldset className="fieldset w-full">
          {view === 'form' ?
            <AuthorForm /> :
            <Members />
          }
          <Controls
            status={openclosed}
            view={view}
            setView={handleSwitchBtn}
          />
        </fieldset>
      </form>
    </FormProvider>
  )
}

export default AuthorFormWrapper
