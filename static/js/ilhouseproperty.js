

var regimeValue = String(regimeValue);



var ilhp_questions_section = document.getElementById('ilhp_questions');


var selfOccupiedHousePropertyInp = document.getElementById('selfOccupiedHouseProperty');
var selfHomeLoanLenderNameInp = document.getElementById('selfHomeLoanLenderName');
var selfHomeLoanLenderPANInp = document.getElementById('selfHomeLoanLenderPAN');
var otherselfHomeLoanLenderNameInp = document.getElementById('otherselfHomeLoanLenderName');
var otherselfHomeLoanLenderPANInp = document.getElementById('otherselfHomeLoanLenderPAN');


var otherselfLenderRow = document.getElementById('otherselfLender');
var otherselfPanRow = document.getElementById('otherselfPan');

var selfOccupiedHousePropertyErrorSpan = document.getElementById('selfOccupiedHousePropertyError');
var otherselfHomeLoanLenderNameErrorSpan = document.getElementById('otherselfHomeLoanLenderNameError');
var otherselfHomeLoanLenderPANErrorSpan = document.getElementById('otherselfHomeLoanLenderPANError');

var selfOccupiedHouseProperty1_file = document.getElementById('selfOccupiedHouseProperty1');




//  letout
var letOutProperty_file1_file = document.getElementById('letOutProperty_file1');

var annualLettableValueInp = document.getElementById('annualLettableValue');
var municipalPropertyTaxInp = document.getElementById('municipalPropertyTax');
var homeLoanInterestInp = document.getElementById('homeLoanInterest');
var incomeLossOnHousePropertyInp = document.getElementById('incomeLossOnHouseProperty');
var standardDeductionInp = document.getElementById('standardDeduction');
var loanLenderNameInp = document.getElementById('loanLenderName');

var loanLenderPANInp = document.getElementById('loanLenderPAN');
var otherlendernm2Row = document.getElementById('otherlendernm2');
var otherlenderpn2Row = document.getElementById('otherlenderpn2');
var otherloanLenderNameInp = document.getElementById('otherloanLenderName');
var otherloanLenderPANInp = document.getElementById('otherloanLenderPAN');




var annualLettableValueErrorSpan = document.getElementById('annualLettableValueError');
var municipalPropertyTaxErrorSpan = document.getElementById('municipalPropertyTaxError');
var homeLoanInterestErrorSpan = document.getElementById('homeLoanInterestError');
var standardDeductionErrorSpan = document.getElementById('standardDeductionError');
var otherloanLenderNameErrorSpan = document.getElementById('otherloanLenderNameError');
var otherloanLenderPANErrorSpan = document.getElementById('otherloanLenderPANError');



// 80ee

var file_upload_80ee_file = document.getElementById('file_upload_8ee');

var loan_amount_row_ = document.getElementById('loan_amount_row');
var property_value_row_ = document.getElementById('property_value_row');
var home_loan_row_ = document.getElementById('home_loan_row');
var loan_lender_row_ = document.getElementById('loan_lender_row');
var lender_pan_row_ = document.getElementById('lender_pan_row');


var otherloan_lender_row_ = document.getElementById('otherloan_lender_row');
var otherlender_pan_row_ = document.getElementById('otherlender_pan_row');

var loan_sanctioned_dateInp = document.getElementById('loan_sanctioned_date');
var loan_amountInp = document.getElementById('loan_amount');
var property_valueInp = document.getElementById('property_value');
var home_loanInp = document.getElementById('home_loan');

var loan_lenderInp = document.getElementById('loan_lender');
var lender_panInp = document.getElementById('lender_pan');
var otherloan_lenderInp = document.getElementById('otherloan_lender');
var otherlender_panInp = document.getElementById('otherlender_pan');



var loan_amountErrorSpan = document.getElementById('loan_amountError');
var property_valueErrorSpan = document.getElementById('property_valueError');
var home_loanErrorSpan = document.getElementById('home_loanError');
var otherloan_lenderErrorSpan = document.getElementById('otherloan_lenderError');
var otherlender_panErrorSpan = document.getElementById('otherlender_panError');




// 80eea

var eeFileUpload_80eea_file = document.getElementById('eeFileUpload');


var op80eea_row_ = document.getElementById('op80eea_row');
var property_value_other_row_ = document.getElementById('property_value_other_row');



var loan_sanctioned_date_eeInp = document.getElementById('loan_sanctioned_date_ee');
var op80eeayesInp = document.getElementById('op80eeayes');
var op80eeanoInp = document.getElementById('op80eeano');
var property_value_otherInp = document.getElementById('property_value_other');
var op80eeayes_eligInp = document.getElementById('op80eeayes_elig');
var op80eeano_eligInp = document.getElementById('op80eeano_elig');

var property_value_otherErrorSpan = document.getElementById('property_value_otherError');



function erase_values() {

    self_date.value = null;
    selfOccupiedHousePropertyInp.value = null;
    selfHomeLoanLenderNameInp.value = null;
    selfHomeLoanLenderPANInp.value = null;
    otherselfHomeLoanLenderNameInp.value = null;
    otherselfHomeLoanLenderPANInp.value = null;

    annualLettableValueInp.value = null;
    municipalPropertyTaxInp.value = null;
    homeLoanInterestInp.value = null;
    incomeLossOnHousePropertyInp.value = null;
    standardDeductionInp.value = null;
    loanLenderNameInp.value = null;
    loanLenderPANInp.value = null;
    otherloanLenderNameInp.value = null;
    otherloanLenderPANInp.value = null;

    loan_sanctioned_dateInp.value = null;
    loan_amountInp.value = null;
    property_valueInp.value = null;
    home_loanInp.value = null;
    loan_lenderInp.value = null;
    lender_panInp.value = null;
    otherloan_lenderInp.value = null;
    otherlender_panInp.value = null;

    loan_sanctioned_date_eeInp.value = null;
    property_value_otherInp.value = null;
    op80eeayesInp.checked = false;
    op80eeanoInp.checked = false;
    op80eeayes_eligInp.checked = false;
    op80eeano_eligInp.checked = false;

    selfOccupiedHousePropertyErrorSpan.textContent = '';

    otherselfHomeLoanLenderNameErrorSpan.textContent = '';
    otherselfHomeLoanLenderPANErrorSpan.textContent = '';
    annualLettableValueErrorSpan.textContent = '';
    municipalPropertyTaxErrorSpan.textContent = '';
    homeLoanInterestErrorSpan.textContent = '';
    standardDeductionErrorSpan.textContent = '';
    otherloanLenderNameErrorSpan.textContent = '';
    otherloanLenderPANErrorSpan.textContent = '';
    loan_amountErrorSpan.textContent = '';
    property_valueErrorSpan.textContent = '';
    home_loanErrorSpan.textContent = '';
    otherloan_lenderErrorSpan.textContent = '';
    otherlender_panErrorSpan.textContent = '';
    property_value_otherErrorSpan.textContent = '';

    section_80ee.style.display = 'none';
    loan_amount_row_.style.display = 'none';
    property_value_row_.style.display = 'none';
    home_loan_row_.style.display = 'none';
    loan_lender_row_.style.display = 'none';
    lender_pan_row_.style.display = 'none';

    section_80eea.style.display = 'none';
    op80eea_row_.style.display = 'none';
    property_value_other_row_.style.display = 'none';
    


    selfOccupiedHouseProperty1_file.style.display = 'none';
    letOutProperty_file1_file.style.display = 'none';
    file_upload_80ee_file.style.display = 'none';
    eeFileUpload_80eea_file.style.display = 'none';

}


