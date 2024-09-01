"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import useSubmit from "../../../api/useSubmit";
import { useRouter, useSearchParams } from "next/navigation";
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
    "/carbohydrates-research"
  );

  const onSubmit = useSubmit<CarbohydratesResearchForm>({
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
          label="Масса бюксы первая параллель, г"
          type="number"
          variant="bordered"
          {...register("byuksaParallelFirst", {
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
          {...register("byuksaAfterDryingParallelFirst", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.byuksaAfterDryingParallelFirst ? true : false}
          errorMessage={formErrors.byuksaAfterDryingParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса банки c пробой, г"
          type="number"
          variant="bordered"
          {...register("byuksaAfterDryingParallelSecond", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.byuksaAfterDryingParallelSecond ? true : false}
          errorMessage={formErrors.byuksaAfterDryingParallelSecond?.message?.toString()}
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
