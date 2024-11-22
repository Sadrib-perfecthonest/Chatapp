document.addEventListener('DOMContentLoaded', function () {
    let sendSoundEnabled = true; // Default: send sound enabled
    let receiveSoundEnabled = true; // Default: receive sound enabled
    const sendSoundPath = 'file:///D:/East%20Delta%20University/7th%20semester/Chat%20App/Audio/happy-pop-3-185288.mp3'; // Path for the send sound
    const receiveSoundPath = 'file:///D:/East%20Delta%20University/7th%20semester/Chat%20App/Audio/happy-pop-3-185288.mp3'; // Path for the receive sound

    // Function to play a sound
    function playSound(url) {
        const audio = new Audio(url);
        audio.play().catch(error => console.error('Error playing sound:', error));
    }
    
    // Utility function to show sub pop-ups
    function showPopup(content, backFunction) {
        const existingPopup = document.getElementById('settings-popup') || document.getElementById('sub-popup');
        if (existingPopup) document.body.removeChild(existingPopup);

        const popup = document.createElement('div');
        popup.id = 'sub-popup';
        popup.style = getPopupStyle();
        popup.innerHTML = content;
        document.body.appendChild(popup);

        document.getElementById('back-to-settings').onclick = function () {
            document.body.removeChild(popup);
            backFunction();
        };
    }

    // Utility function to get common pop-up styles
    function getPopupStyle() {
        return `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            background-color: var(--primary);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-radius: 8px;
            padding: 20px;
            z-index: 1000;
            text-align: center;
        `;
    }

    // Main Settings Popup
    function createSettingsPopup() {
        const popup = document.createElement('div');
        popup.id = 'settings-popup';
        popup.style = getPopupStyle();
        popup.innerHTML = `
            <h2>Settings</h2>
            <ul style="list-style-type: none; padding: 0;">
                <li><button class="settings-option" id="account-btn">Account</button></li>
                <li><button class="settings-option" id="notifications-btn">Notifications</button></li>
                <li><button class="settings-option" id="privacy-btn">Privacy</button></li>
                <li><button class="settings-option" id="help-btn">Help</button></li>
            </ul>
            <button id="close-settings" style="margin-top: 10px; padding: 5px 10px;">Close</button>
        `;
        document.body.appendChild(popup);

        document.getElementById('close-settings').onclick = () => document.body.removeChild(popup);
        document.getElementById('account-btn').onclick = openAccountSettings;
        document.getElementById('notifications-btn').onclick = openNotificationSettings;
        document.getElementById('privacy-btn').onclick = openPrivacySettings;
        document.getElementById('help-btn').onclick = openHelpSupport;
    }

    // Account Settings Popup
    function openAccountSettings() {
        showPopup(`
            <h2>Account Settings</h2>
            <form>
                <label for="username">Change Username:</label>
                <input type="text" id="username" placeholder="Enter new username" style="width: 90%; margin-bottom: 10px;">
                <label for="profile-picture">Change Profile Picture:</label>
                <input type="file" id="profile-picture" accept="image/*" style="width: 90%; margin-bottom: 10px;">
                <button type="button" style="margin: 10px;">Save Changes</button>
            </form>
            <button id="back-to-settings" style="margin-top: 10px; padding: 5px 10px;">Back</button>
        `, createSettingsPopup);
    }

     // Notification Settings Popup
  // Notification Settings Popup
  function openNotificationSettings() {
    showPopup(`
        <h2>Notifications</h2>
        <form>
            <label>
                <input type="checkbox" id="send-sound" ${sendSoundEnabled ? 'checked' : ''}/>
                Sound While Sending Messages
            </label><br>
            <label>
                <input type="checkbox" id="receive-sound" ${receiveSoundEnabled ? 'checked' : ''}/>
                Sound for Incoming Messages
            </label>
        </form>
        <button id="back-to-settings" style="margin-top: 10px; padding: 5px 10px;">Back</button>
    `, createSettingsPopup);

    document.getElementById('send-sound').addEventListener('change', function () {
        sendSoundEnabled = this.checked;
        
    });

    document.getElementById('receive-sound').addEventListener('change', function () {
        receiveSoundEnabled = this.checked;
        
    });
}

// Attach event listener to the "Settings" button
document.querySelector('.button-settings').addEventListener('click', createSettingsPopup);

// Add event listener to the send button for sound playback
document.querySelector('.button-send').addEventListener('click', function () {
    if (sendSoundEnabled) {
        playSound(sendSoundPath);
    }
});

// Simulating incoming messages for sound demonstration
function simulateIncomingMessage() {
    if (receiveSoundEnabled) {
        playSound(receiveSoundPath);
    }
}
// Example: simulate incoming message every 10 seconds
setInterval(simulateIncomingMessage, 10000);

    // Privacy Settings Popup
    function openPrivacySettings() {
        showPopup(`
            <h2>Privacy Settings</h2>
            <ul style="list-style-type: none; padding: 0;">
                <li><button class="settings-option" id="profile-photo-btn">Profile Photo</button></li>
                <li><button class="settings-option" id="blocked-contacts-btn">Blocked Contacts</button></li>
            </ul>
            <button id="back-to-settings" style="margin-top: 10px; padding: 5px 10px;">Back</button>
        `, createSettingsPopup);
    
        document.getElementById('profile-photo-btn').onclick = openProfilePhotoSettings;
        document.getElementById('blocked-contacts-btn').onclick = openBlockedContactsSettings;
    }
    
    // Profile Photo Settings
    function openProfilePhotoSettings() {
        let privacySetting = 'Public';
    
        showPopup(`
            <h2>Profile Photo</h2>
            <form>
                <label>
                    <input type="radio" name="privacy" value="Public" ${privacySetting === 'Public' ? 'checked' : ''} />
                    Public
                </label><br>
                <label>
                    <input type="radio" name="privacy" value="Only Me" ${privacySetting === 'Only Me' ? 'checked' : ''} />
                    Only Me
                </label><br>
                <label>
                    <input type="radio" name="privacy" value="Private" ${privacySetting === 'Private' ? 'checked' : ''} />
                    Private
                </label>
            </form>
            <button id="back-to-settings" style="margin-top: 10px; padding: 5px 10px;">Back</button>
        `, openPrivacySettings);
    
        document.querySelectorAll('input[name="privacy"]').forEach((input) => {
            input.addEventListener('change', function () {
                privacySetting = this.value;
                alert(`Profile photo privacy set to ${privacySetting}`);
            });
        });
    }
    
    // Blocked Contacts Settings
    let blockedContacts = [];
    
    function openBlockedContactsSettings() {
        const listItems = blockedContacts.map(contact => `<li>${contact} <button class="unblock" data-contact="${contact}">Unblock</button></li>`).join('');
    
        showPopup(`
            <h2>Blocked Contacts</h2>
            <ul id="blocked-contacts-list" style="list-style-type: none; padding: 0;">
                ${listItems || '<li>No blocked contacts</li>'}
            </ul>
            <button id="back-to-settings" style="margin-top: 10px; padding: 5px 10px;">Back</button>
        `, openPrivacySettings);
    
        document.querySelectorAll('.unblock').forEach(button => {
            button.addEventListener('click', function () {
                const contact = this.dataset.contact;
                blockedContacts = blockedContacts.filter(c => c !== contact);
                alert(`${contact} unblocked`);
                openBlockedContactsSettings(); // Refresh the list
            });
        });
    }

    // Help & Support Popup
    function openHelpSupport() {
        showPopup(`
            <h2>Help & Support</h2>
            <ul style="list-style-type: none; text-align: left;">
                <li><strong>Start a chat:</strong> Click "New Chat".</li>
                <li><strong>Customize:</strong> Update profile under "Account".</li>
                <li><strong>Notifications:</strong> Manage settings in "Notifications".</li>
            </ul>
            <button id="back-to-settings" style="margin-top: 10px;">Back</button>
        `, createSettingsPopup);
    }

    // Attach event listener to the "Settings" button
    document.querySelector('.button-settings').addEventListener('click', createSettingsPopup);
});
