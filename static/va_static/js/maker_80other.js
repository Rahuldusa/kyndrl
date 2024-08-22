


function validateAllowed_medical_insurance(){
    if (allowed_medical_insurance.value) {
        inputValue = allowed_medical_insurance.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_medical_insuranceError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_medical_insuranceError.textContent = '';
        } else if (Number(inputValue) > Number(medical_insurance_self_mip.value)) {
            allowed_medical_insuranceError.textContent = '';
            allowed_medical_insurance.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_medical_insuranceError.textContent = '';
        }
    } else {
        allowed_medical_insuranceError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_medical_insurance_2(){
    if (allowed_medical_insurance_2.value){
        total_value = Number(allowed_medical_insurance_2.value) + Number(allowed_medical_insurance.value)
        if (Number(total_value) > Number(medical_insurance_self_mip.value)){
            allowed_medical_insurance_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_medical_insurance_3(){
    if (allowed_medical_insurance_3.value){
        total_value = Number(allowed_medical_insurance_3.value) + Number(allowed_medical_insurance_2.value) + Number(allowed_medical_insurance.value)
        if (Number(total_value) > Number(medical_insurance_self_mip.value)){
            allowed_medical_insurance_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_parents_mip_nsn(){
    if (allowed_parents_mip_nsn.value) {
        inputValue = allowed_parents_mip_nsn.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_parents_mip_nsnError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_parents_mip_nsnError.textContent = '';
        } else if (Number(inputValue) > Number(medical_insurance_parents_mip.value)) {
            allowed_parents_mip_nsnError.textContent = '';
            allowed_parents_mip_nsn.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_parents_mip_nsnError.textContent = '';
        }
    } else {
        allowed_parents_mip_nsnError.textContent = '';
    }
    submit_btn_enable();
}



function validateAllowed_parents_mip_nsn_2(){
    if (allowed_parents_mip_nsn_2.value){
        total_value = Number(allowed_parents_mip_nsn_2.value) + Number(allowed_parents_mip_nsn.value)
        if (Number(total_value) > Number(medical_insurance_parents_mip.value)){
            allowed_parents_mip_nsn_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_parents_mip_nsn_3(){
    if (allowed_parents_mip_nsn_3.value){
        total_value = Number(allowed_parents_mip_nsn_3.value) + Number(allowed_parents_mip_nsn_2.value) + Number(allowed_parents_mip_nsn.value)
        if (Number(total_value) > Number(medical_insurance_parents_mip.value)){
            allowed_parents_mip_nsn_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_parents_mip_sn(){
    if (allowed_parents_mip_sn.value) {
        inputValue = allowed_parents_mip_sn.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_parents_mip_snError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_parents_mip_snError.textContent = '';
        } else if (Number(inputValue) > Number(mediclaim_insurance_parents_mip.value)) {
            allowed_parents_mip_snError.textContent = '';
            allowed_parents_mip_sn.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_parents_mip_snError.textContent = '';
        }
    } else {
        allowed_parents_mip_snError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_parents_mip_sn_2(){
    if (allowed_parents_mip_sn_2.value){
        total_value = Number(allowed_parents_mip_sn_2.value) + Number(allowed_parents_mip_sn.value)
        if (Number(total_value) > Number(mediclaim_insurance_parents_mip.value)){
            allowed_parents_mip_sn_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_parents_mip_sn_3(){
    if (allowed_parents_mip_sn_3.value){
        total_value = Number(allowed_parents_mip_sn_3.value) + Number(allowed_parents_mip_sn_2.value) + Number(allowed_parents_mip_sn.value)
        if (Number(total_value) > Number(mediclaim_insurance_parents_mip.value)){
            allowed_parents_mip_sn_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_health_checkup(){
    if (allowed_health_checkup.value) {
        inputValue = allowed_health_checkup.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_health_checkupError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_health_checkupError.textContent = '';
        } else if (Number(inputValue) > Number(preventive_health_checkup_mip.value)) {
            allowed_health_checkupError.textContent = '';
            allowed_health_checkup.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_health_checkupError.textContent = '';
        }
    } else {
        allowed_health_checkupError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_health_checkup_2(){
    if (allowed_health_checkup_2.value){
        total_value = Number(allowed_health_checkup_2.value) + Number(allowed_health_checkup.value)
        if (Number(total_value) > Number(preventive_health_checkup_mip.value)){
            allowed_health_checkup_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_health_checkup_3(){
    if (allowed_health_checkup_3.value){
        total_value = Number(allowed_health_checkup_3.value) + Number(allowed_health_checkup_2.value) + Number(allowed_health_checkup.value)
        if (Number(total_value) > Number(preventive_health_checkup_mip.value)){
            allowed_health_checkup_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_treatment_value(){
    if (allowed_treatment_value.value) {
        inputValue = allowed_treatment_value.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_treatment_valueError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_treatment_valueError.textContent = '';
        } else if (Number(inputValue) > Number(treatment_value.value)) {
            allowed_treatment_valueError.textContent = '';
            allowed_treatment_value.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_treatment_valueError.textContent = '';
        }
    } else {
        allowed_treatment_valueError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_treatment_value_2(){
    if (allowed_treatment_value_2.value){
        total_value = Number(allowed_treatment_value_2.value) + Number(allowed_treatment_value.value)
        if (Number(total_value) > Number(treatment_value.value)){
            allowed_treatment_value_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_treatment_value_3(){
    if (allowed_treatment_value_3.value){
        total_value = Number(allowed_treatment_value_3.value) + Number(allowed_treatment_value_2.value) + Number(allowed_treatment_value.value)
        if (Number(total_value) > Number(treatment_value.value)){
            allowed_treatment_value_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_interest_education(){
    if (allowed_interest_education.value) {
        inputValue = allowed_interest_education.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_interest_educationError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_interest_educationError.textContent = '';
        } else if (Number(inputValue) > Number(interest_education.value)) {
            allowed_interest_educationError.textContent = '';
            allowed_interest_education.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_interest_educationError.textContent = '';
        }
    } else {
        allowed_interest_educationError.textContent = '';
    }
    submit_btn_enable();
}



function validateAllowed_interest_education_2(){
    if (allowed_interest_education_2.value){
        total_value = Number(allowed_interest_education_2.value) + Number(allowed_interest_education.value)
        if (Number(total_value) > Number(interest_education.value)){
            allowed_interest_education_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}



function validateAllowed_interest_education_3(){
    if (allowed_interest_education_3.value){
        total_value = Number(allowed_interest_education_3.value) + Number(allowed_interest_education_2.value) + Number(allowed_interest_education.value)
        if (Number(total_value) > Number(interest_education.value)){
            allowed_interest_education_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_Dependent_dis(){
    if (allowed_Dependent_dis.value) {
        inputValue = allowed_Dependent_dis.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_Dependent_disError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_Dependent_disError.textContent = '';
        } else if (Number(inputValue) > Number(paymentDependentDisability.value)) {
            allowed_Dependent_disError.textContent = '';
            allowed_Dependent_dis.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_Dependent_disError.textContent = '';
        }
    } else {
        allowed_Dependent_disError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_Dependent_dis_2(){
    if (allowed_Dependent_dis_2.value){
        total_value = Number(allowed_Dependent_dis_2.value) + Number(allowed_Dependent_dis.value)
        if (Number(total_value) > Number(paymentDependentDisability.value)){
            allowed_Dependent_dis_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_Dependent_dis_3(){
    if (allowed_Dependent_dis_3.value){
        total_value = Number(allowed_Dependent_dis_3.value) + Number(allowed_Dependent_dis_2.value) + Number(allowed_Dependent_dis.value)
        if (Number(total_value) > Number(paymentDependentDisability.value)){
            allowed_Dependent_dis_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_self_disn(){
    if (allowed_self_dis.value) {
        inputValue = allowed_self_dis.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_self_disError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_self_disError.textContent = '';
        } else if (Number(inputValue) > Number(paymentSelfDisability.value)) {
            allowed_self_disError.textContent = '';
            allowed_self_dis.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_self_disError.textContent = '';
        }
    } else {
        allowed_self_disError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_self_dis_2(){
    if (allowed_self_dis_2.value){
        total_value = Number(allowed_self_dis_2.value) + Number(allowed_self_dis.value)
        if (Number(total_value) > Number(paymentSelfDisability.value)){
            allowed_self_dis_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_self_dis_3(){
    if (allowed_self_dis_3.value){
        total_value = Number(allowed_self_dis_3.value) + Number(allowed_self_dis_2.value) + Number(allowed_self_dis.value)
        if (Number(total_value) > Number(paymentSelfDisability.value)){
            allowed_self_dis_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllowed_vehicle_value(){
    if (allowed_vehicle_value.value) {
        inputValue = allowed_vehicle_value.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_vehicle_valueError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_vehicle_valueError.textContent = '';
        } else if (Number(inputValue) > Number(vehicle_loan_80eeb.value)) {
            allowed_vehicle_valueError.textContent = '';
            allowed_vehicle_value.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_vehicle_valueError.textContent = '';
        }
    } else {
        allowed_vehicle_valueError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_vehicle_value_2(){
    if (allowed_vehicle_value_2.value){
        total_value = Number(allowed_vehicle_value_2.value) + Number(allowed_vehicle_value.value)
        if (Number(total_value) > Number(vehicle_loan_80eeb.value)){
            allowed_vehicle_value_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_vehicle_value_3(){
    if (allowed_vehicle_value_3.value){
        total_value = Number(allowed_vehicle_value_3.value) + Number(allowed_vehicle_value_2.value) + Number(allowed_vehicle_value.value)
        if (Number(total_value) > Number(vehicle_loan_80eeb.value)){
            allowed_vehicle_value_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllowed_nps_80ccd1b(){
    if (allowed_nps_80ccd1b.value) {
        inputValue = allowed_nps_80ccd1b.value;
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allowed_nps_80ccd1bError.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allowed_nps_80ccd1bError.textContent = '';
        } else if (Number(inputValue) > Number(nps_80ccd1b.value)) {
            allowed_nps_80ccd1bError.textContent = '';
            allowed_nps_80ccd1b.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allowed_nps_80ccd1bError.textContent = '';
        }
    } else {
        allowed_nps_80ccd1bError.textContent = '';
    }
    submit_btn_enable();
}


function validateAllowed_nps_80ccd1b_2(){
    if (allowed_nps_80ccd1b_2.value){
        total_value = Number(allowed_nps_80ccd1b_2.value) + Number(allowed_nps_80ccd1b.value)
        if (Number(total_value) > Number(nps_80ccd1b.value)){
            allowed_nps_80ccd1b_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllowed_nps_80ccd1b_3(){
    if (allowed_nps_80ccd1b_3.value){
        total_value = Number(allowed_nps_80ccd1b_3.value) + Number(allowed_nps_80ccd1b_2.value) + Number(allowed_nps_80ccd1b.value)
        if (Number(total_value) > Number(nps_80ccd1b.value)){
            allowed_nps_80ccd1b_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}