function income_loss(value) {
    if (value === 'yes') {
        ilhp_questions_section.style.display = 'block';
    } else {
        ilhp_questions_section.style.display = 'none';
        erase_values();

        if (localStorage.getItem('self_form_formData')) {
            localStorage.removeItem('self_form_formData');
        }
    
        if (localStorage.getItem('letout_form_formData')) {
            localStorage.removeItem('letout_form_formData');
        }
    
        if (localStorage.getItem('formData_80ee')) {
            localStorage.removeItem('formData_80ee');
        }
    
        if (localStorage.getItem('formData_80eea')) {
            localStorage.removeItem('formData_80eea');
        }
    }
    save_father_ispan();
    files_display_section_none();
    display_save2btn();
    display_submit();
    disable_btns();

}

// self Home loan
function self_occupied_file() {
    if (selfOccupiedHousePropertyInp.value && self_date.value) {
        if (selfOccupiedHousePropertyErrorSpan.textContent === '' && selfHomeLoanLenderNameInp.value) {
            if (selfHomeLoanLenderNameInp.value === 'other') {
                if (otherselfHomeLoanLenderNameInp.value && otherselfHomeLoanLenderPANInp.value &&
                    otherselfHomeLoanLenderNameErrorSpan.textContent === '' && otherselfHomeLoanLenderPANErrorSpan.textContent === '') {
                    selfOccupiedHouseProperty1_file.style.display = 'table-row';
                } else {
                    selfOccupiedHouseProperty1_file.style.display = 'none';
                }
            } else {
                if (selfHomeLoanLenderPANInp.value) {
                    selfOccupiedHouseProperty1_file.style.display = 'table-row';
                } else {
                    selfOccupiedHouseProperty1_file.style.display = 'none';
                }
            }
        } else {
            selfOccupiedHouseProperty1_file.style.display = 'none';
        }
    } else {
        selfOccupiedHouseProperty1_file.style.display = 'none';
    }
    display_submit();
    display_save2btn();
    disable_btns();
}


var self_value_limit;



//  
function display_80eea() {

    if (loan_sanctioned_date_eeInp.value && op80eeanoInp.checked === true && property_value_otherInp.value && property_value_otherErrorSpan.textContent === '') {
        eeFileUpload_80eea_file.style.display = 'table-row';
        op80eeayes_eligInp.checked = true;
        if (self_value_limit == 200000) {
            alert('self-occupied value limit up to Rs. 3,50,000.')
        }
        self_value_limit = 350000;
    } else {
        eeFileUpload_80eea_file.style.display = 'none';
        op80eeano_eligInp.checked = true;
        if (self_value_limit == 350000) {
            alert('self-occupied value limit up to Rs. 2,00,000.')
        }
        self_value_limit = 200000;
        if (selfOccupiedHousePropertyInp.value > self_value_limit) {
            selfOccupiedHousePropertyInp.value = self_value_limit;
        }
    }
    display_submit();
    display_save2btn();
    disable_btns();
}




function validateNumberField_sop() {
    if (selfOccupiedHousePropertyInp.value) {
        var self_value = selfOccupiedHousePropertyInp.value;
        selfOccupiedHousePropertyInp.value = selfOccupiedHousePropertyInp.value.replace(/\D/g, '');
        if (!Number.isInteger(Number(self_value)) || self_value.includes('.') || Number(self_value) < 0) {
            selfOccupiedHousePropertyErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(self_value) == 0) {
            selfOccupiedHousePropertyErrorSpan.textContent = '';
        }
        else if (self_value > self_value_limit) {
            selfOccupiedHousePropertyInp.value = self_value_limit;
            selfOccupiedHousePropertyErrorSpan.textContent = '';
            alert(`Self Occupied property value should be less than or equal to Rs. ${self_value_limit}`);
        } else {
            selfOccupiedHousePropertyErrorSpan.textContent = '';
        }        

    } else {        
        selfOccupiedHousePropertyErrorSpan.textContent = '';
    }
    self_occupied_file();
}


selfHomeLoanLenderNameInp.addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    var pan = selectedOption.getAttribute('data-pan');

    if (selectedOption.value === 'other') {
        selfHomeLoanLenderPANInp.value = '';  // Clear the lenderpan1 value
        selfHomeLoanLenderPANInp.disabled = true;  // Disable lenderpan1 input
        otherselfLenderRow.style.display = 'table-row';  // Show other lender name row
        otherselfPanRow.style.display = 'table-row';
    } else {
        selfHomeLoanLenderPANInp.value = pan;
        selfHomeLoanLenderPANInp.disabled = false;  // Enable lenderpan1 input
        otherselfLenderRow.style.display = 'none';  // Hide other lender name row
        otherselfPanRow.style.display = 'none'
        otherselfHomeLoanLenderPANInp.value = '';
        otherselfHomeLoanLenderNameInp.value = '';
        otherselfHomeLoanLenderPANErrorSpan.textContent = '';
        otherselfHomeLoanLenderNameErrorSpan.textContent = "";
    }
    self_occupied_file();
});



function selfLender_fun(new_value) {
    if (new_value === 'other') {
        selfHomeLoanLenderPANInp.value = '';  // Clear the lenderpan1 value
        selfHomeLoanLenderPANInp.disabled = true;  // Disable lenderpan1 input
        otherselfLenderRow.style.display = 'table-row';  // Show other lender name row
        otherselfPanRow.style.display = 'table-row';
    } else {

        selfHomeLoanLenderPANInp.disabled = false;  // Enable lenderpan1 input
        otherselfLenderRow.style.display = 'none';  // Hide other lender name row
        otherselfPanRow.style.display = 'none'
        otherselfHomeLoanLenderPANInp.value = '';
        otherselfHomeLoanLenderNameInp.value = '';
        otherselfHomeLoanLenderPANErrorSpan.textContent = '';
        otherselfHomeLoanLenderNameErrorSpan.textContent = "";
    }
    self_occupied_file();
}




