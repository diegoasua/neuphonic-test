const apiKey = '';
const inputText = document.getElementById('input-text');
const speakBtn = document.getElementById('speak-btn');
const audioPlayer = document.getElementById('audio-player');
const responseLog = document.getElementById('response-log');

const ws = new WebSocket(`wss://neuphonic.us/speak/en/${apiKey}`);

ws.onmessage = (message) => {
    if (message.data instanceof Blob) {
        responseLog.textContent += `Received Blob\n`;
        const audioUrl = URL.createObjectURL(message.data);
        audioPlayer.src = audioUrl;
        audioPlayer.play();
    } else {
        const received = JSON.parse(message.data);
        responseLog.textContent += `Received JSON: ${JSON.stringify(received)}\n`;
    }
};

speakBtn.addEventListener('click', () => {
    const sentence = inputText.value.trim();
    if (sentence) {
        const words = sentence.split(' ');
        for (const word of words) {
            ws.send(word);
        }
    }
});