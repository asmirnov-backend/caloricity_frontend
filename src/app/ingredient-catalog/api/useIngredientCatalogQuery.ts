import { backendUrl } from "../../../utils/backendUrl.const";
import { IngredientCatalogForm } from "../interfaces/IngredientCatalogForm.interface";
import useSWR from "swr";

export default function useIngredientCatalogQuery(id: string) {
  return useSWR<IngredientCatalogForm>(
    `${backendUrl}/ingredient-catalog/${id}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {}
  );
}