function validateOtherselfHomeLoanLenderName() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (otherselfHomeLoanLenderNameInp.value) {
        if (!alphabetPattern.test(otherselfHomeLoanLenderNameInp.value)) {
            otherselfHomeLoanLenderNameErrorSpan.textContent = "Name should contain only alphabets.";
        } else {
            otherselfHomeLoanLenderNameErrorSpan.textContent = "";
        }
    } else {
        otherselfHomeLoanLenderNameErrorSpan.textContent = "";
    }
    self_occupied_file();
}

function validateOtherselfHomeLoanLenderPAN() {
    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;
    var inputPAN = otherselfHomeLoanLenderPANInp.value.toUpperCase(); // Convert input to uppercase
    otherselfHomeLoanLenderPANInp.value = inputPAN; // Update input value with uppercase version

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            otherselfHomeLoanLenderPANErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            otherselfHomeLoanLenderPANErrorSpan.textContent = '';
        }
    } else {
        otherselfHomeLoanLenderPANErrorSpan.textContent = '';
    }
    self_occupied_file();
}



function selfOccupiedHousePropertyFileUpload() {
    
    const self_form_formData = {
        self_date: self_date.value,
        selfOccupiedHouseProperty: selfOccupiedHousePropertyInp.value,
        selfHomeLoanLenderName: selfHomeLoanLenderNameInp.value,
        selfHomeLoanLenderPAN: selfHomeLoanLenderPANInp.value,
        otherselfHomeLoanLenderName: otherselfHomeLoanLenderNameInp.value,
        otherselfHomeLoanLenderPAN: otherselfHomeLoanLenderPANInp.value
    };
    const jsonData = JSON.stringify(self_form_formData);
    localStorage.setItem('self_form_formData', jsonData);

    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 2;
    } else {
        localStorage.setItem('currentTab', 2)
    }

    let apiUrl = "upload_Self_occupied_file";
    document.getElementById("ilhp").action = apiUrl;
    document.getElementById("ilhp").submit();
}





// let out house property


function let_out_file() {
    if (annualLettableValueInp.value && municipalPropertyTaxInp.value && homeLoanInterestInp.value && incomeLossOnHousePropertyInp.value && standardDeductionInp.value &&
        loanLenderNameInp.value && annualLettableValueErrorSpan.textContent === '' && municipalPropertyTaxErrorSpan.textContent === '' && homeLoanInterestErrorSpan.textContent === '' && standardDeductionErrorSpan.textContent === '') {
        if (loanLenderNameInp.value === 'other') {
            if (otherloanLenderNameInp.value && otherloanLenderPANInp.value && otherloanLenderNameErrorSpan.textContent === '' && otherloanLenderPANErrorSpan.textContent === '') {
                letOutProperty_file1_file.style.display = 'table-row';
            } else {
                letOutProperty_file1_file.style.display = 'none';
            }
        } else {
            if (loanLenderPANInp.value) {
                letOutProperty_file1_file.style.display = 'table-row';
            } else {
                letOutProperty_file1_file.style.display = 'none';
            }
        }
    } else {
        letOutProperty_file1_file.style.display = 'none';
    }
    display_submit();
    display_save2btn();
    disable_btns();
}



function calculatePropertyValues() {

    var anual_value = annualLettableValueInp.value;
    var municipal_value = municipalPropertyTaxInp.value
    var homeloan_value = homeLoanInterestInp.value

    if (anual_value && municipal_value) {
        var standardDeduction = ((Number(anual_value) - Number(municipal_value)) * 0.3).toFixed();
        standardDeductionInp.value = standardDeduction;

        if (standardDeduction < 0) {
            standardDeductionErrorSpan.textContent = "Standard deduction cannot be negative";
        } else {
            standardDeductionErrorSpan.textContent = "";
        }
    } else {
        standardDeductionInp.value = '';
        standardDeductionErrorSpan.textContent = "";
    }

    if (anual_value && municipal_value && homeloan_value) {
        var incomeLossOnHouseProperty = (((Number(anual_value) - Number(municipal_value)) * 0.7) - Number(homeloan_value)).toFixed();
        incomeLossOnHousePropertyInp.value = incomeLossOnHouseProperty;
    } else {
        incomeLossOnHousePropertyInp.value = '';
    }
    let_out_file();
}

function validateAnnualLettableValue() {
    const convertedText_annualLettable = document.getElementById("convertedText_annualLettable");
    if (annualLettableValueInp.value) {
        var anual_value = annualLettableValueInp.value;
        if (!Number.isInteger(Number(anual_value)) || anual_value.includes('.') || Number(anual_value) < 0) {
            annualLettableValueErrorSpan.textContent = 'Please enter a positive integer value.';
            convertedText_annualLettable.textContent = '';
        } else if (Number(anual_value) == 0) {
            annualLettableValueErrorSpan.textContent = '';
            convertedText_annualLettable.textContent = '';
        }
        else {
            annualLettableValueErrorSpan.textContent = '';
            
            const amount = parseInt(annualLettableValueInp.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_annualLettable.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_annualLettable.style.color = "red";
            } else {
                convertedText_annualLettable.style.color = "";
            }
            
        }
    } else {
        annualLettableValueErrorSpan.textContent = '';
        convertedText_annualLettable.textContent = '';
    }

    calculatePropertyValues();
    let_out_file();
}

function validatePropertyTax() {
    if (municipalPropertyTaxInp.value) {
        var municipal_value = municipalPropertyTaxInp.value
        if (!Number.isInteger(Number(municipal_value)) || municipal_value.includes('.') || Number(municipal_value) < 0) {
            municipalPropertyTaxErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(municipal_value) == 0) {
            municipalPropertyTaxErrorSpan.textContent = '';
        }
        else {
            municipalPropertyTaxErrorSpan.textContent = '';
        }
    } else {
        municipalPropertyTaxErrorSpan.textContent = '';
    }

    calculatePropertyValues();
    let_out_file();
}

function validateInterestOnLoan() {
    if (homeLoanInterestInp.value) {
        var homeloan_value = homeLoanInterestInp.value
        if (!Number.isInteger(Number(homeloan_value)) || homeloan_value.includes('.') || Number(homeloan_value) < 0) {
            homeLoanInterestErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(homeloan_value) == 0) {
            homeLoanInterestErrorSpan.textContent = '';
        } else {
            homeLoanInterestErrorSpan.textContent = '';
        }
    } else {
        homeLoanInterestErrorSpan.textContent = '';
    }

    calculatePropertyValues();
    let_out_file();
}



