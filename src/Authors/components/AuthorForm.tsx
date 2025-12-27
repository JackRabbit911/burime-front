import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import Textarea from "../../reused/Textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorSchema, type MyAuthor } from "../schema"
import TextInput from "../../reused/TextInput"
import FileInput from "../../reused/FileInput"
import { avatarSrc } from "../utils"
import Select from "../../reused/Select"
import { authorSubmitted } from "../store"

type Props = {
  author?: MyAuthor;
}

const AuthorForm = ({ author }: Props) => {
  const methods = useForm({
    resolver: zodResolver(authorSchema),
    mode: "all",
    defaultValues: author
  })

  // console.log(author, methods.watch())

  const { alias, slogan, file, avatar } = methods.watch()

  const onSubmit: SubmitHandler<MyAuthor> = (data) => authorSubmitted(data)

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
          <p className="flex italic h-full items-center">{slogan}</p>
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
            fieldName="slogan"
            label="Slogan"
            placeholder="Девиз"
            rows={4}
            optional="Up to 80 words"
          />
          <Textarea
            fieldName="info"
            label="Info"
            placeholder="Расскажите о своём авторе"
            rows={4}
            optional="Up to 200 words"
          />
          <div className="flex flex-row gap-3">
            <FileInput
              fieldName="file"
              label="Avatar"
              optional="Up 2 Mb"
            />
            <div className="w-1/2 mt-0.45">
            <Select
                fieldName="openclosed"
                label="Status"
                options={[
                  { value: 2, label: 'Author only' },
                  { value: 1, label: 'Closed group' },
                  { value: 0, label: 'Open group' },
                ]}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary dark:btn-info mt-4"
          >
            Save
          </button>
        </fieldset>
      </form>
    </FormProvider>
  )
}

export default AuthorForm
