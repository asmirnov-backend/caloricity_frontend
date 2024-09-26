"use client";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { IngredientForm } from "../../interfaces/IngredientForm.interface";
import useSubmit from "../../../../api/useSubmit";
import { useRouter } from "next/navigation";
import useMutation from "../../../../api/useMutation";
import useQuery from "../../../../api/useQuery";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { back } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IngredientForm>();

  const { trigger, isMutating } = useMutation<IngredientForm>("/ingredients", {
    method: "PUT",
    id,
  });

  const { data, isLoading } = useQuery<IngredientForm>(id, "/ingredients");
  const onSubmit = useSubmit<IngredientForm>({ trigger });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Название"
          variant="bordered"
          {...register("name", {
            value: data?.name,
            required: "Поле обязательно",
            minLength: { value: 2, message: "Слишком короткое название" },
          })}
          isInvalid={formErrors.name ? true : false}
          errorMessage={formErrors.name?.message?.toString()}
        />
        <Input
          isRequired
          label="Съедобная часть, доля"
          type="number"
          variant="bordered"
          {...register("ediblePart", {
            valueAsNumber: true,
            value: data?.ediblePart,
            min: { value: 0, message: "Доля не может быть меньше нуля" },
            max: { value: 1, message: "Доля не может быть больше единицы" },
          })}
          isInvalid={formErrors.ediblePart ? true : false}
          errorMessage={formErrors.ediblePart?.message?.toString()}
        />
        <Input
          isRequired
          label="Вода, г"
          type="number"
          variant="bordered"
          {...register("water", {
            valueAsNumber: true,
            value: data?.water,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.water ? true : false}
          errorMessage={formErrors.water?.message?.toString()}
        />
        <Input
          isRequired
          label="Белки, г"
          type="number"
          variant="bordered"
          {...register("proteins", {
            valueAsNumber: true,
            value: data?.proteins,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.proteins ? true : false}
          errorMessage={formErrors.proteins?.message?.toString()}
        />
        <Input
          isRequired
          label="Жиры, г"
          type="number"
          variant="bordered"
          {...register("fats", {
            valueAsNumber: true,
            value: data?.fats,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.fats ? true : false}
          errorMessage={formErrors.fats?.message?.toString()}
        />
        <Input
          isRequired
          label="Углеводы, г"
          type="number"
          variant="bordered"
          {...register("carbohydrates", {
            value: data?.carbohydrates,
            valueAsNumber: true,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.carbohydrates ? true : false}
          errorMessage={formErrors.carbohydrates?.message?.toString()}
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Сохранить
        </Button>
        <Button
          color="danger"
          disabled={isMutating}
          variant="flat"
          onClick={back}
        >
          Назад
        </Button>
      </div>
    </form>
  );
}