loanLenderNameInp.addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    var pan = selectedOption.getAttribute('data-pan');

    if (selectedOption.value === 'other') {
        loanLenderPANInp.value = '';  // Clear the lenderpan1 value
        loanLenderPANInp.disabled = true;  // Disable lenderpan1 input
        otherlendernm2Row.style.display = 'table-row';  // Show other lender name row
        otherlenderpn2Row.style.display = 'table-row';
    } else {
        loanLenderPANInp.value = pan;
        loanLenderPANInp.disabled = false;  // Enable lenderpan1 input
        otherlendernm2Row.style.display = 'none';  // Hide other lender name row
        otherlenderpn2Row.style.display = 'none'
        otherloanLenderNameInp.value = '';
        otherloanLenderPANInp.value = '';
        otherloanLenderNameErrorSpan.textContent = '';
        otherloanLenderPANErrorSpan.textContent = '';
    }
    let_out_file();
});



function letLender_fun(new_value) {
    if (new_value === 'other') {
        loanLenderPANInp.value = '';  // Clear the lenderpan1 value
        loanLenderPANInp.disabled = true;  // Disable lenderpan1 input
        otherlendernm2Row.style.display = 'table-row';  // Show other lender name row
        otherlenderpn2Row.style.display = 'table-row';
    } else {
        loanLenderPANInp.disabled = false;  // Enable lenderpan1 input
        otherlendernm2Row.style.display = 'none';  // Hide other lender name row
        otherlenderpn2Row.style.display = 'none'
        otherloanLenderNameInp.value = '';
        otherloanLenderPANInp.value = '';
        otherloanLenderNameErrorSpan.textContent = '';
        otherloanLenderPANErrorSpan.textContent = '';
    }
    let_out_file();
}

function validateOtherloanLenderName() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (otherloanLenderNameInp.value) {
        if (!alphabetPattern.test(otherloanLenderNameInp.value)) {
            otherloanLenderNameErrorSpan.textContent = "Name should contain only alphabets.";
        } else {
            otherloanLenderNameErrorSpan.textContent = "";
        }
    } else {
        otherloanLenderNameErrorSpan.textContent = "";
    }
    let_out_file();

}

function validateOtherloanLenderPAN() {
    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;
    var inputPAN = otherloanLenderPANInp.value.toUpperCase(); // Convert input to uppercase
    otherloanLenderPANInp.value = inputPAN; // Update input value with uppercase version

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            otherloanLenderPANErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            otherloanLenderPANErrorSpan.textContent = '';
        }
    } else {
        otherloanLenderPANErrorSpan.textContent = '';
    }
    let_out_file();
}


function letOutPropertyFileUpload() {

    const letout_form_formData = {
        annualLettableValue: annualLettableValueInp.value,
        municipalPropertyTax: municipalPropertyTaxInp.value,
        homeLoanInterest: homeLoanInterestInp.value,
        incomeLossOnHouseProperty: incomeLossOnHousePropertyInp.value,
        standardDeduction: standardDeductionInp.value,
        loanLenderName: loanLenderNameInp.value,
        loanLenderPAN: loanLenderPANInp.value,
        otherloanLenderName: otherloanLenderNameInp.value,
        otherloanLenderPAN: otherloanLenderPANInp.value
    };
    const jsonData = JSON.stringify(letout_form_formData);
    localStorage.setItem('letout_form_formData', jsonData);

    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 2;
    } else {
        localStorage.setItem('currentTab', 2)
    }


    let apiUrl = "upload_letout_file";
    document.getElementById("ilhp").action = apiUrl;
    document.getElementById("ilhp").submit();
}



// 80EE Section



function reset_80EE() {
    loan_amount_row_.style.display = 'none';
    property_value_row_.style.display = 'none';
    home_loan_row_.style.display = 'none';
    loan_lender_row_.style.display = 'none';
    lender_pan_row_.style.display = 'none';
    otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
    otherlender_pan_row_.style.display = 'none'

    section_80ee.style.display = 'none';
    loandt_80ee.style.display = 'none';


    loan_amountErrorSpan.textContent = '';
    property_valueErrorSpan.textContent = '';
    home_loanErrorSpan.textContent = '';
    otherloan_lenderErrorSpan.textContent = '';
    otherlender_panErrorSpan.textContent = '';

    loan_sanctioned_dateInp.value = null;
    loan_amountInp.value = null;
    property_valueInp.value = null;
    home_loanInp.value = null;
    loan_lenderInp.value = null;
    lender_panInp.value = null;
    otherloan_lenderInp.value = null;
    otherlender_panInp.value = null;

}

var op80eea_other_property_new = document.getElementById('op80eea_other_property_new');

function reset_80EEA() {

    section_80eea.style.display = 'none';
    loandt_80eea.style.display = 'none';

    op80eea_row_.style.display = 'none';
    property_value_other_row_.style.display = 'none';    

    op80eea_other_property_new.value = 'yes';

    loan_sanctioned_date_eeInp.value = null;
    property_value_otherInp.value = null;
    op80eeayesInp.checked = false;
    op80eeanoInp.checked = false;
    op80eeayes_eligInp.checked = false;
    op80eeano_eligInp.checked = false;

}


function display_80ee() {
    if (loan_sanctioned_dateInp) {
        if (loan_amountInp.value && property_valueInp.value && home_loanInp.value && loan_lenderInp.value && loan_amountErrorSpan.textContent === '' && property_valueErrorSpan.textContent === '' && home_loanErrorSpan.textContent === '') {
            if (loan_lenderInp.value === 'other') {
                if (otherloan_lenderInp.value && otherlender_panInp.value && otherloan_lenderErrorSpan.textContent === '' && otherlender_panErrorSpan.textContent === '') {
                    file_upload_80ee_file.style.display = 'table-row';
                } else {
                    file_upload_80ee_file.style.display = 'none';
                }
            } else {
                if (lender_panInp.value) {
                    file_upload_80ee_file.style.display = 'table-row';
                } else {
                    file_upload_80ee_file.style.display = 'none';
                }
            }
        } else {
            file_upload_80ee_file.style.display = 'none';
        }
    } else {
        file_upload_80ee_file.style.display = 'none';
    }
    display_submit();
    display_save2btn();
    disable_btns();
}


