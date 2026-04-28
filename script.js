// 1. CONFIGURATION
// Replace the URL below with your LIVE Google Apps Script URL (ending in /exec)
const scriptURL = 'https://script.google.com/macros/s/AKfycbygPqgFO6Szzu5D-W_ztlxT8FS69mCOCsV715JetZtc4BIPw8ZyJAsiPOF7YDqijFnvpw/exec';

const flipper = document.getElementById('flipper');
const rsvpForm = document.getElementById('rsvpForm');

// 2. LOAD GUEST NAME FROM URL
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('guest');
const cleanName = guestName ? guestName.replace(/_/g, ' ') : "Our Guest";

// Display name on envelope and store it in the hidden input
document.getElementById('envelopeGuestName').innerText = cleanName;
document.getElementById('guestNameInput').value = cleanName;


// 3. ENVELOPE ANIMATION LOGIC
if (flipper) {
    flipper.addEventListener('click', (e) => {
        // Don't flip if the user is clicking the RSVP buttons
        if (e.target.tagName === 'BUTTON') return;
        
        flipper.classList.add('spun');
        
        // Wait for the flip (1.2s) before opening the flap
        setTimeout(() => {
            flipper.classList.add('open');
        }, 1200);
    });
}


// 4. RSVP FORM SUBMISSION (Bulletproof Version)
if (rsvpForm) {
    rsvpForm.addEventListener('submit', e => {
        e.preventDefault(); // STOPS the GitHub error page from loading
        
        const submitter = e.submitter;
        if (!submitter) return;

        // Visual Feedback
        const originalText = submitter.innerText;
        submitter.innerText = "sending...";
        
        const allButtons = rsvpForm.querySelectorAll('button');
        allButtons.forEach(btn => btn.disabled = true);

        // Get the values
        const nameValue = document.getElementById('guestNameInput').value;
        const statusValue = submitter.value;

        // Construct a direct URL with the data attached
        // This is the most compatible way to talk to Google Sheets
        const submissionURL = `${scriptURL}?guestName=${encodeURIComponent(nameValue)}&status=${encodeURIComponent(statusValue)}`;

        fetch(submissionURL, { 
            method: 'POST', 
            mode: 'no-cors' // This tells the browser: "Just send it, don't worry about the reply"
        })
        .then(() => {
            // Success! With no-cors, we treat the completion of the request as success
            submitter.innerText = "received! ✌️";
            alert("Groovy! Your response has been saved.");
        })
        .catch(error => {
            console.error('Submission Error:', error);
            submitter.innerText = "error!";
            allButtons.forEach(btn => btn.disabled = false);
            alert("Oops, something went wrong. Check your internet and try again.");
        });
    });
}
