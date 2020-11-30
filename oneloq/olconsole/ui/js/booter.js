let html_empty = ''

let html_login = `
<div class="Login">
    <div id="root">
        <div id="product">
            <h3>ONELOQ CENTRAL</h3>
        </div>
        <div id="band">
            <div id="form">
                <div class="Field">
                    <label>Username</label>
                    <div><input id="username" type="text" value="filiberto@secintech.com"></div>
                </div>
                <div class="Field">
                    <label>Password</label>
                    <div><input id="password" type="password"></div>
                </div>

                <div id="buttondiv" align="right">
                    <button  id="submit">Login</button>
                </div>
            </div>

            <div id="qrcode"></div>

            </div>
        </div>
    </div>
</div>
`
let html_dashboard = `
<div class="Workarea">
    <h3>Dashboard</h3>
    <table id="dataview" class="display"></table>
</div>
`

let html_premises = `
<div class="Workarea">
    <h3>Premises</h3>
    <table id="dataview" class="display"></table>
</div>
`

let html_acl = `
<div class="Workarea">
    <h3>Access Control</h3>
    <table id="dataview" class="display"></table>
</div>
`
let html_device = `
<div class="Workarea">
    <h3>Devices</h3>
    <table id="dataview" class="display"></table>
</div>
`
let html_setting = `
<div class="Workarea">
    <h3>Settings</h3>
    <table id="dataview" class="display"></table>
</div>
`

let html_operation = `
<div class="Workarea">
    <h3>Operation</h3>
    <table id="dataview" class="display"></table>
</div>
`

let html_workspace = `
<div class="Panel">
    <section class="Workspace"></section>
    <section id="todo" class="Todo">
        <h3>Todo</h3>
    </section>
</div>
`

let html_reservation = `
<div class="Workarea">
    <h3>Reservation</h3>
    <table id="dataview" class="display"></table>
</div>
`
let html_toolbar = `
<div id="internal">
    <h2 id="logo" class="Logo">ONELOQ CENTRAL</h2>

    <div class="ExitMenu">
        <div id="usericon"><img src="img/superuser" ></div>
        <div id="superadmin"><h3>supermaster@company.com</h3></div>
    </div>
</div>
`
let html_video = `
<div class="Workarea">
    <h3>Videos</h3>
    <table id="dataview" class="display"></table>
</div>
`

let html_user = `
<div class="Workarea">
    <h3>Users</h3>
    <table id="dataview" class="display"></table>
</div>
`

let html_menu = `
<ul id="menuItems">
    <li id="dashboard"><div class="MIIcon"><img src="img/dashboard"></div><div class="MILabel"><h3>Dashboard</h3></div></li>
    <li id="premise"><div class="MIIcon"><img src="img/premise"></div><div class="MILabel"><h3>Premises</h3></div></li>
    <li id="acl"><div class="MIIcon"><img src="img/acl"></div><div class="MILabel"><h3>Access</h3></div></li>
    <li id="device"><div class="MIIcon"><img src="img/device"></div><div class="MILabel"><h3>Devices</h3></div></li>
    <li id="operation"><div class="MIIcon"><img src="img/operation"></div><div class="MILabel"><h3>Operations</h3></div></li>
    <li id="video"><div class="MIIcon"><img src="img/video"></div><div class="MILabel"><h3>Videos</h3></div></li>
    <li id="user"><div class="MIIcon"><img src="img/user"></div><div class="MILabel"><h3>Users</h3></div></li>
    <li id="reservation"><div class="MIIcon"><img src="img/reservation"></div><div class="MILabel"><h3>Reservations</h3></div></li>
    <li id="sik"><div class="MIIcon"><img src="img/sik"></div><div class="MILabel"><h3>SecinKey</h3></div></li>
    <li id="setting"><div class="MIIcon"><img src="img/setting"></div><div class="MILabel"><h3>Settings</h3></div></li>
</ul>
`

let html_workbench  = `
<header class="Toolbar">${html_toolbar}</header>
<div class="Panel">
    <section class="Menu">${html_menu}</section>
    <section id="workspace" class="Workspace">${html_workspace}</section>
</div>
`



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

class Premises extends WorkComponent{
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
            'dashboard' : new Dashboard(html_dashboard),
            'premise' :  new Premises(html_premises),
            'acl' :  new ACL(html_acl),
            'device' : new Device(html_device),
            'operation' :  new Operation(html_operation),
            'setting' : new Setting(html_setting),
            'video' : new Video(html_video),
            'reservation' :  new Reservation(html_reservation),
            'user' :  new User(html_user)

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

$(function() {
    let eventChannel = "ws://ec2-13-53-207-237.eu-north-1.compute.amazonaws.com:4567/sysevent"
    let host = 'http://192.168.10.123/'

    new Controller( new Login(html_login, host),
        new Workbench(html_workbench),
        new System(eventChannel));
})
