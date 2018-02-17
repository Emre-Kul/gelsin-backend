const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const CONFIG = require('./config.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./api/routes/index.js')(app);
require('./api/routes/location.js')(app);
require('./api/routes/customer.js')(app);
require('./api/routes/shopCategory.js')(app);
require('./api/routes/product.js')(app);
require('./api/routes/shop.js')(app);
require('./api/routes/order.js')(app);

mongoose.connect(CONFIG.MONGO_URL);

const server = app.listen(process.env.PORT || 8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server Started At ${host} ${port}`);
});