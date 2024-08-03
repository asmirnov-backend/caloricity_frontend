import useSWRMutation from "swr/mutation";
import { backendUrl } from "../utils/backendUrl.const";

export default function useMutation<Form>(
  url: string,
  options:
    | {
        method: "POST";
      }
    | { method: "PUT"; id: string } = { method: "POST" }
) {
  const add = options.method == "PUT" ? "" + options.id : "";

  return useSWRMutation(
    `${backendUrl}${url}` + add,
    (urlForFetch: string, { arg }: { arg: Form }) =>
      fetch(urlForFetch, {
        method: options.method,
        body: JSON.stringify(arg),
        headers: {
          "content-type": "application/json",
        },
      })
  );
}
