import { CircularProgress } from "@nextui-org/react";
import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";

const researchUrl = "/fats-research";

export default function FatsResearchCard(input: { probeId: string }) {
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
      headerText="Жиры"
      researchUrl={researchUrl}
      data={[
        {
          value: researchData.patronMassBeforeExtractionParallelFirst,
          label: "Масса патрона до экстракции первая параллель, г",
        },
        {
          value: researchData.patronMassBeforeExtractionParallelSecond,
          label: "Масса патрона до экстракции вторая параллель, г",
        },
        {
          value: researchData.patronMassAfterExtractionParallelFirst,
          label: "Масса патрона после экстракции первая параллель, г",
        },
        {
          value: researchData.patronMassAfterExtractionParallelSecond,
          label: "Масса патрона после экстракции вторая параллель, г",
        },
      ]}
    />
  );
}
