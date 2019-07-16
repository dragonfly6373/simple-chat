var router = require('express').Router();

router.get('/', function(req, res) {
	res.json({
		status: 200,
		message: "Rest service is working"
	});
});

module.exports = router;

