const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
require('dotenv').config()
const mg = mailgun.client({
	username: process.env.USERNAME,
	key: process.env.KEY,
});
mg.messages
	.create(process.env.SANDBOXADDRESS, {
		from: `Mailgun Sandbox <postmaster@${process.env.EMAILADDRESS}>`,
		to: ["faizan.ali@irunadigital.com"],
		subject: "Hello",
        html: '<h1>Heyyaa</h1>'
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.