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
          Caloricity <Avatar size="sm" src="/icons8-пончик-glyph-96.png" />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Link
            color={
              pathname?.includes("ingredient-catalog")
                ? "primary"
                : "foreground"
            }
            href="/ingredient-catalog"
          >
            Католог ингредиентов
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/probe"
            color={pathname?.includes("probe") ? "primary" : "foreground"}
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
          <Link href="#" isDisabled>
            Войти
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} isDisabled color="primary" href="#" variant="flat">
            Регистрация
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavbarUi>
  );
}
