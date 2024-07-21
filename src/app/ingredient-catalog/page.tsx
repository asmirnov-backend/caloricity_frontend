"use client";

import { Input, Link, Button } from "@nextui-org/react";
import { IngredientCatalogTable } from "../../components/IngredientCatalogTable/IngredientCatalogTable";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  return (
    <div className="my-5 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Католог ингредиентов</h3>
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3 w-full">
          <Input className="w-full flex-auto" placeholder="Поиск" />
        </div>
        <div className="flex flex-row gap-3 flex-wrap">
          <Button as={Link} href={pathname + "/create"} color="primary">
            Добавить
          </Button>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto w-full">
        <IngredientCatalogTable />
      </div>
    </div>
  );
}
