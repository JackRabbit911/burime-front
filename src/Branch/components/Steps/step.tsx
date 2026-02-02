import { useUnit } from "effector-react";
import { useFormContext } from "react-hook-form";

import { $darkMode } from "common/store";
import { isObjectEmpty } from "common/utils";
import { $step, stepChanged } from "Branch/store/step";

type Props = {
  step: number;
  title: string;
  isError?: boolean;
};

const Step = ({ step, title, isError = false }: Props) => {
  const [currentStep, darkMode] = useUnit([$step, $darkMode]);
  const { formState: { errors } } = useFormContext();
  const disabled = !isObjectEmpty(errors)
  const color = darkMode ? 'step step-info' : 'step step-primary';
  const liClassName = currentStep >= step ? color : 'step';

  const btnClassName =
    disabled ? 'btn btn-link text-neutral' :
    isError ?
    'btn btn-link text-error' :
    'btn btn-link dark:text-info';

  const onStep = (newStep: number) => () => {
    stepChanged(newStep);
  }

  return (
    <li className={liClassName}>
      <button
        className={btnClassName}
        onClick={onStep(step)}
        disabled={disabled}
      >
        {title}
      </button>
    </li>
  );
};

export default Step;
