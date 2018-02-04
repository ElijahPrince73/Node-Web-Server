const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000

const app = express()

hbs.registerPartials(__dirname + '/partials')
app.set('view engine', hbs)

app.use((req, res, next) => {
	var now = new Date().toString()
	var log = `Date:${now}; Method: ${req.method}; URL:${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append file to server.log');
		}
	})
	next()
})

// app.use((req, res, next) => {
// 	res.render('maintance.hbs')
// })

app.use(express.static(__dirname + '/public'))


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home',
		welcomeMessage: 'Welcome to the website'
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	})
})

app.get('/bad', (req, res) => {
	res.send({
		error: "Unable to find that page"
	})
})
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
})