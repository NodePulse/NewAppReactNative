import { Colors } from '../colors';
import { CRMLead } from '../data/crmData';

export interface StageBadgeInfo {
  label: string;
  bg: string;
  border: string;
  text: string;
}

export type ScoreRating = 'EXCELLENT' | 'VERY GOOD' | 'FAIR' | 'POOR';

/**
 * Returns color associated with a credit score range.
 */
export function getScoreColor(score: number): string {
  if (score >= 750) return Colors.success;
  if (score >= 700) return Colors.blueLight;
  if (score >= 650) return Colors.amberLight;
  return Colors.danger;
}

/**
 * Returns rating classification string for a credit score.
 */
export function getScoreRating(score: number): ScoreRating {
  if (score >= 750) return 'EXCELLENT';
  if (score >= 700) return 'VERY GOOD';
  if (score >= 650) return 'FAIR';
  return 'POOR';
}

/**
 * Returns stage badge metadata (label, background, border, text color).
 */
export function getStageBadge(stage: CRMLead['stage']): StageBadgeInfo {
  switch (stage) {
    case 'UNDERWRITING':
      return {
        label: 'Underwriting',
        bg: Colors.amber18,
        border: Colors.amber,
        text: Colors.amberLight,
      };
    case 'KYC_REVIEW':
      return {
        label: 'KYC In Review',
        bg: Colors.cyan18,
        border: Colors.cyan,
        text: Colors.cyan,
      };
    case 'APPROVED':
      return {
        label: 'Card Approved',
        bg: Colors.emerald20,
        border: Colors.success,
        text: Colors.success,
      };
    case 'DISPATCHED':
      return {
        label: 'Dispatched',
        bg: Colors.purple18,
        border: Colors.purpleBright,
        text: Colors.purpleLavender,
      };
  }
}

/**
 * Filters a list of CRM leads by query string and stage.
 */
export function filterLeads(
  leads: CRMLead[],
  query: string,
  filter: string = 'ALL',
): CRMLead[] {
  const normalizedQuery = query.toLowerCase().trim();

  return leads.filter(lead => {
    const matchesSearch =
      normalizedQuery.length === 0 ||
      lead.clientName.toLowerCase().includes(normalizedQuery) ||
      lead.requestedProduct.toLowerCase().includes(normalizedQuery) ||
      lead.email.toLowerCase().includes(normalizedQuery);

    if (filter === 'ALL') return matchesSearch;
    return matchesSearch && lead.stage === filter;
  });
}

