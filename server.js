// server.js
const express = require("express");
const db = require("./app/models");
const userController = require("./app/controllers/user.controller");
const bootcampController = require("./app/controllers/bootcamp.controller");

const app = express();
app.use(express.json());

db.sequelize.sync({ alter: true }).then(() => {
    console.log("La base de datos ha sido sincronizada.");
    initializeData();
});

// Rutas para usuarios
app.post("/user", userController.createUser);
app.get("/user", userController.findAll);
app.get("/user/:id", userController.findUserById);
app.put("/user/:id", userController.updateUserById);
app.delete("/user/:id", userController.deleteUserById);

// Rutas para bootcamps
app.post("/bootcamps", bootcampController.createBootcamp);
app.get("/bootcamps", bootcampController.findAll);
app.get("/bootcamps/:id", bootcampController.findById);
app.post("/bootcamps/:bootcampId/user/:userId", bootcampController.addUser);

// Crear datos iniciales
async function initializeData() {
    // Crear usuarios
    await db.user.bulkCreate([
        { firstName: "Mateo", lastName: "Díaz", email: "mateo.diaz@correo.com" },
        { firstName: "Santiago", lastName: "Mejías", email: "santiago.mejias@correo.com" },
        { firstName: "Lucas", lastName: "Rojas", email: "lucas.rojas@correo.com" },
        { firstName: "Facundo", lastName: "Fernandez", email: "facundo.fernandez@correo.com" }
    ]);

    // Crear bootcamps
    await db.bootcamp.bulkCreate([
        {
            title: "Introduciendo El Bootcamp De React",
            cue: 10,
            description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
        },
        {
            title: "Bootcamp Desarrollo Web Full Stack",
            cue: 10,
            description: "Crearás aplicaciones web utilizando JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
        },
        {
            title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning",
            cue: 10,
            description: "Domina Data Science y todo el ecosistema de lenguajes y herramientas de Big Data."
        }
    ]);

    console.log("Usuarios y bootcamps iniciales creados.");
}

// Sincronizar la base de datos y crear datos iniciales
db.sequelize.sync({ force: true }).then(() => {
    console.log("La base de datos ha sido sincronizada.");
    initializeData();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
