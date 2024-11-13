import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

import { ProbeType } from "../../interfaces/ProbeType.enum";

export default function ResearchCreateDropdown(input: {
  probeId: string;
  probeType?: ProbeType;
}) {
  const suffix = `create?probe-id=${input.probeId}&probe-type=${input.probeType}`;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="flex-auto" color="primary">
          Добавить
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="1" href={"/dry-substances-researches/" + suffix}>
          Сухие вещества
        </DropdownItem>
        {input.probeType !== ProbeType.THIRD && (
          <DropdownItem key="2" href={`/proteins-researches/` + suffix}>
            Белки
          </DropdownItem>
        )}
        <DropdownItem key="3" href={`/fats-researches/` + suffix}>
          Жиры
        </DropdownItem>
        {input.probeType == ProbeType.THIRD && (
          <DropdownItem key="4" href={`/carbohydrates-researches/` + suffix}>
            Углеводы
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
