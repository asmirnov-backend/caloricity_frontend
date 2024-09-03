import { CircularProgress } from "@nextui-org/react";
import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";

const researchUrl = "/dry-substances-researches";

export default function DrySubstancesResearchCard(input: { probeId: string }) {
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
      headerText="Сухие вещества"
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
        {
          value: researchData.byuksaAfterDryingParallelFirst,
          label: "Масса бюксы с пробой после высушивания первая параллель, г",
        },
        {
          value: researchData.byuksaAfterDryingParallelSecond,
          label: "Масса бюксы с пробой после высушивания вторая параллель, г",
        },
      ]}
    />
  );
}
