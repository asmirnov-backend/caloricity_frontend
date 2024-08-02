import useSWRMutation from "swr/mutation";
import { ProbeForm } from "../interfaces/ProbeForm.interface";
import { backendUrl } from "../../../utils/backendUrl.const";

export default function useProbeMutation(
  input:
    | {
        method: "POST";
      }
    | { method: "PUT"; id: string }
) {
  const add = input.method == "PUT" ? "/" + input.id : "";

  return useSWRMutation(
    `${backendUrl}/probe` + add,
    (url: string, { arg }: { arg: ProbeForm }) =>
      fetch(url, {
        method: input.method,
        body: JSON.stringify(arg),
        headers: {
          "content-type": "application/json",
        },
      })
  );
}
