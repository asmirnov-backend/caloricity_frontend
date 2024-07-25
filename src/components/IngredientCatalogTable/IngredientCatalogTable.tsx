"use client";

import {
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useMemo } from "react";
import { Actions } from "../Actions/Actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useIngredientCatalogPageQuery from "../../app/ingredient-catalog/api/useIngredientCatalogPageQuery";

export const IngredientCatalogTable = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams!);
    if (!params.has("page")) {
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, replace]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 13;

  const setPageWithUrl = (pageI: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set("page", pageI.toString());
    replace(`${pathname}?${params.toString()}`);
    setPage(pageI);
  };

  useEffect(() => {
    const pageParam = parseInt(searchParams!.get("page") ?? "1") || 1;
    if (pageParam !== page) {
      setPage(pageParam);
    }
  }, [searchParams]);

  const { data, isLoading } = useIngredientCatalogPageQuery({
    page,
    rowsPerPage,
  });

  const pages = useMemo(() => {
    return data?.totalElements
      ? Math.ceil(data.totalElements / rowsPerPage)
      : 0;
  }, [data?.totalElements, rowsPerPage]);

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table
        aria-label="Example table with client async pagination"
        bottomContent={
          pages > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPageWithUrl(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn align="center" className="text-base" key="name">
            Название
          </TableColumn>
          <TableColumn align="center" className="text-base" key="ediblePart">
            Съедобная часть, г
          </TableColumn>
          <TableColumn align="center" className="text-base" key="water">
            Вода, г
          </TableColumn>
          <TableColumn align="center" className="text-base" key="proteins">
            Белки, г
          </TableColumn>
          <TableColumn align="center" className="text-base" key="fats">
            Жиры, г
          </TableColumn>
          <TableColumn align="center" className="text-base" key="carbohydrates">
            Углеводы, г
          </TableColumn>
          <TableColumn align="center" className="text-base" key="actions">
            Действия
          </TableColumn>
        </TableHeader>
        <TableBody
          items={data?.content ?? []}
          loadingContent={<Spinner />}
          loadingState={isLoading ? "loading" : "idle"}
        >
          {(item: any) => (
            <TableRow key={item?.id}>
              {(columnKey) =>
                columnKey != "actions" ? (
                  <TableCell className="text-center">
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                ) : (
                  <TableCell>
                    <Actions
                      id={item?.id}
                      url="http://localhost:8080/api/caloricity/ingredient-catalog"
                    />
                  </TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
