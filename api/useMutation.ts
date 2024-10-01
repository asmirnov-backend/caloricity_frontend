import useSWRMutation from "swr/mutation";

import { backendUrl } from "../utils/backendUrl.const";

export default function useMutation<Form>(
  url: string,
  options:
    | {
        method: "POST";
      }
    | { method: "PUT"; id: string | null } = { method: "POST" },
) {
  const add = options.method == "PUT" ? "/" + options.id : "";
  let urlForRequest: string | null;

  if (options.method == "PUT" && options.id === null) {
    urlForRequest = null;
  } else {
    urlForRequest = `${backendUrl}${url}` + add;
  }

  return useSWRMutation(
    urlForRequest,
    (urlForFetch: string, { arg }: { arg: Form }) =>
      fetch(urlForFetch, {
        method: options.method,
        body: JSON.stringify(arg),
        headers: {
          "content-type": "application/json",
        },
      }),
  );
}
