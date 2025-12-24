import { useUnit } from "effector-react"
import DialogSuccess from "./components/DialogSuccess"
import { $finalResponse } from "../../../../store/publish";
import { t } from "../../../../../common/i18n/utils";

const FinalDialog = () => {
  const finalResponse = useUnit($finalResponse)

  return !finalResponse ? (
    <div className="flex flex-col justify-center min-h-64">
      <div className="text-center w-full">
        <span className="text-xl">
          {t('Wait, please')}
        </span>
        <span className="loading loading-dots loading-xs ms-1.5 mt-2.5"></span>
      </div>
    </div>
  ) : (
    <DialogSuccess
      response={finalResponse}
    />
  )
}

export default FinalDialog
