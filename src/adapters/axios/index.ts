import Axios, { ResponseType } from "axios";
const baseURL = process.env.REACT_APP_DATACHAIN_BASE_URL || "http://localhost:5000" as string

function returnAxiosInstance(responseType: ResponseType = "json") {
    return Axios.create({
        baseURL,
        responseType
    });
}

export function get(url: string, responseType: ResponseType) {
    const axios = returnAxiosInstance(responseType);
    return axios.get(url);
}

export function post(url: string, requestData: any) {
    const axios = returnAxiosInstance();
    return axios.post(url, requestData);
}
