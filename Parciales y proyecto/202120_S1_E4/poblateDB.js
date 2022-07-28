const faker = require('faker');
const Nutritionist = require("./models/nutricionista");
const schemaNutritionist = require("./routes/nutricionistaRouter")["schema"];
// Random Number sacado de mi hermano, todos los créditos pa' él :k.
const randomNumber = (maximum, minimum = 0) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

function poblarNutricionistas() {
    for(let i = 0; i < 100; i++) {
        const nutricionista = {
            nombre: faker.name.findName(),
            experiencia: randomNumber(20),
            especializacion: i%2 ? faker.name.jobTitle(): null,
            correo: faker.internet.email(),
            password: faker.lorem.word(),
            foto: faker.image.avatar(),
            calificacion: randomNumber(5)
        };
        console.log(nutricionista);
        const {error} = schemaNutritionist.validate(nutricionista);
        console.log(error);
        if(error) {
            return;
        }
        Nutritionist.create(nutricionista);
    }
}

poblarNutricionistas();

//console.log(faker.name.findName());