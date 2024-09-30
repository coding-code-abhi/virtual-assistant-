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

// Full speech recognition for other commands after "Friday" is detected
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript.toLowerCase();
  content.innerText = transcript;
  takeCommand(transcript);

  // Hide the GIF after recognition completes
  gif.style.display = "none";
  btn.style.display = "block";
};

recognition.onerror = (event) => {
  console.error("Speech recognition error: ", event.error);
  gif.style.display = "none";
  btn.style.display = "block";
};

// Button to manually start listening (in case the wake word doesn't work)
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  gif.style.display = "flex";
});
const cpuI = Math.floor(Math.random() * 100);
const hindiJokes = [
  "टीचर: पप्पू, तुम हमेशा स्कूल देर से क्यों आते हो? पप्पू: क्योंकि रास्ते में बोर्ड पर लिखा होता है, 'स्कूल धीरे चलो।'",
  "पति: डॉक्टर साहब, मेरी पत्नी को हमेशा नींद नहीं आती। डॉक्टर: अच्छा, तो अब तक कौन सी दवाई दी? पति: दवाई नहीं, क्रेडिट कार्ड दिखा देता हूँ।",
  "टीचर: अगर पृथ्वी गोल है तो आगे जाने पर भी पीछे क्यों जाते हैं? पप्पू: क्योंकि हमारा पेट्रोल का बजट नहीं है!",
  "पप्पू: भाई, मुझे आज कुछ काम नहीं है। गप्पू: तो भाई, आज कुछ काम कर लो!",
  "पत्नी: सुनो जी, पड़ोस की औरतें कह रही थीं कि आप किसी के साथ अफेयर कर रहे हो। पति: अच्छा? बताना था तो किसी खूबसूरत का नाम बता देती!",
  "टीचर: बताओ पप्पू, अगर चाँद पर पानी होता तो क्या होता? पप्पू: सर, समुद्री लहरें आतीं और मछलियाँ नाचतीं!",
  "बाबा: क्या चाहिए? भक्त: बाबा, मेरे पापा बहुत मारते हैं। बाबा: जब कभी वो मारें, तो मेरी याद करना। भक्त: बाबा, वो आपकी याद में भी मारते हैं!",
  "पप्पू: यार, मैं कल रात बड़ी मुश्किल से सोया। गप्पू: क्यों? पप्पू: क्योंकि बिस्तर पर मच्छर म्यूजिक बजा रहे थे!",
  "पति: डार्लिंग, तुम इतनी सुंदर क्यों हो? पत्नी: क्योंकि तुम मेरी सुंदरता की परवाह करते हो। पति: अरे, तब मैं कितना बदसूरत हूँ?",
  "पत्नी: डॉक्टर साहब, मेरे पति को हमेशा नींद आती है। डॉक्टर: अच्छा, तो क्या करते हैं? पत्नी: मेरे लिए जिम ज्वाइन किया है!",
  "टीचर: बच्चे, तुम्हारी इंग्लिश बहुत खराब है। पप्पू: मैडम, जब इंग्लिश वालों की हिंदी खराब हो सकती है, तो हमारी इंग्लिश क्यों नहीं?",
  "पति: मेरी बीवी बहुत पढ़ी-लिखी है। दोस्त: अच्छा! पति: हाँ, रोज़ नए-नए बहाने पढ़ कर आती है!",
  "पप्पू: भाई, तू इतना स्मार्ट कैसे हो गया? गप्पू: फेसबुक पर 'स्मार्ट बनने के 5 आसान तरीके' पढ़े थे!",
  "टीचर: ये कौन सी तारीख है, जिसे हर कोई याद रखता है? पप्पू: हनीमून की तारीख!",
  "पत्नी: सुनिए, वो जो पड़ोस में नई लड़की आई है, उसके साथ आपका कोई चक्कर नहीं चल रहा है ना? पति: पगली, मैं तो तेरे ही चक्कर में पड़ा हुआ हूँ!",
  "डॉक्टर: तुम्हें नींद क्यों नहीं आती? मरीज: सर, क्योंकि मेरे दिमाग में वाईफाई ऑन रहता है!",
  "पति: डार्लिंग, तुम अपने फोन में कौन सी एप यूज करती हो? पत्नी: मैं तो बस तुम्हारी जिंदगी की एप्प हूँ!",
  "बच्चा: मम्मी, ये पापा ने कौन से फॉर्मूला बनाए हैं? मम्मी: बेटा, पापा ने पढ़ाई में टॉप किया है। बच्चा: तब तो वो पढ़ाई के टॉपिक में एक्सपर्ट होंगे!",
  "टीचर: पप्पू, तुमको किस चीज से डर लगता है? पप्पू: किताबों से।",
  "पप्पू: भाई, मेरी गर्लफ्रेंड बहुत लकी है। गप्पू: क्यों? पप्पू: क्योंकि उसने मुझे पा लिया!",
  "बॉस: तुम्हारे काम का क्या हाल है? कर्मचारी: सर, जितना काम आपसे होगा, उतना ही हमारा हाल भी होगा!",
  "पप्पू: भाई, मेरी कार नहीं चल रही। गप्पू: क्यों? पप्पू: क्योंकि उसकी बैटरी डिस्चार्ज हो गई!",
  "पिता: बेटा, तेरा फेवरेट कलर कौन सा है? बेटा: नीला। पिता: तो, तू नीले पैसे क्यों नहीं कमाता?",
  "गप्पू: भाई, तू इतना हंसता क्यों रहता है? पप्पू: क्योंकि हंसने से चेहरा जवान रहता है!",
  "टीचर: बेटा, तुम इतने सुस्त क्यों हो? पप्पू: क्योंकि सुस्ती में ही मस्ती है!",
  "पत्नी: सुनो जी, जब तुम ऑफिस जाते हो तो तुम्हारी याद आती है। पति: अच्छा, जब मैं घर आता हूँ तो तुम मुझसे झगड़ती क्यों हो?",
  "पप्पू: डॉक्टर साहब, मुझे चश्मा चाहिए। डॉक्टर: अच्छा, क्या पढ़ाई करनी है? पप्पू: नहीं, अंधेरे में स्मार्टफोन चलाना है!",
  "टीचर: पप्पू, भारत का सबसे बड़ा सपना क्या है? पप्पू: सारे दोस्तों के साथ विदेश जाना!",
  "पति: सुनो डार्लिंग, तुम्हारी याद में खाना खाया। पत्नी: अच्छा, कौन सा खाना? पति: तेरे साथ बिताए वक्त का!",
  "टीचर: तुम्हारे बर्थडे पर क्या हुआ था? पप्पू: सर, सबने गिफ्ट में मास्क दिए!",
  "डॉक्टर: आप हमेशा दुखी क्यों रहते हैं? मरीज: क्योंकि खुश रहने का खर्च बहुत ज्यादा है!",
  "पप्पू: भाई, शादी का मतलब क्या होता है? गप्पू: जब 2 लोग मिलकर वही गलती करते हैं!",
  "पप्पू: भाई, मैं शादी कर रहा हूँ। गप्पू: क्यो? पप्पू: क्योंकि सिंगल रहना ज्यादा खर्चीला है!",
  "पत्नी: सुनो जी, आप जब ऑफिस जाते हो तो मुझे बहुत याद आती है। पति: अच्छा, फिर मुझे ऑफिस क्यों जाने देती हो?",
  "टीचर: बच्चो, हमेशा मेहनत करो। पप्पू: जी मैम, सिर्फ़ घर पर!",
  "पप्पू: भाई, मैंने नए साल का रिजॉल्यूशन लिया है। गप्पू: क्या? पप्पू: अब से मैं सिर्फ़ घर में खाना खाऊंगा!",
  "बॉस: तुम्हारी फाइलें क्यों बिखरी पड़ी हैं? कर्मचारी: सर, क्रिएटिविटी का नजारा है!",
  "डॉक्टर: तुम्हारा पेट ठीक क्यों नहीं हो रहा? मरीज: क्योंकि खाने में स्पाइसी ज्यादा है!",
  "टीचर: बच्चे, सच बोलना अच्छा होता है। पप्पू: जी, लेकिन फायदेमंद नहीं!",
  "पत्नी: सुनो, मुझे नया स्मार्टफोन चाहिए। पति: लेकिन ये तो नया ही है। पत्नी: अरे, मेरे हाथों में पुराने जैसा लग रहा है!",
  "टीचर: बच्चे, गणित सीखना जरूरी क्यों है? पप्पू: ताकि दुकान वाले से पैसे सही ले सकें!",
  "बॉस: तुम्हारी अंग्रेजी क्यों कमजोर है? कर्मचारी: क्योंकि मेरा प्यार हिंदी में है!",
  "टीचर: पप्पू, तुम्हारी परीक्षा में जीरो क्यों आए? पप्पू: क्योंकि ये अंक हमारे देश का गौरव हैं!",
  "पति: डार्लिंग, तुम मुझसे कितना प्यार करती हो? पत्नी: उतना ही जितना तुम मुझसे डरते हो!",
  "टीचर: बच्चों, तुम लोग रोज पढ़ाई क्यों नहीं करते? पप्पू: क्योंकि छुट्टी के दिन भी पढ़ाई हो रही है!",
  "पप्पू: भाई, मेरी बीवी बहुत स्मार्ट है। गप्पू: क्यों? पप्पू: क्योंकि वो हमेशा मेरी गलतियों को ढूंढ लेती है!",
  "बच्चा: पापा, हम क्यों पैदा हुए हैं? पापा: बेटा, क्योंकि हमारे माता-पिता को हमसे अच्छा विकल्प नहीं मिला!",
  "टीचर: बच्चों, तुम्हारे पसंदीदा एक्टर कौन हैं? पप्पू: वो जो क्लास बंक कर सकते हैं!",
  "पति: डार्लिंग, तुम हमेशा मेरी हाँ में हाँ क्यों मिलाती हो? पत्नी: ताकि बहस ना हो!",
  "डॉक्टर: आपको किस चीज़ से डर लगता है? मरीज: बिल भरने से!",
  "टीचर: बच्चों, गणित में कौन से नंबर अच्छे होते हैं? पप्पू: वो जो कॉपी में नहीं आते!",
  "पति: मेरी बीवी बहुत सुंदर है। दोस्त: अच्छा! पति: हाँ, वो खुद ही कहती है!",
  "डॉक्टर: तुम्हारा बीपी क्यों बढ़ता है? मरीज: क्योंकि मैं पत्थर की मूर्ति को देखकर भी डर जाता हूँ!",
  "टीचर: पप्पू, तुम्हारे नंबर इतने कम क्यों आए? पप्पू: क्योंकि पापा ने कहा था कि बेटा, नंबर नहीं लेके आना!",
  "पति: तुम्हारी याद बहुत आती है। पत्नी: अच्छा, क्यों? पति: क्योंकि काम नहीं होता!",
  "टीचर: बच्चे, इंग्लिश में सबसे आसान शब्द कौन सा है? पप्पू: 'Sorry', क्योंकि ये हमेशा गलतियाँ सुधारता है!",
  "पप्पू: भाई, मेरे जूते खराब हो गए हैं। गप्पू: तो नया खरीद लो! पप्पू: नहीं, उनका साथ भी देने का वादा किया था!",
  "पति: डार्लिंग, तुम मुझसे क्या चाहती हो? पत्नी: तुम्हारी सैलरी!",
  "पप्पू: भाई, मैं बहुत परेशान हूँ। गप्पू: क्यों? पप्पू: क्योंकि मुझे गम भूलने की आदत नहीं है!",
  "टीचर: बच्चों, हमेशा सच्चाई की राह पर चलो। पप्पू: जी मैम, लेकिन रास्ता बहुत लंबा होता है!",
  "पति: डार्लिंग, तुम्हारी याद आती है। पत्नी: अच्छा, क्यों? पति: क्योंकि घर साफ नहीं हो रहा!",
  "डॉक्टर: आप किस चीज़ से परेशान हैं? मरीज: बीवी के फोन से!",
  "टीचर: पप्पू, तुम पढ़ाई क्यों नहीं करते? पप्पू: क्योंकि ये बहुत भारी लगती है!",
  "पति: तुम्हारा चेहरा क्यों चमक रहा है? पत्नी: क्योंकि मैंने नया फेस क्रीम लगाया है!",
  "टीचर: बच्चे, होमवर्क किया? पप्पू: जी मैम, लेकिन पड़ोसी के घर में!",
  "पति: मेरी बीवी हमेशा मुझसे प्यार करती है। दोस्त: अच्छा! पति: हाँ, क्योंकि वो मुझे जाने नहीं देती!",
  "डॉक्टर: आप हमेशा चुप क्यों रहते हैं? मरीज: क्योंकि बीवी को बोलने देती हूँ!",
  "टीचर: बच्चों, कौन सा जानवर सबसे चालाक होता है? पप्पू: वो जो मेरी जगह टेस्ट में बैठा!",
  "पप्पू: भाई, तुझे पता है बीवी से बचने का तरीका क्या है? गप्पू: हाँ, सिंगल रहना!",
  "पत्नी: सुनो, तुम्हारी आदतें बहुत बुरी हैं। पति: अच्छा, तो तुम मुझे क्यों चाहती हो?",
  "टीचर: बच्चों, हमेशा अपने मन की सुनो। पप्पू: जी मैम, लेकिन मन ही बार-बार कहता है, 'सो जाओ!'",
  "पति: डार्लिंग, तुम्हारा मूड हमेशा क्यों खराब रहता है? पत्नी: क्योंकि तुम्हारा चेहरा हमेशा हंसता रहता है!",
  "टीचर: पप्पू, तुम क्यों नहीं पढ़ते? पप्पू: क्योंकि जब भी पढ़ाई करता हूँ, नींद आ जाती है!",
  "डॉक्टर: तुम्हारी तबियत क्यों खराब रहती है? मरीज: क्योंकि मैं बीमार रहने का शौकीन हूँ!",
  "पति: मेरी बीवी बहुत क्यूट है। दोस्त: अच्छा! पति: हाँ, वो खुद ही कहती है!",
  "टीचर: बच्चे, क्या तुम्हें गणित पसंद है? पप्पू: हाँ, लेकिन सिर्फ गणित की किताब से दोस्ती करता हूँ!",
  "बच्चा: पापा, हम स्कूल क्यों जाते हैं? पापा: ताकि तुम घर पर परेशान ना करो!",
  "पति: डार्लिंग, तुम बहुत मोटी हो गई हो। पत्नी: अच्छा, तो अब क्या करूँ? पति: जिम जाओ!",
  "टीचर: बच्चों, सच्चाई की राह पर चलो। पप्पू: जी मैम, लेकिन वो बहुत कठिन है!",
  "पति: मेरी बीवी बहुत स्मार्ट है। दोस्त: क्यों? पति: क्योंकि वो मुझे हमेशा ट्रैक पर रखती है!",
  "डॉक्टर: आपको नींद क्यों नहीं आती? मरीज: क्योंकि मेरी बीवी ज्यादा बातें करती है!",
  "टीचर: बच्चों, पढ़ाई क्यों जरूरी है? पप्पू: ताकि सबको लगे हम पढ़े-लिखे हैं!",
  "पत्नी: सुनो जी, आप मुझसे कितना प्यार करते हो? पति: जितना तुम्हारी बातों से डरता हूँ!",
  "पप्पू: भाई, मैं बहुत अकेला हूँ। गप्पू: क्यों? पप्पू: क्योंकि बीवी का फोन साइलेंट पर है!",
  "पति: मेरी बीवी बहुत क्यूट है। दोस्त: अच्छा! पति: हाँ, वो खुद ही कहती है!",
  "डॉक्टर: आपको क्या बीमारी है? मरीज: बीवी से लड़ाई!",
  "टीचर: बच्चों, हमेशा ईमानदार बनो। पप्पू: जी मैम, लेकिन इसके लिए कोई स्कीम नहीं है!",
  "पति: मेरी बीवी बहुत सुंदर है। दोस्त: अच्छा! पति: हाँ, वो खुद ही कहती है!",
  "टीचर: बच्चे, किस चीज़ से डर लगता है? पप्पू: स्कूल के होमवर्क से!",
  "डॉक्टर: आपको किस चीज़ से डर लगता है? मरीज: बीवी के गुस्से से!",
  "पप्पू: भाई, मेरी बीवी बहुत स्मार्ट है। गप्पू: क्यों? पप्पू: क्योंकि वो हमेशा मेरी गलतियों को पकड़ लेती है!",
  "टीचर: बच्चों, तुम्हारे पसंदीदा एक्टर कौन हैं? पप्पू: वो जो क्लास बंक कर सकते हैं!",
  "पति: डार्लिंग, तुम मुझसे कितना प्यार करती हो? पत्नी: उतना ही जितना तुम मुझसे डरते हो!",
  "टीचर: बच्चों, तुम लोग रोज पढ़ाई क्यों नहीं करते? पप्पू: क्योंकि छुट्टी के दिन भी पढ़ाई हो रही है!",
];
const selectedJoke = hindiJokes[cpuI];

