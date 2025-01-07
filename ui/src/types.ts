export interface IncomeStatementDataInterface {
  date: string; // Date in "YYYY-MM-DD" format
  symbol: string; // Stock symbol (e.g., "AAPL")
  reportedCurrency: string; // Currency (e.g., "USD")
  cik: string; // Central Index Key (SEC identifier)
  fillingDate: string; // Date the filing was submitted
  acceptedDate: string; // Date the filing was accepted
  calendarYear: string; // Calendar year (e.g., "2024")
  period: string; // Period type (e.g., "FY" for fiscal year)
  revenue: number; // Revenue (e.g., 391035000000)
  costOfRevenue: number; // Cost of revenue (e.g., 210352000000)
  grossProfit: number; // Gross profit (e.g., 180683000000)
  grossProfitRatio: number; // Gross profit ratio
  researchAndDevelopmentExpenses: number; // R&D expenses (e.g., 31370000000)
  generalAndAdministrativeExpenses: number; // General and administrative expenses
  sellingAndMarketingExpenses: number; // Selling and marketing expenses
  sellingGeneralAndAdministrativeExpenses: number; // Combined selling and general administrative expenses
  otherExpenses: number; // Other expenses
  operatingExpenses: number; // Operating expenses
  costAndExpenses: number; // Total costs and expenses
  interestIncome: number; // Interest income
  interestExpense: number; // Interest expense
  depreciationAndAmortization: number; // Depreciation and amortization
  ebitda: number; // EBITDA
  ebitdaratio: number; // EBITDA ratio
  operatingIncome: number; // Operating income
  operatingIncomeRatio: number; // Operating income ratio
  totalOtherIncomeExpensesNet: number; // Net other income/expenses
  incomeBeforeTax: number; // Income before tax
  incomeBeforeTaxRatio: number; // Income before tax ratio
  incomeTaxExpense: number; // Income tax expense
  netIncome: number; // Net income
  netIncomeRatio: number; // Net income ratio
  eps: number; // Earnings per share
  epsdiluted: number; // Diluted earnings per share
  weightedAverageShsOut: number; // Weighted average shares outstanding
  weightedAverageShsOutDil: number; // Weighted average shares outstanding (diluted)
  link: string; // Link to the SEC filing
  finalLink: string; // Final link to the SEC filing
}
