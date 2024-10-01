import useSWR from "swr";

import { backendUrl } from "../utils/backendUrl.const";

export default function useQuery<Form>(id: string | null, url: string) {
  return useSWR<Form>(
    id ? `${backendUrl}${url}/${id}` : null,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {},
  );
}
