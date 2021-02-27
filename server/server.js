const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require('./routes/user-routes');

// express middleware used to be a bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use('/api', userRoutes);
// app.use(require('./routes'));

app.listen(PORT, () => {
    console.log(`🌎 API Server is listening on PORT ${PORT}.`);
});