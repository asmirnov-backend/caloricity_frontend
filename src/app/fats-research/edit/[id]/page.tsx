"use client";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import useMutation from "../../../../api/useMutation";
import useSubmit from "../../../../api/useSubmit";
import { FatsResearchForm } from "../../interfaces/FatsResearchForm.interface";
import useQuery from "../../../../api/useQuery";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FatsResearchForm>();

  const { data, isLoading } = useQuery<FatsResearchForm>(
    params.id,
    "/fats-research"
  );

  const { trigger, isMutating } = useMutation<FatsResearchForm>(
    "/fats-research",
    { method: "PUT", id: params.id }
  );

  const onSubmit = useSubmit<FatsResearchForm>({
    trigger,
  });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Масса патрона до экстракции первая параллель, г"
          type="number"
          variant="bordered"
          {...register("patronMassBeforeExtractionParallelFirst", {
            value: data?.patronMassBeforeExtractionParallelFirst,
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
            value: data?.patronMassBeforeExtractionParallelSecond,
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
            value: data?.patronMassAfterExtractionParallelFirst,
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
            value: data?.patronMassAfterExtractionParallelSecond,
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
          Сохранить
        </Button>
        <Button color="danger" variant="flat" onClick={back}>
          Назад
        </Button>
      </div>
    </form>
  );
}
