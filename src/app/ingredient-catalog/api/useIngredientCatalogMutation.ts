import useSWRMutation from "swr/mutation";
import { IngredientCatalogForm } from "../interfaces/IngredientCatalogForm.interface";
import { backendUrl } from "../../../utils/backendUrl.const";

export default function useIngredientCatalogMutation(
  input:
    | {
        method: "POST";
      }
    | { method: "PUT"; id: string }
) {
  const add = input.method == "PUT" ? "/" + input.id : "";

  return useSWRMutation(
    `${backendUrl}/caloricity/ingredient-catalog` + add,
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
