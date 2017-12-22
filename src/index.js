const spawn = require('child_process').spawn;
const path  = require('path');
const fs    = require('fs');


function binPath(){
    if(process.platform !== 'win32') return 'ssh-keygen';

    return path.join(__dirname, '..', 'bin', 'ssh-keygen.exe');
}

function checkIfFileExist(file){
    return new Promise((resolve, reject)=>{

        fs.readFile(file, {encoding:'utf8'}, (err,data)=>{
            if(err) return reject(err);
            resolve();
        })

    })
}

module.exports = function(opts){
    return new Promise((resolve, reject)=>{
        checkIfFileExist(opts.file)
            .then(()=>{
                let keygen = spawn(binPath(), [
                    '-f',opts.file,
                    '-e',
                    '-m','pem'
                ])

                keygen.stdout.on('data', key=>{
                    resolve(key.toString('utf8'));
                })
            })
            .catch(err=>{
                reject(err);
            })
    });
}
