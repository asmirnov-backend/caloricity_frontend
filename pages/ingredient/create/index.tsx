"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { IngredientForm } from "../../../interfaces/IngredientForm.interface";
import useSubmit from "../../../api/useSubmit";
import useMutation from "../../../api/useMutation";

export default function Page() {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IngredientForm>();

  const { trigger, isMutating } = useMutation<IngredientForm>("/ingredients");

  const onSubmit = useSubmit<IngredientForm>({ trigger });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          label="Название"
          variant="bordered"
          {...register("name", {
            required: "Поле обязательно",
            minLength: { value: 2, message: "Слишком короткое название" },
          })}
          errorMessage={formErrors.name?.message?.toString()}
          isInvalid={formErrors.name ? true : false}
        />
        <Input
          isRequired
          label="Съедобная часть, доля"
          type="number"
          variant="bordered"
          {...register("ediblePart", {
            min: { value: 0, message: "Доля не может быть меньше нуля" },
            max: { value: 1, message: "Доля не может быть больше единицы" },
            required: "Поле обязательно",
          })}
          errorMessage={formErrors.ediblePart?.message?.toString()}
          isInvalid={formErrors.ediblePart ? true : false}
        />
        <Input
          isRequired
          label="Вода, г"
          type="number"
          variant="bordered"
          {...register("water", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          errorMessage={formErrors.water?.message?.toString()}
          isInvalid={formErrors.water ? true : false}
        />
        <Input
          isRequired
          label="Белки, г"
          type="number"
          variant="bordered"
          {...register("proteins", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          errorMessage={formErrors.proteins?.message?.toString()}
          isInvalid={formErrors.proteins ? true : false}
        />
        <Input
          isRequired
          label="Жиры, г"
          type="number"
          variant="bordered"
          {...register("fats", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          errorMessage={formErrors.fats?.message?.toString()}
          isInvalid={formErrors.fats ? true : false}
        />
        <Input
          isRequired
          label="Углеводы, г"
          type="number"
          variant="bordered"
          {...register("carbohydrates", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          errorMessage={formErrors.carbohydrates?.message?.toString()}
          isInvalid={formErrors.carbohydrates ? true : false}
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
