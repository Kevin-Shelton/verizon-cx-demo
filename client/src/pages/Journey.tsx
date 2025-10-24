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


  // Get all activities with full coverage
  const fullCoverageActivities = useMemo(() => {
    const activities: ExtendedActivity[] = [];
    journeyData.stages.forEach(stage => {
      stage.activities.forEach(activity => {
        if (activity.coverage === 'full') {
          activities.push({
            ...activity,
            stageName: stage.name,
            stageId: stage.id
          } as ExtendedActivity);
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-8 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Map className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Journey Coverage Map</h1>
          </div>
          <p className="text-2xl text-blue-100 max-w-3xl mb-8">
            Comprehensive analysis of multilingual solution coverage across the entire customer journey
          </p>
          
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Overall Coverage</div>
              </div>
              <div className="text-5xl font-bold">{overallCoverage}%</div>
              <div className="text-sm text-blue-200 mt-1">Across all journey stages</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Full Coverage Activities</div>
              </div>
              <div className="text-5xl font-bold">{fullCoverageActivities.length}</div>
              <div className="text-sm text-blue-200 mt-1">Translation-ready touchpoints</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Customer Personas</div>
              </div>
              <div className="text-5xl font-bold">{personasData.personas.length}</div>
              <div className="text-sm text-blue-200 mt-1">Multilingual customer profiles</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* FULL COVERAGE ACTIVITIES VISUALIZATION */}
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
                          className="w-64 border-2 border-green-300 bg-green-50 hover:bg-green-100 cursor-pointer transition-all hover:shadow-lg"
                          onClick={() => handleActivityClick(activity)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <Badge variant="outline" className="text-xs bg-white">
                                {activity.stageName}
                              </Badge>
                              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                            </div>
                            <CardTitle className="text-sm leading-tight">
                              {activity.label}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            {/* Persona Icons */}
                            {personas.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {personas.map(persona => (
                                  <div 
                                    key={persona.id}
                                    className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-green-300"
                                    title={`${persona.name} - ${persona.role}`}
                                  >
                                    <span className="text-lg">{persona.avatar}</span>
                                    <span className="text-xs font-medium text-gray-700">{persona.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Pillars */}
                            <div className="flex flex-wrap gap-1 mb-3">
                              {activity.pillars.slice(0, 3).map((pillar) => (
                                <Badge
                                  key={pillar}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {pillar}
                                </Badge>
                              ))}
                              {activity.pillars.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{activity.pillars.length - 3}
                                </Badge>
                              )}
                            </div>
                            
                            {activity.demos && activity.demos.length > 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDemo(activity.demos[0]);
                                }}
                              >
                                View Demo
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                      
                      {/* Arrow between cards */}
                      {index < fullCoverageActivities.length - 1 && (
                        <ChevronRight className="w-6 h-6 text-green-600 flex-shrink-0" />
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
              {personasData.personas.map(persona => (
                <div key={persona.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-3xl">{persona.avatar}</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{persona.name}</div>
                    <div className="text-xs text-gray-600">{persona.role}</div>
                    <div className="text-xs text-gray-500">{persona.dialectLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* R2B Rep Journey Map */}
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

