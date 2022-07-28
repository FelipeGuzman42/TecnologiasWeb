const Alimento = require("./alimento");
const CitaMedica = require("./citaMedica");
const Dieta = require("./dieta");
const Entrada = require("./entrada");
const HistoriaClinica = require("./historiaClinica");
const Nutritionist = require("./nutricionista");
const Plato = require("./plato");
const Progreso = require("./progreso");
const Resena = require ("./resena");
const Usuario = require("./usuario");

Plato.belongsToMany(Alimento, {through: "plato_alimento"});

Alimento.belongsToMany(Plato, {through: "plato_alimento"});

Usuario.hasMany(CitaMedica, {foreignKey: 'idUsuario'});

CitaMedica.belongsTo(Usuario, {foreignKey: 'idUsuario'});

Nutritionist.hasMany(CitaMedica, {foreignKey: 'idNutritionist'});

CitaMedica.belongsTo(Nutritionist, {foreignKey: 'idNutritionist'});

Dieta.hasMany(Plato);

Usuario.hasMany(Dieta);

Usuario.hasOne(HistoriaClinica);

HistoriaClinica.belongsTo(Usuario);

Usuario.hasOne(Progreso);

Progreso.belongsTo(Usuario);

Usuario.hasMany(Resena);

Resena.belongsTo(Usuario);

Nutritionist.hasMany(Resena);

Resena.belongsTo(Nutritionist);

Usuario.hasMany(Entrada);

Entrada.belongsTo(Usuario);

Nutritionist.hasMany(Entrada);

Entrada.belongsTo(Nutritionist);

Nutritionist.hasMany(Usuario);

Usuario.belongsTo(Nutritionist);

// login





