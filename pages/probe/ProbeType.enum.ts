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
