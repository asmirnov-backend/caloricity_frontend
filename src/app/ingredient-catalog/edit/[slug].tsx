"use client";
import useSWRMutation from "swr/mutation";

import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSnackbar } from "notistack";

interface IngredientCatalogForm {
  name: string;
  ediblePart: number;
  water: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

export default function Page() {}
