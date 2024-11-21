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
                addAudioMessageToChat(audioUrl);
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
                addAudioMessageToChat(audioUrl);
                audioChunks = [];
                isRecording = false;
                document.getElementById('recording-time').remove();
            };
        });
}

function stopRecording() {
    mediaRecorder.stop();
}

// Function to add audio message to the chat window
function addAudioMessageToChat(audioUrl) {
    const chatWindowContents = document.getElementById('chat-window-contents');
    const messageGroup = document.createElement('div');
    messageGroup.classList.add('chat-message-group');

    const avatar = document.createElement('img');
    avatar.src = 'https://picsum.photos/50'; // Replace with actual avatar source
    avatar.alt = 'Avatar';
    avatar.classList.add('chat-message-avatar');

    const messagesContainer = document.createElement('div');
    messagesContainer.classList.add('chat-messages');

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('chat-message-container');

    const audioElement = document.createElement('audio');
    audioElement.controls = true;
    audioElement.src = audioUrl;

    const message = document.createElement('div');
    message.classList.add('chat-message');
    message.appendChild(audioElement);

    messageContainer.appendChild(message);
    messagesContainer.appendChild(messageContainer);
    messageGroup.appendChild(avatar);
    messageGroup.appendChild(messagesContainer);
    chatWindowContents.appendChild(messageGroup);

    // Scroll to the latest message
    chatWindowContents.scrollTop = chatWindowContents.scrollHeight;
}
