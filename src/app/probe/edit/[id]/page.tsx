"use client";

import {
  Input,
  Button,
  CircularProgress,
  getKeyValue,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Divider,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useSubmit from "../../../../api/useSubmit";
import useProbeMutation from "../../api/useProbeMutation";
import useProbeQuery from "../../api/useProbeQuery";
import { ProbeForm } from "../../interfaces/ProbeForm.interface";
import { backendUrl } from "../../../../utils/backendUrl.const";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import useIngredientPageQuery from "../../api/useIngredientPageQuery";
import { DeleteAction } from "../../../../components/Actions/DeleteAction";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const pathname = usePathname();
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
  const onSubmit = useSubmit<ProbeForm>({ trigger });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 lg:px-6 mx-auto w-1/2 flex flex-col gap-4">
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
        <Select
          isRequired
          label="Тип"
          variant="bordered"
          {...register("type", {
            value: data?.type,
            required: "Поле обязательно",
          })}
          isInvalid={formErrors.type ? true : false}
          errorMessage={formErrors.type?.message?.toString()}
        >
          {[
            { key: "FIRST", label: "Первое" },
            { key: "SECOND", label: "Второе" },
            { key: "THIRD", label: "Третье" },
          ].map((animal) => (
            <SelectItem key={animal.key}>{animal.label}</SelectItem>
          ))}
        </Select>
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

      <Divider />
      <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
        <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
          <div className="flex flex-row gap-3 w-full">
            <h3 className="text-xl font-semibold">Ингредиенты</h3>
          </div>
          <div className="flex flex-row gap-5 flex-wrap">
            <Button
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
                align="center"
                className="text-base"
                key="ingredientInCatalogName"
              >
                Название
              </TableColumn>
              <TableColumn align="center" className="text-base" key="gross">
                Масса брутто, г
              </TableColumn>
              <TableColumn align="center" className="text-base" key="net">
                Масса нетто, г
              </TableColumn>
            </TableHeader>
            <TableBody
              items={dataIngredient?.content ?? []}
              loadingContent={<Spinner />}
              loadingState={isLoadingIngredient ? "loading" : "idle"}
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
                          <DeleteAction
                            id={item?.id}
                            url={`${backendUrl}/ingredient`}
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
    </form>
  );
}
