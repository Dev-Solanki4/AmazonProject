 // new XMLHttpRequest() creates and sets the http message
 // then we are setting it up to send by providing the method of message and the URL
 // Then we just send the message

const xhr = new XMLHttpRequest();                      

xhr.addEventListener('load',()=>{           // load is considered as a response
    console.log(xhr.response);
})

xhr.open('GET','https://supersimplebackend.dev/images/apple.jpg');      
xhr.send();                                           