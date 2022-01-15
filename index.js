const express = require("express");
const fileUpload = require("express-fileupload");
const { initConnection } = require("./lib/database/initConnection");
const cors = require("cors");


const {
  logErrors,
  errorHandler,
  wrapErrors
} = require('./utils/middlewares/errorHandler');

const app = express();
const port = 3000;

// Require routes
const { authApi } = require("./routes/auth");

// Body parser
app.use(express.json());

//To upload files
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
  })
);

// Cors
app.use(cors({
  origin: '*'
}));

// Adding routes
authApi(app);

//Error handling
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, async () => {
  await initConnection();
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
