"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import useMutation from "../../../../api/useMutation";
import useSubmit from "../../../../api/useSubmit";
import { ProteinsResearchForm } from "../../../../interfaces/ProteinsResearchForm.interface";
import useQuery from "../../../../api/useQuery";
import CustomLoader from "../../../../components/CustomLoader/CustomLoader";

export default function Page() {
  const { back, query } = useRouter();
  const { id } = query as { id: string };
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProteinsResearchForm>();

  const { data, isLoading } = useQuery<ProteinsResearchForm>(
    id,
    "/proteins-researches",
  );

  const { trigger, isMutating } = useMutation<ProteinsResearchForm>(
    "/proteins-researches",
    { method: "PUT", id: id },
  );

  const onSubmit = useSubmit<ProteinsResearchForm>({
    trigger,
  });

  if (isLoading) return <CustomLoader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Объём титранта первая параллель, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolumeParallelFirst", {
            value: data?.titrantVolumeParallelFirst,
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.titrantVolumeParallelFirst?.message?.toString()}
          isInvalid={formErrors.titrantVolumeParallelFirst ? true : false}
        />
        <Input
          isRequired
          label="Объём титранта вторая параллель, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolumeParallelSecond", {
            value: data?.titrantVolumeParallelSecond,
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.titrantVolumeParallelSecond?.message?.toString()}
          isInvalid={formErrors.titrantVolumeParallelSecond ? true : false}
        />
        <Input
          isRequired
          label="Объём контроля, г/см^3"
          type="number"
          variant="bordered"
          {...register("controlVolume", {
            value: data?.controlVolume,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.controlVolume?.message?.toString()}
          isInvalid={formErrors.controlVolume ? true : false}
        />
        <Input
          isRequired
          label="Коэффициент"
          type="number"
          variant="bordered"
          {...register("coefficient", {
            value: data?.coefficient,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          errorMessage={formErrors.coefficient?.message?.toString()}
          isInvalid={formErrors.coefficient ? true : false}
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
