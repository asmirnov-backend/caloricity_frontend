"use client";

import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useSubmit from "../../../api/useSubmit";
import useProbeMutation from "../api/useProbeMutation";
import { ProbeForm } from "../interfaces/ProbeForm.interface";

export default function Page() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeForm>();

  const { trigger, isMutating } = useProbeMutation({
    method: "POST",
  });

  const onSubmit = useSubmit<ProbeForm>({ trigger, reset });

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
          {[
            { key: "FIRST", label: "Первое" },
            { key: "SECOND", label: "Второе" },
            { key: "THIRD", label: "Третье" },
          ].map((e) => (
            <SelectItem key={e.key}>{e.label}</SelectItem>
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
