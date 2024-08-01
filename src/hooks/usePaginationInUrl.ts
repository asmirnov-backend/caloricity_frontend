"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function usePaginationInUrl(
  replace: AppRouterInstance["replace"]
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams!);
    if (!params.has("page")) {
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, replace]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const pageParam = parseInt(searchParams!.get("page") ?? "1") || 1;
    if (pageParam !== page) {
      setPage(pageParam);
    }
  }, [searchParams, page]);

  const setPageWithUrl = (pageInput: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set("page", pageInput.toString());
    replace(`${pathname}?${params.toString()}`);
    setPage(pageInput);
  };

  return [page, setPageWithUrl] as const;
}
