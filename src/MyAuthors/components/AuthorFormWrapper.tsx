import { useUnit } from "effector-react"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import CSRF from "reused/CSRF"
import Controls from "./Controls"
import AuthorForm from "./AuthorForm"
import { avatarSrc } from "common/utils"
import { useTranslate } from "common/i18n/hooks"
import { getGroupReferenceUri } from "common/constants"
import { getAuthorsFx } from "reused/Participants/store/authors"
import Members from "../../reused/Participants/components/Members"
import MembersPermissions from "./Participants/MembersPermissions"
import { $authorView, viewSetted } from "MyAuthors/store/authorView"
import { $authorsPayload } from "reused/Participants/store/athorsPayload"
import { $myMembers, $ownAuthors, $scrf, authorSubmitted } from "../store"
import AuthorsWrapper from "reused/Participants/components/AuthorsWrapper"
import { formOutputSchema, formInputSchema, type MyAuthor, type FormInputType } from "../schema"

type Props = {
  defaultAuthor?: MyAuthor;
}

const AuthorFormWrapper = ({ defaultAuthor }: Props) => {
  const [members, csrf] = useUnit([$myMembers, $scrf])
  const ownAuthors = useUnit($ownAuthors)
  const [view, setView] = useUnit([$authorView, viewSetted])
  const authorsPayload = useUnit($authorsPayload)
  const __ = useTranslate()

  const methods = useForm({
    resolver: zodResolver(formInputSchema),
    mode: "all",
    defaultValues: {
      author: defaultAuthor,
      members: members,
      masterId: ownAuthors[0]?.id ?? 0,
      _csrf: csrf,
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

  useEffect(() => {
    methods.setValue('members', members)
    methods.setValue('_csrf', csrf)
  }, [members, csrf])

  useEffect(() => {
    getAuthorsFx(authorsPayload)
  }, [authorsPayload])

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
        className="w-full"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <CSRF />
        <fieldset className="fieldset">
          {view === 'form' ?
            <AuthorForm
              __={__}
              members={methods.getValues('members')}
            /> :
            <AuthorsWrapper
              ownAuthors={ownAuthors}
              choiceList={<Members />}
              permissions={<MembersPermissions />}
              referenceUri={getGroupReferenceUri}
            />
          }
        </fieldset>
        <Controls
          __={__}
          status={author?.openclosed ?? 2}
          view={view}
          setView={handleSwitchBtn}
        />
      </form>
    </FormProvider>
  )
}

export default AuthorFormWrapper
