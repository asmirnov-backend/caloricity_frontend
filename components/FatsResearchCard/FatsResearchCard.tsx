import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";
import CustomLoader from "../CustomLoader/CustomLoader";

const researchUrl = "/fats-researches";

export default function FatsResearchCard(input: { probeId: string }) {
  const { data, isLoading } = usePageQuery(researchUrl, {
    page: 1,
    rowsPerPage: 1,
    queryParams: { "probe-id": input.probeId },
  });

  if (isLoading) return <CustomLoader />;

  const researchData = data?.content[0];

  if (!researchData) return <></>;

  return (
    <ResearchCard
      data={[
        [
          {
            value: researchData.patronMassBeforeExtractionParallelFirst,
            label: "Масса патрона до экстракции первая параллель, г",
          },
          {
            value: researchData.patronMassBeforeExtractionParallelSecond,
            label: "Масса патрона до экстракции вторая параллель, г",
          },
        ],
        [
          {
            value: researchData.patronMassAfterExtractionParallelFirst,
            label: "Масса патрона после экстракции первая параллель, г",
          },
          {
            value: researchData.patronMassAfterExtractionParallelSecond,
            label: "Масса патрона после экстракции вторая параллель, г",
          },
        ],
        [
          {
            value: researchData.dryResidueWeightParallelFirst,
            label: "Масса сухих остатков первая параллель, г",
          },
          {
            value: researchData.dryResidueWeightParallelSecond,
            label: "Масса сухих остатков вторая параллель, г",
          },
        ],
        {
          value: researchData.dryResidueWeightAverage,
          label: "Средняя масса сухих остатков, г",
        },
      ]}
      headerText="Жиры"
      id={researchData.id}
      researchUrl={researchUrl}
    />
  );
}
