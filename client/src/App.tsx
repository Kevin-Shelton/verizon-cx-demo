import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Login from "@/pages/Login";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import PersonaJourney from "./pages/PersonaJourney";
import Personas from "./pages/Personas";
import Journey from "./pages/Journey";
import Experiences from "./pages/Experiences";
import Chat from "./pages/experiences/Chat";
import ROICalculator from "./pages/ROICalculator";
import Videos from "./pages/Videos";

import ResearchSources from "./pages/ResearchSources";
import ExecutiveIntroduction from "./pages/ExecutiveIntroduction";
import ExecutiveIntroductionV2 from './pages/ExecutiveIntroductionV2';
import OutboundProspecting from './pages/OutboundProspecting';
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      {/* Public route - Login page */}
      <Route path="/login" component={Login} />
      
      {/* All other routes are protected */}
      <Route>
        <ProtectedRoute>
          <MainLayout>
            <Switch>
              <Route path={"/"} component={Home} />
              <Route path="/executive-intro" component={ExecutiveIntroductionV2} />
              <Route path="/executive-intro-old" component={ExecutiveIntroduction} />
              <Route path="/outbound-prospecting" component={OutboundProspecting} />
              <Route path="/videos" component={Videos} />
              <Route path="/personas" component={Personas} />
              <Route path="/persona-journey" component={PersonaJourney} />
              <Route path="/journey" component={Journey} />
              <Route path="/experiences" component={Experiences} />
              <Route path={"/experiences/chat"} component={Chat} />
              <Route path={"/roi-calculator"} component={ROICalculator} />

              <Route path={'/research-sources'} component={ResearchSources} />
              <Route path={"/admin"} component={Admin} />
              <Route path={"/terms"} component={Terms} />
              <Route path={"/privacy"} component={Privacy} />
              <Route path={"/404"} component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

