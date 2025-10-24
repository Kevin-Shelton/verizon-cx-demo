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
        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Understanding Journey Coverage
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            This interactive journey map shows how multilingual translation coverage spans across every stage of the customer lifecycle. Filter by business category to see coverage for specific workflows, or use advanced filters to identify gaps and opportunities.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900">Full Coverage</div>
                <div className="text-sm text-gray-600">Complete multilingual support</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900">Partial Coverage</div>
                <div className="text-sm text-gray-600">Limited or channel-specific</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900">Not Covered</div>
                <div className="text-sm text-gray-600">Gap or opportunity area</div>
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

