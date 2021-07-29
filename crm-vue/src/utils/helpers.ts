/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

// Used to generate a delay
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Used with api calls and logs the error
export const handleApi = async (
    promise: Promise<any>
): Promise<[any, Error | AxiosError | any]> => {
    try {
        await sleep(350);
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

export const sortByUpdatedAt = (a: any, b: any) => {
    if (a.updated_at < b.updated_at) {
        return 1;
    }
    if (a.updated_at > b.updated_at) {
        return -1;
    }
    return 0;
};

const today = () => {
    var currentDate = new Date();
    var dd = currentDate.getDate().tos;

    var mm = currentDate.getMonth() + 1;
    var yyyy = currentDate.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm;
    }
    currentDate = mm + "-" + dd + "-" + yyyy;
};
