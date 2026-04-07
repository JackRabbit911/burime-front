import PrevButton from "./components/PrevButton";
import NextButton from "./components/NextButton";
import HelpButton from "./components/HelpButton";
import FinalControls from "./components/FinalControls";
import type { GetText } from "common/i18n/types";

type Props = {
  step: number;
  __: GetText;
}

const StepControls = ({ step, __ }: Props) => (
  <div className="flex flex-row justify-between mt-4">
    <PrevButton step={step} __={__} />
    <HelpButton step={step} />
    <NextButton step={step} __={__} />
    <FinalControls step={step} __={__} />
  </div>
);

export default StepControls;
