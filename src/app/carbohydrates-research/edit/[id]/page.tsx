"use client";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import useMutation from "../../../../api/useMutation";
import useSubmit from "../../../../api/useSubmit";
import { CarbohydratesResearchForm } from "../../interfaces/CarbohydratesResearchForm.interface";
import useQuery from "../../../../api/useQuery";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CarbohydratesResearchForm>();

  const { data, isLoading } = useQuery<CarbohydratesResearchForm>(
    params.id,
    "/carbohydrates-research"
  );

  const { trigger, isMutating } = useMutation<CarbohydratesResearchForm>(
    "/carbohydrates-research",
    { method: "PUT", id: params.id }
  );

  const onSubmit = useSubmit<CarbohydratesResearchForm>({
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
          label="Масса бюксы с пробой после высушивания первая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaAfterDryingParallelFirst", {
            value: data?.byuksaAfterDryingParallelFirst,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.byuksaAfterDryingParallelFirst ? true : false}
          errorMessage={formErrors.byuksaAfterDryingParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса бюксы с пробой после высушивания вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaAfterDryingParallelSecond", {
            value: data?.byuksaAfterDryingParallelSecond,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.byuksaAfterDryingParallelSecond ? true : false}
          errorMessage={formErrors.byuksaAfterDryingParallelSecond?.message?.toString()}
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
