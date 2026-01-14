import { useUnit } from "effector-react";
import { useEffect } from "react";
import type { Bootstrap } from "../../schema/input";
import { $step } from "../../store/step";
import { $translate, getTranslateFx } from "../../../common/i18n/store";
import { FormProvider, useForm } from "react-hook-form";
import { formSchema } from "../../schema/output";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDefaults } from "./utils";
import Steps from "../Steps";
import Title from "../Title";
import Genres from "../Genres";
import StepControls from "../StepControls";
import Publish from "../Publish";
import Rules from "../Rules";
import Authors from "../Authors";
import Cover from "../Cover";
import { $memberId } from "../../../reused/Participants/store/authors";

type Props = {
  bootstrap: Bootstrap;
}

const Form = ({ bootstrap }: Props) => {
  const step = useUnit($step)
  const memberId = useUnit($memberId)
  const translate = useUnit($translate)
  const branchGenres = bootstrap?.branch_genres as number[];
  
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: getDefaults(bootstrap)
  });

  useEffect(() => {
    getTranslateFx(translate)
  }, [step, memberId])

  return (
    <FormProvider {...methods}>
        <Title />
        <Steps />
        {step === 1 ? <Genres genres={bootstrap?.total_genres || []} checked={branchGenres} /> : null}
        {step === 2 ? <Rules /> : null}
        {step === 3 ? <Authors bootstrap={bootstrap} /> : null}
        {step === 4 ? <Cover /> : null}
        {step === 5 ? <Publish /> : null}
        <StepControls step={step} />
    </FormProvider>
  )
}

export default Form
