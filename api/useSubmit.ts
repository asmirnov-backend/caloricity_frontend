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
      const json = await res.json();
      const errorText = "title" in json ? json.title : "Ошибка";

      enqueueSnackbar(errorText, { variant: "error" });
      console.error(json?.detail ?? json);
    }
  };
}
