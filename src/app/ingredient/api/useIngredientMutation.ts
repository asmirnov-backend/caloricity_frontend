import useSWRMutation from "swr/mutation";
import { IngredientForm } from "../interfaces/IngredientForm.interface";
import { backendUrl } from "../../../utils/backendUrl.const";

export default function useIngredientMutation() {
  return useSWRMutation(
    `${backendUrl}/caloricity/ingredient`,
    (url: string, { arg }: { arg: IngredientForm }) =>
      fetch(url, {
        method: "POST",
        body: JSON.stringify(arg),
        headers: {
          "content-type": "application/json",
        },
      })
  );
}
