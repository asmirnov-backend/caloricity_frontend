import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useMutation from "../../../api/useMutation";
import useQuery from "../../../api/useQuery";
import useSubmit from "../../../api/useSubmit";
import { ProbeDto, ProbeForm } from "../../../interfaces/ProbeForm.interface";
import { ProbeTypeMap } from "../../../interfaces/ProbeType.enum";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";

export default function ProbeEditForm(input: { probeId: string }) {
  const { back } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeForm>();

  const { trigger, isMutating } = useMutation<ProbeForm>("/probes", {
    method: "PUT",
    id: input.probeId,
  });

  const { data, isLoading } = useQuery<ProbeDto>(input.probeId, "/probes");
  const onSubmit = useSubmit<ProbeForm>({ trigger });

  if (isLoading) return <CustomLoader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
        <Input
          isDisabled
          isRequired
          label="Тип"
          value={ProbeTypeMap[data?.type!]}
          variant="bordered"
        />
        <Input
          isRequired
          label="Код"
          type="string"
          variant="bordered"
          {...register("code", {
            value: data?.code,
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
            value: data?.name,
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
            value: data?.massTheory,
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
            value: data?.bankaWithProbeMass,
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
            value: data?.bankaEmptyMass,
            valueAsNumber: true,
          })}
          errorMessage={formErrors.bankaEmptyMass?.message?.toString()}
          isInvalid={formErrors.bankaEmptyMass ? true : false}
        />
        <Input
          isDisabled
          label="Масса фактическая, г"
          value={data?.massFact.toString()}
          variant="bordered"
        />
        <Input
          isDisabled
          label="Минеральные вещества, г"
          value={data?.minerals.toString()}
          variant="bordered"
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