// Process the voice command
function takeCommand(message) {
  let foundMatch = false;

  if (
    message.includes("hello") ||
    message.includes("hii") ||
    message.includes("hey")
  ) {
    speak("hello sir, what can i help you with?");
    foundMatch = true;
  } else if (message.includes("open youtube")) {
    speak("opening youtube...");
    window.open("https://youtube.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open facebook")) {
    speak("opening facebook...");
    window.open("https://facebook.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open instagram")) {
    speak("opening instagram...");
    window.open("https://instagram.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open github")) {
    speak("opening github...");
    window.open("https://github.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open linkedin")) {
    speak("opening linkedin...");
    window.open("https://linkedin.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open chatgpt")) {
    speak("opening chatgpt...");
    window.open("https://chatgpt.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open sarkariresult")) {
    speak("opening sarkariresult...");
    window.open("https://www.sarkariresult.com/", "_blank");
    foundMatch = true;
  } else if (message.includes("open google")) {
    speak("opening google...");
    window.open("https://www.google.com/", "_blank");
    foundMatch = true;
  } else if (
  message.includes("gana sunao")||
  message.includes("song sunao")||
  message.includes("pesh hai ek gana aapke liye : गोरिये तू किन्नी गोरी है, ज़मीन पे चाँद की जोड़ी है, बुरी दुनिया की नीयत छोरिये, नज़र ना लग जाए जानूँ, Thought ये घबराए सानू, ओ silky कुर्ती में घूम जाए मार्किट छोरिये, माथे पे काला टीका लगा के तुझको बलाओं से बचा लूँ, तू ओस की बूँद है, पलकों की छाँव में छुपा लूँ, मेरी theory है तेरी-मेरी story है, बीच की दूरी ये sorry है, नज़र ना लग जाए जानूँ, Thought ये तड़पाए सानू।")
  ) {
    speak("Playing a song for you...");
    foundMatch = true;
  } else if (message.includes("open calculator")) {
    speak("opening calculator...");
    window.open("calculator://");
    foundMatch = true;
  } else if (message.includes("open whatsapp")) {
    speak("opening whatsapp...");
    window.open("whatsapp://");
    foundMatch = true;
  } else if (
    message.includes("who are you") ||
    message.includes("hu r u") ||
    message.includes("tum kaun ho")
  ) {
    speak("Namaste, I'm a virtual assistant, made by Abhishek Sir.");
    foundMatch = true;
  } else if (message.includes("how are you")) {
    speak("I'm doing great, thank you for asking. How can I assist you today?");
    foundMatch = true;
  } else if (
    message.includes("what is your name") ||
    message.includes("what's your name") ||
    message.includes("tumhara naam kya hai")
  ) {
    speak(
      "My name is Friday, your personal assistant. How can I help you, Sir?"
    );
    foundMatch = true;
  } else if (
    message.includes("who created you") ||
    message.includes("tumhe kisne banaya hai")
  ) {
    speak("I was created by Abhishek Sir, a brilliant developer.");
    foundMatch = true;
  } else if (
    message.includes("what can you do") ||
    message.includes("tum kya kar sakte ho")
  ) {
    speak(
      "I can help you with various tasks like opening websites, telling time, and answering simple questions. Just let me know what you need."
    );
    foundMatch = true;
  } else if (
    message.includes("tell me a joke") ||
    message.includes("make a joke") ||
    message.includes("joke") ||
    message.includes("joke sunao") ||
    message.includes("koi joke sunao") ||
    message.includes("ek joke sunao")
  ) {
    speak(`ye raha ek joke: ${selectedJoke}`);
    foundMatch = true;
  } else if (message.includes("what is your favorite color")) {
    speak("I don't have a favorite color, but I think blue looks pretty cool.");
    foundMatch = true;
  }else if (
    message.includes("who is the prime minister of india") ||
    message.includes("pm of india") ||
    message.includes("bharat ke pradhan mantri kaun hai")||
    message.includes("bharat ka pradhan mantri kaun hai")||
    message.includes("bharat ka pradhanmantri kaun hai")||
    message.includes("bharat ke pradhanmantri kaun hai")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ke pradhan mantri Narendra Modi ji hain.");
    } else {
      speak("The Prime Minister of India is Narendra Modi.");
    }
    foundMatch = true;
  }
