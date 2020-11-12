const SQLManager = require('./sqlmanager')

let sql = new SQLManager('./db/test.db')

sql.dropTables(['entity','property'])

sql.createCleanTable('entity','id int primary key, type int')
sql.createCleanTable('property','entity int, code int, data int, primary key(entity, code)')

let queries = [
'insert into entity(id,type)values(0,0),(1,1)', 
'insert into property(entity,code,data)values(0,0,10),(1,0,11),(1,0,12)'
]

sql.transaction(queries,(error) => console.log(error))

sql.collection('select * from entity e join property p on e.id = p.entity', (item) => console.log(item), ()=> console.log('nothing'))

sql.close(()=> console.log('close ...'))
