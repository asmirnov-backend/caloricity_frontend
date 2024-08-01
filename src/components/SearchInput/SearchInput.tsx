import { Input } from "@nextui-org/react";
import useHandleSearch from "../../hooks/useHandleSearch";
import { useSearchParams } from "next/navigation";

export default function SearchInput() {
  const handleSearch = useHandleSearch();
  const searchParams = useSearchParams();

  return (
    <Input
      className="w-full flex-auto"
      placeholder="Поиск"
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams?.get("search")?.toString() ?? ""}
    />
  );
}
