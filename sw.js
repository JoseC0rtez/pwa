
const CACHE_STATIC_NAME="Pwa_static_v3";
const CACHE_DYNAMIC_NAME="Pwa_dynamic_v1";
const CACHE_INMUTABLE_NAME="Pwa_inmutable_v1";

function limpiarCache(nombreCache,numeroItems){
    cache.open(nombreCache).then(cache=>{
        return cache.keys().then(llave=>{
            if(llave.length>=numeroItems){
                cache.delete(llave[0])
                    .then(limpiarCache(nombreCache,numeroItems));
            }
        });
    });

}

self.addEventListener("install",event=>{
    const repuesta= caches.open(CACHE_STATIC_NAME)
        .then(cache=>{
            return cache.addAll([
                "/",
                "/index.html",
                "/css/styles.css",
                "/css/syncro.css",
                "/js/app.js",
                "/js/base.js",
                "/js/pouchdb.js",
                "/js/pouchdb-nightly.js",
                "/js/indexdb.js",
                "/js/fisico.js",
                "/js/push.js",
                "/pages/fisico.html",
                "/pages/push.html",
                "/pages/sincro.html"
            ]);
        });
     const respuestaInmutable=caches.open(CACHE_INMUTABLE_NAME)
    .then(cache=>{
        return cache.add("https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css")
    })   
    event.waitUntil(Promise.all([repuesta,respuestaInmutable]));
});


self.addEventListener("activate",event=>{

    const respuesta= caches.keys().then(llaves=>{
        llaves.forEach(llave=>{
            if(llave.includes("static") && llave!==CACHE_STATIC_NAME){
                return caches.delete(llave);
            }
        });
    });
    event.waintUntil(respuesta);
});

self.addEventListener("fetch",event=>{

    const respuesta=new Promise((resolve,reject)=>{
        let bandera=false;
        const fallo=()=>{
            if(bandera){
                //no existe en caches
                if(/\.(png|jpg)$/i.test(event.request.url)){
                    resolve(caches.match("images/descarga.png"));
                }else{
                    reject("No encontramos respuesta");
                }

            }else{
                bandera=true;        
            }
        }

        fetch(event.request).then(resp=>{
            if(resp.ok){
                resolve(resp);
            }else{
                fallo();
            }
        })
        .catch(()=>{
            fallo();
        });

        caches.match( event.request ).then( resp => {
            resp ? resolve(resp): fallo();
        }).catch( fallo );
    });
    event.respondWith(respuesta);
   
})