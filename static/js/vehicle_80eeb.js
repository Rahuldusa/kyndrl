

var regimeValue = String(regimeValue);

var section80ee_questions_80eeb = document.getElementById('section80ee_questions_80eeb');
var file_upload_row_80eeb = document.getElementById('file_upload_row_80eeb');

var loan_sanctioned_date_80eeb = document.getElementById('loan_sanctioned_date_80eeb');
var vehicle_loan_80eeb = document.getElementById('vehicle_loan_80eeb');
var vehicle_loan_80eebErrorSpan = document.getElementById('vehicle_loan_80eebError');
var loan_lender_80eeb = document.getElementById('loan_lender_80eeb');
var lender_pan_80eeb = document.getElementById('lender_pan_80eeb');




var vehicle_loan_row_80eeb_section = document.getElementById('vehicle_loan_row_80eeb');
var loan_lender_row_80eeb_section = document.getElementById('loan_lender_row_80eeb');
var lender_pan_row_80eeb_section = document.getElementById('lender_pan_row_80eeb');
var other_80eeb_Lender_section = document.getElementById('other_80eeb_Lender');
var other_80eeb_Pan_section = document.getElementById('other_80eeb_Pan');

var other80eebLender = document.getElementById('other80eebLender');
var other80eebPAN = document.getElementById('other80eebPAN');
var other80eebLenderErrorSpan = document.getElementById('other80eebLenderError');
var other80eebPANErrorSpan = document.getElementById('other80eebPANError');



// form


var _80eeb_form = document.getElementById('_80eeb_form');

function empty_form_80eeb() {
    loan_sanctioned_date_80eeb.value = null;
    vehicle_loan_80eeb.value = null;
    loan_lender_80eeb.value = null;
    lender_pan_80eeb.value = null;
    other80eebLender.value = null;
    other80eebPAN.value = null;

    other80eebLenderErrorSpan.textContent = '';
    other80eebPANErrorSpan.textContent = '';
    vehicle_loan_80eebErrorSpan.textContent = '';

    other_80eeb_Lender_section.style.display = 'none';
    other_80eeb_Pan_section.style.display = 'none';
    file_upload_row_80eeb.style.display = 'none';
    vehicle_loan_row_80eeb_section.style.display = 'none';
    loan_lender_row_80eeb_section.style.display = 'none';
    lender_pan_row_80eeb_section.style.display = 'none';
}


function showSanctionedField_80eeb(value) {
    if (value === 'yes') {
        section80ee_questions_80eeb.style.display = 'block';
        
    } else {
        section80ee_questions_80eeb.style.display = 'none';
        empty_form_80eeb();

        if (localStorage.getItem('formData_veh_80eeb')) {
            localStorage.removeItem('formData_veh_80eeb');
        }
    }
    display_save3btn();
    save_father_ispan();
    files_display_section_none();
    display_submit();    
    disable_btns();
}


function display_80eeb_file() {
    if (loan_sanctioned_date_80eeb.value && vehicle_loan_80eeb.value && loan_lender_80eeb.value && vehicle_loan_80eebErrorSpan.textContent === '') {
        if (loan_lender_80eeb.value === 'other') {
            if (other80eebLender.value && other80eebPAN.value && other80eebLenderErrorSpan.textContent === '' && other80eebPANErrorSpan.textContent === '') {
                file_upload_row_80eeb.style.display = 'table-row';
            } else {
                file_upload_row_80eeb.style.display = 'none';
            }
        } else {
            if (lender_pan_80eeb.value) {
                file_upload_row_80eeb.style.display = 'table-row';
            } else {
                file_upload_row_80eeb.style.display = 'none';
            }
        }
    } else {
        file_upload_row_80eeb.style.display = 'none';
    }
    display_submit();
    disable_btns();
}

function validateSanctionedDate_80eeb() {
    var startDate = new Date('2019-04-01');
    var endDate = new Date('2023-03-31');
    if (loan_sanctioned_date_80eeb.value) {
        var selectedDate = new Date(loan_sanctioned_date_80eeb.value);
        if (selectedDate >= startDate && endDate >= selectedDate) {
            vehicle_loan_row_80eeb_section.style.display = 'table-row';
            loan_lender_row_80eeb_section.style.display = 'table-row';
            lender_pan_row_80eeb_section.style.display = 'table-row';
        } else {
            alert("Please select a date between April 1, 2019, and March 31, 2023.");
            loan_sanctioned_date_80eeb.value = null;
            vehicle_loan_row_80eeb_section.style.display = 'none';
            loan_lender_row_80eeb_section.style.display = 'none';
            lender_pan_row_80eeb_section.style.display = 'none';
        }
    }
    display_80eeb_file();
}

function validateVehicle_loan_80eeb() {
    if (vehicle_loan_80eeb.value) {
        var inputValue = vehicle_loan_80eeb.value;
        if (!Number.isInteger(Number(inputValue)) || inputValue.includes('.') || Number(inputValue) < 0) {
            vehicle_loan_80eebErrorSpan.textContent = 'Please enter a positive integer value.';
        }else if(Number(inputValue) == 0){
            vehicle_loan_80eebErrorSpan.textContent = '';
        }
         else if (inputValue > 150000) {
            document.getElementById('vehicle_loan_80eeb').value = 150000;
            vehicle_loan_80eebErrorSpan.textContent = '';
            alert("Vehicle loan interest amount should not exceed Rs. 1,50,000.");
        } else {
            vehicle_loan_80eebErrorSpan.textContent = '';
        }
    } else {
        vehicle_loan_80eebErrorSpan.textContent = '';
    }
    display_80eeb_file();
}


