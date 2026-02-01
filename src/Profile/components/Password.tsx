import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { passwordSchema, type ConfirmPassword } from "../schema";
import { passwordSubmitted } from "../store";
import { t } from "../../common/i18n/utils";
import TextInput from "../../reused/TextInput";

const Password = () => {
    const methods = useForm({
      resolver: zodResolver(passwordSchema),
      mode: 'all',
      defaultValues: {
        password: '',
        confirmPassword: ''
      }
    });
  
    const onSubmit: SubmitHandler<ConfirmPassword> = (data) => {
        const valid = passwordSchema.safeParse(data)
  
        if (valid?.error) {
          console.log(valid.error, data)
        }
  
        if (valid?.success && valid?.data) {
          passwordSubmitted(valid.data)
        }
    }

  return (
    <>
      <FormProvider {...methods}>
        <h3 className="text-xl">
          {t('Change Password form')}
        </h3>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <TextInput
            type="password"
            fieldName="password"
            label={t('Password')}
          />
          <TextInput
            type="password"
            fieldName="confirmPassword"
            label={t('Confirm')}
          />
          <button
            type="submit"
            className="btn btn-primary dark:btn-info w-full mt-4"
          >
            {t('Save')}
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default Password
