const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello please sent request on /convert url');
});

module.exports = router;