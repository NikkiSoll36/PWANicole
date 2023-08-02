window.onhashchange = function(){
    //Header is fixed, need to slide down some to see sectionHead
    setTimeout('scrollBy(0,-110)',10);
};
var hidden = true;
function toggleNav(){
    if(hidden){
        document.getElementsByTagName('nav')[0].style.display = 'block';
    }else{
        document.getElementsByTagName('nav')[0].style.display = 'none';
    }
    hidden = !hidden;
}

var pwaSupport = false;

if('serviceWorker' in navigator){
    pwaSupport = true;
    //register service worker
    navigator.serviceWorker.register('/PWANicole/sw.js').then(function(result){
        console.log('Service worker registered');
        console.log('Scope: '+result.scope);
        
        if('Notification' in window){
            console.log('Notification Supported');
            Notification.requestPermission(function(status){
                console.log('notification status', status);
            });
            var options = {
                body: 'See What is New',
                icon:'android-chrome-192x192.png',
                data: {
                    timestamp: Date.now(),
                    loc: 'index.html#info'
                },
                actions: [
                    {action: 'go', title: 'Go Now'}
                ]
            };
            notify('Nicole Resume', options);
        }
    },function(error){
        console.log('Service worker registration failed');
        console.log(error);
    });
}else{
    console.log('Service worker not supported');
}

function notify(title, options){
    if(Notification.permission === 'granted'){
        navigator.serviceWorker.ready.then(function(reg){
           reg.showNotification(title, options); 
        });
    }
}

var installEvt;
window.addEventListener('beforeinstallprompt', function(evt){
    console.log("before install prompt");
    installEvt=evt;
    evt.preventDefault();
    document.getElementById('addToHomeScreen').style.display='block';
});

function hidePrompt(){
    document.getElementById('addToHomeScreen').style.display='none';
}
function installApp(){
    hidePrompt();
    installEvt.prompt();
    installEvt.userChoice.then(function(result){
        if(result.outCome === 'accepted')
            console.log('App Installed');
        else
            console.log("App not installed");
    });
}

window.addEventListener('appinstalled', function(evt){
    console.log('App Installed Event');
});

window.onload = function(){
    if(pwaSupport){
        var p = navigator.platform;
        if(p === 'iPhone' || p === 'iPad' || p === 'iPod'){
            if(!navigator.standalone){
                var lastShown = parseInt(localStorage.getItem('lastShown'));
                var now = new Date().getTime();
                if(isNaN(lastShown) || (lastShown + 1000*60*60*24*7) <= now){
                    document.getElementById('instructions').style.display = 'block';
                    localStorage.setItem('lastShown', now);
                }
            }
        }
    }
};

function hideInstructions(){
    document.getElementById('instructions').style.display = 'none';
}



