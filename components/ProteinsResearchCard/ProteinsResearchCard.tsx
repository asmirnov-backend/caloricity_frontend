import ResearchCard from "../ResearchCard/ResearchCard";
import usePageQuery from "../../api/usePageQuery";
import CustomLoader from "../CustomLoader/CustomLoader";

const researchUrl = "/proteins-researches";

export default function ProteinsResearchCard(input: { probeId: string }) {
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
            value: researchData.titrantVolumeParallelFirst,
            label: "Объём титранта первая параллель, г/см^3",
          },
          {
            value: researchData.titrantVolumeParallelSecond,
            label: "Объём титранта вторая параллель, г/см^3",
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
        { value: researchData.controlVolume, label: "Объём контроля, г/см^3" },
        {
          value: researchData.coefficient,
          label: "Коэффициент",
        },
      ]}
      headerText="Белки"
      id={researchData.id}
      researchUrl={researchUrl}
    />
  );
}
