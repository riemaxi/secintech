class Component{
    constructor(html) {
        this.html = html;
    }

    elem(id, root){
        return root !== undefined ? root.getElementById(id) : document.getElementById(id);
    }

    setElem(id, value, root){
        let e = this.elem(id, root)
        if (e != undefined)
            e.innerHTML = value
    }

    show(){
        document.body.innerHTML = this.html
    }
}



class Login extends Component{
    constructor(html, host) {
        super(html);

        this.onSubmit = function(user, password){}

        this.host = host
    }

    get username(){
        return this.elem("username").value
    }

    get password(){
        return this.elem("password").value
    }

    show() {
        super.show();

        this.elem("submit").onclick = (ev) => {
            this.onSubmit(this.username, this.password);
        }

        new QRCode(this.elem("qrcode")).makeCode(this.host)
    }

}

class Menu extends Component{

    constructor(items, selection = "") {
        super("")

        this.items = items
        this.selection = selection

        this.onSelection = (id) => {}

        for (const item of this.items.getElementsByTagName("li")){
            item.onclick = (ev) =>  this.onSelection(item.id)
            item.onmouseover = (ev) => {
                item.getElementsByTagName("h3")[0].style.color = "#FFFFFF "
                item.getElementsByTagName("img")[0].style.filter = "brightness(1)"
            }

            item.onmouseleave = (ev) => {
                if (item.id !== this.selection) {
                    item.getElementsByTagName("h3")[0].style.color = "#AAAAAA"
                    item.getElementsByTagName("img")[0].style.filter = "brightness(.5)"
                }
            }
        }


    }

    select(id){
        if (id !== this.selection) {
            this.elem(id).getElementsByTagName("h3")[0].style.color = "#FFFFFF"
            this.elem(id).getElementsByTagName("img")[0].style.filter = "brightness(1)"

            if (this.selection !== "") {
                this.elem(this.selection).getElementsByTagName("h3")[0].style.color = "#AAAAAA"
                this.elem(this.selection).getElementsByTagName("img")[0].style.filter = "brightness(.5)"
            }

            this.selection = id
        }

    }
}

class WorkComponent extends Component{
    constructor(html) {
        super(html);
    }

    columns(header){
        return header.map(v => JSON.parse(`{"title" : "${v}", "visible" : ${v.startsWith("_")?"false":"true"}}`))
    }

    show(area, data){
        area.innerHTML = this.html

        if (data != undefined) {
            data = JSON.parse(data)

            $("#dataview").DataTable(
                {
                    "paging":   false,
                    "ordering": true,
                    "info":     false,
                    "searching": false,

                    columns: this.columns(data.header),
                    data: data.tail
                }
            )
        }
    }
}

class Dashboard extends WorkComponent{
    constructor(html) {
        super(html);

    }

}

class Device extends WorkComponent{
    constructor(html) {
        super(html);

    }
}

class Premise extends WorkComponent{
    constructor(html) {
        super(html);

    }
}

class Operation extends WorkComponent{
    constructor(html) {
        super(html);

    }
}

class Reservation extends WorkComponent{
    constructor(html) {
        super(html);

    }
}

class Video extends WorkComponent{
    constructor(html) {
        super(html);

    }
}

class Setting extends WorkComponent{
    constructor(html) {
        super(html);
    }
}

class ACL extends WorkComponent{
    constructor(html) {
        super(html);
    }
}

class User extends WorkComponent{
    constructor(html) {
        super(html);
    }
}

class Workspace extends Component{
    constructor(area) {
        super("");

        this.area = area

        this.components  = {
            'dashboard' : new Dashboard( `%s`),
            'premise' :  new Premise(`%s`),
            'acl' :  new ACL(`%s`),
            'device' : new Device(`%s`),
            'operation' :  new Operation(`%s`),
            'setting' : new Setting(`%s`),
            'video' : new Video(`%s`),
            'reservation' :  new Reservation(`%s`),
            'user' :  new User(`%s`)

        }
    }

    showComponent(id, data){
        switch (id) {
            case "dashboard":
                this.components[id].show(this.area, data)
                break;

            case  "device" :
                this.components[id].show(this.area, data)
                break;

            case  "premise" :
                this.components[id].show(this.area, data)
                break;

            case  "operation" :
                this.components[id].show(this.area, data)
                break;

            case  "reservation" :
                this.components[id].show(this.area, data)
                break;

            case  "video" :
                this.components[id].show(this.area, data)
                break;

            case  "acl" :
                this.components[id].show(this.area, data)
                break;

            case  "setting" :
                this.components[id].show(this.area, data)
                break;

            case  "user" :
                this.components[id].show(this.area, data)
                break;

            default:
                this.area.innerHTML = data
        }
    }
}

class Workbench extends Component{

    constructor(html, defaultWorkspace = "dashboard") {
        super(html);

        this.onExit = () => {}

        this.defaultWorkspace = defaultWorkspace
    }

    show(username) {
        super.show();

        this.setElem("exitmenu", username)

        this.onMenuSelection = (id) => {}

        this.menu = new Menu(this.elem("menuItems"))
        this.menu.onSelection = (id) => this.onMenuSelection(id)

        this.workspace = new Workspace(this.elem("workspace"))

        this.showComponent(this.defaultWorkspace)

        this.elem("logo").onclick = (ev) => this.onExit()
    }

    showComponent(id, data){
        this.workspace.showComponent(id, data)
        this.menu.select(id)
    }

    showDefaultComponent(data){
        this.showComponent("dashboard", data)
    }
}

$(document).ready(function() {
    let eventChannel = "ws://ec2-13-53-207-237.eu-north-1.compute.amazonaws.com:4567/sysevent"
    let host = "`%s`"

    new Controller( new Login(`%s`, host),
        new Workbench(`%s`),
        new System(eventChannel));
})