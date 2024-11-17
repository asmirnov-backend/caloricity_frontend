import { Divider } from "@nextui-org/react";

import ProbeIngredientsTable from "../../../components/ProbeIngredientsTable/ProbeIngredientsTable";
import Researches from "../../../components/Researches/Researches";
import useQuery from "../../../api/useQuery";
import { ProbeDto } from "../../../interfaces/ProbeForm.interface";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";

import ProbeEditForm from "./ProbeEditForm";

export default function ProbeEditPage(input: { probeId: string }) {
  const { data, isLoading } = useQuery<ProbeDto>(input.probeId, "/probes");

  if (isLoading) return <CustomLoader />;

  return (
    <>
      <ProbeEditForm data={data!} probeId={input.probeId} />
      <Divider />
      <ProbeIngredientsTable probeId={input.probeId} />
      <Divider />
      <Researches probeId={input.probeId} probeType={data?.type!} />
    </>
  );
}
