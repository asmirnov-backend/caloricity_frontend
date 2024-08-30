import { CircularProgress } from "@nextui-org/react";
import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";

const researchUrl = "/proteins-research";

export default function ProteinsResearchCard(input: { probeId: string }) {
  const { data, isLoading } = usePageQuery(researchUrl, {
    page: 1,
    rowsPerPage: 1,
    queryParams: { "probe-id": input.probeId },
  });

  if (isLoading) return <CircularProgress aria-label="Loading..." />;

  const researchData = data?.content[0];

  if (!researchData) return;

  return (
    <ResearchCard
      id={researchData.id}
      headerText="Белки"
      researchUrl={researchUrl}
      data={[
        {
          value: researchData.titrantVolume,
          label: "Объём титранта, г/см^3",
        },
        {
          value: researchData.mass,
          label: "Масса навески, г",
        },
        { value: researchData.controlVolume, label: "Объём контроля, г/см^3" },
        {
          value: researchData.coefficient,
          label: "Коэффициент",
        },
      ]}
    />
  );
}
