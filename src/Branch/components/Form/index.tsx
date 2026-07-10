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
import { $ownAuthors } from "common/store/ownAuthors";

import type { BootstrapStore } from "Branch/schema/input";
import { useServerErrors } from "common/hook";

type Props = {
  bootstrap: BootstrapStore;
}

const Form = ({ bootstrap }: Props) => {
  const step = useUnit($step)
  const ownAuthors = useUnit($ownAuthors)
  const branchGenres = bootstrap?.branch_genres || [];

  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: getDefaults(bootstrap, ownAuthors)
  });

  const __ = useTranslate()
  useServerErrors(methods.setError)

  return (
    <FormProvider {...methods}>
      <Title __={__} />
      <Steps __={__} />
      {step === 1 && <Genres genres={bootstrap?.total_genres || []} checked={branchGenres} />}
      {step === 2 && <Rules __={__} />}
      {step === 3 && <Authors ownAuthors={ownAuthors} />}
      {step === 4 && <Cover />}
      {step === 5 && <Publish />}
      <StepControls step={step} __={__} />
    </FormProvider>
  )
}

export default Form
