import { useEffect } from "react"
import { useParams } from "react-router"
import { useUnit } from "effector-react"

import Form from "./Form"
import Loading from "reused/Loading"
import ErrorCmp from "reused/ErrorCmp"
import { $status, globalReset } from "common/store"
import { $bootstrap, getBootstrapFx } from "Branch/store/bootstrap"
import { useTranslate } from "common/i18n/hooks"

const Branch = () => {
  const { id, draft } = useParams()
  const bootstrap = useUnit($bootstrap)
  const status = useUnit($status)
  const __ = useTranslate()

  useEffect(() => {
    globalReset()
    getBootstrapFx([id, draft])
  }, [])

   if (status >= 400) {
    return (
        <ErrorCmp status={status} />
    )
  }

  return bootstrap ? (
    <Form bootstrap={bootstrap}/>
  ) : <Loading message={__('Loading')} />
}

export default Branch
