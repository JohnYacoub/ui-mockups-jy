
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const PORT = process.env.PORT || 3000
const app = express();



app.use(cors({
  origin: true
}));

app.use(morgan("common"));
app.use(helmet());
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
    contentSecurityPolicy: false,
  })
  );

  const userRoutes = require('./routes/users.routes')
app.use('/api/users', userRoutes)


app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});


app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));