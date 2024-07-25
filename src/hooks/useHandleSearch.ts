import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function useHandleSearch() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  return useDebouncedCallback((term: string) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }

      params.set("page", "1");

      replace(`${pathname}?${params.toString()}`);
    }
  }, 500);
}
