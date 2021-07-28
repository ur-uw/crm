/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

// Used to generate a delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Used with api calls and logs the error
export const handleApi = async (
    promise: Promise<any>
): Promise<[any, Error | AxiosError | any]> => {
    try {
        await sleep(250);
        const data = await promise;
        return [data, null];
    } catch (err: AxiosError | any | Error) {
        console.error(err.response.data);
        return [null, err];
    }
};

// Used with vuex actions
export const handleActions = async (
    promise: Promise<any>
): Promise<[any, any | Error | AxiosError]> => {
    try {
        const data = await promise;
        return [data, null];
    } catch (err: AxiosError | any | Error) {
        return [null, err];
    }
};
