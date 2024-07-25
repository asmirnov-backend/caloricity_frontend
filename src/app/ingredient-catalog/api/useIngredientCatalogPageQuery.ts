import useSWR from "swr";
import { useSearchParams } from "next/navigation";

export default function useIngredientCatalogPageQuery(input: {
  page: number;
  rowsPerPage: number;
}) {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const searchWithParamName = `&search=${search}`;

  return useSWR(
    `http://localhost:8080/api/caloricity/ingredient-catalog?page=${
      input.page - 1
    }&size=${input.rowsPerPage}&sort=updatedAt,desc${
      search ? searchWithParamName : ""
    }`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
}
