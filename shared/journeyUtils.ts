import type { Activity, Coverage, Stage } from "./types";

/**
 * Get numeric weight for coverage level
 */
export function getCoverageWeight(coverage: Coverage): number {
  switch (coverage) {
    case "full":
      return 1.0;
    case "partial":
      return 0.5;
    case "none":
      return 0;
  }
}

/**
 * Calculate coverage percentage for a stage
 * Returns percentage rounded to nearest 5
 */
export function calculateStageCoverage(stage: Stage | { activities: Activity[] }): number {
  const activities = 'activities' in stage ? stage.activities : [];
  if (!activities || activities.length === 0) return 0;

  // Exclude out-of-scope activities (coverage: none) from calculation
  const inScopeActivities = activities.filter(activity => activity.coverage !== 'none');
  if (inScopeActivities.length === 0) return 0;

  const totalWeight = inScopeActivities.reduce(
    (sum, activity) => sum + getCoverageWeight(activity.coverage),
    0
  );

  const percentage = (totalWeight / inScopeActivities.length) * 100;
  return Math.round(percentage / 5) * 5; // Round to nearest 5
}

/**
 * Calculate overall coverage percentage across all stages
 */
export function calculateOverallCoverage(stages: Stage[]): number {
  if (stages.length === 0) return 0;

  // Exclude out-of-scope activities (coverage: none) from calculation
  const totalWeight = stages.reduce((sum, stage) => {
    const inScopeActivities = stage.activities.filter(activity => activity.coverage !== 'none');
    const stageWeight = inScopeActivities.reduce(
      (actSum, activity) => actSum + getCoverageWeight(activity.coverage),
      0
    );
    return sum + stageWeight;
  }, 0);

  const totalActivities = stages.reduce(
    (sum, stage) => sum + stage.activities.filter(activity => activity.coverage !== 'none').length,
    0
  );

  if (totalActivities === 0) return 0;

  const percentage = (totalWeight / totalActivities) * 100;
  return Math.round(percentage / 5) * 5; // Round to nearest 5
}

/**
 * Get color class for coverage level
 */
export function getCoverageColor(coverage: Coverage): string {
  switch (coverage) {
    case "full":
      return "text-green-600";
    case "partial":
      return "text-yellow-600";
    case "none":
      return "text-red-600";
  }
}

/**
 * Get coverage dot emoji
 */
export function getCoverageDot(coverage: Coverage): string {
  switch (coverage) {
    case "full":
      return "🟢";
    case "partial":
      return "🟡";
    case "none":
      return "🔴";
  }
}

/**
 * Filter activities by coverage level
 */
export function filterActivitiesByCoverage(
  activities: Activity[],
  coverageLevels: Coverage[]
): Activity[] {
  if (coverageLevels.length === 0) return activities;
  return activities.filter((activity) =>
    coverageLevels.includes(activity.coverage)
  );
}

