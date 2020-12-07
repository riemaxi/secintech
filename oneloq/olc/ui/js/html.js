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

let html_workbench  = `
<header class="Toolbar">${html_toolbar}</header>

<div class="Panel">
    <section class="Menu">%s</section>
    <section id="workspace" class="Workspace">${html_workspace}</section>
</div>
`
