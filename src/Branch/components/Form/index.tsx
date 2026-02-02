import { useEffect } from "react";
import { useUnit } from "effector-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import Steps from "../Steps";
import Title from "../Title";
import Rules from "../Rules";
import Cover from "../Cover";
import Genres from "../Genres";
import Publish from "../Publish";
import Authors from "../Authors";
import { getDefaults } from "./utils";
import { $step } from "Branch/store/step";
import StepControls from "../StepControls";
import { formSchema } from "Branch/schema/output";
import { $memberId } from "reused/Participants/store/authors";
import { $translate, getTranslateFx } from "common/i18n/store";

import type { Bootstrap } from "Branch/schema/input";

type Props = {
  bootstrap: Bootstrap;
}

const Form = ({ bootstrap }: Props) => {
  const step = useUnit($step)
  const memberId = useUnit($memberId)
  const translate = useUnit($translate)
  const branchGenres = bootstrap?.branch_genres || [];
  
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
