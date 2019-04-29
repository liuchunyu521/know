
import axios from 'axios';

class Api {

    private _beforeRequest = () => { };
    public onBeforeRequest(cb: any) {
        this._beforeRequest = cb;
    }

    private _afterRequest = () => { };
    public onAfterRequest(cb: any) {
        this._afterRequest = cb;
    }

    private _onError = () => { };
    public onError(cb: any) {
        
        this._onError = cb;
    }


    public get(url: string, data: any) {
        console.log('get', url);
        return axios.get(url, {
            params: data
        })
        .then(resp => {
            this._afterRequest();
            if(resp.data.code == 200) {
                return resp.data.data;
            }
            throw resp.data;
        })
        .catch(err => {
            this.onError(err);
            throw err;
        });
    }

    public post(url: string, data: any = {}, json: boolean = true) {
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
                if(!resp.ok) {
                    throw new Error(resp.status + ":" + resp.statusText)
                }
                if(json) return resp.json();
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