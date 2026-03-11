import { useTranslate } from "common/i18n/hooks";
import FirstLastPost from "./components/FirstLastPost";
import Indicator from "./components/Indicator";

const Publish = () => {
  const __ = useTranslate()

  return (
    <fieldset className="fieldset">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Indicator __={__} />
        </div>
        <div className="md:col-span-2">
          <FirstLastPost __={__} />
        </div>
      </div>
    </fieldset>
  )
}

export default Publish
