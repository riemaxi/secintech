
class System{

    constructor(channel) {

        this.xhttp = new XMLHttpRequest()
        this.channel = channel

        this.onEvent = (id, data) => {}
    }

    open(username, password){
        let ws = new WebSocket(this.channel + "/token");
        ws.onopen = (ev) => {

            ws.onmessage = (ev) => {
                let message = JSON.parse( ev.data )

                console.log(message)

                switch (message.id) {
                    case "confirmSession":
                        this.confirmSession(message.body, password, username)
                        break
                    case "register": this.onEvent("register", message.body)
                }

            }
        }

        ws.onclose = (ev) => {
            this.leaveSession(this.token, username, password)
        }
    }

    request(query, handle){
        this.xhttp.open("GET", query, true);

        this.xhttp.onreadystatechange = ()=>{
            if (this.xhttp.readyState == 4 && this.xhttp.status == 200) {
                    handle(this.xhttp.responseText)
            }
        }
        this.xhttp.send()
    }

    confirmSession(token, username, password){
        this.token = token
        let query = `/syscommand/confirmSession/token=${token}/username=${username}/password=${password}`
        this.request(query,(data)=>{})
    }

    leaveSession(username, password){
        let query = `/syscommand/leaveSession/token=${this.token}/username=${username}/password=${password}`
        this.request(query,(data)=>{})
    }


    checkAccessGrant(username, password, handle){
        let query = `/login/${username}/${password}`
        this.request(query, handle)
    }

    deviceLocations(handle){
        this.request("/devicelocations",handle)
    }

    devices(handle){
        this.request("/devices",handle)
    }

    premises(handle){
        this.request("/premises",handle)
    }

    operation(handle){
        this.request("/operation",handle)
    }

    setting(handle){
        this.request("/setting",handle)
    }

    video(handle){
        this.request("/video",handle)
    }

    reservation(handle){
        this.request("/reservation",handle)
    }

    acl(handle){
        this.request("/acl",handle)
    }

    user(handle){
        this.request("/users",handle)
    }

}