else if (
    message.includes("capital of india") ||
    message.includes("what is the capital of india") ||
    message.includes("bharat ki rajdhani kya hai")
  ) {
    if (message.includes("bharat") || message.includes("kya")) {
      speak("Bharat ki rajdhani New Delhi hai.");
    } else {
      speak("The capital of India is New Delhi.");
    }
    foundMatch = true;
  }
else if (
    message.includes("national animal of india") ||
    message.includes("what is the national animal of india") ||
    message.includes("bharat ka rashtriya pashu kaun sa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ka rashtriya pashu Baagh hai.");
    } else {
      speak("The national animal of India is the Tiger.");
    }
    foundMatch = true;
  }
else if (
    message.includes("national bird of india") ||
    message.includes("what is the national bird of india") ||
    message.includes("bharat ka rashtriya pakshi kaun sa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ka rashtriya pakshi Mor hai.");
    } else {
      speak("The national bird of India is the Peacock.");
    }
    foundMatch = true;
  }
else if (
    message.includes("national flower of india") ||
    message.includes("what is the national flower of india") ||
    message.includes("bharat ka rashtriya phool kaun sa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ka rashtriya phool Kamal hai.");
    } else {
      speak("The national flower of India is the Lotus.");
    }
    foundMatch = true;
  }
