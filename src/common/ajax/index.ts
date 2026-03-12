import axios, { AxiosError } from "axios";
import { detectLang } from "common/i18n/utils";
import { statusSetted } from "common/store";

const lang = detectLang()
const { protocol, hostname } = window.location
export const host = `${protocol}//${hostname}`

const ajax = axios.create({
    baseURL: `${host}/api`,
    timeout: 10000,
    headers: {
        'Accept-Language': lang,
        'Content-Type': 'application/json',
    },
});

ajax.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                if (hostname === 'localhost') {
                    window.location.href = `${host}:80`
                } else {
                    window.location.reload();
                }
            } else {
                statusSetted(error?.status || 400)
            }
        }

        return Promise.reject(error);
    },
);

export default ajax;
