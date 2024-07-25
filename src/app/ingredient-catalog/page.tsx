"use client";

import {
  Input,
  Link,
  Button,
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useHandleSearch from "../../hooks/useHandleSearch";
import React, { useEffect, useMemo } from "react";
import useIngredientCatalogPageQuery from "./api/useIngredientCatalogPageQuery";
import { Actions } from "../../components/Actions/Actions";

export default function Page() {
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

  const handleSearch = useHandleSearch();

  return (
    <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Католог ингредиентов</h3>
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3 w-full">
          <Input
            className="w-full flex-auto"
            placeholder="Поиск"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams?.get("search")?.toString() ?? ""}
          />
        </div>
        <div className="flex flex-row gap-5 flex-wrap">
          <Button as={Link} href={pathname + "/create"} color="primary">
            Добавить
          </Button>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto w-full">
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
            <TableColumn
              align="center"
              className="text-base"
              key="carbohydrates"
            >
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
    </div>
  );
}
