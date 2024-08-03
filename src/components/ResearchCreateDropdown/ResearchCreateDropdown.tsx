import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  input,
} from "@nextui-org/react";

export default function ResearchCreateDropdown(input: { probeId: string }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="primary" className="flex-auto">
          Добавить
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="1"
          href={`/dry-substances-research/create?probe-id=${input.probeId}`}
        >
          Сухие вещества
        </DropdownItem>
        <DropdownItem
          key="2"
          href={`/proteins-research/create?probe-id=${input.probeId}`}
        >
          Белки
        </DropdownItem>
        <DropdownItem
          key="3"
          href={`/fats-research/create?probe-id=${input.probeId}`}
        >
          Жиры
        </DropdownItem>
        <DropdownItem
          key="4"
          href={`/carbohydrates-research/create?probe-id=${input.probeId}`}
        >
          Углеводы
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
