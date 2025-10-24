import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useLocation } from "wouter";
import { ChevronRight, TrendingUp, CheckCircle2, AlertCircle, XCircle, Map, Globe } from "lucide-react";
import { motion } from "framer-motion";
import journeyData from "../../../data/journey.json";
import personasData from "../../../data/personas.json";

import { calculateStageCoverage, calculateOverallCoverage, getCoverageDot, getCoverageColor } from "@shared/journeyUtils";
import type { Activity, Coverage, Pillar } from "@shared/types";
import WorkflowSections from "@/components/WorkflowSections";

// Extended activity type with stage info
interface ExtendedActivity extends Activity {
  stageName: string;
  stageId: string;
}

export default function Journey() {
  const [, setLocation] = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [fullCoverageExpanded, setFullCoverageExpanded] = useState(false);
  const [journeyMapExpanded, setJourneyMapExpanded] = useState(true);
  const [personasExpanded, setPersonasExpanded] = useState(false);


  // Get all subprocesses with full coverage from the hierarchical structure
  const fullCoverageActivities = useMemo(() => {
    const activities: ExtendedActivity[] = [];
    journeyData.stages.forEach(stage => {
      stage.activities.forEach(activity => {
        // Check if activity has subprocesses
        if (activity.subprocesses && Array.isArray(activity.subprocesses)) {
          activity.subprocesses.forEach((subprocess: any) => {
            if (subprocess.coverage === 'full') {
              activities.push({
                id: subprocess.id,
                label: subprocess.label,
                coverage: subprocess.coverage,
                pillars: subprocess.channels || [],
                personas: subprocess.personas || [],
                demos: subprocess.demos || [],
                rationale: `${activity.label} - ${subprocess.label}`,
                stageName: stage.name,
                stageId: stage.id,
                parentActivity: activity.label
              } as ExtendedActivity);
            }
          });
        }
      });
    });
    return activities;
  }, []);

  // Map personas to activities based on journey stages
  const getPersonasForActivity = (stageId: string) => {
    return personasData.personas.filter(persona => 
      persona.journey.includes(stageId)
    );
  };

  const overallCoverage = useMemo(
    () => calculateOverallCoverage(journeyData.stages as any),
    []
  );



  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleOpenDemo = (demoPath: string) => {
    setLocation(demoPath);
  };

  const scrollToSection = (sectionId: string) => {
    // Collapse all sections first
    setFullCoverageExpanded(false);
    setJourneyMapExpanded(false);
    setPersonasExpanded(false);
    
    // Expand the clicked section
    if (sectionId === 'journey-map') {
      setJourneyMapExpanded(true);
    } else if (sectionId === 'full-coverage') {
      setFullCoverageExpanded(true);
    } else if (sectionId === 'personas') {
      setPersonasExpanded(true);
    }
    
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const expandAll = () => {
    setFullCoverageExpanded(true);
    setJourneyMapExpanded(true);
    setPersonasExpanded(true);
  };

  const collapseAll = () => {
    setFullCoverageExpanded(false);
    setJourneyMapExpanded(false);
    setPersonasExpanded(false);
  };

  const getCoverageIcon = (coverage: Coverage) => {
    switch (coverage) {
      case "full":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "partial":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "none":
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getCoverageBg = (coverage: Coverage) => {
    switch (coverage) {
      case "full":
        return "bg-green-50 hover:bg-green-100 border-green-200";
      case "partial":
        return "bg-yellow-50 hover:bg-yellow-100 border-yellow-200";
      case "none":
        return "bg-red-50 hover:bg-red-100 border-red-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sticky Header with Navigation */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-3 md:px-8">
          {/* Top Row: Title and Quick Actions */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-2 md:py-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <Map className="w-6 h-6 md:w-8 md:h-8" />
                <h1 className="text-lg md:text-2xl font-bold">Journey Coverage Map</h1>
              </div>
              <p className="text-blue-100 text-xs md:text-base">
                Comprehensive analysis of multilingual solution coverage across the entire customer journey
              </p>
            </div>
            <div className="flex gap-2 md:gap-3">
              <button
                onClick={expandAll}
                className="px-2 py-1 md:px-3 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 rotate-90" />
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-2 py-1 md:px-3 md:py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
              >
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 -rotate-90" />
                Collapse All
              </button>
            </div>
          </div>
          
          {/* Bottom Row: Section Navigation */}
          <nav className="flex overflow-x-auto border-t border-white/20 -mx-3 md:-mx-8 px-3 md:px-8">
            <button
              onClick={() => scrollToSection('journey-map')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'journey-map'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              R2B Journey Map
            </button>
            <button
              onClick={() => scrollToSection('full-coverage')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'full-coverage'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Full Coverage Activities
            </button>
            <button
              onClick={() => scrollToSection('personas')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'personas'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Customer Personas
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* R2B Rep Journey Map */}
        <div id="journey-map" className="mb-8">
          <button
            onClick={() => setJourneyMapExpanded(!journeyMapExpanded)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 mb-4"
          >
            <span className="font-semibold text-gray-900 text-lg">R2B Rep Journey Map</span>
            <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${journeyMapExpanded ? 'rotate-90' : ''}`} />
          </button>
          {journeyMapExpanded && (
        <div className="bg-white border-2 border-gray-200 rounded-lg mb-12 p-8">
          <h1 className="text-4xl font-bold text-red-700 mb-8">R2B Rep Journey Map</h1>
          
          <div className="grid grid-cols-5 gap-4">
            {/* Outbound Prospecting */}
            <div className="border-2 border-orange-600 rounded-lg overflow-hidden">
              <div className="bg-orange-600 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">65%</div>
                <div className="text-sm font-semibold">12 hr/wk</div>
                <div className="font-bold">Outbound Prospecting</div>
              </div>
              <div className="bg-orange-50 p-4 space-y-2">
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-orange-200">Engage Top Leads</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-orange-200">Engage Leads from Homegrown Lists</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-orange-200">Sequence Battlecard Contacts</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-orange-200">Manage Outreach Task List</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-orange-200">Check My Customer Detail</div>
              </div>
            </div>

            {/* Selling */}
            <div className="border-2 border-red-600 rounded-lg overflow-hidden">
              <div className="bg-red-600 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-red-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">92%</div>
                <div className="text-sm font-semibold">13 hr/wk</div>
                <div className="font-bold">Selling</div>
              </div>
              <div className="bg-red-50 p-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-xs font-semibold text-center py-1 bg-red-200 rounded">Virtual</div>
                  <div className="text-xs font-semibold text-center py-1 bg-red-200 rounded">In Store</div>
                  <div className="text-xs font-semibold text-center py-1 bg-red-200 rounded">Footblitz</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Participate in Sales Blitz</div>
                  <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Plan Route</div>
                  <div className="flex justify-center my-2"><ChevronRight className="w-5 h-5 text-red-600" /></div>
                  <div className="bg-red-700 text-white text-sm font-bold text-center py-2 rounded">Core Sales Process</div>
                  <div className="text-xs text-center py-2 bg-white rounded border border-red-200">Manage Funnel</div>
                  <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                  <div className="text-xs text-center py-2 bg-white rounded border border-red-200">Qualify Prospects</div>
                  <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                  <div className="text-xs text-center py-2 bg-white rounded border border-red-200">Engage in Discovery Process</div>
                  <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                  <div className="text-xs text-center py-2 bg-white rounded border border-red-200">Manage Opportunity</div>
                  <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                  <div className="text-xs text-center py-2 bg-white rounded border border-red-200">Build and Share Quote</div>
                  <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                  <div className="text-xs text-center py-2 bg-white rounded border border-red-200">Close & Follow Up</div>
                </div>
              </div>
            </div>

            {/* Churn Mitigation */}
            <div className="border-2 border-yellow-600 rounded-lg overflow-hidden">
              <div className="bg-yellow-600 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-yellow-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">78%</div>
                <div className="text-sm font-semibold">4 hr/wk</div>
                <div className="font-bold">Churn Mitigation</div>
              </div>
              <div className="bg-yellow-50 p-4 space-y-2">
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Engage in Quarterly Business Review (QBR)</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Walk Through Artemis Churn List</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Review and Engage High Risk Accounts</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Manage Intraday Sales Alerts</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Account Migration & Handoffs</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Contact Scheduled Disconnects</div>
              </div>
            </div>

            {/* Service & Post Sales */}
            <div className="border-2 border-green-600 rounded-lg overflow-hidden">
              <div className="bg-green-600 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-green-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">85%</div>
                <div className="text-sm font-semibold">4.5 hr/wk</div>
                <div className="font-bold">Service & Post Sales</div>
              </div>
              <div className="bg-green-50 p-4 space-y-2">
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Hand Off to White Glove Service Team</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Setup Support Cases</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Port Support Cases</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Mange Promo & Trade-in Support Cases</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Post-Sale Fraud Cases</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Call for Post-sale Welcome</div>
              </div>
            </div>

            {/* Operational Tasking */}
            <div className="border-2 border-blue-600 rounded-lg overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">45%</div>
                <div className="text-sm font-semibold">6 hr/wk</div>
                <div className="font-bold">Operational Tasking</div>
              </div>
              <div className="bg-blue-50 p-4 space-y-2">
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-blue-200">Train & Upskill</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-blue-200">Attend Meetings</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-blue-200">Manage Expense Reports</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-blue-200">Manage Commissions & Payroll</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-blue-200">Complete Compliance Tasks</div>
              </div>
            </div>
          </div>
        </div>
          )}
        </div>

        {/* FULL COVERAGE ACTIVITIES VISUALIZATION */}
        <div id="full-coverage" className="mb-8">
          <button
            onClick={() => setFullCoverageExpanded(!fullCoverageExpanded)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 mb-4"
          >
            <span className="font-semibold text-gray-900 text-lg">Full Coverage Activities</span>
            <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${fullCoverageExpanded ? 'rotate-90' : ''}`} />
          </button>
          {fullCoverageExpanded && (
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-4 border-green-400 rounded-2xl mb-12 p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <h2 className="text-4xl font-bold text-gray-900">Full Coverage Activities</h2>
            </div>
            <p className="text-xl text-gray-600">Translation-ready customer touchpoints with persona interactions</p>
            <p className="text-sm text-gray-500 mt-2">Only activities with complete multilingual support (excluding out-of-scope items)</p>
          </div>
          
          {/* Activities Flow Chart */}
          <div className="bg-white rounded-xl p-8 shadow-lg overflow-x-auto">
            <div className="min-w-max">
              {/* Activity Cards in Horizontal Flow */}
              <div className="flex gap-4 items-start pb-4">
                {fullCoverageActivities.map((activity, index) => {
                  const personas = getPersonasForActivity(activity.stageId);
                  return (
                    <div key={activity.id} className="flex items-center gap-2">
                      {/* Activity Card */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative"
                      >
                        <Card 
                          className="w-48 border-2 border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer transition-all hover:shadow-lg"
                          onClick={() => handleActivityClick(activity)}
                        >
                          <CardHeader className="pb-2 pt-3 px-3">
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <Badge variant="outline" className="text-[10px] px-1 py-0 bg-white">
                                {activity.stageName}
                              </Badge>
                              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                            </div>
                            <CardTitle className="text-xs leading-tight">
                              {activity.label}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0 px-3 pb-3">
                            {/* Persona Icons */}
                            {personas.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-2">
                                {personas.map(persona => (
                                  <div 
                                    key={persona.id}
                                    className="flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded-full border border-green-300"
                                    title={`${persona.name} - ${persona.role}`}
                                  >
                                    <span className="text-sm">{persona.avatar}</span>
                                    <span className="text-[10px] font-medium text-gray-700">{persona.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Pillars */}
                            <div className="flex flex-wrap gap-1">
                              {activity.pillars.slice(0, 3).map((pillar) => (
                                <Badge
                                  key={pillar}
                                  variant="secondary"
                                  className="text-[10px] px-1 py-0"
                                >
                                  {pillar}
                                </Badge>
                              ))}
                              {activity.pillars.length > 3 && (
                                <Badge variant="secondary" className="text-[10px] px-1 py-0">
                                  +{activity.pillars.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                      
                      {/* Arrow between cards */}
                      {index < fullCoverageActivities.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Customer Personas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {personasData.personas.map(persona => {
                // Get activities for this persona
                const personaActivities = fullCoverageActivities.filter(activity => 
                  getPersonasForActivity(activity.stageId).some(p => p.id === persona.id)
                );
                // Get first demo from persona's activities
                const firstDemo = personaActivities.find(a => a.demos && a.demos.length > 0)?.demos[0];
                
                return (
                  <div key={persona.id} className="flex flex-col gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{persona.avatar}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{persona.name}</div>
                        <div className="text-xs text-gray-600">{persona.role}</div>
                        <div className="text-xs text-gray-500">{persona.dialectLabel}</div>
                      </div>
                    </div>
                    {firstDemo && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                        onClick={() => handleOpenDemo(firstDemo)}
                      >
                        View Demo
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
          )}
        </div>

        {/* Workflow Sections Component */}
        <WorkflowSections />


      </div>

      {/* Activity Detail Sheet */}
      <Sheet
        open={!!selectedActivity}
        onOpenChange={(open) => !open && setSelectedActivity(null)}
      >
        <SheetContent className="overflow-y-auto">
          {selectedActivity && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                  {getCoverageIcon(selectedActivity.coverage as Coverage)}
                  <Badge variant="outline">
                    {selectedActivity.coverage} coverage
                  </Badge>
                </div>
                <SheetTitle className="text-2xl">
                  {selectedActivity.label}
                </SheetTitle>
                <SheetDescription className="text-base">
                  Multilingual solution details and implementation status
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">
                    Supported Channels
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivity.pillars.map((pillar) => (
                      <Badge key={pillar} variant="secondary" className="text-sm">
                        {pillar}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedActivity.rationale && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">
                      Coverage Rationale
                    </h3>
                    <Card className="p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          {selectedActivity.rationale}
                        </p>
                      </div>
                    </Card>
                  </div>
                )}

                {selectedActivity.gaps && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Coverage Gaps</h3>
                    <Card className="p-4 border-yellow-200 bg-yellow-50">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                          {selectedActivity.gaps}
                        </p>
                      </div>
                    </Card>
                  </div>
                )}

                {selectedActivity.demos && selectedActivity.demos.length > 0 && (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => handleOpenDemo(selectedActivity.demos[0])}
                  >
                    Launch Interactive Demo
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

