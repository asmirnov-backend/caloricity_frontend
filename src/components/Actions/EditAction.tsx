import { Tooltip } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const EditAction = ({ id }: { id: string }) => {
  const pathname = usePathname();
  return (
    <Tooltip content="Редактировать" color="warning">
      <Link href={`${pathname}/edit/${id}`}>
        <Pencil fill="#979797" />
      </Link>
    </Tooltip>
  );
};
