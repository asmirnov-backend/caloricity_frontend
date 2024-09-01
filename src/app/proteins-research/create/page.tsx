"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import useSubmit from "../../../api/useSubmit";
import { useRouter, useSearchParams } from "next/navigation";
import { ProteinsResearchForm } from "../interfaces/ProteinsResearchForm.interface";
import useMutation from "../../../api/useMutation";

export default function Page() {
  const { back } = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProteinsResearchForm>();

  const { trigger, isMutating } =
    useMutation<ProteinsResearchForm>("/proteins-research");

  const onSubmit = useSubmit<ProteinsResearchForm>({
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
          label="Объём титранта первая параллель, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolumeParallelFirst", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.titrantVolumeParallelFirst ? true : false}
          errorMessage={formErrors.titrantVolumeParallelFirst?.message?.toString()}
        />
        <Input
          isRequired
          label="Объём титранта вторая параллель, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolumeParallelSecond", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.titrantVolumeParallelSecond ? true : false}
          errorMessage={formErrors.titrantVolumeParallelSecond?.message?.toString()}
        />
        <Input
          isRequired
          label="Объём контроля, г/см^3"
          type="number"
          variant="bordered"
          {...register("controlVolume", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.controlVolume ? true : false}
          errorMessage={formErrors.controlVolume?.message?.toString()}
        />
        <Input
          isRequired
          label="Коэффициент"
          type="number"
          variant="bordered"
          {...register("coefficient", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.coefficient ? true : false}
          errorMessage={formErrors.coefficient?.message?.toString()}
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
