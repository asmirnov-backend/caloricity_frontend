"use client";
import Image from "next/image";
import {
  Navbar as NavbarUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

import ponchikbig from "../../public/ponchikbig.png";

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
          Caloricity{" "}
          <Image
            alt="ponchikbig"
            className="mx-1"
            height={32}
            src={ponchikbig}
            width={32}
          />
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
