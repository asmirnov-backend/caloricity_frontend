import { CircularProgress } from "@nextui-org/react";
import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";

const researchUrl = "/carbohydrates-research";

export default function CarbohydratesResearchCard(input: { probeId: string }) {
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
      headerText="Углеводы"
      researchUrl={researchUrl}
      data={[
        {
          value: researchData.byuksaParallelFirst,
          label: "Масса бюксы первая параллель, г",
        },
        {
          value: researchData.byuksaParallelSecond,
          label: "Масса бюксы вторая параллель, г",
        },
        { value: researchData.bankaEmptyMass, label: "Масса пустой банки, г" },
        {
          value: researchData.bankaWithProbeMass,
          label: "Масса банки с пробой, г",
        },
        { value: researchData.mass, label: "Масса навески, г" },
      ]}
    />
  );
}
