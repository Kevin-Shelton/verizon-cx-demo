import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Download, Filter } from "lucide-react";
import { motion } from "framer-motion";
import journeyData from "../../../data/journey.json";
import { calculateStageCoverage, calculateOverallCoverage, getCoverageDot, getCoverageColor } from "@shared/journeyUtils";
import type { Activity, Coverage, Pillar } from "@shared/types";

export default function Journey() {
  const [, setLocation] = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
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
    return journeyData.stages.map((stage) => {
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
  }, [filters]);

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleOpenDemo = (demoPath: string) => {
    setLocation(demoPath);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            R2B Journey Coverage
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Overall Coverage:{" "}
            <span className="text-primary font-bold text-2xl">
              {overallCoverage}%
            </span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
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

      <div className="space-y-6">
        {filteredStages.map((stage, stageIndex) => {
          const stageCoverage = calculateStageCoverage(stage as any);

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stageIndex * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">{stage.name}</CardTitle>
                    <Badge variant="secondary" className="text-lg px-4 py-1">
                      {stageCoverage}% Coverage
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {stage.activities.map((activity) => (
                      <Button
                        key={activity.id}
                        variant="outline"
                        className="gap-2 h-auto py-3 px-4"
                        onClick={() => handleActivityClick(activity as Activity)}
                      >
                        <span className="text-lg">
                          {getCoverageDot(activity.coverage as Coverage)}
                        </span>
                        <span>{activity.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Sheet
        open={selectedActivity !== null}
        onOpenChange={(open) => !open && setSelectedActivity(null)}
      >
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedActivity && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="text-2xl">
                    {getCoverageDot(selectedActivity.coverage)}
                  </span>
                  {selectedActivity.label}
                </SheetTitle>
                <SheetDescription>
                  <Badge
                    variant="secondary"
                    className={getCoverageColor(selectedActivity.coverage)}
                  >
                    {selectedActivity.coverage.toUpperCase()} Coverage
                  </Badge>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Rationale</h3>
                  <p className="text-muted-foreground">
                    {selectedActivity.rationale}
                  </p>
                </div>

                {selectedActivity.pillars.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Enabled Pillars
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedActivity.pillars.map((pillar) => (
                        <Badge key={pillar} variant="outline">
                          {pillar}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedActivity.demos.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Related Demos
                    </h3>
                    <div className="space-y-2">
                      {selectedActivity.demos.map((demo) => (
                        <Button
                          key={demo}
                          variant="default"
                          className="w-full"
                          onClick={() => handleOpenDemo(demo)}
                        >
                          Open {demo.split("/").pop()} Demo
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Card className="sticky bottom-4">
        <CardContent className="py-4">
          <div className="flex flex-wrap gap-4 justify-center items-center text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🟢</span>
              <span>Full Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🟡</span>
              <span>Partial Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔴</span>
              <span>Not Covered</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

