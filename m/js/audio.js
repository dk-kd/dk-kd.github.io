let audio = null;
const audio_pass = "./audio/";
const audio_list = {
    "kohane": ["kohane_1.mp3", "kohane_2.mp3"],
    "an": ["an_1.mp3", "an_2.mp3"]
};
const playAudio = (name) => {
    if (audio != null) {
        audio.pause();
    }
    if (typeof audio_list[name] == "undefined") {
        console.log("undefined audio: " + name);
        return;
    }
    const arr = audio_list[name];
    const mp3 = arr[Math.floor(Math.random() * arr.length)];
    audio = new Audio(audio_pass + mp3);
    audio.play();
}