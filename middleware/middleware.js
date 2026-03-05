export function logReq(req, _res, next) {
   console.log(`${req.method} -- ${req.url} -- ${new Date().toLocaleTimeString()}`);
   
   if(req.body) console.table(req.body);

   next();
}

export function globalError(error, _req, res, _next){
   res.status(error.status || 500).json({error: `❌ Error: ${error.message}`});
}