import { Tooltip } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";

export const EditAction = ({ id }: { id: string }) => {
  const pathname = usePathname();
  return (
    <Tooltip content="Удалить" color="danger">
      <a href={`${pathname}/edit/${id}`}>
        <Pencil fill="#979797" />
      </a>
    </Tooltip>
  );
};
