import { IngredientCatalogForm } from "../IngredientCatalogForm.interface";
import useSWR from "swr";

export default function useIngredientCatalogQuery(id: string) {
  return useSWR<IngredientCatalogForm>(
    `http://localhost:8080/api/caloricity/ingredient-catalog/${id}`,
    (resource: string, init: any) =>
      fetch(resource, init).then((res) => res.json()),
    {}
  );
}
