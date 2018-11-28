const app = require('http')
	.createServer((req, res) => res.send('oh hey'));

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log('server is listening on port ' +PORT)
})

console.log(PORT);
console.log(process.env);