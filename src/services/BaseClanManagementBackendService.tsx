 export default class BaseClanManagementBackendService<T> {
    serverUrl = "https://localhost:7248"//process.env.API_URL;
    axios = require('axios');
    async create(url: string, data: T): Promise<T>{
        return await this.axios.post(
            this.serverUrl?.concat(url),
            data
        )
            .then( (response: any)=>{
                return response.data
            })
            .catch( (response: any)=>{
                return response
            })
    }
    async fetch(url: string ): Promise<T[]>{
        return await this.axios.get(this.serverUrl.concat(url))
            .then((response: any)=>{
                return response.data
            })
            .catch((response: any)=>{
                return response
            })
     }
}