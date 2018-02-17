const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CONFIG = require('./config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/index.js')(app);
require('./routes/location.js')(app);
require('./routes/customer.js')(app);
require('./routes/shopCategory.js')(app);
require('./routes/product.js')(app);
require('./routes/shop.js')(app);

mongoose.connect(CONFIG.MONGO_URL);

const server = app.listen(8080 || process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server Started At ${host} ${port}`);
});