const sql = require('sqlite3').verbose()

class Session{
	constructor(dbpath){
		this.db = new sql.Database(dbpath)
	}

	check(){
		return { response: 0 }
	}

	getkey(data){
		//use datamanager
		// challenge
		return { response : data}
	}

	newkey(data){
		/*	uses the datamanager as dm, miner as m
			- dm new key (receives id to new key)
			- send the new key to the client (OLC)


			challenge()

			- send the receipt to the client (OLC)
		*/

		return { response : data}

	}

	confirmkey(data){
		//use datamanager
		//challenge
		return { response : data }
	}

	challenge(){
		/*
			- create a challenge with current blockchain
				- find the location of this string. This string is a subsequence generated from the current blockchain
				-chain: 903FAG934 99831AGG 1119AAA
				a- concat the chain: 903FAG93499831AGG1119AAA

				b- delete: 9FAG934831AGG19AAA (0.3)
				c- insert: BB9FAG934831A00GG19AAA11 (0.4)
				c- point mutation: BB9FAA934831A00BG19AAA11 (0.3)

				find the location of this segment BB9FAA934831A00BG19AAA11 (block, index within the block) given a chain segment
			- send challenge new item to miner  (receives the x winners that found the right answer within a y timeframe)
				select the best winner -> greatest score: n earliest, longest chain, greatest alignment score, greatest pow
				get the winner's hash
			- replace the current blockchain with the winner
			- broadcast the winner to the external miners (every external miner should have the same winner blockchain)

			notes: PoW for external miners must be rewarded 
				there is a registration procedure (request) for external miners)
				there are periodically releases of the winner blockchain in order to accept a number of new external miners (at a specfic reward rate)
			*/
	}
}

function instance(dbpath){
	return new Session(dbpath)
}

exports.instance = instance
