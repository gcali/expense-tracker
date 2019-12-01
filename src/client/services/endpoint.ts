export const baseEndpoints = 'http://localhost:3000';

type HttpMethod = 'GET' | 'POST' | 'DELETE';

export const defaultHeaders = {
    jsonContent: {
        'Content-Type': 'application/json',
    },
};

function setMethod<U extends string | ((p: any) => string), T extends { url: U, defaultInit?: RequestInit }>(
    method: HttpMethod,
    src: T,
): (T & { method: HttpMethod, defaultInit: RequestInit }) {
    return {
        ...src,
        defaultInit: {
            ...src.defaultInit,
            method,
        },
        method,
    };
}

export const endpoints = {
    listExpenses: setMethod('GET', {
        url: `${baseEndpoints}/expenses`,
    }),
    insertExpense: setMethod('POST', {
        url: `${baseEndpoints}/expenses`,
        defaultInit: { headers: defaultHeaders.jsonContent },
    }),
    deleteExpense: setMethod('DELETE', {
        url: (expenseID: number) => `${baseEndpoints}/expenses/${expenseID}`,
    }),
    getOwners: setMethod('GET', {
        url: `${baseEndpoints}/owner`,
    }),
};

