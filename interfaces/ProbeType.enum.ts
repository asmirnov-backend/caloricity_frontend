export enum ProbeType {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export const ProbeTypeMap = {
  [ProbeType.FIRST]: "Первое",
  [ProbeType.SECOND]: "Второе",
  [ProbeType.THIRD]: "Третье",
} as const;

export function getDefaultMassNaveskiByProbeType(probeType: string | null) {
  return probeType?.toUpperCase() === ProbeType.SECOND ? 5 : 10;
}
