import ajax from "../../common/ajax"
import { getUserDataUri } from "../../common/constants"
import { FormProvider, useForm } from "react-hook-form"
import Form from "./Form";
import { t } from "../../common/i18n/utils";
import Header from "./Header";
import { Link } from "react-router";

const Profile = () => {
  const methods = useForm({
    defaultValues: async () => {
      const response = await ajax.get(getUserDataUri)
      const { result } = response.data
      return result
    }
  });

  if (methods.formState.isLoading) {
    return <p>Loading form data...</p>;
  }

  return (
    <>
      <FormProvider {...methods}>
        <Header />
        <form onSubmit={methods.handleSubmit(data => console.log(data))}>
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
