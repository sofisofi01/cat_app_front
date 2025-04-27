import { PropsWithChildren } from "react";

export type PopupMods = "noPadding" | "outerIcon";

export type PopupProps = PropsWithChildren & {
  onClose: () => void;
  isOpen: boolean;
  mods?: PopupMods[];
};