function validateSanctionedDate() {
    var startDate = new Date('2016-04-01');
    var endDate = new Date('2017-03-31');
    if (loan_sanctioned_dateInp.value) {
        var sanctioned_date = new Date(loan_sanctioned_dateInp.value);

        if (sanctioned_date >= startDate && endDate >= sanctioned_date) {
            loan_amount_row_.style.display = 'table-row';
            property_value_row_.style.display = 'table-row';
            home_loan_row_.style.display = 'table-row';
            loan_lender_row_.style.display = 'table-row';
            lender_pan_row_.style.display = 'table-row';

            loan_sanctioned_date_eeInp.disabled = true;
            reset_80EEA();
            alert('You are not eligible for 80EEA')
        } else {
            reset_80EE();
            loan_sanctioned_date_eeInp.disabled = false;
            alert('You are not eligible for 80EE')
        }
    } else {
        loan_amount_row_.style.display = 'none';
        property_value_row_.style.display = 'none';
        home_loan_row_.style.display = 'none';
        loan_lender_row_.style.display = 'none';
        lender_pan_row_.style.display = 'none';
        otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
        otherlender_pan_row_.style.display = 'none'
    }
    display_80ee();

}


var currentDate_1 = new Date();
var formattedCurrentDate_1 = currentDate_1.toISOString().split('T')[0];
document.getElementById('self_date').max = formattedCurrentDate_1;



function ValidateSelf_date() {
    var startDate_1 = new Date('2016-04-01');
    var endDate_1 = new Date('2017-03-31');

    var startDate_2 = new Date('2019-04-01');
    var endDate_2 = new Date('2022-03-31');

    if (self_date.value) {
        var inputDateValue = self_date.value;
        var inputDate = new Date(inputDateValue);

        var currentDate = new Date();
        if (inputDate > currentDate) {
            self_date.value = null;
            alert('selected date must not be future date.')
        } else if (inputDate >= startDate_1 && endDate_1 >= inputDate) {

            section_80ee.style.display = 'table-row';            

            loan_amount_row_.style.display = 'table-row';
            property_value_row_.style.display = 'table-row';
            home_loan_row_.style.display = 'table-row';
            loan_lender_row_.style.display = 'table-row';
            lender_pan_row_.style.display = 'table-row';

            loan_sanctioned_dateInp.value = formatDate(inputDate);
            loan_sanctioned_date_eeInp.value = null;
            op80eeayesInp.checked = false;
            op80eeanoInp.checked = false;
            property_value_otherInp.value = null;
            op80eeayes_eligInp.checked = false;

            section_80eea.style.display = 'none';
            loandt_80eea.style.display = 'none';

            op80eea_row_.style.display = 'none';
            property_value_other_row_.style.display = 'none';

            alert('You are not eligible for 80EEA')
        } else if (inputDate >= startDate_2 && endDate_2 >= inputDate) {

            section_80eea.style.display = 'table-row';
            // loandt_80eea.style.display = 'table-row';

            op80eea_row_.style.display = 'table-row';
            property_value_other_row_.style.display = 'table-row';
            

            loan_sanctioned_date_eeInp.value = formatDate(inputDate);

            loan_sanctioned_dateInp.value = null;
            loan_amountInp.value = null;
            property_valueInp.value = null;
            home_loanInp.value = null;
            loan_lenderInp.value = null;
            lender_panInp.value = null;
            otherloan_lenderInp.value = null;
            otherlender_panInp.value = null;



            section_80ee.style.display = 'none';
            loandt_80ee.style.display = 'none';

            loan_amount_row_.style.display = 'none';
            property_value_row_.style.display = 'none';
            home_loan_row_.style.display = 'none';
            loan_lender_row_.style.display = 'none';
            lender_pan_row_.style.display = 'none';
            otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
            otherlender_pan_row_.style.display = 'none'

            alert('You are not eligible for 80EE')
            display_80eea();
        } else {

            loan_sanctioned_date_eeInp.value = null;
            op80eeayesInp.checked = false;
            op80eeanoInp.checked = false;
            property_value_otherInp.value = null;
            op80eeayes_eligInp.checked = false;


            section_80eea.style.display = 'none';
            loandt_80eea.style.display = 'none';
            op80eea_row_.style.display = 'none';
            property_value_other_row_.style.display = 'none';
            

            loan_sanctioned_dateInp.value = null;
            loan_amountInp.value = null;
            property_valueInp.value = null;
            home_loanInp.value = null;
            loan_lenderInp.value = null;
            lender_panInp.value = null;
            otherloan_lenderInp.value = null;
            otherlender_panInp.value = null;

            section_80ee.style.display = 'none';
            loandt_80ee.style.display = 'none';

            loan_amount_row_.style.display = 'none';
            property_value_row_.style.display = 'none';
            home_loan_row_.style.display = 'none';
            loan_lender_row_.style.display = 'none';
            lender_pan_row_.style.display = 'none';

            otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
            otherlender_pan_row_.style.display = 'none'

            if (self_value_limit == 350000 || !self_value_limit) {
                alert('self-occupied value limit up to Rs. 2,00,000.')
            }

            self_value_limit = 200000;
            if (Number(selfOccupiedHousePropertyInp.value) > Number(self_value_limit)){
                selfOccupiedHousePropertyInp.value = Number(self_value_limit)
            }

            alert('You are not eligible for 80EE and 80EEA')
        }
    } else {

        loan_sanctioned_date_eeInp.value = null;
        op80eeayesInp.checked = false;
        op80eeanoInp.checked = false;
        property_value_otherInp.value = null;
        op80eeayes_eligInp.checked = false;


        section_80eea.style.display = 'none';
        loandt_80eea.style.display = 'none';

        op80eea_row_.style.display = 'none';
        property_value_other_row_.style.display = 'none';
        

        loan_sanctioned_dateInp.value = null;
        loan_amountInp.value = null;
        property_valueInp.value = null;
        home_loanInp.value = null;
        loan_lenderInp.value = null;
        lender_panInp.value = null;
        otherloan_lenderInp.value = null;
        otherlender_panInp.value = null;

        section_80ee.style.display = 'none';
        loandt_80ee.style.display = 'none';

        loan_amount_row_.style.display = 'none';
        property_value_row_.style.display = 'none';
        home_loan_row_.style.display = 'none';
        loan_lender_row_.style.display = 'none';
        lender_pan_row_.style.display = 'none';
        otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
        otherlender_pan_row_.style.display = 'none'

        self_value_limit = 200000;
        if (Number(selfOccupiedHousePropertyInp.value) > Number(self_value_limit)){
            selfOccupiedHousePropertyInp.value = Number(self_value_limit)
        }

    }
    self_occupied_file();
}



