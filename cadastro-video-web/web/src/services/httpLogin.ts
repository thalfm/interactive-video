import api from "./api";

const httpLogin = () => {
    
    return {
        logar: async (paramns: any) => {

            return api.post(`login`, paramns)
                .then((response) => {
                    return response.data;
                });
        }
    }
}
export default httpLogin;