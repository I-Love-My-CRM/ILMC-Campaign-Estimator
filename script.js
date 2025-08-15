document.addEventListener('DOMContentLoaded', () => {
    // --- Default Pricing Constants ---
    const DEFAULT_EMAIL_RATE = 0.000675;
    const DEFAULT_VALIDATION_RATE = 0.0025;
    const DEFAULT_SMS_RATE = 0.0079;
    const DEFAULT_SMS_FEE = 2.00;

    // --- Live Rate Variables ---
    let currentEmailRate, currentValidationRate, currentSmsRate, currentSmsFee;

    // --- Element References ---
    const contactCountInput = document.getElementById('contact-count');
    const emailsPerContactInput = document.getElementById('emails-per-contact');
    const smsPerContactInput = document.getElementById('sms-per-contact');
    const validateEmailsCheckbox = document.getElementById('validate-emails-checkbox');

    const emailCostDisplay = document.getElementById('email-cost');
    const validationCostDisplay = document.getElementById('validation-cost');
    const smsCostDisplay = document.getElementById('sms-cost');
    const smsFeeCostDisplay = document.getElementById('sms-fee-cost');
    const totalCostDisplay = document.getElementById('total-cost');

    const emailPerContactDisplay = document.getElementById('email-per-contact');
    const smsPerContactDisplay = document.getElementById('sms-per-contact-cost');
    const totalPerContactDisplay = document.getElementById('total-per-contact');

    const settingsBtn = document.getElementById('settings-btn');
    const printBtn = document.getElementById('print-btn');
    const calculatorView = document.getElementById('calculator-view');
    const settingsView = document.getElementById('settings-view');
    const backBtn = document.getElementById('back-btn');
    const saveBtn = document.getElementById('save-btn');
    const saveConfirm = document.getElementById('save-confirm');

    const emailRateInput = document.getElementById('email-rate-input');
    const validationRateInput = document.getElementById('validation-rate-input');
    const smsRateInput = document.getElementById('sms-rate-input');
    const smsFeeInput = document.getElementById('sms-fee-input');

    const emailExample = document.getElementById('email-example');
    const validationExample = document.getElementById('validation-example');
    const smsExample = document.getElementById('sms-example');

    function toggleViews() {
        calculatorView.classList.toggle('hidden');
        settingsView.classList.toggle('hidden');
    }

    function formatCurrency(amount, minimumFractionDigits = 2) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: minimumFractionDigits
        }).format(amount);
    }

    function calculateCosts() {
        const contactCount = parseInt(contactCountInput.value) || 0;
        const emailsPerContact = parseInt(emailsPerContactInput.value) || 0;
        const smsPerContact = parseInt(smsPerContactInput.value) || 0;
        const shouldValidate = validateEmailsCheckbox.checked;

        // --- Total Campaign Calculations ---
        const totalEmails = contactCount * emailsPerContact;
        const totalSms = contactCount * smsPerContact;

        const emailCost = totalEmails * currentEmailRate;
        const validationCost = shouldValidate ? totalEmails * currentValidationRate : 0;
        const smsCost = totalSms * currentSmsRate;
        const smsFee = totalSms > 0 ? currentSmsFee : 0;
        const totalCost = emailCost + validationCost + smsCost + smsFee;

        // --- Per Contact Calculations ---
        const emailCostPerContact = (emailsPerContact * currentEmailRate) + (shouldValidate ? emailsPerContact * currentValidationRate : 0);
        const smsFeePerContact = contactCount > 0 ? smsFee / contactCount : 0;
        const smsCostPerContact = (smsPerContact * currentSmsRate) + smsFeePerContact;
        const totalCostPerContact = emailCostPerContact + smsCostPerContact;

        // --- Update Total Displays ---
        emailCostDisplay.textContent = formatCurrency(emailCost);
        validationCostDisplay.textContent = formatCurrency(validationCost);
        smsCostDisplay.textContent = formatCurrency(smsCost);
        smsFeeCostDisplay.textContent = formatCurrency(smsFee);
        totalCostDisplay.textContent = formatCurrency(totalCost);

        // --- Update Per Contact Displays ---
        emailPerContactDisplay.textContent = formatCurrency(emailCostPerContact, 4);
        smsPerContactDisplay.textContent = formatCurrency(smsCostPerContact, 4);
        totalPerContactDisplay.textContent = formatCurrency(totalCostPerContact, 4);
    }

    function updateRateExamples() {
        const emailRate = parseFloat(emailRateInput.value) || 0;
        const validationRate = parseFloat(validationRateInput.value) || 0;
        const smsRate = parseFloat(smsRateInput.value) || 0;

        emailExample.textContent = emailRate > 0 ? Math.floor(10 / emailRate).toLocaleString() : '...';
        validationExample.textContent = validationRate > 0 ? Math.floor(10 / validationRate).toLocaleString() : '...';
        smsExample.textContent = smsRate > 0 ? Math.floor(10 / smsRate).toLocaleString() : '...';
    }

    function loadSettings() {
        console.log("Loading settings from localStorage...");

        const savedEmailRate = localStorage.getItem('crmEmailRate');
        currentEmailRate = savedEmailRate !== null ? parseFloat(savedEmailRate) : DEFAULT_EMAIL_RATE;

        const savedValidationRate = localStorage.getItem('crmValidationRate');
        currentValidationRate = savedValidationRate !== null ? parseFloat(savedValidationRate) : DEFAULT_VALIDATION_RATE;

        const savedSmsRate = localStorage.getItem('crmSmsRate');
        currentSmsRate = savedSmsRate !== null ? parseFloat(savedSmsRate) : DEFAULT_SMS_RATE;

        const savedSmsFee = localStorage.getItem('crmSmsFee');
        currentSmsFee = savedSmsFee !== null ? parseFloat(savedSmsFee) : DEFAULT_SMS_FEE;

        console.log({
            emailRate: currentEmailRate,
            validationRate: currentValidationRate,
            smsRate: currentSmsRate,
            smsFee: currentSmsFee
        });

        emailRateInput.value = currentEmailRate.toFixed(6);
        validationRateInput.value = currentValidationRate.toFixed(4);
        smsRateInput.value = currentSmsRate.toFixed(4);
        smsFeeInput.value = currentSmsFee.toFixed(2);
    }

    function saveSettings() {
        const newEmailRate = parseFloat(emailRateInput.value) || 0;
        const newValidationRate = parseFloat(validationRateInput.value) || 0;
        const newSmsRate = parseFloat(smsRateInput.value) || 0;
        const newSmsFee = parseFloat(smsFeeInput.value) || 0;

        localStorage.setItem('crmEmailRate', newEmailRate);
        localStorage.setItem('crmValidationRate', newValidationRate);
        localStorage.setItem('crmSmsRate', newSmsRate);
        localStorage.setItem('crmSmsFee', newSmsFee);

        console.log("Settings saved to localStorage:", {
            emailRate: newEmailRate,
            validationRate: newValidationRate,
            smsRate: newSmsRate,
            smsFee: newSmsFee
        });

        loadSettings(); // Reload settings into live variables
        calculateCosts(); // Recalculate main view

        // Show confirmation message
        saveConfirm.classList.remove('hidden');

        // After a short delay, hide the message and switch back to the calculator
        setTimeout(() => {
            saveConfirm.classList.add('hidden'); // Hide for next time
            toggleViews(); // Switch back to calculator view
        }, 1500); // 1.5 second delay
    }

    // --- Event Listeners ---
    settingsBtn.addEventListener('click', toggleViews);
    backBtn.addEventListener('click', toggleViews);
    saveBtn.addEventListener('click', saveSettings);
    printBtn.addEventListener('click', () => window.print());

    [contactCountInput, emailsPerContactInput, smsPerContactInput, validateEmailsCheckbox].forEach(input => input.addEventListener('input', calculateCosts));
    [emailRateInput, validationRateInput, smsRateInput].forEach(input => input.addEventListener('input', updateRateExamples));

    document.querySelectorAll('.input-group input').forEach(input => {
        if (input.value) input.parentElement.classList.add('has-value');
        input.addEventListener('input', () => {
            input.parentElement.classList.toggle('has-value', !!input.value);
        });
    });

    // --- Initial Setup ---
    loadSettings();
    calculateCosts();
    updateRateExamples();
});
