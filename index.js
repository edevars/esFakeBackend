const express = require("express");
const { initConnection } = require("./lib/initConnection");

const app = express();
const port = 3000;

// Require routes
const { authApi } = require("./routes/auth");

// Body parser
app.use(express.json());

// Adding routes
authApi(app);

app.listen(port, async () => {
  await initConnection();
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
