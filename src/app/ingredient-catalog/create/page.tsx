"use client";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IngredientCatalogForm } from "../interfaces/IngredientCatalogForm.interface";
import useIngredientCatalogMutation from "../api/useIngredientCatalogMutation";
import useSubmit from "../../../api/useSubmit";

export default function Page() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IngredientCatalogForm>();

  const { trigger, isMutating } = useIngredientCatalogMutation({
    method: "POST",
  });

  const onSubmit = useSubmit<IngredientCatalogForm>({ trigger, reset });

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
          isInvalid={formErrors.name ? true : false}
          errorMessage={formErrors.name?.message?.toString()}
        />
        <Input
          isRequired
          label="Съедобная часть, г"
          type="number"
          variant="bordered"
          {...register("ediblePart", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
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
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.carbohydrates ? true : false}
          errorMessage={formErrors.carbohydrates?.message?.toString()}
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Создать
        </Button>
        <Button color="danger" variant="flat" as={Link} href=".">
          Назад
        </Button>
      </div>
    </form>
  );
}
