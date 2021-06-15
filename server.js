
const express = require("express");
const path = require("path");

const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: true
}));

app.use(morgan("common"));
app.use(helmet());
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => console.log(`Server is listening at http://localhost:${PORT}`));