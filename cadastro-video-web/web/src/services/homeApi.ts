import api from "./api";

const httpHome = () => {

    return {
        health: async () => {

            return api.get(`health`)
                .then((response) => {
                    return response;
                });
        }
    }
}
export default httpHome;