import httpServer from './plugins/axios'

export function getUserRole() {
    return httpServer
        .post("/supervision/getUserRole", {
            personid: commonVue.loginaComon
        })
}