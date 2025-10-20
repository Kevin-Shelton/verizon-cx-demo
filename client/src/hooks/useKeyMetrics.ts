import keyMetricsData from '../../../data/keyMetrics.json';

interface KeyMetrics {
  verizonFinancials: {
    totalWirelessConnections: number;
    totalWirelessConnectionsUnit: string;
    hispanicCustomers: number;
    hispanicCustomersUnit: string;
    hispanicPercentage: number;
    arpa: number;
    arpaUnit: string;
    churnRate: number;
    churnRateUnit: string;
    hispanicSegmentRevenue: number;
    hispanicSegmentRevenueUnit: string;
    source: string;
  };
  marketOpportunity: {
    revenueAtRisk: number;
    revenueAtRiskUnit: string;
    revenueAtRiskPercentage: number;
    annualChurn: number;
    annualChurnUnit: string;
    churnPercentage: number;
    totalAddressableMarket: number;
    totalAddressableMarketUnit: string;
    totalOpportunity: number;
    totalOpportunityUnit: string;
    source: string;
  };
  multilingualImpact: {
    satisfactionIncrease: number;
    satisfactionIncreaseUnit: string;
    brandSwitchingRisk: number;
    brandSwitchingRiskUnit: string;
    fcrImprovement: number;
    fcrImprovementUnit: string;
    churnReduction: number;
    churnReductionUnit: string;
    premiumPricingTolerance: number;
    premiumPricingToleranceUnit: string;
    premiumPricingAmount: number;
    premiumPricingAmountUnit: string;
    churnSavings: number;
    churnSavingsUnit: string;
    source: string;
  };
  invictusSolution: {
    annualReturn: number;
    annualReturnUnit: string;
    expectedROI: number;
    expectedROIUnit: string;
    paybackPeriod: number;
    paybackPeriodUnit: string;
    implementationCost: number;
    implementationCostUnit: string;
    pilotDuration: number;
    pilotDurationUnit: string;
    source: string;
  };
  customerExperience: {
    csatBefore: number;
    csatAfter: number;
    csatImprovement: number;
    csatImprovementUnit: string;
    npsBefore: number;
    npsAfter: number;
    npsImprovement: number;
    npsImprovementUnit: string;
    fcrBefore: number;
    fcrAfter: number;
    fcrImprovement: number;
    fcrImprovementUnit: string;
    retentionBefore: number;
    retentionAfter: number;
    retentionImprovement: number;
    retentionImprovementUnit: string;
    source: string;
  };
  operationalMetrics: {
    ahtReduction: number;
    ahtReductionUnit: string;
    repeatCallReduction: number;
    repeatCallReductionUnit: string;
    ivrAbandonment: number;
    ivrAbandonmentUnit: string;
    salesConversionIncrease: number;
    salesConversionIncreaseUnit: string;
    emotionalConnectionIncrease: number;
    emotionalConnectionIncreaseUnit: string;
    source: string;
  };
  translationQuality: {
    genericQuality: number;
    genericQualityUnit: string;
    mexicanQuality: number;
    mexicanQualityUnit: string;
    puertoRicanQuality: number;
    puertoRicanQualityUnit: string;
    colombianQuality: number;
    colombianQualityUnit: string;
    usSpanishQuality: number;
    usSpanishQualityUnit: string;
    source: string;
  };
  journeyMetrics: {
    conversionBefore: number;
    conversionAfter: number;
    conversionImprovement: number;
    conversionImprovementUnit: string;
    churnBefore: number;
    churnAfter: number;
    churnReduction: number;
    churnReductionUnit: string;
    clvBefore: number;
    clvAfter: number;
    clvIncrease: number;
    clvIncreaseUnit: string;
    recommendationsBefore: number;
    recommendationsAfter: number;
    recommendationsIncrease: number;
    recommendationsIncreaseUnit: string;
    source: string;
  };
  displayFormats: {
    currency: {
      billions: string;
      millions: string;
      thousands: string;
      dollars: string;
    };
    percentage: {
      standard: string;
      decimal: string;
      improvement: string;
      reduction: string;
    };
    multiplier: {
      roi: string;
      standard: string;
    };
    time: {
      months: string;
      weeks: string;
      years: string;
    };
    count: {
      millions: string;
      thousands: string;
      standard: string;
    };
  };
}

const keyMetrics = keyMetricsData as KeyMetrics;

/**
 * Hook to access centralized key metrics
 * All metrics are sourced from /data/keyMetrics.json
 * 
 * Usage:
 * const { verizonFinancials, marketOpportunity, formatCurrency } = useKeyMetrics();
 * 
 * Example:
 * const revenue = formatCurrency(verizonFinancials.hispanicSegmentRevenue, 'billions');
 * // Returns: "$9.72B"
 */
export function useKeyMetrics() {
  const formatCurrency = (value: number, type: 'billions' | 'millions' | 'thousands' | 'dollars' = 'dollars'): string => {
    switch (type) {
      case 'billions':
        return `$${value}B`;
      case 'millions':
        return `$${value}M`;
      case 'thousands':
        return `$${value}K`;
      default:
        return `$${value.toLocaleString()}`;
    }
  };

  const formatPercentage = (value: number, type: 'standard' | 'decimal' | 'improvement' | 'reduction' = 'standard'): string => {
    const formatted = type === 'decimal' ? value.toFixed(1) : Math.round(value);
    switch (type) {
      case 'improvement':
        return `+${formatted}%`;
      case 'reduction':
        return `-${formatted}%`;
      default:
        return `${formatted}%`;
    }
  };

  const formatMultiplier = (value: number, type: 'roi' | 'standard' = 'standard'): string => {
    return type === 'roi' ? `${value.toLocaleString()}x` : `${value}x`;
  };

  const formatTime = (value: number, unit: 'months' | 'weeks' | 'years'): string => {
    return `${value} ${unit}`;
  };

  const formatCount = (value: number, type: 'millions' | 'thousands' | 'standard' = 'standard'): string => {
    switch (type) {
      case 'millions':
        return `${value}M`;
      case 'thousands':
        return `${value}K`;
      default:
        return value.toLocaleString();
    }
  };

  return {
    ...keyMetrics,
    formatCurrency,
    formatPercentage,
    formatMultiplier,
    formatTime,
    formatCount,
  };
}

