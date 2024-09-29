import { BrowserRouter } from "react-router-dom";
import MainRouter from "@/router/MainRouter";
import HydrationGate from "@/components/HydrationGate/HydrationGate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {Toaster} from '@/components/ui/toaster'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationGate>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </HydrationGate>
      <Toaster/>
      {/* only in dev mode */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
