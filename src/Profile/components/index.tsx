import { Link } from "react-router";
import { useUnit } from "effector-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import Form from "./Form";
import Header from "./Header";
import { t } from "common/i18n/utils";
import { userData, type UserData } from "../schema";
import { $isPending, getUserDataFx, profileSubmitted } from "../store";

const Profile = () => {
  const isPending = useUnit($isPending)
  const methods = useForm({
    resolver: zodResolver(userData),
    mode: 'all',
    defaultValues: () => getUserDataFx()
  });

  const onSubmit: SubmitHandler<UserData> = (data) => {
    if (!isPending ) {
      const valid = userData.safeParse(data)

      if (valid?.error) {
        console.log(valid.error, data)
      }

      if (valid?.success && valid?.data) {
        profileSubmitted(valid.data)
      }
    }
  }

  if (methods.formState.isLoading) {
    return <p>Loading form data...</p>;
  }

  return (
    <>
      <FormProvider {...methods}>
        <Header />
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Form />
          <button
            type="submit"
            className="btn btn-primary dark:btn-info w-full mt-4"
          >
            {t('Save')}
          </button>
        </form>
        <div className="text-end">
          <Link to='/profile/password'>
            <button className="link mt-4">
              {t('Change password')}
            </button>
          </Link>
        </div>
      </FormProvider>
    </>
  )
}

export default Profile
