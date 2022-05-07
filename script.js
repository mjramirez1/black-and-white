const yargs = require('yargs')
const child = require('child_process')

const pass = '123'
const argv = yargs
    .command(
        'login',
        'Comando para levantar servidor',
        {
            pass: { 
                describe: 'Contraseña',
                demand: true,
                alias: 'p',
            },
        },
        (args) => {
            if (`${args.pass}` === pass) {
                child.exec('nodemon servidor.js', (err, stdout) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(stdout)
                    }
                })
            } else {
                console.log('Contraseña incorrecta')
            }
        }
    )
    .help().argv
