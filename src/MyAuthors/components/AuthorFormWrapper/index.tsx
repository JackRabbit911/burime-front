import { FormProvider } from "react-hook-form"

import Controls from "../Controls"
import AuthorForm from "../AuthorForm"
import { useAuthorForm } from "./hook"
import { useTranslate } from "common/i18n/hooks"
import { getGroupReferenceUri } from "common/constants"
import Members from "reused/Participants/components/Members"
import MembersPermissions from "../Participants/MembersPermissions"
import AuthorsWrapper from "reused/Participants/components/AuthorsWrapper"

import type { MyAuthor } from "MyAuthors/schema"

type Props = {
  defaultAuthor?: MyAuthor;
}

const AuthorFormWrapper = ({ defaultAuthor }: Props) => {
  const {
    methods, src,
    view, setView,
    author, ownAuthors,
    handleSwitchBtn, onSubmit,
  } = useAuthorForm(defaultAuthor)

  const __ = useTranslate()

  return (
    <FormProvider {...methods}>
      <div className="flex flex-row gap-4">
        <div
          className="avatar aspect-square size-24"
          onClick={() => { setView('form') }}
          style={{ cursor: 'pointer' }}
        >
          <img src={src} />
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
