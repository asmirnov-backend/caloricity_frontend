"use client";

import { Divider } from "@nextui-org/react";
import ProbeIngredientsTable from "../../../../components/ProbeIngredientsTable/ProbeIngredientsTable";
import ProbeEditForm from "./ProbeEditForm";
import Researches from "../../../../components/Researches/Researches";

export default function Page({ params }: { params: { id: string } }) {
  const { id: probeId } = params;

  return (
    <>
      <ProbeEditForm probeId={probeId} />
      <Divider />
      <ProbeIngredientsTable probeId={probeId} />
      <Divider />
      <Researches probeId={probeId} />
    </>
  );
}
