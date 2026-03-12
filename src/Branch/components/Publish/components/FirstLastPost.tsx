import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import Textarea from "reused/Textarea";
import type { GetTextProp } from "common/i18n/types";

const FirstLastPost = ({ __ }: GetTextProp) => {
  const { getValues, setValue } = useFormContext()
  const postSize = getValues('branch.info.post_size')
  const masterId = getValues('masterId')
  const firstBody = getValues('posts.first.body')
  const lastBody = getValues('posts.last.body')

  const onDelBody = (key: string) => () => {
    setValue(`posts[${key}].body`, '')
  }

  useEffect(() => {
    setValue('posts.first.author_id', masterId)
    setValue('posts.last.author_id', masterId)
  }, [firstBody, lastBody, masterId])

  return (
    <fieldset className="fieldset md:col-span-2">
      <Textarea
        fieldName="posts.first.body"
        label={__('First post')}
        placeholder="Напишите что-нибудь"
        rows={7}
        optional={__('Up to % words', postSize)}
      />
      <div className="text-end -mt-6">
        <button
          className="btn btn-xs btn-soft btn-square text-error"
          onClick={onDelBody('first')}
        >
          X
        </button>
      </div>
      <Textarea
        fieldName="posts.last.body"
        label={__('Last post')}
        placeholder="Если хотите, напишите финальные строки вашего произведения"
        rows={7}
        optional={__('Up to % words', postSize)}
      />
       <div className="text-end -mt-6">
        <button
          className="btn btn-xs btn-soft btn-square text-error"
          onClick={onDelBody('last')}
        >
          X
        </button>
      </div>
    </fieldset>
  )
}

export default FirstLastPost
