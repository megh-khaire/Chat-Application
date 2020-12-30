const socket = io();

//Receiving server event message
socket.on('message',(message) => {
    console.log(message);
});

//Receiving server event server-send-msg
socket.on('server-send-msg',(message) => {
    console.log(message)
})

const msg_box = document.getElementById('msg-box');
const send_form = document.getElementById('send-msg');
send_form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = msg_box.value;
    socket.emit('client-send-msg',message, () => {
        console.log('Message sent to server!')
    });
})