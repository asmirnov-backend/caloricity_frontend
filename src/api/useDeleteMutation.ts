import useSWRMutation from "swr/mutation";

export default function useDeleteMutation(input: { url: string; id: string }) {
  return useSWRMutation(`${input.url}/${input.id}`, (url: string) =>
    fetch(url, {
      method: "DELETE",
    })
  );
}
