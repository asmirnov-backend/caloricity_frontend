"use client";
import useSWRMutation from "swr/mutation";

import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSnackbar } from "notistack";
import useSWR from "swr";

async function sendRequest(
  url: string,
  { arg }: { arg: IngredientCatalogForm }
) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: {
      "content-type": "application/json",
    },
  });
}

interface IngredientCatalogForm {
  name: string;
  ediblePart: number;
  water: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IngredientCatalogForm>();
  const { enqueueSnackbar } = useSnackbar();

  const { trigger, isMutating } = useSWRMutation(
    `http://localhost:8080/api/caloricity/ingredient-catalog/${id}`,
    sendRequest
  );
  const { data, isLoading } = useSWR<IngredientCatalogForm>(
    `http://localhost:8080/api/caloricity/ingredient-catalog/${id}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {}
  );

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  const onSubmit = async (params: IngredientCatalogForm) => {
    const res = await trigger(params);
    if (res.ok) {
      enqueueSnackbar("Успешно", { variant: "success" });
    } else {
      enqueueSnackbar("Ошибка", { variant: "error" });
      console.log(await res.json());
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
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
          label="Съедобная часть, г"
          type="number"
          variant="bordered"
          {...register("ediblePart", {
            valueAsNumber: true,
            value: data?.ediblePart,
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.ediblePart ? true : false}
          errorMessage={formErrors.ediblePart?.message?.toString()}
        />
        <Input
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
        <Button color="danger" variant="flat" as={Link} href="..">
          Назад
        </Button>
      </div>
    </form>
  );
}
