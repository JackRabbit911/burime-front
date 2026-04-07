import { useFormContext } from "react-hook-form";

import { isObjectEmpty } from "common/utils";
import { stepChanged } from "Branch/store/step";
import type { GetText } from "common/i18n/types";

type Props = {
  step: number;
  __: GetText;
}

const NextButton = ({ step, __ }: Props) => {
  const onNextStep = () => {
    stepChanged(step + 1);
  }

  const { formState: { errors } } = useFormContext();

  return step >= 5 ? null : (
    <button
      onClick={onNextStep}
      disabled={!isObjectEmpty(errors)}
      className="btn btn-primary dark:btn-info"
    >
      {__('Next')}
    </button>
  );
};

export default NextButton;
