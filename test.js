var pubToPem = require('./src/index');

pubToPem({
    file:'res_id.pub'
})
.then((key)=>{
    console.log(key);
})
.catch(err=>{
    console.log(err);
    debugger;
})