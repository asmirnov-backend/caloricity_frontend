"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useSubmit from "../../../api/useSubmit";
import { ProbeForm } from "../interfaces/ProbeForm.interface";
import { ProbeTypeMap } from "../ProbeType.enum";
import useMutation from "../../../api/useMutation";

export default function Page() {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeForm>();

  const { trigger, isMutating } = useMutation<ProbeForm>("/probes");

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
          errorMessage={formErrors.type?.message?.toString()}
          isInvalid={formErrors.type ? true : false}
        >
          {Object.entries(ProbeTypeMap).map((e) => (
            <SelectItem key={e[0]}>{e[1]}</SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          label="Код"
          type="string"
          variant="bordered"
          {...register("code", {
            required: "Поле обязательно",
          })}
          errorMessage={formErrors.code?.message?.toString()}
          isInvalid={formErrors.code ? true : false}
        />
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
          label="Масса теоритическая, г"
          variant="bordered"
          {...register("massTheory", {
            valueAsNumber: true,
          })}
          errorMessage={formErrors.massTheory?.message?.toString()}
          isInvalid={formErrors.massTheory ? true : false}
        />
        <Input
          isRequired
          label="Масса банки с пробой, г"
          variant="bordered"
          {...register("bankaWithProbeMass", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.bankaWithProbeMass?.message?.toString()}
          isInvalid={formErrors.bankaWithProbeMass ? true : false}
        />
        <Input
          isRequired
          label="Масса пустой банки, г"
          variant="bordered"
          {...register("bankaEmptyMass", {
            required: "Поле обязательно",
            min: { value: 0, message: "Масса не может быть меньше нуля" },
            valueAsNumber: true,
          })}
          errorMessage={formErrors.bankaEmptyMass?.message?.toString()}
          isInvalid={formErrors.bankaEmptyMass ? true : false}
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
