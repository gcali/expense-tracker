export interface InputExpense {
    amount: number;
    description: string;
    tags: string[];
    owner: string;
}
export interface Expense extends InputExpense {
    id: number;
}
