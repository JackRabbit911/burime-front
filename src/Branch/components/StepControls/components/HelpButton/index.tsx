import { useUnit } from "effector-react";
import { $step } from "../../../../store/step";
import { helpBtnClicked } from "../../../../../reused/Help/store";
import { modalOpened } from "../../../../../reused/Modal/store";
import Helper from "../../../../../reused/Help";
import { getHelpPath } from "./utils";

const HelpButton = () => {
  const step = useUnit($step);
  const path = getHelpPath(step)

  const onClick = (path: string) => () => {
    helpBtnClicked(path)
    modalOpened(<Helper path={path} />)
  }

  return step >= 5 ? null : (
    <button
      className="btn btn-circle btn-success text-2xl"
      onClick={onClick(path)}
    >
      ?
    </button>
  );
};

export default HelpButton;
