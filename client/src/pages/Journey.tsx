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
        {/* R2B Rep Journey Map */}
        <div className="bg-white border-2 border-gray-200 rounded-lg mb-12 p-8">
          <h1 className="text-4xl font-bold text-red-700 mb-8">R2B Rep Journey Map</h1>
          
          <div className="relative">
            {/* Coverage Trend Line Overlay */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{zIndex: 10}}>
              <div className="text-xs font-semibold text-gray-700 mb-2 text-center bg-white/90 py-1 rounded">Multilingual Solution Coverage</div>
              <svg className="w-full" height="80" viewBox="0 0 1000 120" preserveAspectRatio="none">
                {/* Grid lines for reference */}
                <line x1="0" y1="80" x2="1000" y2="80" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="60" x2="1000" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="40" x2="1000" y2="40" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="0" y1="20" x2="1000" y2="20" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="5,5" />
                
                {/* Coverage trend line - horizontal left to right */}
                {/* 65% at Outbound, 92% at Selling, 78% at Churn, 85% at Service, 45% at Operational */}
                <path 
                  d="M 0 45 L 100 45 Q 150 45 200 15 L 400 15 Q 450 15 500 30 L 600 30 Q 650 30 700 22 L 800 22 Q 850 22 900 65 L 1000 65"
                  stroke="url(#coverageGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="coverageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: '#f97316', stopOpacity: 0.8}} />
                    <stop offset="25%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#ca8a04', stopOpacity: 0.9}} />
                    <stop offset="75%" style={{stopColor: '#16a34a', stopOpacity: 0.95}} />
                    <stop offset="100%" style={{stopColor: '#2563eb', stopOpacity: 0.6}} />
                  </linearGradient>
                </defs>
                
                {/* Coverage data points */}
                <circle cx="100" cy="45" r="5" fill="#f97316" stroke="white" strokeWidth="2" />
                <circle cx="300" cy="15" r="6" fill="#dc2626" stroke="white" strokeWidth="2" />
                <circle cx="500" cy="30" r="5" fill="#ca8a04" stroke="white" strokeWidth="2" />
                <circle cx="700" cy="22" r="5" fill="#16a34a" stroke="white" strokeWidth="2" />
                <circle cx="900" cy="65" r="4" fill="#2563eb" stroke="white" strokeWidth="2" />
                
                {/* Percentage labels */}
                <text x="100" y="40" textAnchor="middle" fontSize="10" fill="#f97316" fontWeight="bold">65%</text>
                <text x="300" y="10" textAnchor="middle" fontSize="12" fill="#dc2626" fontWeight="bold">92%</text>
                <text x="500" y="25" textAnchor="middle" fontSize="10" fill="#ca8a04" fontWeight="bold">78%</text>
                <text x="700" y="17" textAnchor="middle" fontSize="11" fill="#16a34a" fontWeight="bold">85%</text>
                <text x="900" y="60" textAnchor="middle" fontSize="10" fill="#2563eb" fontWeight="bold">45%</text>
              </svg>
            </div>
            
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
                <div className="text-sm font-medium text-center py-2 bg-white rounded border border-blue-200">Participate in Internal Meetings</div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Workflow Sections */}
        <WorkflowSections />
        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Filter by Business Category</h2>
          <p className="text-gray-600 mb-6">
            Select a category to see coverage for specific business workflows and time allocations
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="flex flex-col items-center h-auto py-4 px-6 rounded-xl transition-all hover:scale-105 bg-blue-600 hover:bg-blue-700"
            >
              <span className="text-xs font-normal opacity-90">All Stages</span>
              <span className="text-2xl font-bold mt-1">{overallCoverage}%</span>
            </Button>
            {categoriesData.categories.map((category) => {
              const categoryStages = journeyData.stages.filter(s => category.stages.includes(s.id));
              const categoryCoverage = categoryStages.length > 0
                ? Math.round(categoryStages.reduce((sum, stage) => {
                    return sum + calculateStageCoverage(stage as any);
                  }, 0) / categoryStages.length)
                : 0;
              
              const isSelected = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant="outline"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex flex-col items-center h-auto py-4 px-6 rounded-xl transition-all hover:scale-105 border-2"
                  style={{
                    backgroundColor: isSelected ? category.color : undefined,
                    borderColor: isSelected ? category.color : category.color + "40",
                    color: isSelected ? "white" : undefined,
                  }}
                >
                  <span className="text-xs font-normal" style={{ opacity: isSelected ? 0.9 : 0.7 }}>
                    {category.hoursPerWeek} hr/wk
                  </span>
                  <span className="font-semibold text-sm mt-1">{category.name}</span>
                  <span className="text-2xl font-bold mt-1">{categoryCoverage}%</span>
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2 mb-4"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide" : "Show"} Advanced Filters
          </Button>

          {showFilters && (
            <Card className="border-2 shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle>Advanced Filters</CardTitle>
                <CardDescription>Refine your view by pillar, coverage level, or gaps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <SelectItem value="web">Website</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                        <SelectItem value="ivr">IVR</SelectItem>
                        <SelectItem value="documents">Documents</SelectItem>
                        <SelectItem value="field">Field</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Coverage Level</Label>
                    <Select
                      value={filters.coverage.length > 0 ? filters.coverage[0] : "all"}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          coverage: value === "all" ? [] : [value as Coverage],
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="full">🟢 Full Coverage</SelectItem>
                        <SelectItem value="partial">🟡 Partial Coverage</SelectItem>
                        <SelectItem value="none">🔴 Not Covered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      id="only-gaps"
                      checked={filters.onlyGaps}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, onlyGaps: checked })
                      }
                    />
                    <Label htmlFor="only-gaps">Show only gaps</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {/* Journey Stages */}
        <div className="space-y-8">
          {filteredStages.map((stage, stageIndex) => {
            const stageCoverage = calculateStageCoverage(stage as any);

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: stageIndex * 0.1 }}
              >
                <Card className="border-2 hover:shadow-xl transition-shadow shadow-md">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                          {stage.name}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-600">
                          {stage.activities.length} activities tracked across this stage
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-5xl font-bold text-blue-600">
                            {stageCoverage}%
                          </div>
                          <div className="text-sm text-gray-600 font-medium">Coverage</div>
                        </div>
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-6 h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                        style={{ width: `${stageCoverage}%` }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {stage.activities.map((activity, activityIndex) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: stageIndex * 0.1 + activityIndex * 0.05 }}
                        >
                          <button
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-md ${getCoverageBg(activity.coverage as Coverage)}`}
                            onClick={() => handleActivityClick(activity as Activity)}
                          >
                            <div className="flex items-start gap-3">
                              {getCoverageIcon(activity.coverage as Coverage)}
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 mb-1">
                                  {activity.label}
                                </div>
                                {activity.pillars.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {activity.pillars.slice(0, 3).map((pillar) => (
                                      <Badge key={pillar} variant="secondary" className="text-xs">
                                        {pillar}
                                      </Badge>
                                    ))}
                                    {activity.pillars.length > 3 && (
                                      <Badge variant="secondary" className="text-xs">
                                        +{activity.pillars.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Educational Footer */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-md border-l-4 border-green-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            How to Use This Journey Map
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Filter by Category</h4>
              <p className="text-gray-600 text-sm">
                Use the category tabs to focus on specific business workflows like Selling, Service, or Churn Mitigation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Explore Activities</h4>
              <p className="text-gray-600 text-sm">
                Click on any activity card to see detailed coverage information, rationale, and related demos.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Identify Gaps</h4>
              <p className="text-gray-600 text-sm">
                Use the "Show only gaps" filter to quickly identify areas where multilingual coverage can be improved.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Try Related Demos</h4>
              <p className="text-gray-600 text-sm">
                Many activities link to interactive demos where you can experience the multilingual solution in action.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Detail Sheet */}
      <Sheet
        open={selectedActivity !== null}
        onOpenChange={(open) => !open && setSelectedActivity(null)}
      >
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedActivity && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3 text-2xl">
                  {getCoverageIcon(selectedActivity.coverage)}
                  {selectedActivity.label}
                </SheetTitle>
                <SheetDescription>
                  <Badge
                    variant="secondary"
                    className={`${getCoverageColor(selectedActivity.coverage)} text-base px-3 py-1`}
                  >
                    {selectedActivity.coverage.toUpperCase()} Coverage
                  </Badge>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Rationale</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedActivity.rationale}
                    </p>
                  </CardContent>
                </Card>

                {selectedActivity.gaps && (
                  <Card className="border-yellow-200 bg-yellow-50/50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        Coverage Gaps
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedActivity.gaps}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {selectedActivity.pillars.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Enabled Pillars</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {selectedActivity.pillars.map((pillar) => (
                          <Badge key={pillar} variant="outline" className="text-base px-3 py-1">
                            {pillar}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {selectedActivity.demos.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Related Demos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {selectedActivity.demos.map((demo) => (
                        <Button
                          key={demo}
                          variant="default"
                          className="w-full justify-between bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleOpenDemo(demo)}
                        >
                          <span>Open {demo.split("/").pop()} Demo</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

