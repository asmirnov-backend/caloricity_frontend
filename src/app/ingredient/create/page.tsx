"use client";

import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { IngredientForm } from "../interfaces/IngredientForm.interface";
import useSubmit from "../../../api/useSubmit";
import useIngredientMutation from "../api/useIngredientMutation";
import { useSearchParams } from "next/navigation";
import useIngredientCatalogPageQuery from "../../ingredient-catalog/api/useIngredientCatalogPageQuery";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const backLink = "/probe/edit/" + searchParams!.get("probe") ?? "/";
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IngredientForm>();

  const { data, isLoading } = useIngredientCatalogPageQuery({
    page: 1,
    rowsPerPage: 1000,
  });

  const { trigger, isMutating } = useIngredientMutation();

  const onSubmit = useSubmit<IngredientForm>({
    trigger,
    backTo: backLink,
  });

  const [valueAutocomplete, setValueAutocomplete] = useState<string>();

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
            value: searchParams!.get("probe") ?? undefined,
          })}
          isInvalid={formErrors.probeId ? true : false}
          errorMessage={formErrors.probeId?.message?.toString()}
        />
        <Autocomplete
          isRequired
          variant="bordered"
          defaultItems={data?.content ?? []}
          label="Ингредиент из католога"
          selectedKey={valueAutocomplete}
          onSelectionChange={(e) =>
            setValueAutocomplete(e?.toString() ?? undefined)
          }
          {...register("ingredientInCatalogId", {
            required: "Поле обязательно",
            value: valueAutocomplete ?? undefined,
            setValueAs: (_) => valueAutocomplete,
          })}
          isInvalid={formErrors.ingredientInCatalogId ? true : false}
          errorMessage={formErrors.ingredientInCatalogId?.message?.toString()}
        >
          {(e: any) => (
            <AutocompleteItem key={e.value}>{e.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <Input
          isRequired
          label="Масса брутто, г"
          type="number"
          variant="bordered"
          {...register("gross", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          isInvalid={formErrors.gross ? true : false}
          errorMessage={formErrors.gross?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса нетто, г"
          type="number"
          variant="bordered"
          {...register("net", {
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.net ? true : false}
          errorMessage={formErrors.net?.message?.toString()}
        />

        <Button color="primary" disabled={isMutating} type="submit">
          Создать
        </Button>
        <Button color="danger" variant="flat" as={Link} href={backLink}>
          Назад
        </Button>
      </div>
    </form>
  );
}
