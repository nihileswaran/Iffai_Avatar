// let recognition;
// let listening = false;

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// recognition = new SpeechRecognition();

// recognition.continuous = true;
// recognition.lang = "en-US";

// document.getElementById("startBtn").onclick = () => {

//     listening = true;
//     recognition.start();

//     document.getElementById("status").innerText = "Listening...";
// };


// document.getElementById("stopBtn").onclick = () => {

//     listening = false;
//     recognition.stop();

//     speechSynthesis.cancel();

//     document.getElementById("status").innerText = "Stopped";
// };


// recognition.onresult = async (event) => {

//     if (!listening) return;

//     let text = event.results[event.results.length - 1][0].transcript;

//     addMessage("You", text);

//     speechSynthesis.cancel();

//     document.getElementById("status").innerText = "Thinking...";


//     let response = await fetch("/chat", {

//         method: "POST",

//         headers: {
//             "Content-Type": "application/json"
//         },

//         body: JSON.stringify({
//             message: text
//         })
//     });


//     let data = await response.json();

//     addMessage("Assistant", data.reply);

//     speak(data.reply);

//     document.getElementById("status").innerText = "Listening...";
// };



// function speak(text){

//     speechSynthesis.cancel();

//     let utter = new SpeechSynthesisUtterance(text);

//     speechSynthesis.speak(utter);
// }


// function addMessage(sender, text){

//     let chat = document.getElementById("chatBox");

//     let div = document.createElement("div");

//     div.innerHTML = "<b>" + sender + ":</b> " + text;

//     chat.appendChild(div);
// }