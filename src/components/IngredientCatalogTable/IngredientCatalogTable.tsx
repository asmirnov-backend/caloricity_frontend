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
import React, { useMemo } from "react";
import useSWR from "swr";
import { Actions } from "../Actions/Actions";
import { useSearchParams } from "next/navigation";

export const IngredientCatalogTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("search");
  const searchWithParamName = `&search=${search}`;

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 13;

  const { data, isLoading } = useSWR(
    `http://localhost:8080/api/caloricity/ingredient-catalog?page=${
      page - 1
    }&size=${rowsPerPage}&sort=updatedAt,desc${
      search ? searchWithParamName : ""
    }`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {
      keepPreviousData: true,
    }
  );

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
                onChange={(page) => setPage(page)}
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
