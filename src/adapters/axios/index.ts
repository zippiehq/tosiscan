import Axios from "axios";
const baseURL = process.env.BASE_URL || "http://localhost:5000" as string

function returnAxiosInstance() {
    return Axios.create({
        baseURL,
    });
}

export function get(url: string) {
    const axios = returnAxiosInstance();
    return axios.get(url);
}

export function post(url: string, requestData: any) {
    const axios = returnAxiosInstance();
    return axios.post(url, requestData);
}
