import useSWR from "swr";
import { backendUrl } from "../utils/backendUrl.const";

export default function useQuery<Form>(id: string, url: string) {
  return useSWR<Form>(
    `${backendUrl}${url}/${id}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {}
  );
}
