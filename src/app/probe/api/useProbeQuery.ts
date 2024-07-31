import { backendUrl } from "../../../utils/backendUrl.const";
import { ProbeForm } from "../interfaces/ProbeForm.interface";
import useSWR from "swr";

export default function useProbeQuery(id: string) {
  return useSWR<ProbeForm>(
    `${backendUrl}/caloricity/probe/${id}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {}
  );
}
