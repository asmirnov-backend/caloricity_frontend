"use client";

import {
  Input,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { ProbeIngredientForm } from "../interfaces/IngredientForm.interface";
import useSubmit from "../../../api/useSubmit";
import useMutation from "../../../api/useMutation";
import usePageQuery from "../../../api/usePageQuery";

export default function Page() {
  const searchParams = useSearchParams();
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeIngredientForm>();

  const { data, isLoading } = usePageQuery("/ingredients", {
    page: 1,
    rowsPerPage: 1000,
  });

  const { trigger, isMutating } =
    useMutation<ProbeIngredientForm>("/probe-ingredient");

  const onSubmit = useSubmit<ProbeIngredientForm>({
    trigger,
  });

  const [valueAutocomplete, setValueAutocomplete] = useState<string>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isDisabled
          isRequired
          readOnly
          label="Идентификатор пробы"
          variant="bordered"
          {...register("probeId", {
            required: "Поле обязательно",
            value: searchParams!.get("probe") ?? undefined,
          })}
          errorMessage={formErrors.probeId?.message?.toString()}
          isInvalid={formErrors.probeId ? true : false}
        />
        <Autocomplete
          isRequired
          defaultItems={data?.content ?? []}
          isDisabled={isLoading}
          label="Ингредиент из католога"
          selectedKey={valueAutocomplete}
          variant="bordered"
          onSelectionChange={(e) =>
            setValueAutocomplete(e?.toString() ?? undefined)
          }
          {...register("ingredientId", {
            required: "Поле обязательно",
            value: valueAutocomplete ?? undefined,
            setValueAs: (_) => valueAutocomplete,
          })}
          errorMessage={formErrors.ingredientId?.message?.toString()}
          isInvalid={formErrors.ingredientId ? true : false}
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
          errorMessage={formErrors.gross?.message?.toString()}
          isInvalid={formErrors.gross ? true : false}
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
          errorMessage={formErrors.net?.message?.toString()}
          isInvalid={formErrors.net ? true : false}
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
