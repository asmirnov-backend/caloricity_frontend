"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import useMutation from "../../../api/useMutation";
import useSubmit from "../../../api/useSubmit";
import { FatsResearchForm } from "../../../interfaces/FatsResearchForm.interface";
import useQuery from "../../../api/useQuery";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";

export default function Page() {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<FatsResearchForm>();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? null;

  const { data, isLoading } = useQuery<FatsResearchForm>(
    id,
    "/fats-researches",
  );

  const { trigger, isMutating } = useMutation<FatsResearchForm>(
    "/fats-researches",
    { method: "PUT", id: id },
  );

  const onSubmit = useSubmit<FatsResearchForm>({
    trigger,
  });

  if (isLoading) return <CustomLoader />;

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
          errorMessage={formErrors.patronMassBeforeExtractionParallelFirst?.message?.toString()}
          isInvalid={
            formErrors.patronMassBeforeExtractionParallelFirst ? true : false
          }
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
          errorMessage={formErrors.patronMassBeforeExtractionParallelSecond?.message?.toString()}
          isInvalid={
            formErrors.patronMassBeforeExtractionParallelSecond ? true : false
          }
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
          errorMessage={formErrors.patronMassAfterExtractionParallelFirst?.message?.toString()}
          isInvalid={
            formErrors.patronMassAfterExtractionParallelFirst ? true : false
          }
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
          errorMessage={formErrors.patronMassAfterExtractionParallelSecond?.message?.toString()}
          isInvalid={
            formErrors.patronMassAfterExtractionParallelSecond ? true : false
          }
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
