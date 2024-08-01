"use client";

import {
  Input,
  Link,
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
} from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useHandleSearch from "../../hooks/useHandleSearch";
import React, { useEffect, useMemo } from "react";
import { backendUrl } from "../../utils/backendUrl.const";
import useProbePageQuery from "./api/useProbePageQuery";
import { ProbeType } from "./ProbeType.enum";
import { DeleteAction } from "../../components/Actions/DeleteAction";
import { EditAction } from "../../components/Actions/EditAction";

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

  const { data, isLoading } = useProbePageQuery({
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
      <h3 className="text-xl font-semibold">Пробы</h3>
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3 w-4/5">
          <Input
            className="flex-auto"
            placeholder="Поиск"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams?.get("search")?.toString() ?? ""}
          />
        </div>
        <div className="flex w-1/5 flex-row gap-5 flex-wrap">
          <Button
            className="flex-auto"
            as={Link}
            href={pathname + "/create"}
            color="primary"
          >
            Добавить
          </Button>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto w-full">
        <Table
          aria-label="Таблица проб"
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
            <TableColumn align="center" className="text-base" key="code">
              Код
            </TableColumn>
            <TableColumn align="center" className="text-base" key="name">
              Название
            </TableColumn>
            <TableColumn align="center" className="text-base" key="type">
              Тип
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
                <TableCell className="text-center">{item.code}</TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">
                  {item.type === ProbeType.FIRST ? (
                    <Chip className="bg-orange-100">Первое</Chip>
                  ) : ProbeType.SECOND ? (
                    <Chip className="bg-lime-100">Второе</Chip>
                  ) : (
                    <Chip className="bg-blue-100">Третье</Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4 justify-center">
                    <EditAction id={item?.id} />
                    <DeleteAction
                      id={item?.id}
                      url={`${backendUrl}/caloricity/probe`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
