import axios from "axios";
import { detectLang } from "common/i18n/config";
import { serverErrorRecieved, statusSetted } from "common/store";

const { protocol, hostname } = window.location
const lang = detectLang()

export const host = `${protocol}//${hostname}`

const ajax = axios.create({
    baseURL: `${host}/api`,
    timeout: 10000,
    headers: {
        'Accept-Language': lang,
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Разрешает отправку кук
    withXSRFToken: true,
});

ajax.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response.status

        if (error.response) {
            if (status === 401) {
                window.location.href = host + '/auth'
            } else if (status === 422) {
                serverErrorRecieved(error.response?.data?.error)
            }
        }

        statusSetted(status)

        return Promise.reject(error);
    },
);

export default ajax;
