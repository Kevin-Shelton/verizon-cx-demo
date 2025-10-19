import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import PersonaJourney from "./pages/PersonaJourney";
import Personas from "./pages/Personas";
import Journey from "./pages/Journey";
import Experiences from "./pages/Experiences";
import Chat from "./pages/experiences/Chat";
import ROICalculator from "./pages/ROICalculator";
import TranslationDemo from "./pages/TranslationDemo";
import JourneyHeatmap from "./pages/JourneyHeatmap";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path="/personas" component={Personas} />
        <Route path="/persona-journey" component={PersonaJourney} />
        <Route path="/journey" component={Journey} />
        <Route path="/experiences" component={Experiences} />
        <Route path={"/experiences/chat"} component={Chat} />
        <Route path={"/roi-calculator"} component={ROICalculator} />
        <Route path={"/translation-demo"} component={TranslationDemo} />
        <Route path={"/journey-heatmap"} component={JourneyHeatmap} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
