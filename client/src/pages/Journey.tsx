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
  personas?: string[];
  parentActivity?: string;
}

export default function Journey() {
  const [, setLocation] = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [fullCoverageExpanded, setFullCoverageExpanded] = useState(false);
  const [journeyMapExpanded, setJourneyMapExpanded] = useState(true);
  const [personasExpanded, setPersonasExpanded] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'visual'>('grid');
  const [showVisualPopup, setShowVisualPopup] = useState(false);


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

  // Filter activities based on selected persona and stage
  const filteredActivities = useMemo(() => {
    return fullCoverageActivities.filter(activity => {
      const personaMatch = selectedPersona === 'all' || 
        (activity.personas && activity.personas.includes(selectedPersona));
      const stageMatch = selectedStage === 'all' || activity.stageId === selectedStage;
      return personaMatch && stageMatch;
    });
  }, [fullCoverageActivities, selectedPersona, selectedStage]);

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
        <div className="bg-white border-2 border-gray-200 rounded-lg mb-12 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Full Coverage Activities</h2>
            </div>
            <p className="text-gray-600 mb-4">Translation-ready customer touchpoints with multilingual support</p>
            
            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Persona</label>
                <select 
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Personas</option>
                  {personasData.personas.map(persona => (
                    <option key={persona.id} value={persona.id}>
                      {persona.avatar} {persona.name} - {persona.role}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Stage</label>
                <select 
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Stages</option>
                  {journeyData.stages.map(stage => (
                    <option key={stage.id} value={stage.id}>
                      {stage.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <div className="text-sm text-gray-600">
                  Showing {filteredActivities.length} of {fullCoverageActivities.length} activities
                </div>
              </div>
              <div className="flex items-end gap-2 ml-auto">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Table View
                </Button>
                <Button
                  variant={viewMode === 'visual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => { setViewMode('visual'); setShowVisualPopup(true); }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Visual Flow
                </Button>
              </div>
            </div>
          </div>
          
          {/* Compact Table View */}
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Stage</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Parent Activity</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Subprocess (Verizon Rep Action)</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Customer Personas</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Channels</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity, index) => {
                  const personas = activity.personas ? 
                    personasData.personas.filter(p => activity.personas?.includes(p.id)) : [];
                  return (
                    <tr 
                      key={`${activity.id}-${index}`}
                      className="border-b border-gray-200 hover:bg-green-50 cursor-pointer transition-colors"
                      onClick={() => handleActivityClick(activity)}
                    >
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">
                          {activity.stageName}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {activity.parentActivity || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-900">{activity.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {personas.map(persona => (
                            <div 
                              key={persona.id}
                              className="flex items-center gap-1 bg-white px-2 py-1 rounded-full border border-gray-300"
                              title={`${persona.name} - ${persona.role}`}
                            >
                              <span className="text-sm">{persona.avatar}</span>
                              <span className="text-xs font-medium text-gray-700">{persona.name}</span>
                            </div>
                          ))}
                          {personas.length === 0 && <span className="text-xs text-gray-400">-</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {activity.pillars.map((pillar) => (
                            <Badge
                              key={pillar}
                              variant="secondary"
                              className="text-xs"
                            >
                              {pillar}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

        {/* Visual Flow Popup */}
        {showVisualPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowVisualPopup(false)}>
            <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Customer Journey Visual Flow</h2>
                  <p className="text-sm text-gray-600 mt-1">Verizon Rep ↔ Customer interactions across touchpoints</p>
                </div>
                <button
                  onClick={() => setShowVisualPopup(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 h-[calc(90vh-88px)] overflow-hidden">
                {/* Horizontal Swimlane Flow */}
                {filteredActivities.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No activities match the selected filters. Please adjust your persona or stage selection.
                  </div>
                ) : (
                  <div className="h-full flex items-center gap-6">
                    {/* Left: Verizon Rep */}
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-blue-100 border-3 border-blue-500 flex items-center justify-center shadow-lg">
                        <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-sm font-bold text-blue-700 text-center">Verizon<br/>Rep</div>
                    </div>

                    {/* Center: Horizontal Flow grouped by Parent Activity */}
                    <div className="flex-1 overflow-x-auto overflow-y-hidden px-4">
                      <div className="flex items-start gap-6 pb-4">
                        {(() => {
                          // Group activities by parent activity
                          type ActivityType = typeof filteredActivities[0];
                          const parentGroups: Record<string, ActivityType[]> = {};
                          filteredActivities.forEach(activity => {
                            const key = activity.parentActivity || 'Other';
                            if (!parentGroups[key]) {
                              parentGroups[key] = [];
                            }
                            parentGroups[key].push(activity);
                          });

                          return Object.entries(parentGroups).map(([parentName, activities], groupIndex) => {
                            const stageColor = journeyData.stages.find(s => s.id === activities[0].stageId)?.color || '#6B7280';
                            return (
                              <div key={parentName} className="flex-shrink-0">
                                {/* Parent Activity Card */}
                                <div className="bg-white rounded-lg border-2 shadow-md" style={{ borderColor: stageColor, minWidth: '200px', maxWidth: '220px' }}>
                                  {/* Parent Header */}
                                  <div className="px-3 py-2 border-b" style={{ backgroundColor: `${stageColor}15`, borderColor: stageColor }}>
                                    <div className="font-semibold text-sm text-gray-900">{parentName}</div>
                                    <div className="text-[10px] text-gray-600 mt-0.5">{activities[0].stageId.replace(/-/g, ' ')}</div>
                                  </div>
                                  {/* Subprocess List */}
                                  <div className="p-2 space-y-2">
                                    {activities.map((activity: ActivityType, idx: number) => {
                                      const personas = activity.personas ? 
                                        personasData.personas.filter(p => activity.personas?.includes(p.id)) : [];
                                      return (
                                        <div key={`${activity.id}-${idx}`} className="bg-gray-50 rounded p-2 border border-gray-200">
                                          <div className="flex items-start gap-2">
                                            <div className="flex-1">
                                              <div className="font-medium text-xs text-gray-900 mb-1">{activity.label}</div>
                                              <div className="flex flex-wrap gap-1 mb-1">
                                                {activity.pillars.map((pillar: string) => (
                                                  <Badge key={pillar} variant="secondary" className="text-[9px] px-1 py-0">
                                                    {pillar}
                                                  </Badge>
                                                ))}
                                              </div>
                                              {personas.length > 0 && (
                                                <div className="flex gap-1 mt-1">
                                                  {personas.map(p => (
                                                    <span key={p.id} className="text-xs" title={p.name}>{p.avatar}</span>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                {/* Arrow to next parent */}
                                {groupIndex < Object.keys(parentGroups).length - 1 && (
                                  <div className="flex justify-center mt-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Right: Customer Personas */}
                    <div className="flex flex-col gap-3 flex-shrink-0">
                      {(() => {
                        // Get unique personas from filtered activities
                        const uniquePersonaIds = new Set<string>();
                        filteredActivities.forEach(a => {
                          if (a.personas) {
                            a.personas.forEach(pid => uniquePersonaIds.add(pid));
                          }
                        });
                        const activePersonas = personasData.personas.filter(p => uniquePersonaIds.has(p.id));
                        
                        return activePersonas.map(persona => (
                          <div key={persona.id} className="flex flex-col items-center gap-1">
                            <div className="w-16 h-16 rounded-full bg-green-100 border-3 border-green-500 flex items-center justify-center text-2xl shadow-lg">
                              {persona.avatar}
                            </div>
                            <div className="text-xs font-semibold text-green-700 text-center">{persona.name}</div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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