function ValidateSelf_date_2() {
    var startDate_1 = new Date('2016-04-01');
    var endDate_1 = new Date('2017-03-31');

    var startDate_2 = new Date('2019-04-01');
    var endDate_2 = new Date('2022-03-31');

    if (self_date.value) {
        var inputDateValue = self_date.value;
        var inputDate = new Date(inputDateValue);

        var currentDate = new Date();
        if (inputDate > currentDate) {
            self_date.value = null;

        } else if (inputDate >= startDate_1 && endDate_1 >= inputDate) {

            section_80ee.style.display = 'table-row';
            // loandt_80ee.style.display = 'table-row';

            loan_amount_row_.style.display = 'table-row';
            property_value_row_.style.display = 'table-row';
            home_loan_row_.style.display = 'table-row';
            loan_lender_row_.style.display = 'table-row';
            lender_pan_row_.style.display = 'table-row';

            loan_sanctioned_dateInp.value = formatDate(inputDate);
            loan_sanctioned_date_eeInp.value = null;
            op80eeayesInp.checked = false;
            op80eeanoInp.checked = false;
            property_value_otherInp.value = null;
            op80eeayes_eligInp.checked = false;

            section_80eea.style.display = 'none';
            loandt_80eea.style.display = 'none';

            op80eea_row_.style.display = 'none';
            property_value_other_row_.style.display = 'none';
            


        } else if (inputDate >= startDate_2 && endDate_2 >= inputDate) {

            if (op80eea_other_property_new.value) {
                if (op80eea_other_property_new.value == 'no') {
                    section_80eea.style.display = 'table-row';
                    // loandt_80eea.style.display = 'table-row';

                    op80eea_row_.style.display = 'table-row';
                    property_value_other_row_.style.display = 'table-row';
                    

                    loan_sanctioned_date_eeInp.value = formatDate(inputDate);
                }
            } else {
                section_80eea.style.display = 'table-row';
                // loandt_80eea.style.display = 'table-row';

                op80eea_row_.style.display = 'table-row';
                property_value_other_row_.style.display = 'table-row';
                

                loan_sanctioned_date_eeInp.value = formatDate(inputDate);
            }

            loan_sanctioned_dateInp.value = null;
            loan_amountInp.value = null;
            property_valueInp.value = null;
            home_loanInp.value = null;
            loan_lenderInp.value = null;
            lender_panInp.value = null;
            otherloan_lenderInp.value = null;
            otherlender_panInp.value = null;

            section_80ee.style.display = 'none';
            loandt_80ee.style.display = 'none';

            loan_amount_row_.style.display = 'none';
            property_value_row_.style.display = 'none';
            home_loan_row_.style.display = 'none';
            loan_lender_row_.style.display = 'none';
            lender_pan_row_.style.display = 'none';


        } else {

            loan_sanctioned_date_eeInp.value = null;
            op80eeayesInp.checked = false;
            op80eeanoInp.checked = false;
            property_value_otherInp.value = null;
            op80eeayes_eligInp.checked = false;


            section_80eea.style.display = 'none';
            loandt_80eea.style.display = 'none';
            op80eea_row_.style.display = 'none';
            property_value_other_row_.style.display = 'none';
            

            loan_sanctioned_dateInp.value = null;
            loan_amountInp.value = null;
            property_valueInp.value = null;
            home_loanInp.value = null;
            loan_lenderInp.value = null;
            lender_panInp.value = null;
            otherloan_lenderInp.value = null;
            otherlender_panInp.value = null;

            section_80ee.style.display = 'none';
            loandt_80ee.style.display = 'none';

            loan_amount_row_.style.display = 'none';
            property_value_row_.style.display = 'none';
            home_loan_row_.style.display = 'none';
            loan_lender_row_.style.display = 'none';
            lender_pan_row_.style.display = 'none';


        }
    } else {

        loan_sanctioned_date_eeInp.value = null;
        op80eeayesInp.checked = false;
        op80eeanoInp.checked = false;
        property_value_otherInp.value = null;
        op80eeayes_eligInp.checked = false;


        section_80eea.style.display = 'none';
        loandt_80eea.style.display = 'none';

        op80eea_row_.style.display = 'none';
        property_value_other_row_.style.display = 'none';
        

        loan_sanctioned_dateInp.value = null;
        loan_amountInp.value = null;
        property_valueInp.value = null;
        home_loanInp.value = null;
        loan_lenderInp.value = null;
        lender_panInp.value = null;
        otherloan_lenderInp.value = null;
        otherlender_panInp.value = null;

        section_80ee.style.display = 'none';
        loandt_80ee.style.display = 'none';

        loan_amount_row_.style.display = 'none';
        property_value_row_.style.display = 'none';
        home_loan_row_.style.display = 'none';
        loan_lender_row_.style.display = 'none';
        lender_pan_row_.style.display = 'none';

    }
}



function validateSanctionedDate2() {
    var startDate = new Date('2016-04-01');
    var endDate = new Date('2017-03-31');
    if (loan_sanctioned_dateInp.value) {
        var sanctioned_date = new Date(loan_sanctioned_dateInp.value);

        if (sanctioned_date >= startDate && endDate >= sanctioned_date) {
            loan_amount_row_.style.display = 'table-row';
            property_value_row_.style.display = 'table-row';
            home_loan_row_.style.display = 'table-row';
            loan_lender_row_.style.display = 'table-row';
            lender_pan_row_.style.display = 'table-row';

            loan_sanctioned_date_eeInp.disabled = true;
            reset_80EEA();

        } else {
            reset_80EE();
            loan_sanctioned_date_eeInp.disabled = false;

        }
    } else {
        loan_amount_row_.style.display = 'none';
        property_value_row_.style.display = 'none';
        home_loan_row_.style.display = 'none';
        loan_lender_row_.style.display = 'none';
        lender_pan_row_.style.display = 'none';
    }
    display_80ee();
}

function validateNumberField1_la80ee() {
    if (loan_amountInp.value) {
        var amount = loan_amountInp.value
        if (!Number.isInteger(Number(amount)) || amount.includes('.') || Number(amount) < 0) {
            loan_amountErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(amount) == 0) {
            loan_amountErrorSpan.textContent = '';
        }
        else if (amount > 3500000) {
            loan_amountInp.value = 3500000;
            loan_amountErrorSpan.textContent = '';
            alert("Housing loan amount should not be more than Rs. 35,00,000. Hence you are not eligible to claim 80 EE");
        } else {
            loan_amountErrorSpan.textContent = '';
        }
    } else {
        loan_amountErrorSpan.textContent = '';
    }
    display_80ee();
}

