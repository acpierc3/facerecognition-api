const handleRegister = (req, res, db, bcrypt) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password);
	if(!email || !name || !password) {
		return res.status(400).json('incorrect form submission')			//ifanything is blank, an error will be returned and the restof the function will not run
	}
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(logInEmail => {
			return db('users')
			.returning('*')
			.insert({
				name: name,
				email: email,	//should use logInEmail?
				joined: new Date()
			}).then(user => {
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	handleRegister: handleRegister
}