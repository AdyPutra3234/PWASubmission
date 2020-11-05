  if (!('serviceWorker' in navigator)) {
    console.error('service worker tidak didukung browser ini');
} else {
    registerServiceWorker();
    requestPermission();
}

// register service Worker
function registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
        console.log('Registrasi service worker berhasil.');
        return registration;
        })
        .catch(function (err) {
        console.error('Registrasi service worker gagal.', err);
        });
}

function requestPermission() {
    if ('Notification' in window) {
            Notification.requestPermission().then(function (result) {
                if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
                } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
                }

                navigator.serviceWorker.ready.then(_ => {
                  if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration()
                    .then(reg => {
                        reg.pushManager.subscribe( {
                            userVisibleOnly : true,
                            applicationServerKey: urlBase64ToUint8Array("BK47ZQM8ECqd26EM5qc7vM9G5C-pLJeqSJYV24gdefb_SAle7F6lNhBv6X7EehmmIn73QXjfAud3JhXNPY4UH68")
                        })
                        .then(subscribe => {
                            console.log('Berhasil Melakukan  Subscribe dengan endpoint', subscribe.endpoint);
                            console.log('Berhasil Melakukan Subscribe dengan p256dh key', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil Melakukan Subscribe dengan auth key', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                        })
                        .catch(error => {
                            console.error('Gagal Melakukan Subscribe', error.message);
                        });
                    });
                }
                })
          });
      }
  } 


  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}