import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import useHandleSearch from "../../hooks/useHandleSearch";

export default function SearchInput() {
  const handleSearch = useHandleSearch();
  const searchParams = useSearchParams();

  return (
    <Input
      className="w-full flex-auto"
      defaultValue={searchParams?.get("search")?.toString() ?? ""}
      placeholder="Поиск"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}
