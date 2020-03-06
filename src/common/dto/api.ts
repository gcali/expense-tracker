export type InsertResult = { isOk: false } | { isOk: true, id: number };
export interface RemoveResult { hasRemoved: boolean; }

export interface ExpenseFilters {
    owner?: string;
    mineOnly?: boolean;
}
