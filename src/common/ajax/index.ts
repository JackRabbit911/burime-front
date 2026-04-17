import axios, { AxiosError } from "axios";
import { host } from "common/constants";
import { statusSetted } from "common/store";
import { detectLang } from "common/i18n/config";

const lang = detectLang()

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
            statusSetted(error?.status || 400)
        }

        return Promise.reject(error);
    },
);

export default ajax;
