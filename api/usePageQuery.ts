import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { backendUrl } from "../utils/backendUrl.const";
import { PageOutput } from "../interfaces/PageOutput.interface";

// TODO Add Generic type
export default function usePageQuery(
  url: string,
  options: {
    page: number;
    rowsPerPage: number;
    queryParams?: Record<string, any>;
  },
) {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");

  const queryParams = new URLSearchParams(options.queryParams);

  queryParams.set("page", (options.page - 1).toString());
  queryParams.set("size", options.rowsPerPage.toString());
  queryParams.set("sort", "updatedAt,desc");
  if (search) queryParams.set("search", search);

  return useSWR<PageOutput>(
    `${backendUrl}${url}?${queryParams.toString()}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    },
  );
}
