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
import { useTranslate } from "common/i18n/hooks";
import { formSchema } from "Branch/schema/output";

import type { Bootstrap } from "Branch/schema/input";
import CSRF from "reused/CSRF";

type Props = {
  bootstrap: Bootstrap;
}

const Form = ({ bootstrap }: Props) => {
  const step = useUnit($step)
  const branchGenres = bootstrap?.branch_genres || [];

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: getDefaults(bootstrap)
  });

  const __ = useTranslate()

  return (
    <FormProvider {...methods}>
      <CSRF />
      <Title __={__} />
      <Steps __={__} />
      <Genres step={step} genres={bootstrap?.total_genres || []} checked={branchGenres} />
      <Rules step={step} __={__} />
      {step === 3 ? <Authors bootstrap={bootstrap} /> : null}
      {step === 4 ? <Cover /> : null}
      {step === 5 ? <Publish /> : null}
      <StepControls step={step} />
    </FormProvider>
  )
}

export default Form
