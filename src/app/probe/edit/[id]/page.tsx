"use client";

import {
  Input,
  Button,
  CircularProgress,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Divider,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useSubmit from "../../../../api/useSubmit";
import useProbeMutation from "../../api/useProbeMutation";
import useProbeQuery from "../../api/useProbeQuery";
import { ProbeForm } from "../../interfaces/ProbeForm.interface";
import { backendUrl } from "../../../../utils/backendUrl.const";
import { useMemo, useState } from "react";
import useIngredientPageQuery from "../../api/useIngredientPageQuery";
import { DeleteAction } from "../../../../components/Actions/DeleteAction";
import { ProbeTypeMap } from "../../ProbeType.enum";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [page, setPage] = useState(1);
  const rowsPerPage = 13;
  const { data: dataIngredient, isLoading: isLoadingIngredient } =
    useIngredientPageQuery({
      page,
      rowsPerPage,
      probe_id: id,
    });
  const pages = useMemo(() => {
    return dataIngredient?.totalElements
      ? Math.ceil(dataIngredient.totalElements / rowsPerPage)
      : 0;
  }, [dataIngredient?.totalElements, rowsPerPage]);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<ProbeForm>();

  const { trigger, isMutating } = useProbeMutation({
    method: "PUT",
    id,
  });

  const { data, isLoading } = useProbeQuery(id);
  const onSubmit = useSubmit<ProbeForm>({ trigger, backTo: ".." });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
          <Input
            isRequired
            isDisabled
            label="Тип"
            variant="bordered"
            value={ProbeTypeMap[data?.type!]}
          ></Input>
          <Input
            label="Код"
            type="string"
            isRequired
            variant="bordered"
            {...register("code", {
              value: data?.code,
              required: "Поле обязательно",
            })}
            isInvalid={formErrors.code ? true : false}
            errorMessage={formErrors.code?.message?.toString()}
          />
          <Input
            label="Название"
            variant="bordered"
            isRequired
            {...register("name", {
              value: data?.name,
              required: "Поле обязательно",
              minLength: { value: 2, message: "Слишком короткое название" },
            })}
            isInvalid={formErrors.name ? true : false}
            errorMessage={formErrors.name?.message?.toString()}
          />
          <Input
            label="Масса теоритическая, г"
            variant="bordered"
            {...register("massTheory", {
              valueAsNumber: true,
              value: data?.massTheory ?? undefined,
            })}
            isInvalid={formErrors.massTheory ? true : false}
            errorMessage={formErrors.massTheory?.message?.toString()}
          />
          <Input
            isRequired
            label="Масса фактическая, г"
            variant="bordered"
            {...register("massFact", {
              required: "Поле обязательно",
              value: data?.massFact,
              valueAsNumber: true,
            })}
            isInvalid={formErrors.massFact ? true : false}
            errorMessage={formErrors.massFact?.message?.toString()}
          />
          <Button color="primary" disabled={isMutating} type="submit">
            Сохранить
          </Button>
          <Button
            color="danger"
            disabled={isMutating}
            variant="flat"
            as={Link}
            href=".."
          >
            Назад
          </Button>
        </div>
      </form>

      <Divider />
      <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
          <div className="flex flex-row gap-3 w-full">
            <h3 className="text-xl font-semibold">Ингредиенты</h3>
          </div>
          <div className="flex w-1/5 flex-row gap-5 flex-wrap">
            <Button
              className="flex-auto"
              as={Link}
              href={`/ingredient/create?probe=${id}`}
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
                        url={`${backendUrl}/caloricity/ingredient`}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
