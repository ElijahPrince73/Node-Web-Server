const express = require('express');
const hbs = require('hbs');
const app = express()

hbs.registerPartials(__dirname + '/partials')
app.set('view engine', hbs)

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
app.listen(3000, () => {
	console.log('Server is up on port 3000');
})