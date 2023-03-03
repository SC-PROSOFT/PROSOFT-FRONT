import postData from "../../postData";

export default {
    actions: {
        async _getMaestros({commit}, data) {
            commit("isLoading", null, { root: true });
            try {
                const RES = await postData({
                    url:`CONSENTIMIENTO/MAESTRO/get_all/HIC`,
                    data,
                    method: 'GET'
                })
            } catch {
                console.error.apply("_getMaestros", error);
                commit("isLoading", null, { root: true });
                return error;
            }
        },
    },
};