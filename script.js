const speechRecognitionService= window.speechRecognition || window.webkitSpeechRecognition;
const recognitionService = new speechRecognitionService();

const startBtn = document.querySelector(".btn-start");
const textLog = document.querySelector(".text-log");

const languages= {
    English: "en-US",
    Romanian: "ro-RO"
};

startBtn.addEventListener("click", () => {
    recognitionService.lang = determineLanguage();
    recognitionService.continuous = true;

    recognitionService.onresult = handleResult;

    if(startBtn.classList.contains("btn-pulsating")){
        recognitionService.stop();
        startBtn.classList.remove("btn-pulsating");
    } else {
        recognitionService.start();
        startBtn.classList.add("btn-pulsating");
    }
});

function determineLanguage (){
    const selected = document.querySelector("#language").value;
    switch(selected){
        case "English":
            return languages.English;
        case "Romanian":
            return languages.Romanian;
    }
}

function handleResult(event){
    const results = [];
    for(const result of event.results){
        results.push(`${result[0].transcript}`)
    }
    textLog.innerHTML += results.at(-1);
}