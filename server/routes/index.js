// const path = require('path');
// const router = require('express').Router();
// const apiRoutes = require('./api');

// // API Routes
// router.use('/api', apiRoutes);

// // If no API routes are hit, send the React app
// router.use((req, res) =>
// res.sendFile(path.join(__dirname, '../client/public/index.html'))
// );

// module.exports = router;

const router = require('express').Router();
const apiRoutes = require('./api');
// const htmlRoutes = require('./html/html-routes');

router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;