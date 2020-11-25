class TokenManager{
	constructor(duration){
		this.duration = duration
		this.list = {}
	}

	add(token){
		if (token > 0)
			this.list[token] = token
		return token
	}

	check(token){
		let now = new Date().getTime()

		if (this.list[token] != undefined){
			 if (now - this.list[token] > this.duration){
				delete this.list[token]
				return false
			 }
			this.list[token] = now
			return true
		}

		return false
	}
}

module.exports = TokenManager
