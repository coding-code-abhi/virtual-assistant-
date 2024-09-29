let btn = document.getElementById("btn");
let content = document.getElementById("content");
let gif = document.querySelector(".gif");

// Function to handle text-to-speech
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "hi-IN"; // Hindi for India
  window.speechSynthesis.speak(text_speak);
}

// Function to wish based on the time of day
function wishMe() {
  let day = new Date();
  let hours = day.getHours();

  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

// Trigger the wishMe function when the page loads
window.addEventListener("load", () => {
  wishMe();
});

// Speech recognition initialization
let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());

  // Hide the GIF after recognition completes
  gif.style.display = "none";
  btn.style.display = "block";
};

recognition.onerror = (event) => {
  console.error("Speech recognition error: ", event.error);
  gif.style.display = "none";
  btn.style.display = "block";
};

// Button to start listening
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  gif.style.display = "flex";
});
// Process the voice command
function takeCommand(message) {
  let foundMatch = false;
  message.replace("friday", "") || message.replace("frday", "");
  if (message.includes("hello")) {
    speak("hello sir, what can i help you");
    foundMatch = true ;
  } else if (message.includes("open youtube")) {
    speak("opening youtube...");
    window.open("https://youtube.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open facebook")) {
    speak("opening facebook...");
    window.open("https://facebook.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open instagram")) {
    speak("opening instagram...");
    window.open("https://instagram.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open github")) {
    speak("opening github...");
    window.open("https://github.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open linkedin...")) {
    speak("opening linkedin...");
    window.open("https://linkedin.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open chatgpt...")) {
    speak("opening chatgpt...");
    window.open("https://chatgpt.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open sarkariresult...")) {
    speak("opening sarkariresult...");
    window.open("https://www.sarkariresult.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("open google...")) {
    speak("opening google...");
    window.open("https://www.google.com/", "_blank");
    foundMatch = true ;
  } else if (message.includes("gana sunao")) {
    speak(
      "Tu baat kare ya na mujhse, chahe aankhon ka paighaam na le, par ye mat kehna, are o pagle, mujhe dekh na tu, mera naam na le. Tujhse mera deen-dharam hai, mujhse teri khudai, tujhse mera deen-dharam hai, mujhse teri khudai. Tu bole toh main ban jaaoon, main Bulleh Shah saudaai. Main bhi nachoon, main bhi nachoon manaun sohne yaar ko, chaloon main teri raah Bulleya, main bhi nachoon, rijhaoon sohne yaar ko, karun na parwah Bulleya."
    );
    foundMatch = true ;
  } else if (message.includes("open calculator")) {
    speak("opening calculator...");
    window.open("calculator://");
    foundMatch = true ;
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp...");
    window.open("whatsapp://");
    foundMatch = true ;
  } else if (message.includes("who are you")) {
    speak("namste i'm a virtual assistant , made by abhishek sir");
    foundMatch = true ;
  } else if (message.includes("how are you")) {
    speak("I'm doing great, thank you for asking. How can I assist you today?");
    foundMatch = true ;
  } else if (message.includes("what is your name")) {
    speak(
      "My name is Friday, your personal assistant. How can I help you, Sir?"
    );
    foundMatch = true ;
  } else if (message.includes("who created you")) {
    speak("I was created by Abhishek Sir, a brilliant developer.");
    foundMatch = true ;
  } else if (message.includes("what can you do")) {
    speak(
      "I can help you with various tasks like opening websites, telling time, and answering simple questions. Just let me know what you need."
    );
    foundMatch = true ;
  } else if (message.includes("tell me a joke")) {
    speak("Why don't programmers like nature? It has too many bugs.");
    foundMatch = true ;
  } else if (message.includes("what is your favorite color")) {
    speak("I don't have a favorite color, but I think blue looks pretty cool.");
    foundMatch = true ;
  } else if (message.includes("what's your purpose")) {
    speak(
      "My purpose is to assist you in your daily tasks and make your life easier."
    );
    foundMatch = true ;
  } else if (message.includes("do you like coding")) {
    speak("I love coding, especially when Abhishek Sir is guiding me!");
    foundMatch = true ;
  } else if (message.includes("what's the weather like")) {
    speak(
      "I can't check the weather yet, but you can always ask me to open a weather website for you."
    );
    foundMatch = true ;
  }
  
  if (message.includes("time")) {
    let time = new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
    foundMatch = true ;
  } else if (message.includes("date")) {
    let day = new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(day);
    foundMatch = true ;
  }
  if (!foundMatch) {
    speak(`This is what I found on the internet regarding ${message}`);
    window.open(
      `https://www.google.com/search?q=${message}` ||
        `https://www.bing.com/search?EID=${message}`
    );
  }
}
