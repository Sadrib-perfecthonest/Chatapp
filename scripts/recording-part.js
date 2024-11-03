let isRecording = false;
let mediaRecorder;
let audioChunks = [];

// Function to handle voice recording
function toggleVoiceRecorder() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            isRecording = true;

            // Show recording time
            const recordingTimeElement = document.createElement('div');
            recordingTimeElement.id = 'recording-time';
            document.getElementById('chat-window-footer').appendChild(recordingTimeElement);

            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                sendMessage(audioUrl);
                audioChunks = [];
                isRecording = false;
                document.getElementById('recording-time').remove();
            };

            // Update the recording time every second
            let seconds = 0;
            const timerInterval = setInterval(() => {
                seconds++;
                recordingTimeElement.textContent = `Recording: ${seconds}s`;
            }, 1000);

            mediaRecorder.onstop = () => {
                clearInterval(timerInterval);
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                sendMessage(audioUrl);
                audioChunks = [];
                isRecording = false;
                document.getElementById('recording-time').remove();
            };
        });
}

function stopRecording() {
    mediaRecorder.stop();
}

// Function to send a message or audio
function sendMessage(audioUrl = null) {
    const messageInput = document.getElementById('compose-chat-box');
    const message = messageInput.value.trim();
    const chatWindowContents = document.getElementById('chat-window-contents');

    if (audioUrl) {
        const audioMessage = `<audio controls src="${audioUrl}"></audio>`;
        chatWindowContents.innerHTML += `<div class="chat-message">${audioMessage}</div>`;
    } else if (message) {
        chatWindowContents.innerHTML += `<div class="chat-message">${message}</div>`;
        messageInput.value = ''; // Clear input
    }
}

