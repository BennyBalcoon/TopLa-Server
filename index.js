const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || "3000";

app.use(express());

mongoose
    .connect("mongodb+srv://toplaDB:Costner1@cluster0.hngfj.mongodb.net/testDBTopla?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// app.use((req, res) => {
//   res.send({ message: "Votre requête a bien été reçue maggle !" });
// });

app.use(bodyParser.json());
app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});