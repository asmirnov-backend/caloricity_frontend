"use client";

import {
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
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

import { backendUrl } from "../../utils/backendUrl.const";
import { DeleteAction } from "../../components/Actions/DeleteAction";
import { EditAction } from "../../components/Actions/EditAction";
import SearchInput from "../../components/SearchInput/SearchInput";
import usePaginationInUrl from "../../hooks/usePaginationInUrl";
import usePageQuery from "../../api/usePageQuery";

export default function Page() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const [page, setPageWithUrl] = usePaginationInUrl(replace);
  const rowsPerPage = 13;

  const { data, isLoading } = usePageQuery("/ingredients", {
    page,
    rowsPerPage,
  });

  const pages = useMemo(() => {
    return data?.totalElements
      ? Math.ceil(data.totalElements / rowsPerPage)
      : 0;
  }, [data?.totalElements, rowsPerPage]);

  return (
    <div className="my-5 px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Католог ингредиентов</h3>
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3 min-w-[75%]">
          <SearchInput />
        </div>
        <div className="flex min-w-[20%] flex-row gap-5 flex-wrap">
          <Button
            as={Link}
            className="flex-auto"
            color="primary"
            href={pathname + "/create"}
          >
            Добавить
          </Button>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto w-full">
        <Table
          aria-label="Таблица для каталога ингридиентов"
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
                  onChange={setPageWithUrl}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn key="name" align="center" className="text-base">
              Название
            </TableColumn>
            <TableColumn key="ediblePart" align="center" className="text-base">
              Съедобная часть, доля
            </TableColumn>
            <TableColumn key="water" align="center" className="text-base">
              Вода, г
            </TableColumn>
            <TableColumn key="proteins" align="center" className="text-base">
              Белки, г
            </TableColumn>
            <TableColumn key="fats" align="center" className="text-base">
              Жиры, г
            </TableColumn>
            <TableColumn
              key="carbohydrates"
              align="center"
              className="text-base"
            >
              Углеводы, г
            </TableColumn>
            <TableColumn key="actions" align="center" className="text-base">
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
                      <div className="flex items-center gap-4 justify-center">
                        <EditAction id={item?.id} />
                        <DeleteAction
                          id={item?.id}
                          url={`${backendUrl}/ingredients`}
                        />
                      </div>
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
