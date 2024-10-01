"use client";

import { Divider } from "@nextui-org/react";
import { useRouter } from "next/router";

import ProbeIngredientsTable from "../../../components/ProbeIngredientsTable/ProbeIngredientsTable";
import Researches from "../../../components/Researches/Researches";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";

import ProbeEditForm from "./ProbeEditForm";

export default function Page() {
  const router = useRouter();
  const { id: probeId } = router.query;

  if (!probeId || Array.isArray(probeId)) return <CustomLoader />;

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
