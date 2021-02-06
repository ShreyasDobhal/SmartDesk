const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const Gpio = require('onoff').Gpio;
const device1 = new Gpio(2, 'out');
const device2 = new Gpio(3, 'out');
const LED = new Gpio(3, 'out');

const app = express();

// const IP = require('os').networkInterfaces( )['wlp3s0'][0]['address'];
const IP = 'http://localhost';
const port = 4000;

// MORGAN
app.use(morgan('dev'));

// BODY-PARSER
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// STATIC FILES
app.use('/static',express.static('static'));
app.use(express.urlencoded())

// PUG
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

// END POINTS
app.get('/', (req, res) => {
    res.status(200).render('index.pug', {title:'Sample'}); 
});

function setDevice(device, state) {
    const message = state === 0 ? 'Device off' : 'Device on';
    device.writeSync(state);
    return message;
}

app.get('/on', (req, res) => {
    // Turn on the LED 
    const message = setDevice(LED, 1);
    return message;
});

app.get('/off', (req, res) => {
    // Turn off the LED 
    const message = setDevice(LED, 0);
    return message;
});

app.post('/device1', (req, res) => {
    // Toggle device1
    const message = setDevice(device1, device1.readSync() ^ 1);
    res.send(message);
});

app.post('/device1_on', (req, res) => {
    // Turn on device1
    const message = setDevice(device1, 1);
    res.send(message);
});

app.post('/device1_off', (req, res) => {
    // Turn off device1
    const message = setDevice(device1, 0);
    res.send(message);
});

app.post('/device2', (req, res) => {
    // Toggle device2
    const message = setDevice(device2, device2.readSync() ^ 1);
    res.send(message);
});

app.post('/device2_on', (req, res) => {
    // Turn on device2
    const message = setDevice(device2, 1);
    res.send(message);
});

app.post('/device2_off', (req, res) => {
    // Turn off device2
    const message = setDevice(device2, 0);
    res.send(message);
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`Server started successfully`);
    console.log(`http://${IP}:${port}`);
});