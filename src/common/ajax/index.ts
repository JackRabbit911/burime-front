import axios, { AxiosError } from "axios";
import { statusSetted } from "common/store";
import { detectLang } from "common/i18n/config";

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
    // xsrfCookieName: 'XSRF-TOKEN', // Имя куки с токеном
    // xsrfHeaderName: 'X-CSRF-TOKEN', // Имя заголовка для отправки
});

ajax.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error instanceof AxiosError) {
            statusSetted(error?.status || 400)
        }

        return Promise.reject(error);
    },
);

export default ajax;
