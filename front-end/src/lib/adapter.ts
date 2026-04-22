export class ApiAdapter {

    router: any
    notify: any

    static instance: ApiAdapter

    static set($: {
        router: any,
        notify: any
    }) {
        ApiAdapter.instance = {
            router: $.router,
            notify: $.notify
        }
    }

}