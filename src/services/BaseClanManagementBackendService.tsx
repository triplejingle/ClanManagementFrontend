export default class BaseClanManagementBackendService<T> {
    serverUrl = "https://eventmanagementcomponent-dev.azurewebsites.net/"//process.env.API_URL;
    axios = require('axios');

    async create(url: string, data: T): Promise<T> {
        return await this.axios.post(
            this.serverUrl?.concat(url),
            data
        )
            .then((response: any) => {
                return response.data
            })
            .catch((response: any) => {
                return response
            })
    }

    async fetch(url: string): Promise<T[]> {
        return await this.axios.get(this.serverUrl.concat(url))
            .then((response: any) => {
                return response.data
            })
            .catch((response: any) => {
                return response
            })
    }

    async update(url: string, data: T): Promise<T> {
        return await this.axios.put(this.serverUrl.concat(url),
            data
        )
            .then((response: any) => {
                return response.data
            })
            .catch((response: any) => {
                return response;
            })
    }

    async delete(url: string): Promise<number>{
        return await this.axios.delete(this.serverUrl.concat(url))
            .then((response: any) => {
                return response.data
            })
            .catch((response: any) => {
               return  response;
            })
    }
}