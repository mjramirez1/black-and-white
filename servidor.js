const http = require('http')
const fs = require('fs')
const url = require('url')
const Jimp = require('jimp')

http.createServer((req, res) => {
    
    // Parámetros extraídos de HTML
    const parametros = url.parse(req.url, true).query
    const imagenProcesada = parametros.imagen
    
    // Ruta para procesar la imagen
    if(req.url.includes('/procesar')) {
        Jimp.read(`${imagenProcesada}`, (err, imagen) => {
            imagen
            .resize(350, Jimp.AUTO)
            .greyscale()
            .quality(60)
            .writeAsync('img.png')
            .then(() => {
                fs.readFile('img.png', (err, Imagen) => {
                    res.writeHead(200, {'Content-type': 'image/jpeg'})
                    res.end(Imagen)
                })
            })
        })
    }

    // Ruta para archivo HTML
    if(req.url === '/') {
        res.writeHead(200, {'Content-type': 'text/html; charset=UTF-8'})
        fs.readFile('index.html', (err, html) => {
            res.end(html)
        })
    }

    // Ruta para archivo CSS
    if(req.url.includes('/style')) {
        res.writeHead(200, {'Content-type': 'text/css'})
        fs.readFile('style.css', 'utf-8', (err, css) => {
            res.end(css)
        })
    }

}).listen(3000, () => console.log('Servidor iniciado en el puerto 3000'))