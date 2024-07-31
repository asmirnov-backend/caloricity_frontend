import useSWR from "swr";
import { backendUrl } from "../../../utils/backendUrl.const";

export default function useIngredientPageQuery(input: {
  page: number;
  rowsPerPage: number;
  probe_id: string;
}) {
  return useSWR(
    `${backendUrl}/caloricity/ingredient?page=${input.page - 1}&size=${
      input.rowsPerPage
    }&sort=updatedAt,desc&probe-id=${input.probe_id}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
}
