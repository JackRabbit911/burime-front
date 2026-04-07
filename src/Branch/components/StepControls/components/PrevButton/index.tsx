import { useFormContext } from "react-hook-form";
import { stepChanged } from "../../../../store/step";
import { isObjectEmpty } from "../../../../../common/utils";
import type { GetText } from "common/i18n/types";

type Props = {
  step: number;
  __: GetText;
}

const PrevButton = ({ step, __ }: Props) => {
  const onPrevStep = () => {
    stepChanged(step - 1);
  }

  const { formState: { errors } } = useFormContext();

  return (
    <button
      onClick={onPrevStep}
      disabled={step === 1 || !isObjectEmpty(errors)}
      className="btn btn-primary dark:btn-info"
    >
      {__('Prev')}
    </button>
  );
};

export default PrevButton;