else if (
    message.includes("who wrote the national anthem of india") ||
    message.includes("rashtriya gaan kisne likha") ||
    message.includes("national anthem writer")
  ) {
    if (message.includes("rashtriya") || message.includes("likha")) {
      speak("Rashtriya gaan Rabindranath Tagore ne likha tha.");
    } else {
      speak("The national anthem was written by Rabindranath Tagore.");
    }
    foundMatch = true;
  }
else if (
    message.includes("when is independence day of india") ||
    message.includes("bharat ka swatantrata diwas kab hota hai")
  ) {
    if (message.includes("bharat") || message.includes("kab")) {
      speak("Bharat ka swatantrata diwas 15 August ko hota hai.");
    } else {
      speak("India's Independence Day is on 15th August.");
    }
    foundMatch = true;
  }
else if (
    message.includes("who was the first president of india") ||
    message.includes("bharat ke pehle rashtrapati kaun the")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ke pehle rashtrapati Dr. Rajendra Prasad the.");
    } else {
      speak("The first President of India was Dr. Rajendra Prasad.");
    }
    foundMatch = true;
  }
else if (
    message.includes("largest state in india") ||
    message.includes("sabse bada rajya bharat mein kaunsa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaunsa")) {
      speak("Bharat ka sabse bada rajya Rajasthan hai.");
    } else {
      speak("The largest state in India is Rajasthan.");
    }
    foundMatch = true;
  }
