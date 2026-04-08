import { Link } from "react-router"
import { useUnit } from "effector-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import Form from "./Form"
import Header from "./Header"
import CSRF from "reused/CSRF"
import { isObjectEmpty } from "common/utils"
import { useTranslate } from "common/i18n/hooks"
import ErrorOrPending from "reused/ErrorOrPendig"
import { userData, type UserData } from "../schema"
import { $isPending, getUserDataFx, profileSubmitted } from "../store"

const Profile = () => {
  const isLoading = useUnit($isPending)
  const methods = useForm({
    resolver: zodResolver(userData),
    mode: 'all',
    defaultValues: () => getUserDataFx()
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    profileSubmitted(data)
  }

  const __ = useTranslate()
  const disabled = !isObjectEmpty(methods.formState.errors)

  return (
    <ErrorOrPending isLoading={isLoading}>
      <FormProvider {...methods}>
        <Header />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CSRF />
          <Form __={__} />
          <button
            type="submit"
            className="btn btn-primary dark:btn-info w-full mt-4"
            disabled={disabled}
          >
            {__('Save')}
          </button>
        </form>
        <div className="text-end">
          <Link to='/profile/password'>
            <button className="link mt-4">
              {__('Change password')}
            </button>
          </Link>
        </div>
      </FormProvider>
    </ErrorOrPending>
  )
}

export default Profile
