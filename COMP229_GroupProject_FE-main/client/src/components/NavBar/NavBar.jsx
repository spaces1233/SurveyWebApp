import useGlobalStore from "@/store/GlobalStore";
import NavBarButton from "./NavBarButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/auth";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile } from "@/api/user";
import { CircleUser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

const UserDropdown = ({}) => {
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
  const handleLogoutClick = () => {
    logout();
    useGlobalStore.getState().logout();
  };
  const handleProfileClick = () => {
    navigate("/user-profile");
  };

  return (
    <div>
      {query.isSuccess ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Welcome, {query.data?.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              My Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutClick}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Skeleton className={"w-[36px] h-[36px] rounded-full"}></Skeleton>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogoutClick}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

function NavBar() {
  const isAuth = useGlobalStore((state) => state.isAuth);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <div className="text-2xl font-bold tracking-tight mr-4">
            <span className="mr-2">🐉</span>Dragon Survey
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <NavBarButton href={"/"} pattern={"/"}>
              Home
            </NavBarButton>
            <NavBarButton href={"/survey"} pattern={"/survey"}>
              Survey
            </NavBarButton>
            <NavBarButton href={"/result"} pattern={"/result"}>
              Result
            </NavBarButton>
            <NavBarButton href={"/team"} pattern={"/team"}>
              Meet Our Team
            </NavBarButton>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          {!isAuth ? (
            <Button onClick={handleLoginClick} variant="outline">
              Login / Sign up
            </Button>
          ) : null}
          {/* todo : add a text display if login*/}
          {isAuth && <UserDropdown />}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
