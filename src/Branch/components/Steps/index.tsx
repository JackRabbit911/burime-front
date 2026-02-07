import Step from "./step";
import { t } from "common/i18n/utils";

const Steps = () => {
  return (
    <>
      <ul className="steps w-full sm:my-4 steps-vertical sm:steps-horizontal">
        <Step step={1} title={t("Genres")} />
        <Step step={2} title={t("Rules")} />
        <Step step={3} title={t("Participants")} />
        <Step step={4} title={t("Cover")} />
        <Step step={5} title={t("Publish")} />
      </ul>
    </>
  );
};

export default Steps;
