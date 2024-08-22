document.addEventListener('DOMContentLoaded', function () {
    // Function to validate number fields for form5
    function validateNumberField(input) {
        var fieldValue = input.value;
        var errorSpan = input.nextElementSibling;  // Assuming the error span follows the input element

        // Check if the value is empty, not a number, contains a dot, or is less than 0
        if (isNaN(fieldValue) || fieldValue.includes('.') || parseFloat(fieldValue) < 0 ) {
            document.getElementById('savebtn5').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;

            input.setCustomValidity("Please enter a valid positive integer.");
            errorSpan.textContent = "Please enter a valid positive integer.";
            
        } else {
            document.getElementById('savebtn5').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            // Reset custom validity if the input is valid
            input.setCustomValidity('');
            errorSpan.textContent = '';
        }
    }

    // Attach the validateNumberField function to the number inputs with the form5-number-input class
    var numberInputsForm5 = document.querySelectorAll('#form5 .form5-number-input');
    numberInputsForm5.forEach(function (input) {
        input.addEventListener('input', function () {
            validateNumberField(input);
        });
    });
});