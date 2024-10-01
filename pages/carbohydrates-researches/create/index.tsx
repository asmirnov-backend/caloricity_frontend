"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import useSubmit from "../../../api/useSubmit";
import { CarbohydratesResearchForm } from "../interfaces/CarbohydratesResearchForm.interface";
import useMutation from "../../../api/useMutation";

export default function Page() {
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CarbohydratesResearchForm>();

  const { trigger, isMutating } = useMutation<CarbohydratesResearchForm>(
    "/carbohydrates-researches",
  );

  const onSubmit = useSubmit<CarbohydratesResearchForm>({
    trigger,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isDisabled
          isRequired
          readOnly
          label="Идентификатор пробы"
          variant="bordered"
          {...register("probeId", {
            required: "Поле обязательно",
            value: searchParams!.get("probe-id") ?? undefined,
          })}
          errorMessage={formErrors.probeId?.message?.toString()}
          isInvalid={formErrors.probeId ? true : false}
        />
        <Input
          isRequired
          label="Масса бюксы первая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaParallelFirst", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.byuksaParallelFirst?.message?.toString()}
          isInvalid={formErrors.byuksaParallelFirst ? true : false}
        />
        <Input
          isRequired
          label="Масса бюксы вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.byuksaParallelSecond?.message?.toString()}
          isInvalid={formErrors.byuksaParallelSecond ? true : false}
        />
        <Input
          isRequired
          label="Масса бюксы с пробой после высушивания первая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaAfterDryingParallelFirst", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.byuksaAfterDryingParallelFirst?.message?.toString()}
          isInvalid={formErrors.byuksaAfterDryingParallelFirst ? true : false}
        />
        <Input
          isRequired
          label="Масса бюксы с пробой после высушивания вторая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaAfterDryingParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.byuksaAfterDryingParallelSecond?.message?.toString()}
          isInvalid={formErrors.byuksaAfterDryingParallelSecond ? true : false}
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
