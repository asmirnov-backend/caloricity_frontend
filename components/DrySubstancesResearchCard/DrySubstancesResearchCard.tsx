import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";
import CustomLoader from "../CustomLoader/CustomLoader";

const researchUrl = "/dry-substances-researches";

export default function DrySubstancesResearchCard(input: { probeId: string }) {
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
            value: researchData.byuksaParallelFirst,
            label: "Масса бюксы первая параллель, г",
          },
          {
            value: researchData.byuksaParallelSecond,
            label: "Масса бюксы вторая параллель, г",
          },
        ],
        [
          {
            value: researchData.byuksaAfterDryingParallelFirst,
            label: "Масса бюксы после высушивания первая параллель, г",
          },
          {
            value: researchData.byuksaAfterDryingParallelSecond,
            label: "Масса бюксы после высушивания вторая параллель, г",
          },
        ],
        [
          {
            value: researchData.massNaveskiParallelFirst,
            label: "Масса навески первая параллель, г",
          },
          {
            value: researchData.massNaveskiParallelSecond,
            label: "Масса навески вторая параллель, г",
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
      headerText="Сухие вещества"
      id={researchData.id}
      researchUrl={researchUrl}
    />
  );
}
