import { Providers } from "./providers";
import { Routes } from "./routes";
import { BreakpointIndicator } from "./shared/components";

function App() {
  return (
    <>
      <BreakpointIndicator />
      <Providers>
        <Routes />
      </Providers>
    </>
  );
}

export default App;
