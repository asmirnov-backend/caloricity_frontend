"use client";

import { useSearchParams } from "next/navigation";

import CustomLoader from "../../../components/CustomLoader/CustomLoader";

import ProbeEditPage from "./ProbeEditPage";

export default function Page() {
  const searchParams = useSearchParams();

  if (!searchParams || !searchParams.has("id")) return <CustomLoader />;

  const id = searchParams.get("id")!;

  return <ProbeEditPage probeId={id} />;
}
