"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useSubmit from "../../../api/useSubmit";
import useProbeMutation from "../api/useProbeMutation";
import { ProbeForm } from "../interfaces/ProbeForm.interface";
import { ProbeTypeMap } from "../ProbeType.enum";
import { useRouter } from "next/navigation";

export default function Page() {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeForm>();

  const { trigger, isMutating } = useProbeMutation({
    method: "POST",
  });

  const onSubmit = useSubmit<ProbeForm>({ trigger });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Select
          isRequired
          label="Тип"
          variant="bordered"
          {...register("type", {
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.type ? true : false}
          errorMessage={formErrors.type?.message?.toString()}
        >
          {Object.entries(ProbeTypeMap).map((e) => (
            <SelectItem key={e[0]}>{e[1]}</SelectItem>
          ))}
        </Select>
        <Input
          label="Код"
          type="string"
          variant="bordered"
          isRequired
          {...register("code", {
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.code ? true : false}
          errorMessage={formErrors.code?.message?.toString()}
        />
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
          label="Масса теоритическая, г"
          variant="bordered"
          {...register("massTheory", {
            valueAsNumber: true,
          })}
          isInvalid={formErrors.massTheory ? true : false}
          errorMessage={formErrors.massTheory?.message?.toString()}
        />
        <Input
          isRequired
          label="Масса фактическая, г"
          variant="bordered"
          {...register("massFact", {
            required: "Поле обязательно",
            valueAsNumber: true,
          })}
          isInvalid={formErrors.massFact ? true : false}
          errorMessage={formErrors.massFact?.message?.toString()}
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
