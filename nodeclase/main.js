const fs = require("fs");
const http = require("http");

http.createServer((req, resp) => 
{
    fs.readFile("main.js", (err, data) =>
    {
        if(err)
        {
            throw err;
        }
        resp.end(data);
    });
    
}).listen(8000);


/*
fs.writeFile("prueba.txt", "Este es el contenido", "utf-8", () =>
{
    console.log("Escritura finalizada");
});
*/