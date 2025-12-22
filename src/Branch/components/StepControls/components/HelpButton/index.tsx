import { useUnit } from "effector-react";
import { $step } from "../../../../store/step";
import { helpBtnClicked } from "../../../../../reused/Help/store";
import { modalOpened } from "../../../../../reused/Modal/store";
import Helper from "../../../../../reused/Help";

const HelpButton = () => {
  const step = useUnit($step);

  const onClick = (step: number) => () => {
    helpBtnClicked(step)
    modalOpened(<Helper step={step} />)
  }

  return step >= 5 ? null : (
    <button
      className="btn btn-circle btn-success text-2xl"
      onClick={onClick(step)}
    >
      ?
    </button>
  );
};

export default HelpButton;