if (regimeValue == 'Old') {
    loan_lender_80eeb.addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var pan = selectedOption.getAttribute('data-pan');

        if (selectedOption.value === 'other') {
            lender_pan_80eeb.value = '';
            lender_pan_80eeb.disabled = true;
            other_80eeb_Lender_section.style.display = 'table-row';
            other_80eeb_Pan_section.style.display = 'table-row';
        } else {
            lender_pan_80eeb.value = pan;
            lender_pan_80eeb.disabled = false;  // Enable lenderpan1 input
            other_80eeb_Lender_section.style.display = 'none';  // Hide other lender name row
            other_80eeb_Pan_section.style.display = 'none'

            other80eebLender.value = '';
            other80eebPAN.value = '';

            other80eebLenderErrorSpan.textContent = '';
            other80eebPANErrorSpan.textContent = '';
        }
        display_80eeb_file();
    });
}



function lender_80eeb_fun(new_value) {
    if (new_value === 'other') {
        lender_pan_80eeb.value = '';
        lender_pan_80eeb.disabled = true;
        other_80eeb_Lender_section.style.display = 'table-row';
        other_80eeb_Pan_section.style.display = 'table-row';
    } else {

        lender_pan_80eeb.disabled = false;  // Enable lenderpan1 input
        other_80eeb_Lender_section.style.display = 'none';  // Hide other lender name row
        other_80eeb_Pan_section.style.display = 'none'

        other80eebLender.value = '';
        other80eebPAN.value = '';

        other80eebLenderErrorSpan.textContent = '';
        other80eebPANErrorSpan.textContent = '';
    }
    display_80eeb_file();
}



function validateOther80eebLender() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (other80eebLender.value) {

        if (!alphabetPattern.test(other80eebLender.value)) {
            other80eebLenderErrorSpan.textContent = "Name should contain only alphabets.";
        } else {
            other80eebLenderErrorSpan.textContent = "";
        }
    } else {
        other80eebLenderErrorSpan.textContent = "";
    }
    display_80eeb_file();
}

function validateOther80eebPAN() {
    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;
    var inputPAN = other80eebPAN.value.toUpperCase(); // Convert input to uppercase
    other80eebPAN.value = inputPAN; // Update input value with uppercase version

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            other80eebPANErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            other80eebPANErrorSpan.textContent = '';
        }
    } else {
        other80eebPANErrorSpan.textContent = '';
    }
    display_80eeb_file();
}





function FileUpload_80eeb() {

         
    const formData_veh_80eeb = {
        loan_sanctioned_date_80eebValue: loan_sanctioned_date_80eeb.value,
        vehicle_loan_80eebValue: vehicle_loan_80eeb.value,
        loan_lender_80eebValue: loan_lender_80eeb.value,
        lender_pan_80eebValue: lender_pan_80eeb.value,
        other80eebLenderValue: other80eebLender.value,
        other80eebPANValue: other80eebPAN.value,
    };

    

    const jsonData = JSON.stringify(formData_veh_80eeb);
    localStorage.setItem('formData_veh_80eeb', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 3;
    }else{
        localStorage.setItem('currentTab', 3)
    }


    let apiUrl = "upload_80eeb_file";
    document.getElementById("_80eeb_form").action = apiUrl;
    document.getElementById("_80eeb_form").submit();
}



document.addEventListener("DOMContentLoaded", function () {
    var section80eeyes_80eebbtn = document.getElementById('section80eeyes_80eeb');
    var section80eeno_80eebbtn = document.getElementById('section80eeno_80eeb');


    const storedData_veh_80eeb= localStorage.getItem('formData_veh_80eeb');
    if (storedData_veh_80eeb) {        
        const storedFormData = JSON.parse(storedData_veh_80eeb);            
        if(storedFormData.loan_sanctioned_date_80eebValue){            
            loan_sanctioned_date_80eeb.value = storedFormData.loan_sanctioned_date_80eebValue;

            vehicle_loan_80eeb.value = storedFormData.vehicle_loan_80eebValue;
            loan_lender_80eeb.value = storedFormData.loan_lender_80eebValue;
            lender_pan_80eeb.value = storedFormData.lender_pan_80eebValue;
            other80eebLender.value = storedFormData.other80eebLenderValue;
            other80eebPAN.value = storedFormData.other80eebPANValue;
   
            section80eeyes_80eebbtn.checked = true;
            checkbox = 'yes'
            showSanctionedField_80eeb(checkbox);
        }
    }


    if (section80eeyes_80eebbtn.checked === true) {
        checkbox = 'yes'
        showSanctionedField_80eeb(checkbox);
    } else {
        checkbox = 'no'
        showSanctionedField_80eeb(checkbox);
    }
    validateSanctionedDate_80eeb();


    if (loan_lender_80eeb.value) {
        lender_80eeb_fun(loan_lender_80eeb.value)
    }
});
