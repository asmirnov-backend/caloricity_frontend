"use client";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import useMutation from "../../../../api/useMutation";
import useSubmit from "../../../../api/useSubmit";
import { ProteinsResearchForm } from "../../interfaces/ProteinsResearchForm.interface";
import useQuery from "../../../../api/useQuery";

export default function Page({ params }: { params: { id: string } }) {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProteinsResearchForm>();

  const { data, isLoading } = useQuery<ProteinsResearchForm>(
    params.id,
    "/proteins-research"
  );

  const { trigger, isMutating } = useMutation<ProteinsResearchForm>(
    "/proteins-research",
    { method: "PUT", id: params.id }
  );

  const onSubmit = useSubmit<ProteinsResearchForm>({
    trigger,
  });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Объём титранта, г/см^3"
          type="number"
          variant="bordered"
          {...register("titrantVolume", {
            value: data?.titrantVolume,
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.titrantVolume ? true : false}
          errorMessage={formErrors.titrantVolume?.message?.toString()}
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
          isInvalid={formErrors.controlVolume ? true : false}
          errorMessage={formErrors.controlVolume?.message?.toString()}
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
          isInvalid={formErrors.coefficient ? true : false}
          errorMessage={formErrors.coefficient?.message?.toString()}
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
