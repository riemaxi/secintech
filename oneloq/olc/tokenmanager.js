class TokenManager{
	constructor(duration){
		this.duration = duration
		this.list = {}
	}

	create(ok, data){
		let token = ok? new Date().getTime():0
		return this.add(token, data)
	}

	add(token, data){
		if (token > 0)
			this.list[token] = {time: token, data: data}
		return token
	}

	check(token){
		let now = new Date().getTime()

		if (this.list[token] != null){
			 if (now - this.list[token].time > this.duration){
				delete this.list[token]
				return null
			 }
			this.list[token].time = now
			return this.list[token]
		}

		return null
	}

	set(token, data){
		let item = this.check(token)
		if (item != null)
			item.data = data
		return item
	}
}

module.exports = TokenManager
