import useHydration from "@/hooks/useHydration";

function HydrationGate({ children, loader }) {
  const hasHydrated = useHydration()
  

  if (!hasHydrated) {
    return <div>{loader}</div>;
  }
  return <>{children}</>;
}

export default HydrationGate;
