const express = require('express');
const app = express();
const mongoose = require('mongoose');
const CONFIG = require('./config.js');

require('./routes/index.js')(app);
require('./routes/city.js')(app);
require('./routes/customer.js')(app);
require('./routes/shopCategory.js')(app);
require('./routes/product.js')(app);

mongoose.connect(CONFIG.MONGO_URL);

const server = app.listen(8080 || process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server Started At ${host} ${port}`);
});