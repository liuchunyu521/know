

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
        return fetch(url, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": 'application/json'
            }
        }).then(resp => {
                this._afterRequest();
                return resp.json()
            })
            .catch(err => {
                this.onError(err);
            });
    }

    public post(url: string, data: any = {}) {
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
                return resp.json()
            })
            .catch(err => {
                this.onError(err);
                //throw err;
            });
    }

}

export default new Api();