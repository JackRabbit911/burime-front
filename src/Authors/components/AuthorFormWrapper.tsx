import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import Textarea from "../../reused/Textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorOut, authorSchema, type MyAuthor } from "../schema"
import TextInput from "../../reused/TextInput"
import FileInput from "../../reused/FileInput"
import { avatarSrc } from "../utils"
import Select from "../../reused/Select"
import { authorSubmitted } from "../store"
import { t } from "../../common/i18n/utils"

type Props = {
  author?: MyAuthor;
}

const AuthorFormWrapper = ({ author }: Props) => {
  const methods = useForm({
    resolver: zodResolver(authorSchema),
    mode: "all",
    defaultValues: author
  })

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

  console.log(openclosed)

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
        id="my-author"
        method="post"
        acceptCharset="UTF-8"
        encType="multipart/form-data"
      >
        <fieldset className="fieldset w-full">
          <TextInput
            label="Alias"
            fieldName="alias"
          />
          <Textarea
            fieldName="info.slogan"
            label={t('Slogan')}
            placeholder={t('Your motto')}
            rows={4}
            optional={t("Up to % words", 80)}
          />
          <Textarea
            fieldName="info.info"
            label={t('Info')}
            placeholder={t('Tell us about your author')}
            rows={4}
            optional={t("Up to % words", 80)}
          />
          <div className="flex flex-row gap-3">
            <FileInput
              fieldName="file"
              label={t('Avatar')}
              optional={t('Up % Mb', 2)}
            />
            <div className="w-1/2 mt-0.45">
              <Select
                fieldName="openclosed"
                label={t('Status')}
                options={[
                  { value: 2, label: t('Author only') },
                  { value: 1, label: t('Closed group') },
                  { value: 0, label: t('Open group') },
                ]}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary dark:btn-info mt-4"
          >
            {t('Save')}
          </button>
        </fieldset>
      </form>
    </FormProvider>
  )
}

export default AuthorFormWrapper
