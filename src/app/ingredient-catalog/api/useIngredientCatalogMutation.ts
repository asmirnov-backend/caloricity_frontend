import useSWRMutation from "swr/mutation";
import { IngredientCatalogForm } from "../IngredientCatalogForm.interface";

export default function useIngredientCatalogMutation(input: {
  method: "PUT" | "POST";
}) {
  return useSWRMutation(
    "http://localhost:8080/api/caloricity/ingredient-catalog",
    (url: string, { arg }: { arg: IngredientCatalogForm }) =>
      fetch(url, {
        method: input.method,
        body: JSON.stringify(arg),
        headers: {
          "content-type": "application/json",
        },
      })
  );
}
