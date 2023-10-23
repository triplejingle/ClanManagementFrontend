import BaseClanManagementBackendService from "@/services/BaseClanManagementBackendService";
import {Authorization} from "@/domain/Role";

var axios = require("axios").default;


export class AuthorizationService extends BaseClanManagementBackendService<string> {
    GetAccessToken() {
        var options = {
            method: 'POST',
            url: 'https://dev-8tnw9yyh.us.auth0.com/oauth/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: 'mKfjVuFupmKmDlGnCXrnNNBr9MMhBJHz',
                client_secret: 'iPGb2spe2ros6MQ_mDe1-UuaEj-j_9U_3pKrWfwJPb-xdeBPLp5t8zI3DvNL7j6E',
                audience: 'https://dev-8tnw9yyh.us.auth0.com/api/v2/'
            })
        };

        return axios.request(options).then(function (response: any) {
            return response.data.access_token;
        }).catch(function (error: any) {
            console.error(error);
        });
    }

    async GetRole(userId: string): Promise<Authorization[]> {
        var axios = require("axios").default;
        const accessToken = await this.GetAccessToken()
        console.log("getAccesstoken")
        console.log(accessToken);
        var options = {
            method: 'GET',
            url: "https://dev-8tnw9yyh.us.auth0.com/api/v2/users/" + userId + "/roles",
            headers: {authorization: 'Bearer ' + accessToken}
        };

        return await axios.request(options).then(function (response: { data: Authorization[] }) {
            console.log("get role")
            return response.data;
        }).catch(function (error: any) {
            console.error(error);
        });

    }


    async fetchAuthorization(userId: string): Promise<Authorization[]> {
        return await this.GetRole(userId);
    }


}