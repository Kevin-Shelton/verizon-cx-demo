import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Download, Filter, ChevronRight, TrendingUp, CheckCircle2, AlertCircle, XCircle, Map, Globe } from "lucide-react";
import { motion } from "framer-motion";
import journeyData from "../../../data/journey.json";
import categoriesData from "../../../data/categories.json";
import { calculateStageCoverage, calculateOverallCoverage, getCoverageDot, getCoverageColor } from "@shared/journeyUtils";
import type { Activity, Coverage, Pillar } from "@shared/types";
import WorkflowSections from "@/components/WorkflowSections";

export default function Journey() {
  const [, setLocation] = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    pillar: null as Pillar | null,
    coverage: [] as Coverage[],
    onlyGaps: false,
  });

  const overallCoverage = useMemo(
    () => calculateOverallCoverage(journeyData.stages as any),
    []
  );

  const filteredStages = useMemo(() => {
    let stages = journeyData.stages;

    // Filter by category
    if (selectedCategory) {
      const category = categoriesData.categories.find(c => c.id === selectedCategory);
      if (category) {
        stages = stages.filter(stage => category.stages.includes(stage.id));
      }
    }

    return stages.map((stage) => {
      let activities = stage.activities;

      if (filters.pillar) {
        activities = activities.filter((a) =>
          a.pillars.includes(filters.pillar!)
        );
      }

      if (filters.coverage.length > 0) {
        activities = activities.filter((a) =>
          filters.coverage.includes(a.coverage as Coverage)
        );
      }

      if (filters.onlyGaps) {
        activities = activities.filter((a) => a.coverage !== "full");
      }

      return { ...stage, activities };
    }).filter((stage) => stage.activities.length > 0);
  }, [filters, selectedCategory]);

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

  // Coverage data for the 5 workflow stages
  const coverageData = [
    { stage: "Outbound\nProspecting", coverage: 65, color: "#f97316", hours: "12 hr/wk" },
    { stage: "Selling", coverage: 92, color: "#dc2626", hours: "13 hr/wk" },
    { stage: "Churn\nMitigation", coverage: 78, color: "#ca8a04", hours: "4 hr/wk" },
    { stage: "Service &\nPost Sales", coverage: 85, color: "#16a34a", hours: "4.5 hr/wk" },
    { stage: "Operational\nTasking", coverage: 45, color: "#2563eb", hours: "6 hr/wk" }
  ];

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
                <Map className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Journey Stages</div>
              </div>
              <div className="text-5xl font-bold">{journeyData.stages.length}</div>
              <div className="text-sm text-blue-200 mt-1">From awareness to advocacy</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-6 h-6 text-blue-200" />
                <div className="text-sm font-medium text-blue-200">Touchpoints</div>
              </div>
              <div className="text-5xl font-bold">
                {journeyData.stages.reduce((sum, stage) => sum + stage.activities.length, 0)}
              </div>
              <div className="text-sm text-blue-200 mt-1">Customer interaction points</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* PROMINENT COVERAGE TREND VISUALIZATION */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-4 border-blue-300 rounded-2xl mb-12 p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Multilingual Solution Coverage Trend</h2>
            <p className="text-xl text-gray-600">Coverage percentage across R2B workflow stages</p>
          </div>
          
          {/* Large Coverage Chart */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <svg className="w-full" height="400" viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet">
              {/* Y-axis labels and grid lines */}
              <line x1="80" y1="50" x2="80" y2="300" stroke="#9ca3af" strokeWidth="2" />
              <line x1="80" y1="300" x2="950" y2="300" stroke="#9ca3af" strokeWidth="2" />
              
              {/* Horizontal grid lines */}
              <line x1="80" y1="50" x2="950" y2="50" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
              <text x="60" y="55" textAnchor="end" fontSize="16" fill="#6b7280" fontWeight="600">100%</text>
              
              <line x1="80" y1="112.5" x2="950" y2="112.5" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
              <text x="60" y="117.5" textAnchor="end" fontSize="16" fill="#6b7280" fontWeight="600">75%</text>
              
              <line x1="80" y1="175" x2="950" y2="175" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
              <text x="60" y="180" textAnchor="end" fontSize="16" fill="#6b7280" fontWeight="600">50%</text>
              
              <line x1="80" y1="237.5" x2="950" y2="237.5" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
              <text x="60" y="242.5" textAnchor="end" fontSize="16" fill="#6b7280" fontWeight="600">25%</text>
              
              <line x1="80" y1="300" x2="950" y2="300" stroke="#9ca3af" strokeWidth="2" />
              <text x="60" y="305" textAnchor="end" fontSize="16" fill="#6b7280" fontWeight="600">0%</text>
              
              {/* Gradient for the trend line */}
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 1}} />
                  <stop offset="25%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
                  <stop offset="50%" style={{stopColor: '#ca8a04', stopOpacity: 1}} />
                  <stop offset="75%" style={{stopColor: '#16a34a', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#2563eb', stopOpacity: 1}} />
                </linearGradient>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
              </defs>
              
              {/* Coverage trend line - BOLD and PROMINENT */}
              {/* Points: 65% at x=206, 92% at x=380, 78% at x=554, 85% at x=728, 45% at x=902 */}
              {/* Y calculation: 300 - (coverage * 2.5) */}
              <path 
                d="M 206 137.5 L 380 70 L 554 105 L 728 87.5 L 902 187.5"
                stroke="url(#trendGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#shadow)"
              />
              
              {/* Data points - LARGE circles */}
              <circle cx="206" cy="137.5" r="14" fill="#f97316" stroke="white" strokeWidth="4" filter="url(#shadow)" />
              <circle cx="380" cy="70" r="16" fill="#dc2626" stroke="white" strokeWidth="4" filter="url(#shadow)" />
              <circle cx="554" cy="105" r="14" fill="#ca8a04" stroke="white" strokeWidth="4" filter="url(#shadow)" />
              <circle cx="728" cy="87.5" r="14" fill="#16a34a" stroke="white" strokeWidth="4" filter="url(#shadow)" />
              <circle cx="902" cy="187.5" r="14" fill="#2563eb" stroke="white" strokeWidth="4" filter="url(#shadow)" />
              
              {/* Percentage labels - LARGE and BOLD */}
              <text x="206" y="120" textAnchor="middle" fontSize="24" fill="#f97316" fontWeight="bold">65%</text>
              <text x="380" y="53" textAnchor="middle" fontSize="28" fill="#dc2626" fontWeight="bold">92%</text>
              <text x="554" y="88" textAnchor="middle" fontSize="24" fill="#ca8a04" fontWeight="bold">78%</text>
              <text x="728" y="70" textAnchor="middle" fontSize="24" fill="#16a34a" fontWeight="bold">85%</text>
              <text x="902" y="170" textAnchor="middle" fontSize="24" fill="#2563eb" fontWeight="bold">45%</text>
              
              {/* Stage labels */}
              <text x="206" y="330" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Outbound</text>
              <text x="206" y="348" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Prospecting</text>
              <text x="206" y="366" textAnchor="middle" fontSize="12" fill="#6b7280">(12 hr/wk)</text>
              
              <text x="380" y="330" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Selling</text>
              <text x="380" y="348" textAnchor="middle" fontSize="12" fill="#6b7280">(13 hr/wk)</text>
              
              <text x="554" y="330" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Churn</text>
              <text x="554" y="348" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Mitigation</text>
              <text x="554" y="366" textAnchor="middle" fontSize="12" fill="#6b7280">(4 hr/wk)</text>
              
              <text x="728" y="330" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Service &</text>
              <text x="728" y="348" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Post Sales</text>
              <text x="728" y="366" textAnchor="middle" fontSize="12" fill="#6b7280">(4.5 hr/wk)</text>
              
              <text x="902" y="330" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Operational</text>
              <text x="902" y="348" textAnchor="middle" fontSize="14" fill="#374151" fontWeight="600">Tasking</text>
              <text x="902" y="366" textAnchor="middle" fontSize="12" fill="#6b7280">(6 hr/wk)</text>
            </svg>
          </div>
          
          {/* Legend */}
          <div className="mt-8 flex justify-center gap-8 flex-wrap">
            {coverageData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow">
                <div className="w-4 h-4 rounded-full" style={{backgroundColor: item.color}}></div>
                <span className="text-sm font-semibold text-gray-700">{item.stage.replace('\n', ' ')}: {item.coverage}%</span>
              </div>
            ))}
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

        {/* Filter Controls */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Journey Stages
            </h2>
            <p className="text-gray-600">
              Explore multilingual coverage across customer touchpoints
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filter Journey Activities</CardTitle>
              <CardDescription>
                Refine the view to focus on specific pillars or coverage levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Pillar</Label>
                  <Select
                    value={filters.pillar || "all"}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        pillar: value === "all" ? null : (value as Pillar),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Pillars" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Pillars</SelectItem>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="ivr">IVR</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="field">Field Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Coverage Level</Label>
                  <div className="flex gap-2">
                    {(["full", "partial", "none"] as Coverage[]).map((cov) => (
                      <Button
                        key={cov}
                        variant={
                          filters.coverage.includes(cov) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newCoverage = filters.coverage.includes(cov)
                            ? filters.coverage.filter((c) => c !== cov)
                            : [...filters.coverage, cov];
                          setFilters({ ...filters, coverage: newCoverage });
                        }}
                      >
                        {cov}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="gaps-only"
                      checked={filters.onlyGaps}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, onlyGaps: checked })
                      }
                    />
                    <Label htmlFor="gaps-only">Show Gaps Only</Label>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={() =>
                  setFilters({
                    pillar: null,
                    coverage: [],
                    onlyGaps: false,
                  })
                }
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Journey Stages */}
        <div className="space-y-6">
          {filteredStages.map((stage, stageIndex) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stageIndex * 0.1 }}
            >
              <Card className="overflow-hidden border-l-4" style={{ borderLeftColor: getCoverageColor(calculateStageCoverage(stage as any) >= 75 ? 'full' : calculateStageCoverage(stage as any) >= 50 ? 'partial' : 'none') }}>
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="text-sm">
                          Stage {stageIndex + 1}
                        </Badge>
                        <div className="flex items-center gap-2">
                          {getCoverageDot(calculateStageCoverage(stage as any) >= 75 ? 'full' : calculateStageCoverage(stage as any) >= 50 ? 'partial' : 'none')}
                          <span className="text-sm font-medium text-gray-600">
                            {calculateStageCoverage(stage as any)}% Coverage
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{stage.name}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stage.activities.map((activity) => (
                      <motion.div
                        key={activity.id}
                        whileHover={{ scale: 1.02 }}
                        className="cursor-pointer"
                        onClick={() => handleActivityClick(activity as Activity)}
                      >
                        <Card className={`h-full border-2 transition-all ${getCoverageBg(activity.coverage as Coverage)}`}>
                          <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                              <CardTitle className="text-base leading-tight">
                                {activity.label}
                              </CardTitle>
                              {getCoverageIcon(activity.coverage as Coverage)}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-1 mb-3">
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
                            {activity.demos && activity.demos.length > 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenDemo(activity.demos[0]);
                                }}
                              >
                                View Demo
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
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

