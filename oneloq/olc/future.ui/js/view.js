class View{
	constructor(target){
		console.log(target)
		target.html(this.html())
	}

	html(){
		return '<h1>Hello you ...</h1>'
	}
}