function validateNumberField2_pv80ee() {
    if (property_valueInp.value) {
        var amount = property_valueInp.value
        if (!Number.isInteger(Number(amount)) || amount.includes('.') || Number(amount) < 0) {
            property_valueErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(amount) == 0) {
            property_valueErrorSpan.textContent = '';
        }
        else if (amount > 5000000 || parseInt(loan_amountInp.value) > amount) {
            if (amount > 5000000) {
                property_valueInp.value = 5000000;
                property_valueErrorSpan.textContent = '';
                alert("Housing loan property value should be less than Rs. 50,00,000. Hence you are not eligible to claim 80 EE");
            } else if (parseInt(loan_amountInp.value) > amount) {
                property_valueErrorSpan.textContent = 'Property value should not be less than the loan amount.';
            } else {
                property_valueErrorSpan.textContent = '';
            }
        } else {
            property_valueErrorSpan.textContent = '';
        }

    } else {
        property_valueErrorSpan.textContent = '';
    }
    display_80ee();
}

function validateNumberField3_hli80ee() {
    if (home_loanInp.value) {
        var amount = home_loanInp.value
        if (!Number.isInteger(Number(amount)) || amount.includes('.') || Number(amount) < 0) {
            home_loanErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(amount) == 0) {
            home_loanErrorSpan.textContent = '';
        }
        else if (amount > 50000) {
            home_loanInp.value = 50000;
            home_loanErrorSpan.textContent = '';
            alert("Housing loan interest amount is restricted to Rs. 50,000");
        } else {
            home_loanErrorSpan.textContent = '';
        }
    } else {
        home_loanErrorSpan.textContent = '';
    }
    display_80ee();
}



loan_lenderInp.addEventListener('change', function () {
    var selectedOption = this.options[this.selectedIndex];
    var pan = selectedOption.getAttribute('data-pan');

    if (selectedOption.value === 'other') {
        lender_panInp.value = '';  // Clear the lenderpan1 value
        lender_panInp.disabled = true;  // Disable lenderpan1 input
        otherloan_lender_row_.style.display = 'table-row';  // Show other lender name row
        otherlender_pan_row_.style.display = 'table-row';
    } else {
        lender_panInp.value = pan;
        lender_panInp.disabled = false;  // Enable lenderpan1 input
        otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
        otherlender_pan_row_.style.display = 'none'
        otherloan_lenderInp.value = '';
        otherlender_panInp.value = '';
        otherloan_lenderErrorSpan.textContent = '';
        otherlender_panErrorSpan.textContent = '';
    }
    display_80ee();
});



function lender_80ee_fun(new_value) {
    if (new_value === 'other') {
        lender_panInp.value = '';  // Clear the lenderpan1 value
        lender_panInp.disabled = true;  // Disable lenderpan1 input
        otherloan_lender_row_.style.display = 'table-row';  // Show other lender name row
        otherlender_pan_row_.style.display = 'table-row';
    } else {
        lender_panInp.disabled = false;  // Enable lenderpan1 input
        otherloan_lender_row_.style.display = 'none';  // Hide other lender name row
        otherlender_pan_row_.style.display = 'none'
        otherloan_lenderInp.value = '';
        otherlender_panInp.value = '';
        otherloan_lenderErrorSpan.textContent = '';
        otherlender_panErrorSpan.textContent = '';
    }
    display_80ee();

}


function validateOtherloan_lender() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (otherloan_lenderInp.value) {

        if (!alphabetPattern.test(otherloan_lenderInp.value)) {
            otherloan_lenderErrorSpan.textContent = "Name should contain only alphabets.";
        } else {
            otherloan_lenderErrorSpan.textContent = "";
        }
    } else {
        otherloan_lenderErrorSpan.textContent = "";
    }
    display_80ee();
}

function validateOtherlender_pan() {
    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;
    var inputPAN = otherlender_panInp.value.toUpperCase(); // Convert input to uppercase
    otherlender_panInp.value = inputPAN; // Update input value with uppercase version

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            otherlender_panErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            otherlender_panErrorSpan.textContent = '';
        }
    } else {
        otherlender_panErrorSpan.textContent = '';
    }
    display_80ee();
}


function upload_80ee() {

    if (localStorage.getItem('formData_80eea') !== null) {
        localStorage.removeItem('formData_80eea');
    }

    const formData_80ee = {
        self_date: self_date.value,
        loan_sanctionedValue: loan_sanctioned_dateInp.value,
        loan_amountValue: loan_amountInp.value,
        property_newvalue: property_valueInp.value,
        home_loanValue: home_loanInp.value,
        loan_lenderValue: loan_lenderInp.value,
        lender_panValue: lender_panInp.value,
        otherloan_lenderValue: otherloan_lenderInp.value,
        otherlender_panValue: otherlender_panInp.value,

    };
    const jsonData = JSON.stringify(formData_80ee);
    localStorage.setItem('formData_80ee', jsonData);

    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 2;
    } else {
        localStorage.setItem('currentTab', 2)
    }



    let apiUrl = "upload_80EE_file";
    document.getElementById("ilhp").action = apiUrl;
    document.getElementById("ilhp").submit();
}



// 80EEA




function validateSanctionedDate80EEA() {
    var startDate = new Date('2019-04-01');
    var endDate = new Date('2022-03-31');

    if (loan_sanctioned_date_eeInp.value) {
        var sanctioned_date = new Date(loan_sanctioned_date_eeInp.value);

        if (sanctioned_date >= startDate && endDate >= sanctioned_date) {
            op80eea_row_.style.display = 'table-row';
            property_value_other_row_.style.display = 'table-row';
            

            reset_80EE();
            loan_sanctioned_dateInp.disabled = true;
            alert('You are not eligible for 80EE')
        } else {
            reset_80EEA();
            loan_sanctioned_dateInp.disabled = false;
            alert('You are not eligible for 80EEA')
        }
    } else {
        op80eea_row_.style.display = 'none';
        property_value_other_row_.style.display = 'none';
        
    }
    display_80eea();

}

function validateSanctionedDate80EEA2() {
    var startDate = new Date('2019-04-01');
    var endDate = new Date('2022-03-31');

    if (loan_sanctioned_date_eeInp.value) {
        var sanctioned_date = new Date(loan_sanctioned_date_eeInp.value);

        if (sanctioned_date >= startDate && endDate >= sanctioned_date) {
            op80eea_row_.style.display = 'table-row';
            property_value_other_row_.style.display = 'table-row';
            

            reset_80EE();
            loan_sanctioned_dateInp.disabled = true;

        } else {
            reset_80EEA();
            loan_sanctioned_dateInp.disabled = false;

        }
    } else {
        op80eea_row_.style.display = 'none';
        property_value_other_row_.style.display = 'none';
        
    }
    display_80eea();
}

function handleOp80eeaSelection(value) {
    if (value == 'yes') {
        reset_80EEA();
        loan_sanctioned_dateInp.disabled = false;
        alert('You are not eligible for 80EEA')
    } else {
        op80eea_other_property_new.value = 'no';
    }
    display_80eea();

}

