import { Colors } from '../colors';

export interface CardProduct {
  id: string;
  name: string;
  type: 'CREDIT' | 'DEBIT';
  category: 'PREMIUM' | 'LIFESTYLE' | 'BUSINESS' | 'VIRTUAL';
  cardholderName: string;
  cardNumber: string; // e.g. "5412 8839 2049 4289"
  expiry: string;
  cvv: string;
  network: 'MASTERCARD' | 'VISA' | 'AMEX';
  gradient: string[];
  textColor: string;
  accentColor: string;
  creditLimit?: number;
  availableLimit?: number;
  dailyLimit?: number;
  apr?: string;
  annualFee: string;
  cashback: string;
  perks: string[];
  isFrozen: boolean;
  onlinePayments: boolean;
  internationalUsage: boolean;
  contactless: boolean;
  status: 'ACTIVE' | 'PENDING' | 'FROZEN';
}

export interface CRMLead {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  creditScore: number;
  requestedProduct: string;
  productType: 'CREDIT' | 'DEBIT';
  requestedLimit: number;
  annualIncome: string;
  stage: 'KYC_REVIEW' | 'UNDERWRITING' | 'APPROVED' | 'DISPATCHED';
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  appliedDate: string;
}

export interface CardTransaction {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  cardName: string;
  type: 'CREDIT' | 'DEBIT';
  status: 'COMPLETED' | 'PENDING' | 'REWARDS_CREDITED';
  cashbackEarned: number;
}

export const INITIAL_CARDS: CardProduct[] = [
  {
    id: 'card-1',
    name: 'Titanium Obsidian Elite',
    type: 'CREDIT',
    category: 'PREMIUM',
    cardholderName: 'SACHIN SHARMA',
    cardNumber: '5420 8921 4402 7821',
    expiry: '09/29',
    cvv: '842',
    network: 'MASTERCARD',
    gradient: [Colors.charcoal, Colors.slateDark, Colors.slateDarkest],
    textColor: Colors.slateGhost,
    accentColor: Colors.cyan,
    creditLimit: 50000,
    availableLimit: 38450,
    apr: '14.99%',
    annualFee: '$495 (Waived Y1)',
    cashback: '3.5% Unlimited',
    perks: ['24/7 Global Concierge', 'Airport LoungeKey Pass', 'Zero Foreign FX Fee', '$500 Travel Credit'],
    isFrozen: false,
    onlinePayments: true,
    internationalUsage: true,
    contactless: true,
    status: 'ACTIVE',
  },
  {
    id: 'card-2',
    name: 'Sapphire Horizon Travel',
    type: 'CREDIT',
    category: 'LIFESTYLE',
    cardholderName: 'SACHIN SHARMA',
    cardNumber: '4532 9941 7102 3345',
    expiry: '11/28',
    cvv: '291',
    network: 'VISA',
    gradient: [Colors.blueMidnight, Colors.blueDark, Colors.cyanDark],
    textColor: Colors.white,
    accentColor: Colors.blueLight,
    creditLimit: 25000,
    availableLimit: 19800,
    apr: '16.49%',
    annualFee: '$195',
    cashback: '5X Travel Points',
    perks: ['Trip Cancellation Cover', 'Car Rental Protection', '3X Dining Points', 'No Foreign Transaction Fee'],
    isFrozen: false,
    onlinePayments: true,
    internationalUsage: true,
    contactless: true,
    status: 'ACTIVE',
  },
  {
    id: 'card-3',
    name: 'Emerald Platinum Debit',
    type: 'DEBIT',
    category: 'PREMIUM',
    cardholderName: 'SACHIN SHARMA',
    cardNumber: '5199 4432 8820 9012',
    expiry: '04/30',
    cvv: '514',
    network: 'MASTERCARD',
    gradient: [Colors.emeraldDeep, Colors.emeraldForest, Colors.emeraldDark],
    textColor: Colors.mintIce,
    accentColor: Colors.emeraldLight,
    dailyLimit: 10000,
    annualFee: '$0 Free for Life',
    cashback: '2.0% on Groceries & Fuel',
    perks: ['Free Worldwide ATM Withdrawals', 'Purchase Protection up to $5,000', 'Automated Round-Up Vaults'],
    isFrozen: false,
    onlinePayments: true,
    internationalUsage: false,
    contactless: true,
    status: 'ACTIVE',
  },
  {
    id: 'card-4',
    name: 'Cyber Neo Virtual Card',
    type: 'CREDIT',
    category: 'VIRTUAL',
    cardholderName: 'SACHIN SHARMA',
    cardNumber: '4912 6023 1184 6620',
    expiry: '01/27',
    cvv: '703',
    network: 'VISA',
    gradient: [Colors.fuchsiaPlum, Colors.fuchsiaDeep, Colors.fuchsia],
    textColor: Colors.fuchsiaIce,
    accentColor: Colors.fuchsiaLight,
    creditLimit: 12000,
    availableLimit: 11200,
    apr: '13.99%',
    annualFee: '$0 Free',
    cashback: '3% on Tech & Cloud Subscriptions',
    perks: ['Dynamic Rotating CVV', 'Instant 1-Click Merchant Lock', 'One-Time Tokenization'],
    isFrozen: false,
    onlinePayments: true,
    internationalUsage: true,
    contactless: true,
    status: 'ACTIVE',
  },
  {
    id: 'card-5',
    name: 'Apex Business Fleet Debit',
    type: 'DEBIT',
    category: 'BUSINESS',
    cardholderName: 'SACHIN SHARMA',
    cardNumber: '3782 8224 5519 2004',
    expiry: '08/30',
    cvv: '918',
    network: 'AMEX',
    gradient: [Colors.amberRust, Colors.amberDeep, Colors.amberDark],
    textColor: Colors.goldCream,
    accentColor: Colors.amberLight,
    dailyLimit: 25000,
    annualFee: '$99/yr',
    cashback: '2.5% on Fuel & Fleet Maintenance',
    perks: ['QuickBooks & Xero Sync', 'Multi-Employee Expense Caps', 'Tax Reporting Assistant'],
    isFrozen: false,
    onlinePayments: true,
    internationalUsage: true,
    contactless: true,
    status: 'ACTIVE',
  },
];

