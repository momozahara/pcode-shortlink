import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Main({ children, className }: Props) {
  let main = useRef<HTMLElement>(null);
  useEffect(() => {
    setTimeout(() => {
      if (main.current) {
        main.current.style.opacity = "1";
      }
    }, 100);
  }, []);

  return (
    <main
      ref={main}
      className={className}
      style={{
        opacity: "0",
        transition: "ease-in 0.1s",
      }}
    >
      {children}
    </main>
  );
}
