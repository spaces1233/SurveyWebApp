import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

function NavBarButton({ href, pattern, children }) {
  const isActive = useMatch(pattern ?? (href ?? ""));
  return (
    <Link
      to={href}
      className={cn("transition-colors hover:text-foreground/80 text-foreground/60", {
        "text-foreground":isActive,
        "font-bold":isActive
      })}
    >
      {children}
    </Link>
  );
}

export default NavBarButton;
