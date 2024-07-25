import useSWRMutation from "swr/mutation";
import { IngredientCatalogForm } from "../interfaces/IngredientCatalogForm.interface";

export default function useIngredientCatalogMutation(
  input:
    | {
        method: "POST";
      }
    | { method: "PUT"; id: string }
) {
  const add = input.method == "PUT" ? "/" + input.id : "";

  return useSWRMutation(
    "http://localhost:8080/api/caloricity/ingredient-catalog" + add,
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
