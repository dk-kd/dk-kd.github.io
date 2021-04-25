let audio = null;
const audio_pass = "./audio/";
const playAudio = (name) => {
    if (audio != null) {
        audio.pause();
    }
    try {
        audio = new Audio(audio_pass + name);
        audio.play();
    } catch (e) {
        console.log(e);
    }
}
