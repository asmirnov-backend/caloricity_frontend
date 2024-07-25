import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { backendUrl } from "../../../utils/backendUrl.const";

export default function useIngredientCatalogPageQuery(input: {
  page: number;
  rowsPerPage: number;
}) {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const searchWithParamName = `&search=${search}`;

  return useSWR(
    `${backendUrl}/caloricity/ingredient-catalog?page=${input.page - 1}&size=${
      input.rowsPerPage
    }&sort=updatedAt,desc${search ? searchWithParamName : ""}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
}
