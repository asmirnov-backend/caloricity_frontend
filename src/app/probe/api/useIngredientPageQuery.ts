import useSWR from "swr";
import { backendUrl } from "../../../utils/backendUrl.const";

export default function useIngredientPageQuery(input: {
  page: number;
  rowsPerPage: number;
  probeId: string;
}) {
  return useSWR(
    `${backendUrl}/ingredients?page=${input.page - 1}&size=${
      input.rowsPerPage
    }&sort=updatedAt,desc&probe-id=${input.probeId}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
}
