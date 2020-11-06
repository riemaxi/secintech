
class Controller{
    constructor(login, workbench, system) {

        login.onSubmit = (user, password) => {
            system.checkAccessGrant(user, password, (data) => {
                console.log(data)
                data = JSON.parse(data)

                if (data.granted) {
                    workbench.show(user)

                    this.showDefault(workbench, system)

                    workbench.onMenuSelection = (id)=>{
                        this.manageMenuSelection(id, workbench, system)
                    }

                    system.onEvent = (id, data) => {
                        this.manageEvent(id, data, workbench, system)
                    }

                    workbench.onExit = () => login.show()

                    system.open(user, password)

                    window.onbeforeunload = (ev) => {
                        system.leaveSession(user, password)
                    }
                }

            })
        }

        login.show();
    }

    showDefault(workbench, system){
        system.deviceLocations( (data) => {workbench.showDefaultComponent(data)})
    }

    showDevices(id, workbench, system){
        system.devices( (data) => { workbench.showComponent(id, data)})
    }

    showPremises(id, workbench, system){
        system.premises( (data) => { workbench.showComponent(id, data)})
    }

    showOperation(id, workbench, system){
        system.operation( (data) => { workbench.showComponent(id, data)})
    }

    showSetting(id, workbench, system){
        system.setting( (data) => { workbench.showComponent(id, data)})
    }

    showVideo(id, workbench, system){
        system.video( (data) => { workbench.showComponent(id, data)})
    }

    showReservation(id, workbench, system){
        system.reservation( (data) => { workbench.showComponent(id, data)})
    }

    showACL(id, workbench, system){
        system.acl( (data) => { workbench.showComponent(id, data)})
    }

    showUser(id, workbench, system){
        system.user( (data) => { workbench.showComponent(id, data)})
    }

    manageEvent(id, data, workbench, system){
        switch (id) {
            case "register": this.showDevices("device", workbench, system);
        }
    }

    manageMenuSelection(id, workbench, system){
        switch (id) {
            case  "device":
                this.showDevices(id, workbench, system)
                break
            case "premise":
                this.showPremises(id, workbench, system)
                break
            case "operation":
                this.showOperation(id, workbench, system)
                break
            case "setting":
                this.showSetting(id, workbench, system)
                break
            case "video":
                this.showVideo(id, workbench, system)
                break
            case "reservation":
                this.showReservation(id, workbench, system)
                break
            case "acl":
                this.showACL(id, workbench, system)
                break

            case "user":
                this.showUser(id, workbench, system)
                break

            default:
                this.showDefault(workbench, system)
        }

    }
}

