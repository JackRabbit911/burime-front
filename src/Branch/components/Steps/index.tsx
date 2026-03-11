import Step from "./step";
import type { GetTextProp } from "common/i18n/types";

const Steps = ({ __ }: GetTextProp) => {
  return (
    <>
      <ul className="steps w-full sm:my-4 steps-vertical sm:steps-horizontal">
        <Step step={1} title={__("Genres")} />
        <Step step={2} title={__("Rules")} />
        <Step step={3} title={__("Participants")} />
        <Step step={4} title={__("Cover")} />
        <Step step={5} title={__("Publish")} />
      </ul>
    </>
  );
};

export default Steps;
