import axios from 'axios';
import config from './config';
class Api {
    constructor() {
        this._beforeRequest = () => { };
        this._afterRequest = () => { };
        this._onError = () => { };
    }
    onBeforeRequest(cb) {
        this._beforeRequest = cb;
    }
    onAfterRequest(cb) {
        this._afterRequest = cb;
    }
    onError(cb) {
        this._onError = cb;
    }
    get(url, data) {
        console.log('get', url);
        if (config.authToken) {
            axios.defaults.headers.common['Authorization'] = config.authToken;
        }
        return axios.get(url, {
            params: { ...data, userCode: config.userCode }
        })
            .then(resp => {
            this._afterRequest();
            if (resp.data.code == 200) {
                return resp.data.data;
            }
            throw resp.data;
        })
            .catch(err => {
            this.onError(err);
            throw err;
        });
    }
    delete(url) {
        this._beforeRequest();
        if (config.authToken) {
            axios.defaults.headers.common['Authorization'] = config.authToken;
        }
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        return axios.delete(url)
            .then(resp => {
            this._afterRequest();
            return resp.data;
        })
            .catch(err => {
            console.log('error', err);
            this.onError(err);
            throw err;
        });
    }
    post(url, data = {}, json = true) {
        this._beforeRequest();
        if (config.authToken) {
            axios.defaults.headers.common['Authorization'] = config.authToken;
        }
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        return axios.post(url, { userCode: config.userCode, ...data })
            .then(resp => {
            this._afterRequest();
            if (json) {
                if (resp.data.code == 200) {
                    return resp.data;
                }
                else {
                    throw resp.data.data;
                }
            }
            return resp.data;
            // if(!resp.ok) {
            //     throw new Error(resp.status + ":" + resp.statusText)
            // }
            // if(json) return resp.json();
            // return resp;
        })
            .catch(err => {
            console.log('error', err);
            this.onError(err);
            throw err;
        });
        // return fetch(url, {
        //     method: "post",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify({ userCode: config.userCode, ...data })
        // })
        //     .then(resp => {
        //         this._afterRequest();
        //         console.log('resp', resp);
        //         if(!resp.ok) {
        //             throw new Error(resp.status + ":" + resp.statusText)
        //         }
        //         if(json) return resp.json();
        //         return resp;
        //     })
        //     .catch(err => {
        //         console.log('error', err);
        //         this.onError(err);
        //         throw err;
        //     });
    }
}
export default new Api();
