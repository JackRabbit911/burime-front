import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"
import Textarea from "../../reused/Textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorSchema, type MyAuthor } from "../schema"
import { host } from "../../common/ajax"
import TextInput from "../../reused/TextInput"

type Props = {
  author: MyAuthor;
}

const AuthorForm = ({ author }: Props) => {
  const methods = useForm({
    resolver: zodResolver(authorSchema),
    mode: "all",
    defaultValues: author
  })

  const alias = methods.watch('alias')
  const slogan = methods.watch('slogan')

  // console.log(authors, author)

  const onSubmit: SubmitHandler<any> = (data) => console.log(data)

  return (
    <FormProvider {...methods}>
      <div className="flex flex-row gap-4">
      <div className="avatar aspect-square size-24">
        <img src={`${host}/${author.avatar}`} />
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
