import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { FieldValues } from "react-hook-form";
import { TriggerWithArgs } from "swr/mutation";

export default function useSubmit<T extends FieldValues>(input: {
  trigger: TriggerWithArgs<Response, any, string, T>;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { back } = useRouter();

  return async (params: T) => {
    const res = await input.trigger(params);
    if (res.ok) {
      enqueueSnackbar("Успешно", { variant: "success" });
      setTimeout(back, 1000);
    } else {
      enqueueSnackbar("Ошибка", { variant: "error" });
      console.log(await res.json());
    }
  };
}
