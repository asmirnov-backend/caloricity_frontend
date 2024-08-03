import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { backendUrl } from "../utils/backendUrl.const";

export default function usePageQuery(
  url: string,
  options: {
    page: number;
    rowsPerPage: number;
  }
) {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const searchWithParamName = `&search=${search}`;

  return useSWR(
    `${backendUrl}${url}?page=${options.page - 1}&size=${
      options.rowsPerPage
    }&sort=updatedAt,desc${search ? searchWithParamName : ""}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );
}