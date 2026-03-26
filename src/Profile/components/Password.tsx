import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

import TextInput from "reused/TextInput";
import { getCsrfFx, passwordSubmitted } from "../store";
import { passwordSchema, type ConfirmPassword } from "../schema";
import { useTranslate } from "common/i18n/hooks";
import CSRF from "reused/CSRF";
import { isObjectEmpty } from "common/utils";

const Password = () => {
  const methods = useForm({
    resolver: zodResolver(passwordSchema),
    mode: 'all',
    defaultValues: () => getCsrfFx(),
  });

  const __ = useTranslate()

  const onSubmit: SubmitHandler<ConfirmPassword> = (data) => {
    const valid = passwordSchema.safeParse(data)

    if (valid?.error) {
      console.log(valid.error, data)
    }

    if (valid?.success && valid?.data) {
      passwordSubmitted(valid.data)
    }
  }

  const { password, confirmPassword } = methods.getValues()

  const disabled = !isObjectEmpty(methods.formState.errors) ||
    !Boolean(password) || !Boolean(confirmPassword)

  return (
    <>
      <FormProvider {...methods}>
        <h3 className="text-xl">
          {__('Change Password form')}
        </h3>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CSRF />
          <TextInput
            type="password"
            fieldName="password"
            label={__('Password')}
          />
          <TextInput
            type="password"
            fieldName="confirmPassword"
            label={__('Confirm')}
          />
          <button
            type="submit"
            className="btn btn-primary dark:btn-info w-full mt-4"
            disabled={disabled}
          >
            {__('Save')}
          </button>
        </form>
      </FormProvider>
    </>
  )
}

export default Password
