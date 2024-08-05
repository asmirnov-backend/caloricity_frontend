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
import { backendUrl } from "../../utils/backendUrl.const";
import { DeleteAction } from "../Actions/DeleteAction";
import { useMemo, useState } from "react";
import useIngredientPageQuery from "../../app/probe/api/useIngredientPageQuery";
import Link from "next/link";

export default function IngredientsTable(input: { probeId: string }) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 13;

  const { data: dataIngredient, isLoading: isLoadingIngredient } =
    useIngredientPageQuery({
      page,
      rowsPerPage,
      probeId: input.probeId,
    });

  const pages = useMemo(() => {
    return dataIngredient?.totalElements
      ? Math.ceil(dataIngredient.totalElements / rowsPerPage)
      : 0;
  }, [dataIngredient?.totalElements, rowsPerPage]);

  return (
    <div className="my-5 px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3">
          <h3 className="text-xl font-semibold">Ингредиенты</h3>
        </div>
        <div className="flex flex-row gap-5 flex-wrap min-w-[20%]">
          <Button
            className="flex-auto"
            as={Link}
            href={`/ingredient/create?probe=${input.probeId}`}
            color="primary"
          >
            Добавить
          </Button>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto w-full">
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
            <TableColumn align="center" className="text-base" key="name">
              Название
            </TableColumn>
            <TableColumn align="center" className="text-base" key="gross">
              Брутто, г
            </TableColumn>
            <TableColumn align="center" className="text-base" key="net">
              Нетто, г
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
            items={dataIngredient?.content ?? []}
            loadingContent={<Spinner />}
            loadingState={isLoadingIngredient ? "loading" : "idle"}
          >
            {(item: any) => (
              <TableRow key={item?.id}>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.gross}</TableCell>
                <TableCell className="text-center">{item.net}</TableCell>
                <TableCell className="text-center">
                  {Number(item.water).toPrecision(3)}
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
                      url={`${backendUrl}/ingredient`}
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
