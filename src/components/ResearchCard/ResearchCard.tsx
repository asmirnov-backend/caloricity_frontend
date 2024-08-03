import { Card, CardHeader, CardBody, Input } from "@nextui-org/react";
import { backendUrl } from "../../utils/backendUrl.const";
import { DeleteAction } from "../Actions/DeleteAction";
import { EditAction } from "../Actions/EditAction";

export default function ResearchCard(input: {
  id: string;
  headerText: string;
  researchUrl: string;
  data: Array<{ value: number; label: string }>;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
          <div className="flex flex-row text-lg">{input.headerText}</div>
          <div className="flex flex-row items-center gap-4 ">
            <EditAction id={input.id} url={input.researchUrl} />
            <DeleteAction
              id={input.id}
              url={`${backendUrl}${input.researchUrl}`}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="gap-2 grid grid-cols-1">
          {input.data.map((e) => (
            <Input
              key={e.label}
              isReadOnly
              label={e.label}
              variant="bordered"
              value={e.value.toString()}
            />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
