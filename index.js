let express = require("express");
let cors = require('cors');
let dotenv = require('dotenv');
let routes = require("./routes");
let db = require('./utils/db');

let app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use('/tasks', routes);
db();

let PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})