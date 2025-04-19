import { PropsWithChildren } from "react";

export type PopupProps = PropsWithChildren & {
  onClose: () => void;
  isOpen: boolean;
};
