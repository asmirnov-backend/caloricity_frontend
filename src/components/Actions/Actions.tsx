import { DeleteAction } from "./DeleteAction";
import { EditAction } from "./EditAction";

export const Actions = ({ id, url }: { id: string; url: string }) => {
  return (
    <div className="flex items-center gap-4 justify-center">
      <EditAction id={id} />
      <DeleteAction id={id} url={url} />
    </div>
  );
};