function validateNumberField4_pv80eea() {
    if (property_value_otherInp.value) {
        var amount = property_value_otherInp.value
        if (!Number.isInteger(Number(amount)) || amount.includes('.') || Number(amount) < 0) {
            property_value_otherErrorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(amount) == 0) {
            property_value_otherErrorSpan.textContent = '';
        }
        else if (amount > 4500000) {
            property_value_otherInp.value = 4500000;
            property_value_otherErrorSpan.textContent = '';
            alert("The property value should be less than or equal to Rs. 45,00,000");
        } else {
            property_value_otherErrorSpan.textContent = '';
        }
    } else {
        property_value_otherErrorSpan.textContent = '';
    }
    display_80eea();
}



function upload_80eea() {

    if (localStorage.getItem('formData_80ee') !== null) {
        localStorage.removeItem('formData_80ee');
    }


    var op80eea_value = null
    var op80eea_elig_value = null

    if (op80eeayesInp.checked == true) {
        op80eea_value = 'yes'
    } else if (op80eeanoInp.checked == true) {
        op80eea_value = 'no'
    }

    if (op80eeayes_eligInp.checked == true) {
        op80eea_elig_value = 'yes'
    } else if (op80eeano_eligInp.checked == true) {
        op80eea_elig_value = 'no'
    }

    const formData_80eea = {
        self_date: self_date.value,
        loan_sanctionedValue: loan_sanctioned_date_eeInp.value,
        op80eea_new_value: op80eea_value,
        property_value_othervalue: property_value_otherInp.value,
        op80eea_elig_newvalue: op80eea_elig_value
    };

    const jsonData = JSON.stringify(formData_80eea);
    localStorage.setItem('formData_80eea', jsonData);

    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 2;
    } else {
        localStorage.setItem('currentTab', 2)
    }

    let apiUrl = "upload_80EEA_file";
    document.getElementById("ilhp").action = apiUrl;
    document.getElementById("ilhp").submit();
}



document.addEventListener("DOMContentLoaded", function () {


    var ilhpyesbtn = document.getElementById('ilhpyes');
    var ilhpnobtn = document.getElementById('ilhpno');


    const storedData_letout = localStorage.getItem('letout_form_formData');
    if (storedData_letout) {
        const storedFormData = JSON.parse(storedData_letout);
        if (storedFormData.annualLettableValue) {
            annualLettableValueInp.value = storedFormData.annualLettableValue;
            municipalPropertyTaxInp.value = storedFormData.municipalPropertyTax;
            homeLoanInterestInp.value = storedFormData.homeLoanInterest;
            incomeLossOnHousePropertyInp.value = storedFormData.incomeLossOnHouseProperty;
            standardDeductionInp.value = storedFormData.standardDeduction;
            loanLenderNameInp.value = storedFormData.loanLenderName;
            loanLenderPANInp.value = storedFormData.loanLenderPAN;
            otherloanLenderNameInp.value = storedFormData.otherloanLenderName;
            otherloanLenderPANInp.value = storedFormData.otherloanLenderPAN;

            ilhpyesbtn.checked = true;
            ilhp_value = 'yes'
            income_loss(ilhp_value);
        }
    }



    const storedData_self = localStorage.getItem('self_form_formData');
    if (storedData_self) {
        const storedFormData = JSON.parse(storedData_self);
        if (storedFormData.selfOccupiedHouseProperty) {
            self_date.value = storedFormData.self_date;
            selfOccupiedHousePropertyInp.value = storedFormData.selfOccupiedHouseProperty;
            selfHomeLoanLenderNameInp.value = storedFormData.selfHomeLoanLenderName;
            selfHomeLoanLenderPANInp.value = storedFormData.selfHomeLoanLenderPAN;
            otherselfHomeLoanLenderNameInp.value = storedFormData.otherselfHomeLoanLenderName;
            otherselfHomeLoanLenderPANInp.value = storedFormData.otherselfHomeLoanLenderPAN;

            ilhpyesbtn.checked = true;
            ilhp_value = 'yes'
            income_loss(ilhp_value);
        }
    }

    const storedData_80ee = localStorage.getItem('formData_80ee');
    if (storedData_80ee) {
        const storedFormData = JSON.parse(storedData_80ee);
        if (storedFormData.loan_sanctionedValue) {
            self_date.value = storedFormData.self_date;
            loan_sanctioned_dateInp.value = storedFormData.loan_sanctionedValue;
            loan_amountInp.value = storedFormData.loan_amountValue;
            property_valueInp.value = storedFormData.property_newvalue;
            home_loanInp.value = storedFormData.home_loanValue;
            loan_lenderInp.value = storedFormData.loan_lenderValue;

            lender_panInp.value = storedFormData.lender_panValue;
            otherloan_lenderInp.value = storedFormData.otherloan_lenderValue;
            otherlender_panInp.value = storedFormData.otherlender_panValue;

            ilhpyesbtn.checked = true;
            ilhp_value = 'yes'
            income_loss(ilhp_value);
        }
    }

    const storedData_80eea = localStorage.getItem('formData_80eea');
    if (storedData_80eea) {
        const storedFormData = JSON.parse(storedData_80eea);
        if (storedFormData.loan_sanctionedValue) {
            loan_sanctioned_date_eeInp.value = storedFormData.loan_sanctionedValue;

            if (storedFormData.op80eea_new_value == 'no') {
                op80eeanoInp.checked = true
            }
            self_date.value = storedFormData.self_date;
            property_value_otherInp.value = storedFormData.property_value_othervalue;
            if (storedFormData.op80eea_elig_newvalue == 'yes') {
                op80eeayes_eligInp.checked = true
            } else if (storedFormData.op80eea_elig_newvalue == 'no') {
                op80eeano_eligInp.checked = true
            }

            ilhpyesbtn.checked = true;
            ilhp_value = 'yes'
            income_loss(ilhp_value);
        }
    }


    if (ilhpyesbtn.checked === true) {
        ilhp_value = 'yes'
        income_loss(ilhp_value);
    } else {
        ilhp_value = 'no'
        income_loss(ilhp_value);
    }

    validateSanctionedDate2();
    validateSanctionedDate80EEA2();



    if (selfHomeLoanLenderNameInp.value) {
        selfLender_fun(selfHomeLoanLenderNameInp.value)
    }


    if (loanLenderNameInp.value) {
        letLender_fun(loanLenderNameInp.value)
    }


    if (loan_lenderInp.value) {
        lender_80ee_fun(loan_lenderInp.value)
    }

    self_occupied_file();
    let_out_file();
    display_80ee();

    if (op80eeayes_eligInp.checked == true) {
        self_value_limit = 350000;
    }


    if (self_date.value) {
        ValidateSelf_date_2()
    }

    display_80eea();
    validateAnnualLettableValue();


});





