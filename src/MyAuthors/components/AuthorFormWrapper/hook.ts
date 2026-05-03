import { useEffect } from "react"
import { useUnit } from "effector-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"

import { host } from "common/ajax"
import { avatarSrc } from "common/utils"
import { getAuthorsFx } from "reused/Participants/store/authors"
import { $authorView, viewSetted } from "MyAuthors/store/authorView"
import { $authorsPayload } from "reused/Participants/store/athorsPayload"
import { $myMembers, $ownAuthors, authorSubmitted } from "MyAuthors/store"
import { formInputSchema, formOutputSchema, type FormInputType, type MyAuthor } from "MyAuthors/schema"

export const useAuthorForm = (defaultAuthor?: MyAuthor) => {
    const members = useUnit($myMembers)
      const ownAuthors = useUnit($ownAuthors)
      const [view, setView] = useUnit([$authorView, viewSetted])
      const authorsPayload = useUnit($authorsPayload)
    
      const methods = useForm({
        resolver: zodResolver(formInputSchema),
        mode: "all",
        defaultValues: {
          author: defaultAuthor,
          members: members,
          masterId: ownAuthors[0]?.id ?? 0,
        }
      })
    
      const handleSwitchBtn = (data: string) => {
        setView(data)
      }
    
      const { author, file } = methods.watch()
    
      const onSubmit: SubmitHandler<FormInputType> = (data) => {
        const valid = formOutputSchema.safeParse(data)
    
        if (valid?.error) {
          console.log(valid.error, data, methods.getValues())
        }
    
        if (valid?.success && valid?.data) {
          authorSubmitted(valid.data)
        }
      }
    
      const src = Object.hasOwn(methods.formState.errors, 'file') ?
          `${host}/avatar/figa.png` :
          avatarSrc(file, author?.avatar)
    
      useEffect(() => {
        methods.setValue('members', members)
      }, [members])
    
      useEffect(() => {
        getAuthorsFx(authorsPayload)
      }, [authorsPayload])

      return {
        methods: methods,
        src: src,
        view: view,
        setView: setView,
        author: author,
        ownAuthors: ownAuthors,
        handleSwitchBtn: handleSwitchBtn,
        onSubmit: onSubmit,
      }
}
