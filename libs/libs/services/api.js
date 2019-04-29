import axios from 'axios';
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
        return axios.get(url, {
            params: data
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
    post(url, data = {}, json = true) {
        this._beforeRequest();
        return fetch(url, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ userCode: sessionStorage.getItem('code'), ...data })
        })
            .then(resp => {
            this._afterRequest();
            console.log('resp', resp);
            if (!resp.ok) {
                throw new Error(resp.status + ":" + resp.statusText);
            }
            if (json)
                return resp.json();
            return resp;
        })
            .catch(err => {
            console.log('error', err);
            this.onError(err);
            throw err;
        });
    }
}
export default new Api();
//# sourceMappingURL=api.js.map