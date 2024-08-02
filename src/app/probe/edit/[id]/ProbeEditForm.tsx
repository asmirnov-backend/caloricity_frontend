import { Input, Button, CircularProgress } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useSubmit from "../../../../api/useSubmit";
import useProbeMutation from "../../api/useProbeMutation";
import useProbeQuery from "../../api/useProbeQuery";
import { ProbeForm } from "../../interfaces/ProbeForm.interface";
import { ProbeTypeMap } from "../../ProbeType.enum";

export default function ProbeEditForm(input: { probeId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeForm>();

  const { trigger, isMutating } = useProbeMutation({
    method: "PUT",
    id: input.probeId,
  });

  const { data, isLoading } = useProbeQuery(input.probeId);
  const onSubmit = useSubmit<ProbeForm>({ trigger, backTo: ".." });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isRequired
          isDisabled
          label="Тип"
          variant="bordered"
          value={ProbeTypeMap[data?.type!]}
        ></Input>
        <Input
          label="Код"
          type="string"
          isRequired
          variant="bordered"
          {...register("code", {
            value: data?.code,
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.code ? true : false}
          errorMessage={formErrors.code?.message?.toString()}
        />
        <Input
          label="Название"
          variant="bordered"
          isRequired
          {...register("name", {
            value: data?.name,
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
            value: data?.massTheory ?? undefined,
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
            value: data?.massFact,
            valueAsNumber: true,
          })}
          isInvalid={formErrors.massFact ? true : false}
          errorMessage={formErrors.massFact?.message?.toString()}
        />
        <Button color="primary" disabled={isMutating} type="submit">
          Сохранить
        </Button>
        <Button
          color="danger"
          disabled={isMutating}
          variant="flat"
          as={Link}
          href=".."
        >
          Назад
        </Button>
      </div>
    </form>
  );
}
