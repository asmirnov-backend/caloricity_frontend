import ResearchCreateDropdown from "../ResearchCreateDropdown/ResearchCreateDropdown";
import DrySubstancesResearchCard from "../DrySubstancesResearchCard/DrySubstancesResearchCard";
import FatsResearchCard from "../FatsResearchCard/FatsResearchCard";
import CarbohydratesResearchCard from "../CarbohydratesResearchCard/CarbohydratesResearchCard";
import ProteinsResearchCard from "../ProteinsResearchCard/ProteinsResearchCard";

export default function Researches(input: { probeId: string }) {
  return (
    <div className="my-5 px-6 mx-auto w-full max-w-[95rem]">
      <div className="flex justify-between w-full flex-wrap md:flex-nowrap gap-4">
        <div className="flex flex-row gap-3">
          <h3 className="text-xl font-semibold">Исследования</h3>
        </div>
        <div className="flex flex-row gap-3 min-w-[20%]">
          <ResearchCreateDropdown probeId={input.probeId} />
        </div>
      </div>
      <div className="gap-4 mt-5 grid sm:grid-cols-3">
        <DrySubstancesResearchCard probeId={input.probeId} />
        <CarbohydratesResearchCard probeId={input.probeId} />
        <FatsResearchCard probeId={input.probeId} />
        <ProteinsResearchCard probeId={input.probeId} />
      </div>
    </div>
  );
}
