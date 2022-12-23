'use strict';
document.getElementById('canvas').style.display = 'none';
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

const constraints = {
    audio : false,
    video : {
        width:1200, height:720
    } 
};

async function init(){
    try{
        const stream = await 
        navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
    }
    catch(e){
        $("#mensaje").html("Debe de seleccionar la camara y permitir acceso al navegador. Refresque la pagina del navegador. <br clear='all'> <br clear='all'>");
    }
    }
function handleSuccess(stream){
    window.stream = stream;
    video.srcObject = stream;
}
init()
var context = canvas.getContext('2d');