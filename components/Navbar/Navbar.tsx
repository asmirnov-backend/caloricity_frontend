"use client";

import {
  Navbar as NavbarUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <NavbarUi
      isBordered
      shouldHideOnScroll
      className="w-full"
      classNames={{
        wrapper: "w-full max-w-full",
      }}
    >
      <NavbarBrand>
        <Link color={pathname === "/" ? "primary" : "foreground"} href="/">
          Caloricity <Avatar size="sm" src="/ponchikbig.png" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link
            color={pathname?.includes("ingredient") ? "primary" : "foreground"}
            href="/ingredient"
          >
            Католог ингредиентов
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={pathname?.includes("probe") ? "primary" : "foreground"}
            href="/probe"
          >
            Пробы
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Протоколы
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link isDisabled href="#">
            Войти
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button isDisabled as={Link} color="primary" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarUi>
  );
}
