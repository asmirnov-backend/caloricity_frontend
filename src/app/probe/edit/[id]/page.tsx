"use client";

import { Divider } from "@nextui-org/react";
import IngredientsTable from "./IngredientsTable";
import ProbeEditForm from "./ProbeEditForm";

export default function Page({ params }: { params: { id: string } }) {
  const { id: probeId } = params;

  return (
    <>
      <ProbeEditForm probeId={probeId} />
      <Divider />
      <IngredientsTable probeId={probeId} />
      <Divider />
    </>
  );
}
