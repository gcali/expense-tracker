export const setTimeoutAsync = (waitFor: number): Promise<void> => {
    const promise = new Promise<void>((resolve, reject) => {
        setTimeout(() => resolve(), waitFor);
    });

    return promise;
};
