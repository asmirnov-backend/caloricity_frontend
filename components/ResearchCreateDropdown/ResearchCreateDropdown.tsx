import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

export default function ResearchCreateDropdown(input: { probeId: string }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="flex-auto" color="primary">
          Добавить
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="1"
          href={`/dry-substances-researches/create?probe-id=${input.probeId}`}
        >
          Сухие вещества
        </DropdownItem>
        <DropdownItem
          key="2"
          href={`/proteins-researches/create?probe-id=${input.probeId}`}
        >
          Белки
        </DropdownItem>
        <DropdownItem
          key="3"
          href={`/fats-researches/create?probe-id=${input.probeId}`}
        >
          Жиры
        </DropdownItem>
        <DropdownItem
          key="4"
          href={`/carbohydrates-researches/create?probe-id=${input.probeId}`}
        >
          Углеводы
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
