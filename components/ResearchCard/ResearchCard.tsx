import { Card, CardHeader, CardBody, Input } from "@nextui-org/react";

import { backendUrl } from "../../utils/backendUrl.const";
import { DeleteAction } from "../Actions/DeleteAction";
import { EditAction } from "../Actions/EditAction";

export default function ResearchCard(input: {
  id: string;
  headerText: string;
  researchUrl: string;
  data: Array<
    { value?: number; label: string } | { value?: number; label: string }[]
  >;
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
        <div className="gap-3 grid">
          {input.data.map((e) => {
            if (Array.isArray(e)) {
              return (
                <div
                  key={e[0].label + "1"}
                  className={`gap-2 grid grid-cols-${e.length}`}
                >
                  {e.map((ee) => (
                    <Input
                      key={ee.label + "1"}
                      isReadOnly
                      description={ee.label}
                      labelPlacement="outside"
                      value={ee.value?.toString()}
                      variant="bordered"
                    />
                  ))}
                </div>
              );
            }

            return (
              <div key={e.label} className="grid-cols-1">
                <Input
                  isReadOnly
                  description={e.label}
                  labelPlacement="outside"
                  value={e.value?.toString()}
                  variant="bordered"
                />
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
