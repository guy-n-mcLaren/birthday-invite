// 1. CONFIGURATION - Paste your Google Deployment URL between the quotes below
const scriptURL = 'https://script.google.com/macros/s/AKfycbygPqgFO6Szzu5D-W_ztlxT8FS69mCOCsV715JetZtc4BIPw8ZyJAsiPOF7YDqijFnvpw/exec';

const flipper = document.getElementById('flipper');
const rsvpForm = document.getElementById('rsvpForm');

// 2. LOAD GUEST NAME FROM URL
// Looks for ?guest=Name_Here in the browser address bar
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('guest');

// If a name exists, replace underscores with spaces. If not, use "Our Guest"
const cleanName = guestName ? guestName.replace(/_/g, ' ') : "Our Guest";

// Put the name on the envelope front and into the hidden form field
document.getElementById('envelopeGuestName').innerText = cleanName;
document.getElementById('guestNameInput').value = cleanName;


// 3. ENVELOPE ANIMATION LOGIC
flipper.addEventListener('click', (e) => {
    // If the user clicks the RSVP buttons, don't trigger the envelope animation again
    if (e.target.tagName === 'BUTTON') return;
    
    // Step 1: Spin the envelope
    flipper.classList.add('spun');
    
    // Step 2: After spin finishes (1.2s), open the flap and pop out the card
    setTimeout(() => {
        flipper.classList.add('open');
    }, 1200);
});


// 4. RSVP FORM SUBMISSION (To Google Sheets)
rsvpForm.addEventListener('submit', e => {
    e.preventDefault(); // Stop the page from refreshing
    
    // Identify which button was clicked (yes or no)
    const submitter = e.submitter;
    const originalText = submitter.innerText;
    
    // Visual feedback: disable buttons and show "sending"
    submitter.innerText = "sending...";
    const allButtons = rsvpForm.querySelectorAll('button');
    allButtons.forEach(btn => btn.disabled = true);

    // Collect the data
    const formData = new FormData();
    formData.append('guestName', document.getElementById('guestNameInput').value);
    formData.append('status', submitter.value);

    // Send data to the Google Apps Script URL
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            // Success!
            submitter.innerText = "received! ✌️";
            alert("Groovy! Your response has been saved.");
        })
        .catch(error => {
            // Error
            console.error('Error!', error.message);
            submitter.innerText = "error!";
            allButtons.forEach(btn => btn.disabled = false);
            alert("Oops, something went wrong. Please try again.");
        });
});
