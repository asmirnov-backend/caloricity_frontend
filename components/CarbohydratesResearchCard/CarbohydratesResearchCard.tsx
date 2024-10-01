import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";
import CustomLoader from "../CustomLoader/CustomLoader";

const researchUrl = "/carbohydrates-researches";

export default function CarbohydratesResearchCard(input: { probeId: string }) {
  const { data, isLoading } = usePageQuery(researchUrl, {
    page: 1,
    rowsPerPage: 1,
    queryParams: { "probe-id": input.probeId },
  });

  if (isLoading) return <CustomLoader />;

  const researchData = data?.content[0];

  if (!researchData) return <CustomLoader />;

  return (
    <ResearchCard
      data={[
        {
          value: researchData.byuksaParallelFirst,
          label: "Масса бюксы первая параллель, г",
        },
        {
          value: researchData.byuksaParallelSecond,
          label: "Масса бюксы вторая параллель, г",
        },
        {
          value: researchData.byuksaAfterDryingParallelFirst,
          label: "Масса бюксы с пробой после высушивания первая параллель, г",
        },
        {
          value: researchData.byuksaAfterDryingParallelSecond,
          label: "Масса бюксы с пробой после высушивания вторая параллель, г",
        },
      ]}
      headerText="Углеводы"
      id={researchData.id}
      researchUrl={researchUrl}
    />
  );
}
