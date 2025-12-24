import PrevButton from "./components/PrevButton";
import NextButton from "./components/NextButton";
import HelpButton from "./components/HelpButton";
import FinalControls from "./components/FinalControls";

type Props = {
  step: number;
}

const StepControls = ({ step }: Props) => (
  <div className="flex flex-row justify-between mt-4">
    <PrevButton step={step}/>
    <HelpButton step={step} />
    <NextButton step={step}/>
    <FinalControls step={step}/>
  </div>
);

export default StepControls;
