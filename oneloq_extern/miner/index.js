let app = require('express')()
let Mapper = require('./mapper')

//let reference = '000000000001111111111111111111111111111111110000000000000000000'
//let pattern = '11111111111111111111111111'
//let pattern = '887463002931194000000322'

let reference = '0001111AFED0011DEEEFFAAABB001AAA03856AAB3323XF'
let pattern = 'EFFAAABB001AAA'

let mapper = new Mapper(pattern, reference, (a,b) => {
  let m = ['09','98','87', '76','65','54','43','4E','32','3E','21','CD','CF','DF','DE']
  if (a == b)
     return 1

  if (a+''+b in m || b+''+a in m)
    return .5

  return 0
})

console.log(mapper.scores(), mapper.maxIndex)

/*
let port = 17000

app.listen(port, () => {
	console.log(`on port ${port} ...`)
})*/

