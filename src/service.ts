import axios from "axios";

function axiosFunction(configs: any, resolve:any, reject:any ):Promise<any> {
    const instance = axios.create({
        baseURL: ""
    });

    instance.interceptors.request.use(
        async (config) => {
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            return null;
        }
    );

    return instance.request(configs).then((res) => { resolve(res?.data); }).catch((err) => { reject(err); });
}

export interface IGetClientRelationshipRequestBody {
    agent: number,
    login: number,
}

export class ClientService {
    static GetClientRelationship(data: IGetClientRelationshipRequestBody):Promise<any> {
        return new Promise((resolve, reject) => {
            let url = `http://url/api/Account`;
            const config = {
                method: "put",
                contentType: "application/json",
                url: url,
                data: data
            };

            axiosFunction(config, resolve, reject);
        });
    }

    static GetMockClientRelationship(data: IGetClientRelationshipRequestBody) {
        return fetch('data/client-relationship.json').then(res => res.json())
                .then(d => d);
    }
}