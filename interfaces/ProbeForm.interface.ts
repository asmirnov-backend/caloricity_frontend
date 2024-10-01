import { ProbeType } from "./ProbeType.enum";

export interface ProbeForm {
  name: string;
  type: ProbeType;
  code: string;
  massTheory: number;
  bankaEmptyMass: number;
  bankaWithProbeMass: number;
}
