import {
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
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

import { backendUrl } from "../../utils/backendUrl.const";
import { DeleteAction } from "../../components/Actions/DeleteAction";
import { EditAction } from "../../components/Actions/EditAction";
import SearchInput from "../../components/SearchInput/SearchInput";
import usePaginationInUrl from "../../hooks/usePaginationInUrl";
import usePageQuery from "../../api/usePageQuery";

import { ProbeType } from "./ProbeType.enum";

export default function Page() {
  const pathname = usePathname();
  const { replace } = useRouter();

  const [page, setPageWithUrl] = usePaginationInUrl(replace);
  const rowsPerPage = 13;

  const { data, isLoading } = usePageQuery("/probes", {
    page,
    rowsPerPage,
  });

  const pages = useMemo(() => {
    return data?.totalElements
      ? Math.ceil(data.totalElements / rowsPerPage)
      : 0;
  }, [data?.totalElements, rowsPerPage]);

  return (
    <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Пробы</h3>
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
            <TableColumn key="code" align="center" className="text-base">
              Код
            </TableColumn>
            <TableColumn key="name" align="center" className="text-base">
              Название
            </TableColumn>
            <TableColumn key="type" align="center" className="text-base">
              Тип
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
                <TableCell className="text-center">{item.code}</TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">
                  {item.type === ProbeType.FIRST ? (
                    <Chip className="bg-orange-100">Первое</Chip>
                  ) : item.type === ProbeType.SECOND ? (
                    <Chip className="bg-lime-100">Второе</Chip>
                  ) : (
                    <Chip className="bg-blue-100">Третье</Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4 justify-center">
                    <EditAction id={item?.id} />
                    <DeleteAction id={item?.id} url={`${backendUrl}/probes`} />
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
