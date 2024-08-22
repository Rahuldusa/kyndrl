



function validateAllowed_self() {
    if (allowed_self.value) {
        inputValue = allowed_self.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_selfError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_selfError.textContent = '';
        } else if (Number(inputValue) > Number(selfOccupiedHouseProperty.value)) {
            allowed_selfError.textContent = '';
            allowed_self.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_selfError.textContent = '';
        }
    } else {
        allowed_selfError.textContent = '';
    }
    submit_btn_enable();
}

function validateAllowed_self_2(){
    if (allowed_self_2.value){
        total_value = Number(allowed_self_2.value) + Number(allowed_self.value)
        if (Number(total_value) > Number(selfOccupiedHouseProperty.value)){
            allowed_self_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_self_3(){
    if (allowed_self_3.value){
        total_value = Number(allowed_self_3.value) + Number(allowed_self_2.value) + Number(allowed_self.value)
        if (Number(total_value) > Number(selfOccupiedHouseProperty.value)){
            allowed_self_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}



function letout_calculation() {

    var anual_value = allowed_annualLettableValue.value
    var municipal_value = allowed_municipalPropertyTax.value
    var homeloan_value = allowed_homeLoanInterest.value

    if (anual_value && municipal_value) {
        var standardDeduction = ((Number(anual_value) - Number(municipal_value)) * 0.3).toFixed();
        allowed_standardDeduction.value = standardDeduction;

        if (standardDeduction < 0) {
            allowed_standardDeductionError.textContent = "Standard deduction cannot be negative";
        } else {
            allowed_standardDeductionError.textContent = "";
        }
    } else {
        allowed_standardDeduction.value = '';
        allowed_standardDeductionError.textContent = "";
    }

    if (anual_value && municipal_value && homeloan_value) {
        var incomeLossOnHouseProperty = (((Number(anual_value) - Number(municipal_value)) * 0.7) - Number(homeloan_value)).toFixed();
        allowed_incomeLossOnHouseProperty.value = incomeLossOnHouseProperty;
    } else {
        allowed_incomeLossOnHouseProperty.value = '';
    }
    submit_btn_enable();
}


function letout_calculation_2() {

    var anual_value = allowed_annualLettableValue_2.value
    var municipal_value = allowed_municipalPropertyTax_2.value
    var homeloan_value = allowed_homeLoanInterest_2.value

    if (anual_value && municipal_value) {
        var standardDeduction = ((Number(anual_value) - Number(municipal_value)) * 0.3).toFixed();
        allowed_standardDeduction_2.value = standardDeduction;

        if (standardDeduction < 0) {
            allowed_standardDeduction_2Error.textContent = "Standard deduction cannot be negative";
        } else {
            allowed_standardDeduction_2Error.textContent = "";
        }
    } else {
        allowed_standardDeduction_2.value = '';
        allowed_standardDeduction_2Error.textContent = "";
    }

    if (anual_value && municipal_value && homeloan_value) {
        var incomeLossOnHouseProperty = (((Number(anual_value) - Number(municipal_value)) * 0.7) - Number(homeloan_value)).toFixed();
        allowed_incomeLossOnHouseProperty_2.value = incomeLossOnHouseProperty;
    } else {
        allowed_incomeLossOnHouseProperty_2.value = '';
    }   
    submit_btn_enable_2(); 
}


function letout_calculation_3() {

    var anual_value = allowed_annualLettableValue_3.value
    var municipal_value = allowed_municipalPropertyTax_3.value
    var homeloan_value = allowed_homeLoanInterest_3.value

    if (anual_value && municipal_value) {
        var standardDeduction = ((Number(anual_value) - Number(municipal_value)) * 0.3).toFixed();
        allowed_standardDeduction_3.value = standardDeduction;

        if (standardDeduction < 0) {
            allowed_standardDeduction_3Error.textContent = "Standard deduction cannot be negative";
        } else {
            allowed_standardDeduction_3Error.textContent = "";
        }
    } else {
        allowed_standardDeduction_3.value = '';
        allowed_standardDeduction_3Error.textContent = "";
    }

    if (anual_value && municipal_value && homeloan_value) {
        var incomeLossOnHouseProperty = (((Number(anual_value) - Number(municipal_value)) * 0.7) - Number(homeloan_value)).toFixed();
        allowed_incomeLossOnHouseProperty_3.value = incomeLossOnHouseProperty;
    } else {
        allowed_incomeLossOnHouseProperty_3.value = '';
    }   
    submit_btn_enable_3(); 
}



function validateAllowed_annualLettableValue() {
    if (allowed_annualLettableValue.value) {
        inputValue = allowed_annualLettableValue.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_annualLettableValueError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_annualLettableValueError.textContent = '';
        } else if (Number(inputValue) > Number(annualLettableValue.value)) {
            allowed_annualLettableValueError.textContent = '';
            allowed_annualLettableValue.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_annualLettableValueError.textContent = '';
        }
    } else {
        allowed_annualLettableValueError.textContent = '';
    }
    letout_calculation();
}


function validateAllowed_annualLettableValue_2(){
    if (allowed_annualLettableValue_2.value){
        total_value = Number(allowed_annualLettableValue_2.value) + Number(allowed_annualLettableValue.value)
        if (Number(total_value) > Number(annualLettableValue.value)){
            allowed_annualLettableValue_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_2();
}


function validateAllowed_annualLettableValue_3(){
    if (allowed_annualLettableValue_3.value){
        total_value = Number(allowed_annualLettableValue_3.value) + Number(allowed_annualLettableValue_2.value) + Number(allowed_annualLettableValue.value)
        if (Number(total_value) > Number(annualLettableValue.value)){
            allowed_annualLettableValue_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_3();
}



function validateAllowed_municipalPropertyTax() {
    if (allowed_municipalPropertyTax.value) {
        inputValue = allowed_municipalPropertyTax.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_municipalPropertyTaxError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_municipalPropertyTaxError.textContent = '';
        } else if (Number(inputValue) > Number(municipalPropertyTax.value)) {
            allowed_municipalPropertyTaxError.textContent = '';
            allowed_municipalPropertyTax.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_municipalPropertyTaxError.textContent = '';
        }
    } else {
        allowed_municipalPropertyTaxError.textContent = '';
    }
    letout_calculation();
}


function validateAllowed_municipalPropertyTax_2(){
    if (allowed_municipalPropertyTax_2.value){
        total_value = Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax.value)
        if (Number(total_value) > Number(municipalPropertyTax.value)){
            allowed_municipalPropertyTax_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_2();
}


function validateAllowed_municipalPropertyTax_2(){
    if (allowed_municipalPropertyTax_2.value){
        total_value = Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax.value)
        if (Number(total_value) > Number(municipalPropertyTax.value)){
            allowed_municipalPropertyTax_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_2();
}


function validateAllowed_municipalPropertyTax_3(){
    if (allowed_municipalPropertyTax_3.value){
        total_value = Number(allowed_municipalPropertyTax_3.value) + Number(allowed_municipalPropertyTax_2.value) + Number(allowed_municipalPropertyTax.value)
        if (Number(total_value) > Number(municipalPropertyTax.value)){
            allowed_municipalPropertyTax_3.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_3();
}


function validateAllowed_homeLoanInterest() {
    if (allowed_homeLoanInterest.value) {
        inputValue = allowed_homeLoanInterest.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_homeLoanInterestError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_homeLoanInterestError.textContent = '';
        } else if (Number(inputValue) > Number(homeLoanInterest.value)) {
            allowed_homeLoanInterestError.textContent = '';
            allowed_homeLoanInterest.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_homeLoanInterestError.textContent = '';
        }
    } else {
        allowed_homeLoanInterestError.textContent = '';
    }
    letout_calculation();
}


function validateAllowed_homeLoanInterest_2(){
    if (allowed_homeLoanInterest_2.value){
        total_value = Number(allowed_homeLoanInterest_2.value) + Number(allowed_homeLoanInterest.value)
        if (Number(total_value) > Number(homeLoanInterest.value)){
            allowed_homeLoanInterest_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_2();
}


function validateAllowed_homeLoanInterest_3(){
    if (allowed_homeLoanInterest_3.value){
        total_value = Number(allowed_homeLoanInterest_3.value) + Number(allowed_homeLoanInterest_2.value) + Number(allowed_homeLoanInterest.value)
        if (Number(total_value) > Number(homeLoanInterest.value)){
            allowed_homeLoanInterest_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    letout_calculation_3();
}


function validateAllowed_loan_amount(){
    if (allowed_loan_amount.value) {
        inputValue = allowed_loan_amount.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_loan_amountError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_loan_amountError.textContent = '';
        } else if (Number(inputValue) > Number(loan_amount.value)) {
            allowed_loan_amountError.textContent = '';
            allowed_loan_amount.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_loan_amountError.textContent = '';
        }
    } else {
        allowed_loan_amountError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_loan_amount_2(){
    if (allowed_loan_amount_2.value){
        total_value = Number(allowed_loan_amount_2.value) + Number(allowed_loan_amount.value)
        if (Number(total_value) > Number(loan_amount.value)){
            allowed_loan_amount_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_loan_amount_3(){
    if (allowed_loan_amount_3.value){
        total_value = Number(allowed_loan_amount_3.value) + Number(allowed_loan_amount_2.value) + Number(allowed_loan_amount.value)
        if (Number(total_value) > Number(loan_amount.value)){
            allowed_loan_amount_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_property_value(){
    if (allowed_property_value.value) {
        inputValue = allowed_property_value.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_property_valueError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_property_valueError.textContent = '';
        } else if (Number(inputValue) > Number(property_value.value)) {
            allowed_property_valueError.textContent = '';
            allowed_property_value.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_property_valueError.textContent = '';
        }
    } else {
        allowed_property_valueError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_property_value_2(){
    if (allowed_property_value_2.value){
        total_value = Number(allowed_property_value_2.value) + Number(allowed_property_value.value)
        if (Number(total_value) > Number(property_value.value)){
            allowed_property_value_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_property_value_3(){
    if (allowed_property_value_3.value){
        total_value = Number(allowed_property_value_3.value) + Number(allowed_property_value_2.value) + Number(allowed_property_value.value)
        if (Number(total_value) > Number(property_value.value)){
            allowed_property_value_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_home_loan(){
    if (allowed_home_loan.value) {
        inputValue = allowed_home_loan.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_home_loanError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_home_loanError.textContent = '';
        } else if (Number(inputValue) > Number(home_loan.value)) {
            allowed_home_loanError.textContent = '';
            allowed_home_loan.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_home_loanError.textContent = '';
        }
    } else {
        allowed_home_loanError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_home_loan_2(){
    if (allowed_home_loan_2.value){
        total_value = Number(allowed_home_loan_2.value) + Number(allowed_home_loan.value)
        if (Number(total_value) > Number(home_loan.value)){
            allowed_home_loan_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_home_loan_3(){
    if (allowed_home_loan_3.value){
        total_value = Number(allowed_home_loan_3.value) + Number(allowed_home_loan_2.value) + Number(allowed_home_loan.value)
        if (Number(total_value) > Number(home_loan.value)){
            allowed_home_loan_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_property_value_other(){
    if (allowed_property_value_other.value) {
        inputValue = allowed_property_value_other.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            property_value_otherError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            property_value_otherError.textContent = '';
        } else if (Number(inputValue) > Number(property_value_other.value)) {
            property_value_otherError.textContent = '';
            allowed_property_value_other.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            property_value_otherError.textContent = '';
        }
    } else {
        property_value_otherError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_property_value_other_2(){
    if (allowed_property_value_other_2.value){
        total_value = Number(allowed_property_value_other_2.value) + Number(allowed_property_value_other.value)
        if (Number(total_value) > Number(property_value_other.value)){
            allowed_property_value_other_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_property_value_other_3(){
    if (allowed_property_value_other_3.value){
        total_value = Number(allowed_property_value_other_3.value) + Number(allowed_property_value_other_2.value) + Number(allowed_property_value_other.value)
        if (Number(total_value) > Number(property_value_other.value)){
            allowed_property_value_other_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_other_income_oi(){
    if (allowed_other_income_oi.value) {
        inputValue = allowed_other_income_oi.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_other_income_oiError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_other_income_oiError.textContent = '';
        } else if (Number(inputValue) > Number(other_income_oi.value)) {
            allowed_other_income_oiError.textContent = '';
            allowed_other_income_oi.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_other_income_oiError.textContent = '';
        }
    } else {
        allowed_other_income_oiError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_other_income_oi_2(){
    if (allowed_other_income_oi_2.value){
        total_value = Number(allowed_other_income_oi_2.value) + Number(allowed_other_income_oi.value)
        if (Number(total_value) > Number(other_income_oi.value)){
            allowed_other_income_oi_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_other_income_oi_3(){
    if (allowed_other_income_oi_3.value){
        total_value = Number(allowed_other_income_oi_3.value) + Number(allowed_other_income_oi_2.value) + Number(allowed_other_income_oi.value)
        if (Number(total_value) > Number(other_income_oi.value)){
            allowed_other_income_oi_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_interest_80tta(){
    if (allowed_interest_80tta.value) {
        inputValue = allowed_interest_80tta.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_interest_80ttaError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_interest_80ttaError.textContent = '';
        } else if (Number(inputValue) > Number(interest_80tta.value)) {
            allowed_interest_80ttaError.textContent = '';
            allowed_interest_80tta.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_interest_80ttaError.textContent = '';
        }
    } else {
        allowed_interest_80ttaError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_interest_80tta_2(){
    if (allowed_interest_80tta_2.value){
        total_value = Number(allowed_interest_80tta_2.value) + Number(allowed_interest_80tta.value)
        if (Number(total_value) > Number(interest_80tta.value)){
            allowed_interest_80tta_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}



function validateAllowed_interest_80tta_3(){
    if (allowed_interest_80tta_3.value){
        total_value = Number(allowed_interest_80tta_3.value) + Number(allowed_interest_80tta_2.value) + Number(allowed_interest_80tta.value)
        if (Number(total_value) > Number(interest_80tta.value)){
            allowed_interest_80tta_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

