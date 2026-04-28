const flipper = document.getElementById('flipper');
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('guest');

// Set Calligraphy Name
const cleanName = guestName ? guestName.replace(/_/g, ' ') : "Our Guest";
document.getElementById('envelopeGuestName').innerText = cleanName;
document.getElementById('guestNameInput').value = cleanName;

flipper.addEventListener('click', () => {
    // Phase 1: Spin
    flipper.classList.add('spun');
    
    // Phase 2: Open Flap and Slide Card (after 1.2s spin)
    setTimeout(() => {
        flipper.classList.add('open');
    }, 1200);
});

// RSVP Form Logic remains the same...
