"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import useMutation from "../../../api/useMutation";
import useSubmit from "../../../api/useSubmit";
import { DrySubstanceResearchForm } from "../../../interfaces/DrySubstanceResearchForm.interface";
import useQuery from "../../../api/useQuery";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";

export default function Page() {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<DrySubstanceResearchForm>();

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? null;

  const { data, isLoading } = useQuery<DrySubstanceResearchForm>(
    id,
    "/dry-substances-researches",
  );

  const { trigger, isMutating } = useMutation<DrySubstanceResearchForm>(
    "/dry-substances-researches",
    { method: "PUT", id: id },
  );

  const onSubmit = useSubmit<DrySubstanceResearchForm>({
    trigger,
  });

  if (isLoading) return <CustomLoader />;

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
          errorMessage={formErrors.byuksaParallelFirst?.message?.toString()}
          isInvalid={formErrors.byuksaParallelFirst ? true : false}
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
            value: data?.byuksaAfterDryingParallelFirst,
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
            value: data?.byuksaAfterDryingParallelSecond,
            valueAsNumber: true,
          })}
          errorMessage={formErrors.byuksaAfterDryingParallelSecond?.message?.toString()}
          isInvalid={formErrors.byuksaAfterDryingParallelSecond ? true : false}
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
