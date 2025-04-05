import { HeaderProps } from "./types";
export function Header({ menu }: HeaderProps) {
    return (
      <header>
        {menu.map((item, index) => (
          <h1 key={index}>{item}</h1>
        ))}
      </header>
    );
  }