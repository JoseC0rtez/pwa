const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', () => {
    Notification.requestPermission().then(resultado => {
        console.log('Respuesta: ', resultado);
    })
})

const verNotificacion = document.querySelector('#vernotificacion');

verNotificacion.addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        const notificacion = new Notification('Esta es la notificacion', {
            icon: '../images/logo-github.png',
            body: 'Repositorio del codigo'
        });

        notificacion.onclick = function(){
            window.open('https://github.com/JoseC0rtez/pwa');
        }
    }
})