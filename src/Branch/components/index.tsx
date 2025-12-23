import { useEffect } from "react"
import { useParams } from "react-router"
import { $bootstrap, getBootstrapFx } from "../store/bootstrap"
import { useUnit } from "effector-react"
import Form from "./Form"
import { $status, globalReset } from "../../common/store"
import ErrorCmp from "../../reused/ErrorCmp"
import Loading from "../../reused/Loading"
import { t } from "../../common/i18n/utils"

const Branch = () => {
  const { id, draft } = useParams()
  const bootstrap = useUnit($bootstrap)
  const status = useUnit($status)

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
  ) : <Loading message={t('Loading')} />
}

export default Branch
