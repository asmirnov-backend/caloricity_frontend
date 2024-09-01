"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import useSubmit from "../../../api/useSubmit";
import { useRouter, useSearchParams } from "next/navigation";
import { FatsResearchForm } from "../interfaces/FatsResearchForm.interface";
import useMutation from "../../../api/useMutation";

export default function Page() {
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FatsResearchForm>();

  const { trigger, isMutating } =
    useMutation<FatsResearchForm>("/fats-research");

  const onSubmit = useSubmit<FatsResearchForm>({
    trigger,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          readOnly
          isDisabled
          label="Идентификатор пробы"
          variant="bordered"
          {...register("probeId", {
            required: "Поле обязательно",
            value: searchParams!.get("probe-id") ?? undefined,
          })}
          isInvalid={formErrors.probeId ? true : false}
          errorMessage={formErrors.probeId?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса патрона до экстракции первая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassBeforeExtractionParallelFirst", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={
            formErrors.patronMassBeforeExtractionParallelFirst ? true : false
          }
          errorMessage={formErrors.patronMassBeforeExtractionParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса патрона до экстракции вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassBeforeExtractionParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={
            formErrors.patronMassBeforeExtractionParallelSecond ? true : false
          }
          errorMessage={formErrors.patronMassBeforeExtractionParallelSecond?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса патрона после экстракции первая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassAfterExtractionParallelFirst", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={
            formErrors.patronMassAfterExtractionParallelFirst ? true : false
          }
          errorMessage={formErrors.patronMassAfterExtractionParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса патрона после экстракции вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassAfterExtractionParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={
            formErrors.patronMassAfterExtractionParallelSecond ? true : false
          }
          errorMessage={formErrors.patronMassAfterExtractionParallelSecond?.message?.toString()}
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Создать
        </Button>
        <Button color="danger" variant="flat" onClick={back}>
          Назад
        </Button>
      </div>
    </form>
  );
}
