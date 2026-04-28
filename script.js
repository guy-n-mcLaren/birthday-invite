const envelope = document.getElementById('envelopeWrapper');
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('guest');

// Set Names
const cleanName = guestName ? guestName.replace(/_/g, ' ') : "Our Guest";
document.getElementById('envelopeGuestName').innerText = cleanName;
document.getElementById('guestNameInput').value = cleanName;

// Open Animation
envelope.addEventListener('click', () => {
    envelope.classList.add('open');
});

// Form Logic (to Google Sheets)
document.getElementById('rsvpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const status = e.submitter.value;
    const name = document.getElementById('guestNameInput').value;

    fetch('YOUR_WEB_APP_URL', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ name: name, status: status })
    }).then(() => {
        alert("Thanks! RSVP recorded for " + name);
    });
});
