import { useFormContext } from "react-hook-form";
import { stepChanged } from "../../../../store/step";
import { isObjectEmpty } from "../../../../../common/utils";

type Props = {
  step: number;
}

const NextButton = ({ step }: Props) => {
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
      Next
    </button>
  );
};

export default NextButton;