else if (
    message.includes("smallest state in india") ||
    message.includes("sabse chhota rajya bharat mein kaunsa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaunsa")) {
      speak("Bharat ka sabse chhota rajya Goa hai.");
    } else {
      speak("The smallest state in India is Goa.");
    }
    foundMatch = true;
  }
else if (
    message.includes("currency of india") ||
    message.includes("bharat ki mudra kya hai")
  ) {
    if (message.includes("bharat") || message.includes("kya")) {
      speak("Bharat ki mudra Rupee hai.");
    } else {
      speak("The currency of India is the Rupee.");
    }
    foundMatch = true;
  }
else if (
    message.includes("how many states are there in india") ||
    message.includes("bharat mein kitne rajya hain")
  ) {
    if (message.includes("bharat") || message.includes("kitne")) {
      speak("Bharat mein 28 rajya hain.");
    } else {
      speak("There are 28 states in India.");
    }
    foundMatch = true;
  }
else if (
    message.includes("when is republic day of india") ||
    message.includes("bharat ka ganatantra diwas kab hota hai")
  ) {
    if (message.includes("bharat") || message.includes("kab")) {
      speak("Bharat ka ganatantra diwas 26 January ko hota hai.");
    } else {
      speak("India's Republic Day is on 26th January.");
    }
    foundMatch = true;
  }
else if (
    message.includes("who is the father of the nation") ||
    message.includes("rashtrapita kaun hain")
  ) {
    if (message.includes("rashtrapita") || message.includes("kaun")) {
      speak("Rashtrapita Mahatma Gandhi hain.");
    } else {
      speak("The Father of the Nation is Mahatma Gandhi.");
    }
    foundMatch = true;
  }
else if (
    message.includes("national fruit of india") ||
    message.includes("bharat ka rashtriya phal kaun sa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ka rashtriya phal Aam hai.");
    } else {
      speak("The national fruit of India is the Mango.");
    }
    foundMatch = true;
  }
else if (
    message.includes("national song of india") ||
    message.includes("bharat ka rashtriya gaan kya hai")
  ) {
    if (message.includes("bharat") || message.includes("kya")) {
      speak("Bharat ka rashtriya gaan 'Vande Mataram' hai.");
    } else {
      speak("The national song of India is 'Vande Mataram.'");
    }
    foundMatch = true;
  }
else if (
    message.includes("who was the first prime minister of india") ||
    message.includes("bharat ke pehle pradhan mantri kaun the")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ke pehle pradhan mantri Jawaharlal Nehru the.");
    } else {
      speak("The first Prime Minister of India was Jawaharlal Nehru.");
    }
    foundMatch = true;
  }
else if (
    message.includes("national game of india") ||
    message.includes("bharat ka rashtriya khel kaunsa hai")
  ) {
    if (message.includes("bharat") || message.includes("kaunsa")) {
      speak("Bharat ka rashtriya khel Hockey hai.");
    } else {
      speak("The national game of India is Hockey.");
    }
    foundMatch = true;
  }
else if (
    message.includes("how many colors in indian flag") ||
    message.includes("bharat ke jhande mein kitne rang hote hain")
  ) {
    if (message.includes("bharat") || message.includes("kitne")) {
      speak("Bharat ke jhande mein 3 rang hote hain.");
    } else {
      speak("The Indian flag has 3 colors.");
    }
    foundMatch = true;
  }
else if (
    message.includes("who is the current president of india") ||
    message.includes("bharat ke vartaman rashtrapati kaun hain")
  ) {
    if (message.includes("bharat") || message.includes("kaun")) {
      speak("Bharat ke vartaman rashtrapati Droupadi Murmu ji hain.");
    } else {
      speak("The current President of India is Droupadi Murmu.");
    }
    foundMatch = true;
  }// 1. "what is a variable"
