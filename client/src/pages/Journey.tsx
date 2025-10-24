import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useLocation } from "wouter";
import { ChevronRight, TrendingUp, CheckCircle2, AlertCircle, XCircle, Map, Globe, ChevronLeft } from "lucide-react";
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

interface Persona {
  id: string;
  name: string;
  role: string;
  dialect: string;
  dialectLabel: string;
  description: string;
  avatar: string;
  needs: string[];
  journey: string[];
  painPoints?: string[];
  interactionNeeds?: string[];
  narrative?: string;
}

export default function Journey() {
  const [, setLocation] = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [fullCoverageExpanded, setFullCoverageExpanded] = useState(false);
  const [journeyMapExpanded, setJourneyMapExpanded] = useState(true);
  const [personasExpanded, setPersonasExpanded] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'visual'>('grid');
  const [showVisualPopup, setShowVisualPopup] = useState(false);
  const [selectedPersonaDetail, setSelectedPersonaDetail] = useState<Persona | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Persona details with pain points and interaction needs
  const personaDetails: Record<string, { painPoints: string[]; interactionNeeds: string[]; narrative: string }> = {
    carlos: {
      narrative: "Carlos runs a small retail shop in Mexico City and needs to expand his business phone lines. He starts by browsing the Verizon Business website in Mexican Spanish, comparing plans and pricing. When he has questions, he calls the IVR system and navigates in Spanish to reach a sales representative. A Verizon field sales rep visits his store with a tablet showing the in-field app, walking him through device options and the number porting process in his dialect. Carlos receives a translated contract document in Mexican Spanish via email, reviews it, and signs electronically. Throughout onboarding, he receives SMS updates and can access the customer portal in his preferred language to track his order status and manage his account.",
      painPoints: [
        "Language barriers when discussing technical details on website and with reps",
        "Confusion about porting process and timelines in IVR and documentation",
        "Difficulty understanding pricing structures in contracts and emails",
        "Concerns about business downtime during transition communicated via multiple channels"
      ],
      interactionNeeds: [
        "Website navigation and product pages in Mexican Spanish with business terminology",
        "IVR menu options and prompts in his dialect for quick issue resolution",
        "In-field sales app with Mexican Spanish interface for in-person consultations",
        "Translated contract documents and emails with clear pricing breakdowns",
        "SMS notifications in Spanish for order updates and account alerts"
      ]
    },
    maria: {
      narrative: "María manages field service technicians across Puerto Rico and needs to swap devices for her team. She visits a Verizon retail store where an associate uses the in-store tablet to check her account and promo eligibility in Caribbean Spanish. When she needs technical support, she uses the live chat feature on the website, communicating in Puerto Rican Spanish with real-time translation. She receives a translated promo redemption document via email explaining the trade-in process. When she calls the IVR to check on her device swap status, she navigates the menu in her dialect. The field sales rep follows up with her team on-site, using the mobile app to demonstrate new device features in Caribbean Spanish and providing training materials in her preferred dialect.",
      painPoints: [
        "Technical jargon in chat, IVR, and documentation that doesn't translate well to Caribbean Spanish",
        "Frustration with long wait times when calling support or visiting stores",
        "Uncertainty about promo eligibility when browsing website or receiving emails",
        "Need for quick resolution across all channels to keep field teams operational"
      ],
      interactionNeeds: [
        "Live chat support with Caribbean Spanish translation and technical context",
        "IVR system with Puerto Rican Spanish dialect recognition and menu options",
        "In-store tablets with Caribbean Spanish interface for account management",
        "Translated promo documents and emails with clear eligibility criteria",
        "In-field mobile app for on-site training and device setup in her dialect"
      ]
    },
    lucia: {
      narrative: "Lucía administers a healthcare clinic in Bogotá and receives a fraud alert via email in Colombian Spanish. She immediately calls the IVR system, which recognizes her dialect and routes her to security support. She visits the Verizon website to open a support case, navigating the authenticated portal in Latin American Spanish. A field sales rep visits her clinic with a tablet to review her account security settings and provide HIPAA-compliant documentation in Spanish. She receives a translated incident report document via email, along with step-by-step instructions for securing her account. Throughout the resolution process, she uses the live chat feature to ask questions and receives SMS updates in Colombian Spanish about her case status.",
      painPoints: [
        "Anxiety about fraud alerts received via email and SMS in unclear language",
        "Compliance concerns when reviewing documents and website terms (HIPAA)",
        "Difficulty navigating support case system on website and via IVR",
        "Need for documentation in Colombian Spanish for staff training and compliance"
      ],
      interactionNeeds: [
        "Security-focused email communications in Colombian Spanish with clear action steps",
        "IVR system with fraud alert priority routing and dialect-specific prompts",
        "Website portal with Colombian Spanish interface for case management and tracking",
        "Translated HIPAA-compliant documents and incident reports via email",
        "In-field visits with tablets showing security settings and training materials in her dialect",
        "Live chat and SMS updates in Colombian Spanish for real-time case resolution"
      ]
    },
    diego: {
      narrative: "Diego manages construction projects across the US Southwest and needs to provision 50 devices for his crew. He starts on the Verizon Business website, browsing bulk device options in US Spanish. He calls the IVR to speak with a business sales specialist, navigating the menu in Spanish. A Verizon field sales rep visits his job site with a tablet, using the in-field app to configure a fleet management solution in US Spanish. Diego receives a detailed quote document via email, translated into his dialect with flexible payment terms. He visits a Verizon store to pick up devices, where associates use in-store tablets to activate and configure each device in Spanish. Throughout the deployment, he receives SMS updates and can access the fleet management portal on the website in US Spanish to monitor usage, manage billing, and request support via live chat.",
      painPoints: [
        "Complexity of managing large device fleets across website portal and in-field app",
        "Coordination challenges across multiple job sites when calling IVR or using chat",
        "Budget constraints requiring clear pricing in documents and emails",
        "Limited time to handle telecom issues via phone, website, or in-person visits"
      ],
      interactionNeeds: [
        "Website fleet management portal with US Spanish interface and bulk ordering tools",
        "IVR system with business account priority routing and Spanish menu options",
        "In-field mobile app for on-site device provisioning and configuration in US Spanish",
        "In-store tablets for bulk device activation and setup assistance",
        "Translated quote documents and contracts via email with flexible payment options",
        "Live chat support in US Spanish for quick troubleshooting and account management",
        "SMS notifications for usage alerts, billing reminders, and service updates"
      ]
    }
  };


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

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredActivities.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredActivities, currentPage]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedPersona, selectedStage]);

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

  const handlePersonaClick = (persona: any) => {
    const details = personaDetails[persona.id];
    setSelectedPersonaDetail({
      ...persona,
      narrative: details?.narrative || '',
      painPoints: details?.painPoints || [],
      interactionNeeds: details?.interactionNeeds || []
    });
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
          {/* Top Row: Title Only */}
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
              onClick={() => scrollToSection('personas')}
              className={`px-2 md:px-4 py-2 text-xs md:text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeSection === 'personas'
                  ? 'border-white text-white'
                  : 'border-transparent text-blue-100 hover:text-white hover:border-white/50'
              }`}
            >
              Customer Personas
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
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Manage Inbound Disco Requests</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Review & Engage High Risk Accounts</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Manage Intraday Sales Alerts</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Acct Migration Handoffs</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-yellow-200">Contact Scheduled Disconnects</div>
              </div>
            </div>

            {/* Core Sales Process */}
            <div className="border-2 border-red-700 rounded-lg overflow-hidden">
              <div className="bg-red-700 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-red-700 text-xs font-bold px-2 py-1 rounded-full shadow-md">85%</div>
                <div className="text-sm font-semibold">13 hr/wk</div>
                <div className="font-bold">Core Sales Process</div>
              </div>
              <div className="bg-red-50 p-4 space-y-2">
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Manage Funnel</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Qualify Prospects</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Engage in Discovery</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Manage Opportunity</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Build & Share Quote</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-red-200">Close & Follow Up</div>
              </div>
            </div>

            {/* Service & Post Sales */}
            <div className="border-2 border-green-600 rounded-lg overflow-hidden">
              <div className="bg-green-600 text-white px-4 py-2 text-center relative">
                <div className="absolute top-2 right-2 bg-white text-green-600 text-xs font-bold px-2 py-1 rounded-full shadow-md">100%</div>
                <div className="text-sm font-semibold">4.5 hr/wk</div>
                <div className="font-bold">Service & Post Sales</div>
              </div>
              <div className="bg-green-50 p-4 space-y-2">
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Hand Off to White Glove</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Setup Support</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Port Support</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Promo & Trade-in</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Manage Post-Sales Fraud</div>
                <div className="flex justify-center"><ChevronRight className="w-4 h-4 rotate-90 text-red-600" /></div>
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-green-200">Call for Post-sale Welcome</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <WorkflowSections />
          </div>
        </div>
          )}
        </div>

        {/* Customer Personas Section - MOVED ABOVE Full Coverage Activities */}
        <div id="personas" className="mb-8">
          <button
            onClick={() => setPersonasExpanded(!personasExpanded)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 mb-4"
          >
            <span className="font-semibold text-gray-900 text-lg">Customer Personas</span>
            <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${personasExpanded ? 'rotate-90' : ''}`} />
          </button>
          {personasExpanded && (
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 shadow-lg border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Customer Personas</h3>
              <span className="ml-auto text-sm text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-300">
                Click any persona to view details
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {personasData.personas.map((persona, idx) => {
                // Get activities for this persona
                const personaActivities = fullCoverageActivities.filter(activity => 
                  getPersonasForActivity(activity.stageId).some(p => p.id === persona.id)
                );
                // Get first demo from persona's activities
                const firstDemo = personaActivities.find(a => a.demos && a.demos.length > 0)?.demos[0];
                
                return (
                  <div 
                    key={persona.id} 
                    onClick={() => handlePersonaClick(persona)}
                    className="group relative bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-400 overflow-hidden cursor-pointer"
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 transition-all duration-300 pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {persona.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-base text-gray-900 group-hover:text-blue-700 transition-colors">{persona.name}</div>
                          <div className="text-xs text-gray-600 font-medium mt-0.5">{persona.role}</div>
                          <div className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                            <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            <span className="text-xs font-semibold text-blue-700">{persona.dialectLabel}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-center text-blue-600 font-semibold group-hover:text-blue-700">
                          Click to view full profile →
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          )}
        </div>

        {/* Full Coverage Activities */}
        <div id="full-coverage" className="mb-8">
          <button
            onClick={() => setFullCoverageExpanded(!fullCoverageExpanded)}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg border border-gray-200 mb-4"
          >
            <span className="font-semibold text-gray-900 text-lg">Full Coverage Activities</span>
            <ChevronRight className={`w-5 h-5 text-gray-600 transition-transform ${fullCoverageExpanded ? 'rotate-90' : ''}`} />
          </button>
          {fullCoverageExpanded && (
        <div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filter by Persona:</label>
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Personas</option>
                  {personasData.personas.map(persona => (
                    <option key={persona.id} value={persona.id}>
                      {persona.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Filter by Stage:</label>
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
                  Showing {paginatedActivities.length} of {filteredActivities.length} activities
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
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-4">
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
                {paginatedActivities.map((activity, index) => {
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

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
          )}
        </div>
      </div>

      {/* Persona Detail Popup */}
      <Dialog open={!!selectedPersonaDetail} onOpenChange={() => setSelectedPersonaDetail(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedPersonaDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-4xl shadow-md">
                    {selectedPersonaDetail.avatar}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {selectedPersonaDetail.name}
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-600 mt-1">
                      {selectedPersonaDetail.role}
                    </DialogDescription>
                    <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span className="text-sm font-semibold text-blue-700">{selectedPersonaDetail.dialectLabel}</span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Omnichannel Journey Narrative */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Customer Journey Story
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-base">{selectedPersonaDetail.narrative || selectedPersonaDetail.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-700 border border-blue-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-purple-700 border border-purple-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      IVR
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-green-700 border border-green-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Live Chat
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-orange-700 border border-orange-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-red-700 border border-red-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Documents
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-teal-700 border border-teal-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      In-Field App
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-semibold text-indigo-700 border border-indigo-300">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      In-Store
                    </span>
                  </div>
                </div>

                {/* Key Needs */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Needs
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersonaDetail.needs.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-green-50 p-3 rounded-lg border border-green-200">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span className="text-gray-800">{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pain Points */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Pain Points
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersonaDetail.painPoints?.map((pain, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-red-50 p-3 rounded-lg border border-red-200">
                        <span className="text-red-600 mt-0.5">⚠</span>
                        <span className="text-gray-800">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interaction Needs with Verizon */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Interaction Needs with Verizon
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersonaDetail.interactionNeeds?.map((need, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <span className="text-blue-600 mt-0.5">→</span>
                        <span className="text-gray-800">{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Visual Flow Popup - keeping existing implementation */}
      {showVisualPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowVisualPopup(false)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
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
              {/* Persona Narrative Section */}
              {selectedPersona !== 'all' && (() => {
                const persona = personasData.personas.find(p => p.id === selectedPersona);
                if (!persona) return null;
                return (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-green-100 border-3 border-green-500 flex items-center justify-center text-3xl shadow-lg">
                        {persona.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{persona.name} - {persona.role}</h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {persona.description}
                        </p>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase">Key Needs</p>
                            <ul className="text-sm text-gray-700 mt-1 space-y-0.5">
                              {persona.needs.map((need: string, idx: number) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-green-600 mt-0.5">✓</span>
                                  <span>{need}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-600 uppercase">Journey Coverage</p>
                            <div className="text-sm text-gray-700 mt-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-blue-700">{persona.dialectLabel}</span>
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {fullCoverageActivities.filter(a => a.personas?.includes(persona.id)).length} touchpoints covered
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Visual Flow Content */}
              <div className="flex items-start gap-6 overflow-x-auto pb-6" style={{ minWidth: 'max-content' }}>
                {/* Verizon Rep Icon */}
                <div className="flex flex-col items-center sticky left-0 bg-white z-10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg border-4 border-white">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="font-bold text-gray-900">Verizon Rep</div>
                    <div className="text-xs text-gray-600">Actions</div>
                  </div>
                </div>

                {/* Parent Activity Cards with Subprocesses */}
                {journeyData.stages.map((stage) => {
                  return stage.activities.map((activity) => {
                    // Filter subprocesses based on selected persona
                    const relevantSubprocesses = activity.subprocesses?.filter((subprocess: any) => {
                      if (subprocess.coverage !== 'full') return false;
                      if (selectedPersona === 'all') return true;
                      return subprocess.personas?.includes(selectedPersona);
                    }) || [];

                    if (relevantSubprocesses.length === 0) return null;

                    const stageColors: Record<string, { bg: string; border: string; text: string }> = {
                      'outbound': { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-700' },
                      'qualification': { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },
                      'proposal': { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },
                      'negotiation': { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-700' },
                      'onboarding': { bg: 'bg-red-50', border: 'border-red-400', text: 'text-red-700' },
                      'support': { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700' },
                      'expansion': { bg: 'bg-green-50', border: 'border-green-400', text: 'text-green-700' }
                    };

                    const colors = stageColors[stage.id] || { bg: 'bg-gray-50', border: 'border-gray-400', text: 'text-gray-700' };

                    return (
                      <div key={`${stage.id}-${activity.id}`} className="relative flex items-center gap-6">
                        {/* Parent Activity Card */}
                        <div className={`flex flex-col ${colors.bg} border-2 ${colors.border} rounded-lg shadow-lg min-h-[400px] w-64`}>
                          {/* Header */}
                          <div className={`${colors.border.replace('border-', 'bg-')} text-white px-4 py-3 rounded-t-lg`}>
                            <div className="text-xs font-semibold opacity-90">{stage.name}</div>
                            <div className="font-bold text-sm mt-1">{activity.label}</div>
                          </div>

                          {/* Subprocesses */}
                          <div className="flex-1 p-3 space-y-2">
                            {relevantSubprocesses.map((subprocess: any, idx: number) => (
                              <div key={subprocess.id} className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                <div className="flex items-start gap-2 mb-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-xs font-medium text-gray-900 leading-tight">{subprocess.label}</span>
                                </div>
                                {subprocess.channels && subprocess.channels.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mb-2">
                                    {subprocess.channels.map((channel: string) => (
                                      <Badge key={channel} variant="secondary" className="text-[10px] px-1.5 py-0.5">
                                        {channel}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                                {subprocess.demos && subprocess.demos.length > 0 && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full text-[10px] h-6 px-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-700"
                                    onClick={() => {
                                      setShowVisualPopup(false);
                                      handleOpenDemo(subprocess.demos[0]);
                                    }}
                                  >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Demo
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Arrow between cards - positioned at 200px from top (50% of 400px) */}
                        <div className="absolute left-full ml-2" style={{ top: '200px', transform: 'translateY(-50%)' }}>
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    );
                  });
                })}

                {/* Customer Persona Icons on Right */}
                {selectedPersona !== 'all' ? (
                  <div className="flex flex-col items-center sticky right-0 bg-white z-10">
                    {(() => {
                      const persona = personasData.personas.find(p => p.id === selectedPersona);
                      if (!persona) return null;
                      return (
                        <>
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-5xl shadow-lg border-4 border-white">
                            {persona.avatar}
                          </div>
                          <div className="mt-2 text-center">
                            <div className="font-bold text-gray-900">{persona.name}</div>
                            <div className="text-xs text-gray-600">{persona.role}</div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 sticky right-0 bg-white z-10">
                    {personasData.personas.map(persona => (
                      <div key={persona.id} className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-3xl shadow-md border-2 border-white">
                          {persona.avatar}
                        </div>
                        <div className="text-xs font-semibold text-gray-700 mt-1">{persona.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

