import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import Form from "./Form";
import Header from "./Header";
import { isObjectEmpty } from "common/utils";
import { useTranslate } from "common/i18n/hooks";
import { userData, type UserData } from "../schema";
import { getUserDataFx, profileSubmitted } from "../store";
import CSRF from "reused/CSRF";
import { useUnit } from "effector-react";
import { $status } from "common/store";
import ErrorOrPending from "reused/ErrorOrPendig";

const Profile = () => {
  const status = useUnit($status)
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

  // console.log(status)

  return (
    <ErrorOrPending isLoading={methods.formState.isLoading} status={status}>
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
