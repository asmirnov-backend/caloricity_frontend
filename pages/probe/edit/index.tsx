"use client";

import { Divider } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import ProbeIngredientsTable from "../../../components/ProbeIngredientsTable/ProbeIngredientsTable";
import Researches from "../../../components/Researches/Researches";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";

import ProbeEditForm from "./ProbeEditForm";

export default function Page() {
  const searchParams = useSearchParams();

  if (!searchParams || !searchParams.has("id")) return <CustomLoader />;

  const id = searchParams.get("id")!;

  return (
    <>
      <ProbeEditForm probeId={id} />
      <Divider />
      <ProbeIngredientsTable probeId={id} />
      <Divider />
      <Researches probeId={id} />
    </>
  );
}
