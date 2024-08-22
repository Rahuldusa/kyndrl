


var regimeValue = String(regimeValue);

// Set the minimum date to the current date
var currentDate = new Date();
var formattedCurrentDate = currentDate.toISOString().split('T')[0];

if (regimeValue == 'Old'){
    document.getElementById('startdate').max = formattedCurrentDate;
}






function validateName() {

    var nameValue = document.getElementById('name').value;
    var nameErrorSpan = document.getElementById('nameError');

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (nameValue) {
        if (!alphabetPattern.test(nameValue)) {

            document.getElementById('savebtn2').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            nameErrorSpan.textContent = "Name should contain only alphabets.";
        } else {

            document.getElementById('savebtn2').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            nameErrorSpan.textContent = "";
        }
    } else {
        document.getElementById('savebtn2').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        nameErrorSpan.textContent = "";
    }

}



var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed month

// Calculate financial year start and end based on current month
var financialYearStart, financialYearEnd;

if (currentMonth >= 4 && currentMonth <= 12) {
    // If the current month is April to December
    financialYearStart = new Date(currentYear, 3, 1); // April 1st of current year
    financialYearEnd = new Date(currentYear + 1, 2, 31); // March 31st of next year
} else {
    // If the current month is January to March
    financialYearStart = new Date(currentYear - 1, 3, 1); // April 1st of previous year
    financialYearEnd = new Date(currentYear, 2, 31); // March 31st of current year
}

function validateStartDate() {
    var empStartDate = new Date(empDoj);
    var startdate = document.getElementById('startdate');
    var selectedDate = new Date(startdate.value);
    
    var startdateErrorSpan = document.getElementById('startdateError');

    // Define the start and end dates of the current financial year (2023-04-01 to 2024-03-31)
    // var financialYearStart = new Date(2023, 3, 1); // April 1st, 2023
    // var financialYearEnd = new Date(2024, 2, 31);   // March 31st, 2024

    



    // Validate if the input date is on or before the current date
    if (selectedDate > currentDate || selectedDate < empStartDate || selectedDate <= financialYearStart || selectedDate >= financialYearEnd) {
        document.getElementById('savebtn2').disabled = true;
        document.getElementById('PreviewSubmit').disabled = true;
        startdateErrorSpan.textContent = 'Please select a date after 1st Apr of this financial year and your joining date which ever is later';
    } else {
        document.getElementById('savebtn2').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        startdateErrorSpan.textContent = '';
    }


}

function validateRent() {
    var rentValue = document.getElementById('rent').value;
    var rentErrorSpan = document.getElementById('rentError');

    if (rentValue == 100000){
        rentErrorSpan.textContent = 'your rent reached 1 lakh'
    }else if (rentValue > 100000) {
        rentErrorSpan.textContent = 'your rent is exceeding 1 lakh'
    } else if (!Number.isInteger(Number(rentValue)) || Number(rentValue) < 0) {
        document.getElementById('savebtn2').disabled = true;
        document.getElementById('PreviewSubmit').disabled = true;
        rentErrorSpan.textContent = 'rent must be positive integer number.'
    } else {
        document.getElementById('savebtn2').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        rentErrorSpan.textContent = '';
    }
}

function validatePannum() {
    var pannumValue = document.getElementById('pannum');
    var pannumErrorSpan = document.getElementById('pannumError');

    var inputPAN = pannumValue.value.toUpperCase(); // Convert input to uppercase
    pannumValue.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[PFCGHLJABETpfcghljabet][A-Za-z]\d{4}[A-Za-z]$/;

    if (pannumValue.value){
        if (!panPattern.test(pannumValue.value)) {
            document.getElementById('savebtn2').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            pannumErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            document.getElementById('savebtn2').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            pannumErrorSpan.textContent = '';
        }
    }else{
        pannumErrorSpan.textContent = '';
    }
}


function validateContact() {

    var contactValue = document.getElementById('contact').value;
    var contactErrorSpan = document.getElementById('contactError');

    if (!Number.isInteger(Number(contactValue)) || Number(contactValue) < 0 || contactValue.length > 10 || contactValue.length < 10) {
        document.getElementById('savebtn2').disabled = true;
        document.getElementById('PreviewSubmit').disabled = true;
        contactErrorSpan.textContent = 'Please enter valid contact.'
    } else {
        document.getElementById('savebtn2').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        contactErrorSpan.textContent = '';
    }
}

var pincodelst = [110, 4000, 6000, 7000]

function validatePincode() {
    var pincodeValue = document.getElementById('pincode').value;
    var pincodeErrorSpan = document.getElementById('pincodeError');

    var citytype = document.getElementById('citytype')

    if (pincodeValue) {
        if (!Number.isInteger(Number(pincodeValue)) || Number(pincodeValue) < 0 || pincodeValue.length > 6 || pincodeValue.length < 6) {
            document.getElementById('savebtn2').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            pincodeErrorSpan.textContent = 'Please enter valid pincode.'
            citytype.value = null;
        } else {
            document.getElementById('savebtn2').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            pincodeErrorSpan.textContent = '';

            var found = pincodelst.some(function (pin) {
                return pincodeValue.startsWith(pin);
            });
            if (found) {
                citytype.value = 'METRO';                
            } else {
                citytype.value = 'NON-METRO';                
            }
        }
    } else{
        document.getElementById('savebtn2').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        pincodeErrorSpan.textContent = '';
        citytype.value = null;
    }
}



