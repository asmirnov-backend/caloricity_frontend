"use client";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import useMutation from "../../../../api/useMutation";
import useSubmit from "../../../../api/useSubmit";
import { DrySubstanceResearchForm } from "../../interfaces/DrySubstanceResearchForm.interface";
import useQuery from "../../../../api/useQuery";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<DrySubstanceResearchForm>();

  const { data, isLoading } = useQuery<DrySubstanceResearchForm>(
    params.id,
    "/dry-substances-research"
  );

  const { trigger, isMutating } = useMutation<DrySubstanceResearchForm>(
    "/dry-substances-research",
    { method: "PUT", id: params.id }
  );

  const onSubmit = useSubmit<DrySubstanceResearchForm>({
    trigger,
  });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Масса бюксы первая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaParallelFirst", {
            value: data?.byuksaParallelFirst,
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.byuksaParallelFirst ? true : false}
          errorMessage={formErrors.byuksaParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса бюксы вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaParallelSecond", {
            value: data?.byuksaParallelSecond,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.byuksaParallelSecond ? true : false}
          errorMessage={formErrors.byuksaParallelSecond?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса пустой банки, г"
          type="number"
          variant="bordered"
          {...register("bankaEmptyMass", {
            value: data?.bankaEmptyMass,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.bankaEmptyMass ? true : false}
          errorMessage={formErrors.bankaEmptyMass?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса банки c пробой, г"
          type="number"
          variant="bordered"
          {...register("bankaWithProbeMass", {
            value: data?.bankaWithProbeMass,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.bankaWithProbeMass ? true : false}
          errorMessage={formErrors.bankaWithProbeMass?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса навески, г"
          type="number"
          variant="bordered"
          {...register("mass", {
            value: data?.mass,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.mass ? true : false}
          errorMessage={formErrors.mass?.message?.toString()}
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Сохранить
        </Button>
        <Button color="danger" variant="flat" onClick={back}>
          Назад
        </Button>
      </div>
    </form>
  );
}
