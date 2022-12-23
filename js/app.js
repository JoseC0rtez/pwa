if(navigator.serviceWorker){
    navigator.serviceWorker.register("../sw.js")
  }
  if(window.caches){
    caches.open('prueba-1');
    caches.open('prueba-2');
  
   
        caches.keys().then(resp=>{
            console.log(resp);
        })
  }