import {AuthProviderProps} from "react-oidc-context";

export const authority = 'http://localhost:9080/realms/chat-app'
export const client_id = 'react-frontend'
export const redirect_uri = 'http://localhost:3000/'

const oidcConfig: AuthProviderProps = {
    authority,
    client_id,
    redirect_uri,
}

export default oidcConfig