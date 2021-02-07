const snackbar = document.getElementById("snackbar");
const txt1 = document.getElementById("txt-1");
const txt2 = document.getElementById("txt-2");
const txt = {
    'device1': txt1,
    'device2': txt2
};

function performAction(device) {
    console.log('Action performed ', device);
    $.ajax({
        url: "/" + device,
        type: "POST",
        success: (msg) => {
            console.log(msg);

            const state = msg.slice(msg.indexOf(' ') + 1);
            txt[device].innerHTML = state.toUpperCase();
            txt[device].classList.remove('txt-on', 'txt-off');
            txt[device].classList.add('txt-' + state);
            
            snackbar.innerHTML = msg;
            snackbar.className = "show";
            setTimeout(() => {
                snackbar.className = snackbar.className.replace("show", "");
            }, 3000);
        }
    });
}


$(document).ready(() => {
    console.log('Application runnig on client !');

    document.getElementById('btn-1').addEventListener("click", () => {
        performAction('device1');
    });
    
    document.getElementById('btn-2').addEventListener("click", () => {
        performAction('device2');
    });
    
    $.ajax({
        url: '/status',
        type: 'GET',
        success: (data) => {
            console.log(data);

            for (device in data) {
                const msg = data[device];
                const state = msg.slice(msg.indexOf(' ') + 1);
                txt[device].innerHTML = state.toUpperCase();
                txt[device].classList.remove('txt-on', 'txt-off');
                txt[device].classList.add('txt-' + state);
            }
        }
    });
});