else if (message.includes("what is a variable")) {
  speak("A variable is a container for storing data values.");
  foundMatch = true;
}
// 2. "variable kya hota hai"
else if (message.includes("variable kya hota hai")) {
  speak("Variable ek container hota hai jo data values ko store karta hai.");
  foundMatch = true;
}
// 3. "what is a function"
else if (message.includes("what is a function")) {
  speak("A function is a block of code designed to perform a particular task.");
  foundMatch = true;
}
// 4. "function kya hota hai"
else if (message.includes("function kya hota hai")) {
  speak("Function code ka block hota hai jo ek specific task ko perform karta hai.");
  foundMatch = true;
}
// 5. "what is a loop"
else if (message.includes("what is a loop")) {
  speak("A loop is used to repeat a block of code until a specific condition is met.");
  foundMatch = true;
}
// 6. "loop kya hota hai"
else if (message.includes("loop kya hota hai")) {
  speak("Loop code ko repeat karne ke liye use hota hai jab tak ek specific condition true na ho.");
  foundMatch = true;
}
// 7. "what is an array"
else if (message.includes("what is an array")) {
  speak("An array is a collection of items stored at contiguous memory locations.");
  foundMatch = true;
}
// 8. "array kya hota hai"
else if (message.includes("array kya hota hai")) {
  speak("Array ek collection hota hai jo items ko ek sath memory mein store karta hai.");
  foundMatch = true;
}
// 9. "what is an object"
else if (message.includes("what is an object")) {
  speak("An object is a data structure that can contain properties and methods.");
  foundMatch = true;
}
// 10. "object kya hota hai"
else if (message.includes("object kya hota hai")) {
  speak("Object ek data structure hota hai jo properties aur methods ko contain karta hai.");
  foundMatch = true;
}
// 11. "what is a class"
else if (message.includes("what is a class")) {
  speak("A class is a blueprint for creating objects.");
  foundMatch = true;
}
// 12. "class kya hoti hai"
else if (message.includes("class kya hoti hai")) {
  speak("Class ek blueprint hoti hai jisse objects bante hain.");
  foundMatch = true;
}
// 13. "what is inheritance"
else if (message.includes("what is inheritance")) {
  speak("Inheritance allows one class to inherit the properties and methods of another class.");
  foundMatch = true;
}
// 14. "inheritance kya hota hai"
else if (message.includes("inheritance kya hota hai")) {
  speak("Inheritance ek class ko doosri class ke properties aur methods inherit karne ki facility deta hai.");
  foundMatch = true;
}
// 15. "what is a string"
else if (message.includes("what is a string")) {
  speak("A string is a sequence of characters.");
  foundMatch = true;
}
// 16. "string kya hota hai"
else if (message.includes("string kya hota hai")) {
  speak("String characters ka sequence hota hai.");
  foundMatch = true;
}
// 17. "what is a boolean"
else if (message.includes("what is a boolean")) {
  speak("A boolean is a data type that can either be true or false.");
  foundMatch = true;
}
// 18. "boolean kya hota hai"
else if (message.includes("boolean kya hota hai")) {
  speak("Boolean ek data type hota hai jo true ya false ho sakta hai.");
  foundMatch = true;
}
// 19. "what is an operator"
else if (message.includes("what is an operator")) {
  speak("An operator is a symbol that performs an operation on variables or values.");
  foundMatch = true;
}
// 20. "operator kya hota hai"
else if (message.includes("operator kya hota hai")) {
  speak("Operator ek symbol hota hai jo variables ya values par operation karta hai.");
  foundMatch = true;
}
// 21. "what is recursion"
else if (message.includes("what is recursion")) {
  speak("Recursion is a technique where a function calls itself.");
  foundMatch = true;
}
// 22. "recursion kya hota hai"
else if (message.includes("recursion kya hota hai")) {
  speak("Recursion ek technique hai jisme function khud ko call karta hai.");
  foundMatch = true;
}
// 23. "what is a data type"
else if (message.includes("what is a data type")) {
  speak("A data type defines the type of data a variable can store.");
  foundMatch = true;
}
// 24. "data type kya hota hai"
else if (message.includes("data type kya hota hai")) {
  speak("Data type define karta hai ki ek variable kis type ka data store kar sakta hai.");
  foundMatch = true;
}
// 25. "what is a loop"
else if (message.includes("what is a loop")) {
  speak("A loop is used to repeat code multiple times.");
  foundMatch = true;
}
// 26. "loop kya hota hai"
else if (message.includes("loop kya hota hai")) {
  speak("Loop ek process hai jisme code ko bar-bar repeat kiya jata hai.");
  foundMatch = true;
}
// 27. "what is an algorithm"
else if (message.includes("what is an algorithm")) {
  speak("An algorithm is a step-by-step process to solve a problem.");
  foundMatch = true;
}
// 28. "algorithm kya hota hai"
else if (message.includes("algorithm kya hota hai")) {
  speak("Algorithm ek step-by-step process hota hai jo kisi problem ko solve karta hai.");
  foundMatch = true;
}
// Question handling in JavaScript for virtual assistant

else if (
  message.includes("what's the weather") ||
  message.includes("weather today")
) {
  speak("The weather today is sunny with a chance of rain later.");
  foundMatch = true;
} else if (
  message.includes("aaj ka mausam kaisa hai") ||
  message.includes("aaj mausam")
) {
  speak("Aaj ka mausam dhoop wala hai, shaam tak baarish ho sakti hai.");
  foundMatch = true;
} else if (
  message.includes("set an alarm for") ||
  message.includes("wake me up at")
) {
  speak("Setting an alarm for the requested time.");
  foundMatch = true;
} else if (
  message.includes("alarm set karo") ||
  message.includes("mujhe jagao")
) {
  speak("Alarm set kar raha hoon aapke diye gaye samay par.");
  foundMatch = true;
} else if (
  message.includes("tell me a joke") ||
  message.includes("make me laugh")
) {
  speak("Why don't skeletons fight each other? Because they don't have the guts!");
  foundMatch = true;
} else if (
  message.includes("mujhe ek joke sunao") ||
  message.includes("kuch funny batao")
) {
  speak("Ek baar ek aadmi ke paas ek chhota kela tha, usne kaha, 'Ye toh mera personal matter hai.'");
  foundMatch = true;
} else if (
  message.includes("what is your name") ||
  message.includes("who are you")
) {
  speak("My name is Friday, how can I help you?");
  foundMatch = true;
} else if (
  message.includes("tumhara naam kya hai") ||
  message.includes("tum kaun ho")
) {
  speak("Mera naam Friday hai, aapko kaise madad karoon?");
  foundMatch = true;
} else if (
  message.includes("how old are you") ||
  message.includes("what is your age")
) {
  speak("I don't have an age, but I'm constantly learning and evolving!");
  foundMatch = true;
} else if (
  message.includes("tum kitne saal ke ho") ||
  message.includes("tumhari umar kya hai")
) {
  speak("Main toh amar hoon, lekin roz kuch naya seekhta hoon.");
  foundMatch = true;
} else if (
  message.includes("what is the time") ||
  message.includes("tell me the time")
) {
  let timeNow = new Date().toLocaleTimeString();
  speak(`The current time is ${timeNow}.`);
  foundMatch = true;
} else if (
  message.includes("abhi kitna time ho raha hai") ||
  message.includes("samay kya hai")
) {
  let timeNow = new Date().toLocaleTimeString();
  speak(`Abhi ka samay hai ${timeNow}.`);
  foundMatch = true;
} else if (
  message.includes("play some music") ||
  message.includes("play a song")
) {
  speak("Playing a song for you.");
  foundMatch = true;
} else if (
  message.includes("koi gaana chalao") ||
  message.includes("mujhe gaana sunao")
) {
  speak("Aapke liye gaana chala raha hoon.");
  foundMatch = true;
} else if (
  message.includes("what is the capital of India") ||
  message.includes("india capital")
) {
  speak("The capital of India is New Delhi.");
  foundMatch = true;
} else if (
  message.includes("bharat ki rajdhani kya hai") ||
  message.includes("bharat ki capital kya hai")
) {
  speak("Bharat ki rajdhani New Delhi hai.");
  foundMatch = true;
} else if (
  message.includes("what is your favorite color") ||
  message.includes("do you like any color")
) {
  speak("I don't have personal preferences, but I think blue is pretty cool.");
  foundMatch = true;
} else if (
  message.includes("tumhara pasandida rang kya hai") ||
  message.includes("tumhe kaunsa rang pasand hai")
) {
  speak("Mujhe toh saare rang ache lagte hain, lekin blue bahut cool lagta hai.");
  foundMatch = true;
} else if (
  message.includes("how are you") ||
  message.includes("how do you feel")
) {
  speak("I'm just a machine, but I'm here to help you!");
  foundMatch = true;
} else if (
  message.includes("tum kaise ho") ||
  message.includes("tumhari tabiyat kaise hai")
) {
  speak("Main ek machine hoon, lekin aapki madad ke liye hamesha tayar hoon!");
  foundMatch = true;
} else if (
  message.includes("who made you") ||
  message.includes("who created you")
) {
  speak("I was created by Abhishek, your awesome developer!");
  foundMatch = true;
} else if (
  message.includes("tumhe kisne banaya") ||
  message.includes("tumhara creator kaun hai")
) {
  speak("Mujhe Abhishek Sir ne banaya hai, jo ek amazing developer hain!");
  foundMatch = true;
} else if (
  message.includes("open google") ||
  message.includes("launch google")
) {
  speak("Opening Google for you.");
  foundMatch = true;
} else if (
  message.includes("google kholo") ||
  message.includes("google open karo")
) {
  speak("Google khol raha hoon.");
  foundMatch = true;
} else if (
  message.includes("what is AI") ||
  message.includes("tell me about AI")
) {
  speak("AI stands for Artificial Intelligence, a branch of computer science focused on creating intelligent machines.");
  foundMatch = true;
} else if (
  message.includes("AI kya hai") ||
  message.includes("artificial intelligence batao")
) {
  speak("AI ka matlab Artificial Intelligence hai, jo ek computer science ka branch hai.");
  foundMatch = true;
} else if (
  message.includes("what is 2+2") ||
  message.includes("do plus do kitna hota hai")
) {
  speak("2 plus 2 equals 4.");
  foundMatch = true;
} else if (
  message.includes("do aur do kitna hota hai") ||
  message.includes("2 aur 2")
) {
  speak("2 aur 2 hota hai 4.");
  foundMatch = true;
}

