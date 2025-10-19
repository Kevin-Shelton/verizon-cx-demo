import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Download, Filter, ChevronRight, TrendingUp, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import journeyData from "../../../data/journey.json";
import categoriesData from "../../../data/categories.json";
import { calculateStageCoverage, calculateOverallCoverage, getCoverageDot, getCoverageColor } from "@shared/journeyUtils";
import type { Activity, Coverage, Pillar } from "@shared/types";

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
    <div className="space-y-8 pb-8">
      {/* Hero Section with Coverage Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-2xl p-8 border border-primary/20"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-3">
              R2B Journey Coverage
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive analysis of multilingual solution coverage across the entire customer journey
            </p>
          </div>
          <div className="flex flex-col items-center bg-background rounded-xl p-6 shadow-lg border-2 border-primary/30 min-w-[180px]">
            <TrendingUp className="h-8 w-8 text-primary mb-2" />
            <div className="text-6xl font-bold text-primary mb-1">
              {overallCoverage}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              Overall Coverage
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold mb-4 text-foreground">Filter by Business Category</h2>
        <div className="flex flex-wrap gap-3">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="flex flex-col items-center h-auto py-4 px-6 rounded-xl transition-all hover:scale-105"
          >
            <span className="text-xs font-normal opacity-80">All Stages</span>
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
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Advanced Filters</CardTitle>
              <CardDescription>Refine your view by pillar, coverage level, or gaps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
      <div className="space-y-6">
        {filteredStages.map((stage, stageIndex) => {
          const stageCoverage = calculateStageCoverage(stage as any);

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: stageIndex * 0.1 }}
            >
              <Card className="border-2 hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-background">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="text-3xl font-bold text-foreground mb-2">
                        {stage.name}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {stage.activities.length} activities tracked
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-4xl font-bold text-primary">
                          {stageCoverage}%
                        </div>
                        <div className="text-sm text-muted-foreground">Coverage</div>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${stageCoverage}%` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                              <div className="font-semibold text-foreground mb-1">
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
                            <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
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
                    <p className="text-muted-foreground leading-relaxed">
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
                      <p className="text-muted-foreground leading-relaxed">
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
                          className="w-full justify-between"
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

      {/* Legend */}
      <Card className="sticky bottom-4 shadow-lg border-2">
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium">Full Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <span className="font-medium">Partial Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="font-medium">Not Covered</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

