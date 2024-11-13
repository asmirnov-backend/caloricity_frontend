import {
  Button,
  Pagination,
  TableHeader,
  TableColumn,
  TableBody,
  Spinner,
  TableRow,
  TableCell,
  Table,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import Link from "next/link";

import { backendUrl } from "../../utils/backendUrl.const";
import { DeleteAction } from "../Actions/DeleteAction";
import usePageQuery from "../../api/usePageQuery";

export default function ProbeIngredientsTable(input: { probeId: string }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 13;

  const { data: probeIngredients, isLoading: isLoadingIngredient } =
    usePageQuery("/probe-ingredient", {
      page,
      rowsPerPage,
    });

  const pages = useMemo(() => {
    return probeIngredients?.totalElements
      ? Math.ceil(probeIngredients.totalElements / rowsPerPage)
      : 0;
  }, [probeIngredients?.totalElements, rowsPerPage]);

  return (
    <div className="my-5 px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3">
          <h3 className="text-xl font-semibold">Ингредиенты</h3>
        </div>
        <div className="flex flex-row gap-5 flex-wrap min-w-[20%]">
          <Button
            as={Link}
            className="flex-auto"
            color="primary"
            href={`/probe-ingredient/create?probe=${input.probeId}`}
          >
            Добавить
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full">
        <Table
          aria-label="Таблица ингридиентов"
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
                  onChange={setPage}
                />
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn
              key="ingredientName"
              align="center"
              className="text-base"
            >
              Название
            </TableColumn>
            <TableColumn key="gross" align="center" className="text-base">
              Брутто, г
            </TableColumn>
            <TableColumn key="net" align="center" className="text-base">
              Нетто, г
            </TableColumn>
            <TableColumn
              key="drySubstances"
              align="center"
              className="text-base"
            >
              Сухие вещества, г
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
            items={probeIngredients?.content ?? []}
            loadingContent={<Spinner />}
            loadingState={isLoadingIngredient ? "loading" : "idle"}
          >
            {(item: any) => (
              <TableRow key={item?.id}>
                <TableCell className="text-center">
                  {item.ingredientName}
                </TableCell>
                <TableCell className="text-center">{item.gross}</TableCell>
                <TableCell className="text-center">{item.net}</TableCell>
                <TableCell className="text-center">
                  {Number(item.drySubstances).toPrecision(3)}
                </TableCell>
                <TableCell className="text-center">
                  {Number(item.proteins).toPrecision(3)}
                </TableCell>
                <TableCell className="text-center">
                  {Number(item.fats).toPrecision(3)}
                </TableCell>
                <TableCell className="text-center">
                  {Number(item.carbohydrates).toPrecision(3)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4 justify-center">
                    <DeleteAction
                      id={item?.id}
                      url={`${backendUrl}/probe-ingredient`}
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