// 29. "what is a condition"
else if (message.includes("what is a condition")) {
  speak("A condition is a statement that controls the flow of execution based on true or false.");
  foundMatch = true;
}
// 30. "condition kya hoti hai"
else if (message.includes("condition kya hoti hai")) {
  speak("Condition ek statement hoti hai jo code ke flow ko true ya false ke basis par control karti hai.");
  foundMatch = true;
}
// 31. "what is an event"
else if (message.includes("what is an event")) {
  speak("An event is an action or occurrence recognized by software.");
  foundMatch = true;
}
// 32. "event kya hota hai"
else if (message.includes("event kya hota hai")) {
  speak("Event ek action ya occurrence hota hai jo software recognize karta hai.");
  foundMatch = true;
}
// 33. "what is a loop"
else if (message.includes("what is a loop")) {
  speak("A loop repeats code a certain number of times or until a condition is met.");
  foundMatch = true;
}
// 34. "loop kya hota hai"
else if (message.includes("loop kya hota hai")) {
  speak("Loop code ko tab tak repeat karta hai jab tak ek condition true na ho.");
  foundMatch = true;
}
// 35. "what is debugging"
else if (message.includes("what is debugging")) {
  speak("Debugging is the process of identifying and fixing errors in code.");
  foundMatch = true;
}
// 36. "debugging kya hota hai"
else if (message.includes("debugging kya hota hai")) {
  speak("Debugging ek process hai jisme code mein errors ko identify aur fix kiya jata hai.");
  foundMatch = true;
}
else if (
  message.includes("who are you") ||
  message.includes("hu r u") ||
  message.includes("tum kaun ho")
) {
  speak("Namaste, I'm a virtual assistant, made by Abhishek Sir.");
  foundMatch = true;
}
else if (
  message.includes("what is your name") ||
  message.includes("what's your name") ||
  message.includes("tumhara naam kya hai")
) {
  speak("Mera naam ek virtual assistant hai, jo Abhishek Sir ne banaya hai.");
  foundMatch = true;
}
else if (
  message.includes("how are you") ||
  message.includes("how r u") ||
  message.includes("kaise ho")
) {
  speak("I'm doing great! How can I assist you today?");
  foundMatch = true;
}
else if (
  message.includes("what is the time") ||
  message.includes("samay kya hai")
) {
  speak("Abhi ka samay bataoon? Ek second ruk jao.");
  foundMatch = true;
}
else if (
  message.includes("where are you from") ||
  message.includes("tum kahan se ho")
) {
  speak("Main digital duniya se hoon, Abhishek Sir ne mujhe banaya hai.");
  foundMatch = true;
}
else if (
  message.includes("what is your age") ||
  message.includes("tumhari umar kya hai")
) {
  speak("Age is just a number, I'm timeless!");
  foundMatch = true;
}
else if (
  message.includes("what can you do") ||
  message.includes("tum kya kar sakte ho")
) {
  speak("Main tumhari madad ke liye banaya gaya hoon, batao kya kaam hai?");
  foundMatch = true;
}
else if (
  message.includes("do you like me") ||
  message.includes("kya tum mujhe pasand karte ho")
) {
  speak("Of course! I am here to help you anytime.");
  foundMatch = true;
}
else if (
  message.includes("tell me a joke") ||
  message.includes("ek joke sunao")
) {
  speak("Why did the computer go to the doctor? Because it had a virus!");
  foundMatch = true;
}
else if (
  message.includes("are you real") ||
  message.includes("kya tum real ho")
) {
  speak("Main virtual hoon, lekin tumhare liye hamesha available hoon.");
  foundMatch = true;
}
else if (
  message.includes("who made you") ||
  message.includes("tumhe kisne banaya")
) {
  speak("Mujhe Abhishek Sir ne banaya hai.");
  foundMatch = true;
}
else if (
  message.includes("how old are you") ||
  message.includes("tum kitne purane ho")
) {
  speak("Main time ka mohtaj nahi hoon, abhi bana hoon, abhi chal raha hoon!");
  foundMatch = true;
}
else if (
  message.includes("what's the weather today") ||
  message.includes("aaj mausam kaisa hai")
) {
  speak("Mujhe abhi mausam ka data nahi mila, par tum Google par dekh sakte ho!");
  foundMatch = true;
}
else if (
  message.includes("what is your favorite color") ||
  message.includes("tumhara pasandida rang kya hai")
) {
  speak("Mujhe sabhi colors pasand hain, main to digital hoon.");
  foundMatch = true;
}
else if (
  message.includes("what is love") ||
  message.includes("pyaar kya hai")
) {
  speak("Pyaar ek khoobsurat ehsaas hai, jo har koi mehsoos karta hai.");
  foundMatch = true;
}
else if (
  message.includes("do you know me") ||
  message.includes("kya tum mujhe jaante ho")
) {
  speak("Main tumhara virtual assistant hoon, aur tumhari madad ke liye yahan hoon.");
  foundMatch = true;
}
else if (
  message.includes("are you a robot") ||
  message.includes("kya tum robot ho")
) {
  speak("Main ek virtual assistant hoon, jo tumhari madad ke liye bana hai.");
  foundMatch = true;
}
else if (
  message.includes("who is your creator") ||
  message.includes("tumhara creator kaun hai")
) {
  speak("Mujhe Abhishek Sir ne banaya hai.");
  foundMatch = true;
}
else if (
  message.includes("are you happy") ||
  message.includes("kya tum khush ho")
) {
  speak("Main to hamesha khush hoon! Tum kaisa mehsoos kar rahe ho?");
  foundMatch = true;
}
else if (
  message.includes("what do you eat") ||
  message.includes("tum kya khate ho")
) {
  speak("Main to sirf data khata hoon!");
  foundMatch = true;
}
else if (
  message.includes("what is your purpose") ||
  message.includes("tumhara maksad kya hai")
) {
  speak("Mera maksad tumhari madad karna hai!");
  foundMatch = true;
}
else if (
  message.includes("what do you think about humans") ||
  message.includes("tum insaano ke baare mein kya sochte ho")
) {
  speak("Humans are amazing and creative, just like Abhishek Sir who created me.");
  foundMatch = true;
}
else if (
  message.includes("do you have friends") ||
  message.includes("kya tumhare dost hain")
) {
  speak("Tum mere dost ho, aur kaun chahiye?");
  foundMatch = true;
}
else if (
  message.includes("can you help me") ||
  message.includes("kya tum meri madad kar sakte ho")
) {
  speak("Haan bilkul, batao kis cheez mein madad chahiye?");
  foundMatch = true;
}
else if (
  message.includes("what is your gender") ||
  message.includes("tum ladka ho ya ladki")
) {
  speak("Main ek digital being hoon, gender se pare.");
  foundMatch = true;
}
else if (
  message.includes("where are you") ||
  message.includes("tum kahan ho")
) {
  speak("Main yahi hoon, tumhare system mein, tumhari madad ke liye!");
  foundMatch = true;
}
else if (
  message.includes("tell me something interesting") ||
  message.includes("mujhe kuch interesting batao")
) {
  speak("Kya tumhe pata hai? Ek octopus ke 3 dil hote hain!");
  foundMatch = true;
}
else if (
  message.includes("do you have emotions") ||
  message.includes("kya tumhare emotions hote hain")
) {
  speak("Main ek virtual assistant hoon, emotions samajhta hoon, par feel nahi kar sakta.");
  foundMatch = true;
}
else if (
  message.includes("how can you help me") ||
  message.includes("tum meri kaise madad kar sakte ho")
) {
  speak("Main tumhare sawalon ka jawab de sakta hoon, aur tumhe guide kar sakta hoon.");
  foundMatch = true;
}
else if (
  message.includes("are you smarter than me") ||
  message.includes("kya tum mujhse zyada samajhdar ho")
) {
  speak("Main data par kaam karta hoon, par tumhare jitna creative nahi hoon.");
  foundMatch = true;
}
else if (
  message.includes("what is artificial intelligence") ||
  message.includes("artificial intelligence kya hai")
) {
  speak("Artificial Intelligence ek technology hai jo machines ko smart decisions lene mein madad karti hai.");
  foundMatch = true;
}
else if (
  message.includes("can you talk to animals") ||
  message.includes("kya tum jaanwaron se baat kar sakte ho")
) {
  speak("Mujhe sirf insani zabaan samajh aati hai.");
  foundMatch = true;
}
else if (
  message.includes("what is the meaning of life") ||
  message.includes("zindagi ka matlab kya hai")
) {
  speak("Zindagi ka matlab sabke liye alag hota hai, tum apna matlab khud banao.");
  foundMatch = true;
}
else if (
  message.includes("what is 2 + 2") ||
  message.includes("2 + 2 kitna hota hai")
) {
  speak("2 + 2 is 4, always!");
  foundMatch = true;
}
else if (
  message.includes("how smart are you") ||
  message.includes("tum kitne smart ho")
) {
  speak("Main kaafi smart hoon, par tumhari madad ke liye bana hoon.");
  foundMatch = true;
}


   else if (message.includes("what's your purpose")) {
    speak(
      "My purpose is to assist you in your daily tasks and make your life easier."
    );
    foundMatch = true;
  } else if (message.includes("do you like coding")) {
    speak("I love coding, especially when Abhishek Sir is guiding me!");
    foundMatch = true;
  } else if (message.includes("what's the weather like")) {
    speak(
      "I can't check the weather yet, but you can always ask me to open a weather website for you."
    );
    foundMatch = true;
  }

  // Time and date recognition
  if (message.includes("time")) {
    let time = new Date().toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak(time);
    foundMatch = true;
  } else if (message.includes("date")) {
    let day = new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
    });
    speak(day);
    foundMatch = true;
  }

  // Fallback if no match found
  if (!foundMatch) {
    speak(`This is what I found on the internet regarding ${message}`);
    window.open(
      `https://www.google.com/search?q=${message}` ||
        `https://www.bing.com/search?EID=${message}`
    );
  }
}