export const INITIAL_LEADS: CRMLead[] = [
  {
    id: 'lead-101',
    clientName: 'Alexander Hayes',
    email: 'a.hayes@vertexgroup.io',
    phone: '+1 (555) 392-8812',
    creditScore: 812,
    requestedProduct: 'Titanium Obsidian Elite',
    productType: 'CREDIT',
    requestedLimit: 50000,
    annualIncome: '$285,000',
    stage: 'UNDERWRITING',
    riskRating: 'LOW',
    appliedDate: '10 mins ago',
  },
  {
    id: 'lead-102',
    clientName: 'Elena Rostova',
    email: 'elena.rostova@designlab.co',
    phone: '+1 (555) 714-2390',
    creditScore: 765,
    requestedProduct: 'Sapphire Horizon Travel',
    productType: 'CREDIT',
    requestedLimit: 25000,
    annualIncome: '$160,000',
    stage: 'KYC_REVIEW',
    riskRating: 'LOW',
    appliedDate: '42 mins ago',
  },
  {
    id: 'lead-103',
    clientName: 'Marcus Vance',
    email: 'marcus.v@hyperionlogistics.com',
    phone: '+1 (555) 882-1049',
    creditScore: 730,
    requestedProduct: 'Apex Business Fleet Debit',
    productType: 'DEBIT',
    requestedLimit: 20000,
    annualIncome: '$340,000',
    stage: 'APPROVED',
    riskRating: 'LOW',
    appliedDate: '2 hours ago',
  },
  {
    id: 'lead-104',
    clientName: 'Chloe Bennett',
    email: 'c.bennett@nexusmedia.org',
    phone: '+1 (555) 420-9118',
    creditScore: 692,
    requestedProduct: 'Cyber Neo Virtual Card',
    productType: 'CREDIT',
    requestedLimit: 12000,
    annualIncome: '$95,000',
    stage: 'KYC_REVIEW',
    riskRating: 'MEDIUM',
    appliedDate: '5 hours ago',
  },
  {
    id: 'lead-105',
    clientName: 'David Zhang',
    email: 'david.zhang@quantumtech.ai',
    phone: '+1 (555) 601-3329',
    creditScore: 840,
    requestedProduct: 'Emerald Platinum Debit',
    productType: 'DEBIT',
    requestedLimit: 15000,
    annualIncome: '$410,000',
    stage: 'DISPATCHED',
    riskRating: 'LOW',
    appliedDate: 'Yesterday',
  },
];

export const RECENT_TRANSACTIONS: CardTransaction[] = [
  {
    id: 'tx-1',
    merchant: 'Apple Flagship Store',
    category: 'Electronics & Hardware',
    amount: 1299.0,
    date: 'Today, 2:45 PM',
    cardName: 'Titanium Obsidian Elite',
    type: 'CREDIT',
    status: 'REWARDS_CREDITED',
    cashbackEarned: 45.46,
  },
  {
    id: 'tx-2',
    merchant: 'Delta Airlines Int.',
    category: 'Airfare & Travel',
    amount: 840.5,
    date: 'Yesterday, 8:20 AM',
    cardName: 'Sapphire Horizon Travel',
    type: 'CREDIT',
    status: 'COMPLETED',
    cashbackEarned: 42.02,
  },
  {
    id: 'tx-3',
    merchant: 'AWS Cloud Services',
    category: 'Enterprise Infrastructure',
    amount: 432.19,
    date: 'Nov 10, 11:30 PM',
    cardName: 'Cyber Neo Virtual Card',
    type: 'CREDIT',
    status: 'COMPLETED',
    cashbackEarned: 12.96,
  },
  {
    id: 'tx-4',
    merchant: 'Shell Global Fuel Station',
    category: 'Fleet & Gas',
    amount: 114.2,
    date: 'Nov 09, 6:15 PM',
    cardName: 'Apex Business Fleet Debit',
    type: 'DEBIT',
    status: 'COMPLETED',
    cashbackEarned: 2.85,
  },
];

export const CRM_STATS = {
  totalManagedPortfolio: '$4,842,500',
  portfolioGrowth: '+18.4%',
  totalCardsActive: 1428,
  creditCardsCount: 892,
  debitCardsCount: 536,
  approvalRate: '94.2%',
  avgProcessingTime: '2.4 mins',
  pendingApplications: 34,
  highValueLeads: 12,
  relationshipOfficer: {
    name: 'Sachin Sharma',
    role: 'Senior Portfolio & Card Products Director',
    branch: 'Global Wealth & Commercial Products Group',
    monthlyTarget: '$1,500,000',
    achievedTarget: '$1,280,000',
    targetPercentage: 85,
    cardsIssuedThisMonth: 184,
    commissionEarned: '$14,250',
  },
};
