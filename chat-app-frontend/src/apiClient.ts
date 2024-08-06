import axios from "axios";
import {authority, client_id} from "./oidcConfig";
import {User} from "oidc-client-ts";

export function getUser() {
    const oidcStorage = sessionStorage.getItem(`oidc.user:${authority}:${client_id}`)

    if (!oidcStorage) {
        return null
    }

    return User.fromStorageString(oidcStorage)
}

const apiClient = axios.create({
    baseURL: 'http://localhost:8081/api',
})

apiClient.interceptors.request.use(
    config => {
        const user = getUser()
        const token = user?.access_token
        config.headers.setAuthorization(`Bearer ${token}`)

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default apiClient