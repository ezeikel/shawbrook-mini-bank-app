export type Account = {
  id: string;
  name: string;
  number: string;
  balance: number;
  sortCode: number;
  type: 'current' | 'savings' | 'isa';
};

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
};

export const MOCK_ACCOUNTS: Account[] = [
  {
    id: '1',
    name: 'Current Account',
    number: '12345678',
    balance: 123456,
    sortCode: 123456,
    type: 'current',
  },
  {
    id: '2',
    name: 'Savings Account',
    number: '87654321',
    balance: 245067, 
    sortCode: 123456,
    type: 'savings',
  },
  {
    id: '3',
    name: 'ISA Account',
    number: '11223344',
    balance: 567890,
    sortCode: 123456,
    type: 'isa',
  },
];

export const MOCK_TRANSACTIONS: { [key: string]: Transaction[] } = {
  '1': [ // Current Account transactions
    { id: '1-1', description: 'Salary Payment', amount: 120000, date: '2024-01-15', type: 'credit' },
    { id: '1-2', description: 'Grocery Store', amount: -4567, date: '2024-01-14', type: 'debit' },
    { id: '1-3', description: 'Coffee Shop', amount: -350, date: '2024-01-13', type: 'debit' },
    { id: '1-4', description: 'Transfer to Savings', amount: -50000, date: '2024-01-12', type: 'debit' },
    { id: '1-5', description: 'Online Purchase', amount: -8999, date: '2024-01-11', type: 'debit' },
  ],
  '2': [ // Savings Account transactions
    { id: '2-1', description: 'Transfer from Current', amount: 50000, date: '2024-01-12', type: 'credit' },
    { id: '2-2', description: 'Interest Payment', amount: 1234, date: '2024-01-10', type: 'credit' },
    { id: '2-3', description: 'Emergency Withdrawal', amount: -20000, date: '2024-01-08', type: 'debit' },
    { id: '2-4', description: 'Monthly Deposit', amount: 30000, date: '2024-01-05', type: 'credit' },
    { id: '2-5', description: 'Transfer to ISA', amount: -15000, date: '2024-01-03', type: 'debit' },
  ],
  '3': [ // ISA Account transactions
    { id: '3-1', description: 'ISA Contribution', amount: 100000, date: '2024-01-15', type: 'credit' },
    { id: '3-2', description: 'Transfer from Savings', amount: 15000, date: '2024-01-03', type: 'credit' },
    { id: '3-3', description: 'Investment Return', amount: 4567, date: '2024-01-01', type: 'credit' },
    { id: '3-4', description: 'Management Fee', amount: -1250, date: '2023-12-28', type: 'debit' },
    { id: '3-5', description: 'Dividend Payment', amount: 2345, date: '2023-12-25', type: 'credit' },
  ],
};

// formats a balance in pence to a currency string
export const formatCurrency = (pence: number): string => {
  const pounds = pence / 100;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(pounds);
};

// formats a sort code number to the standard XX-XX-XX format
export const formatSortCode = (sortCode: number): string => {
  const sortCodeStr = sortCode.toString().padStart(6, '0');
  return `${sortCodeStr.slice(0, 2)}-${sortCodeStr.slice(2, 4)}-${sortCodeStr.slice(4, 6)}`;
};

// masks an account number showing only the last 4 digits
export const maskAccountNumber = (accountNumber: string): string => {
  if (accountNumber.length <= 4) return accountNumber;
  return `****${accountNumber.slice(-4)}`;
};


// formats a transaction amount with sign and currency
export const formatTransactionAmount = (amount: number): string => {
  const sign = amount >= 0 ? '+' : '';
  return `${sign}${formatCurrency(amount)}`;
};

// Helper function to get account by ID
export const getAccountById = (id: string): Account | undefined => {
  return MOCK_ACCOUNTS.find((account: Account) => account.id === id);
};

// helper function to get transactions by account ID
export const getTransactionsByAccountId = (accountId: string): Transaction[] => {
  return MOCK_TRANSACTIONS[accountId] || [];
}; 