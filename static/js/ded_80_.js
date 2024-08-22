
var section80dyesbtn = document.getElementById('section80dyes');

var medical_insurance_block = document.getElementById('medical_insurance');

var section80dyes_mip = document.getElementById('section80dyes_mip');
var section80dno_mip = document.getElementById('section80dno_mip');
var section80d_questions = document.getElementById('section80d_questions');
var section80d_file_upload = document.getElementById('section80d_file_upload');

var Section_80ddb = document.getElementById('Section_80ddb');
var section80ddb_questions = document.getElementById('section80ddb_questions');
var file_upload_row_80ddb = document.getElementById('file_upload_row_80ddb');


var selected_illness = document.getElementById('selected_illness');
var radio_buttons_div = document.getElementById('radio_buttons_div');
var citizenship_status = document.getElementById('citizenship_status');
var treatment_value = document.getElementById('treatment_value');
var treatment_valueErrorSpan = document.getElementById('treatment_valueError');

var non_senior_citizenbtn = document.getElementById('non_senior_citizen');
var senior_citizenbtn = document.getElementById('senior_citizen');
var bothbtn = document.getElementById('both');



var section80e = document.getElementById('section80e');
var section_80E_questions = document.getElementById('section_80E_questions');
var file_upload_80E = document.getElementById('file_upload_80E');
var interest_education = document.getElementById('interest_education');
var interest_educationErrorSpan = document.getElementById('interest_educationError');




// forms

var section80d_form = document.getElementById('section80d_form');
var Section_80ddb_form = document.getElementById('Section_80ddb_form');
var section_80E_form = document.getElementById('section_80E_form');


// section1

var medical_insurance_self_mip = document.getElementById('medical_insurance_self_mip');
var medical_insurance_parents_mip = document.getElementById('medical_insurance_parents_mip');
var mediclaim_insurance_parents_mip = document.getElementById('mediclaim_insurance_parents_mip');
var preventive_health_checkup_mip = document.getElementById('preventive_health_checkup_mip');


var medical_insurance_self_mipErrorSpan = document.getElementById('medical_insurance_self_mipError');
var medical_insurance_parents_mipErrorSpan = document.getElementById('medical_insurance_parents_mipError');
var mediclaim_insurance_parents_mipErrorSpan = document.getElementById('mediclaim_insurance_parents_mipError');
var preventive_health_checkup_mipErrorSpan = document.getElementById('preventive_health_checkup_mipError');



function clear_forms() {

    Section_80ddb_form.reset();
    section_80E_form.reset();

    selected_illness.value = null;
    treatment_value.value = null;
    non_senior_citizenbtn.checked = false
    senior_citizenbtn.checked = false
    bothbtn.checked = false

    medical_insurance_self_mip.value = null;
    medical_insurance_parents_mip.value = null;
    mediclaim_insurance_parents_mip.value = null;
    preventive_health_checkup_mip.value = null;

    interest_education.value = null;

    medical_insurance_self_mipErrorSpan.textContent = '';
    medical_insurance_parents_mipErrorSpan.textContent = '';
    mediclaim_insurance_parents_mipErrorSpan.textContent = '';
    preventive_health_checkup_mipErrorSpan.textContent = '';
    treatment_value.readOnly = true;
    treatment_valueErrorSpan.textContent = '';
    interest_educationErrorSpan.textContent = '';
}

function toggleQuestions(section80d) {
    if (section80d == 'yes') {
        medical_insurance_block.style.display = 'block';
        Section_80ddb.style.display = 'flex';
        section80e.style.display = 'flex';
        section80ddb_questions.style.display = 'block';
        section_80E_questions.style.display = 'block';
    } else {
        medical_insurance_block.style.display = 'none';
        section80dno_mip.checked = true;
        section80d_questions.style.display = 'none';
        Section_80ddb.style.display = 'none';
        section80e.style.display = 'none';
        radio_buttons_div.style.display = 'none';
        section80ddb_questions.style.display = 'none';
        section_80E_questions.style.display = 'none';
        section80d_file_upload.style.display = 'none';
        file_upload_row_80ddb.style.display = 'none';
        file_upload_80E.style.display = 'none';
        clear_forms();

        if (localStorage.getItem('formData_80ded')) {
            localStorage.removeItem('formData_80ded');
        }
    
        if (localStorage.getItem('formData_80dediillness')) {
            localStorage.removeItem('formData_80dediillness');
        }
    
        if (localStorage.getItem('formData_80ded_ed')) {
            localStorage.removeItem('formData_80ded_ed');
        }
    }
    save_father_ispan();
    display_save3btn();
    display_submit();
    disable_btns();
}


function section80d_fun(radio) {
    if (radio === "yes") {
        section80d_questions.style.display = "block";

    } else {
        section80d_questions.style.display = "none";
        section80d_file_upload.style.display = 'none';
        medical_insurance_self_mip.value = null;
        medical_insurance_parents_mip.value = null;
        mediclaim_insurance_parents_mip.value = null;
        preventive_health_checkup_mip.value = null;
        medical_insurance_self_mipErrorSpan.textContent = '';
        medical_insurance_parents_mipErrorSpan.textContent = '';
        mediclaim_insurance_parents_mipErrorSpan.textContent = '';
        preventive_health_checkup_mipErrorSpan.textContent = '';

        if (localStorage.getItem('formData_80ded')) {
            localStorage.removeItem('formData_80ded');
        }
    }
    
    save_father_ispan();
    files_display_section_none();
    display_submit();
    disable_btns();
}


function display_80d_file() {
    if (medical_insurance_self_mipErrorSpan.textContent === '' && medical_insurance_parents_mipErrorSpan.textContent === '' &&
        mediclaim_insurance_parents_mipErrorSpan.textContent === '' && preventive_health_checkup_mipErrorSpan.textContent === '') {
        if (medical_insurance_self_mip.value || medical_insurance_parents_mip.value || mediclaim_insurance_parents_mip.value || preventive_health_checkup_mip.value){
            section80d_file_upload.style.display = 'table-row';
        } else {
            section80d_file_upload.style.display = 'none';
        }
    } else {
        section80d_file_upload.style.display = 'none';
    }
    display_submit();
    disable_btns();
}



var medical_insurance_self_mip = document.getElementById('medical_insurance_self_mip');
var preventive_health_checkup_mip = document.getElementById('preventive_health_checkup_mip');
var medical_insurance_parents_mip = document.getElementById('medical_insurance_parents_mip');
var mediclaim_insurance_parents_mip = document.getElementById('mediclaim_insurance_parents_mip');



function validateMedicalInsuranceSelf(){
    if (medical_insurance_self_mip.value){
        if (preventive_health_checkup_mip.value){
            var new_value = 25000 - Number(preventive_health_checkup_mip.value);
            if (Number(medical_insurance_self_mip.value) > Number(new_value)){
                medical_insurance_self_mip.value = Number(new_value)
                alert('The limit for Sum of Mediclaim Insurance for Self/Spouse and Children and Preventive Health Checkup is up to Rs.25,000.')
            }
        } else {
            if (Number(medical_insurance_self_mip.value) > Number(25000)){
                medical_insurance_self_mip.value = Number(25000)
                alert('The limit for Mediclaim Insurance for Self/Spouse is up to Rs.25,000.')
            }
        }
    }
}

function validatePreventiveHealthCheckup(){
    if (preventive_health_checkup_mip.value){
        if (medical_insurance_self_mip.value){
            var new_value = 25000 - Number(medical_insurance_self_mip.value);

            if (5000 >= Number(new_value)){
                if(Number(preventive_health_checkup_mip.value) > Number(new_value)){
                    preventive_health_checkup_mip.value = Number(new_value)
                    alert('The limit for Sum of Mediclaim Insurance for Self/Spouse and Children and Preventive Health Checkup is up to Rs.25,000.')
                }
            } else {
                if(Number(preventive_health_checkup_mip.value) > Number(5000)){
                    preventive_health_checkup_mip.value = Number(5000)
                    alert('The limit for Preventive Health Checkup is up to Rs.5,000.')
                }
            }
        } else {
            if(Number(preventive_health_checkup_mip.value) > Number(5000)){
                preventive_health_checkup_mip.value = Number(5000)
                alert('The limit for Preventive Health Checkup is up to Rs.5,000.')
            }
        }
    }
}


function validateMedicalInsuranceParents(){
    if (medical_insurance_parents_mip.value){
        if (mediclaim_insurance_parents_mip.value){
            var new_value = 50000 - Number(mediclaim_insurance_parents_mip.value);

            if (Number(25000) >= Number(new_value)){
                if (Number(medical_insurance_parents_mip.value) > Number(new_value)){
                    medical_insurance_parents_mip.value = Number(new_value)
                    alert('The limit for Sum of Mediclaim Insurance for  Senior & Non Senior Citizen Parents is up to Rs.50,000.')
                }
            } else {
                if (Number(medical_insurance_parents_mip.value) > Number(25000)){
                    medical_insurance_parents_mip.value = Number(25000)
                    alert('The limit for Mediclaim Insurance for Parents - Non Senior Citizen is up to Rs.25,000.')
                }
            }
        } else {
            if (Number(medical_insurance_parents_mip.value) > Number(25000)){
                medical_insurance_parents_mip.value = Number(25000)
                alert('The limit for Mediclaim Insurance for Parents - Non Senior Citizen is up to Rs.25,000.')
            }
        }
    }
}


function validateMediclaimInsuranceParents(){
    if (mediclaim_insurance_parents_mip.value){
        if (medical_insurance_parents_mip.value){
            var new_value = 50000 - Number(medical_insurance_parents_mip.value);

            if (Number(mediclaim_insurance_parents_mip.value) > Number(new_value)){
                mediclaim_insurance_parents_mip.value = Number(new_value)
                alert('The limit for Sum of Mediclaim Insurance for  Senior & Non Senior Citizen Parents is up to Rs.50,000.')
            }
        } else  {
            if (Number(mediclaim_insurance_parents_mip.value) > Number(50000)){
                mediclaim_insurance_parents_mip.value = Number(50000)
                alert('The limit for Mediclaim Insurance for Parents - Senior Citizen is up to Rs.50,000.')
            }
        }
    }
}










function save_80d_temp() {
    const formData_80ded = {
        medical_insurance_self_mipValue: medical_insurance_self_mip.value,
        medical_insurance_parents_mipValue: medical_insurance_parents_mip.value,
        mediclaim_insurance_parents_mipValue: mediclaim_insurance_parents_mip.value,
        preventive_health_checkup_mipValue: preventive_health_checkup_mip.value,
    };
    const jsonData = JSON.stringify(formData_80ded);
    localStorage.setItem('formData_80ded', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 3;
    }else{
        localStorage.setItem('currentTab', 3)
    }
}



function Upload_80d() {

    save_80d_temp();

    let apiUrl = "upload_80d_file";
    document.getElementById("section80d_form").action = apiUrl;
    document.getElementById("section80d_form").submit();

}





// 80ddb

var medicaltreatmentvalue

function display_file_80DDB() {
    if (selected_illness.value && medicaltreatmentvalue && treatment_value.value && treatment_valueErrorSpan.textContent === '') {
        file_upload_row_80ddb.style.display = 'table-row';
    } else {
        file_upload_row_80ddb.style.display = 'none';
    }
    display_submit();
    disable_btns();
}

function showradiobuttons() {

    if (selected_illness.value) {
        radio_buttons_div.style.display = 'table-row';
    } else {
        radio_buttons_div.style.display = 'none';
        non_senior_citizenbtn.checked = false;
        senior_citizenbtn.checked = false;
        bothbtn.checked = false;
        treatment_value.value = null;
        treatment_value.readOnly = true;
        treatment_valueErrorSpan.textContent = '';
    }
    display_file_80DDB();
}

function validateTreatment_value() {
    if (medicaltreatmentvalue) {
        if (medicaltreatmentvalue === 'non_senior_citizen') {
            if (treatment_value.value) {
                if (!Number.isInteger(Number(treatment_value.value)) || treatment_value.value.includes('.') || Number(treatment_value.value) < 0) {
                    treatment_valueErrorSpan.textContent = 'Please enter positive integer.'
                } else if( Number(treatment_value.value) == 0){
                    treatment_valueErrorSpan.textContent = '';
                }
                else if (Number(treatment_value.value) > 40000) {
                    document.getElementById('treatment_value').value = 40000;
                    treatment_valueErrorSpan.textContent = '';
                    alert('The limit for medical treatment expenses for non-senior citizens is up to Rs.40,000.')
                } else {
                    treatment_valueErrorSpan.textContent = '';
                }
            } else {
                treatment_valueErrorSpan.textContent = '';
            }
        } else {
            if (treatment_value.value) {
                if (!Number.isInteger(Number(treatment_value.value)) || treatment_value.value.includes('.') || Number(treatment_value.value) < 0) {
                    treatment_valueErrorSpan.textContent = 'Please enter positive integer.'
                }else if(Number(treatment_value.value) == 0){
                    treatment_valueErrorSpan.textContent = '';
                }
                 else if (Number(treatment_value.value) > 100000) {
                    document.getElementById('treatment_value').value = 100000;
                    treatment_valueErrorSpan.textContent = '';
                    alert('The limit for medical treatment expenses for either a senior citizen or both is up to Rs.1,00,000.')
                } else {
                    treatment_valueErrorSpan.textContent = '';
                }
            } else {
                treatment_valueErrorSpan.textContent = '';
            }
        }
    }
    display_file_80DDB();
    display_submit();
    disable_btns();
}

function showCitizenshipFields(citizenship_status) {
    if (citizenship_status) {
        medicaltreatmentvalue = citizenship_status;
        treatment_value.readOnly = false;
        validateTreatment_value();
    }
}



function save_80dillness_temp() {

    var citizen_type = null;

    if (non_senior_citizenbtn.checked == true) {
        citizen_type = 'non_senior_citizen'
    } else if (senior_citizenbtn.checked == true) {
        citizen_type = 'senior_citizen'
    } else if (bothbtn.checked == true) {
        citizen_type = 'both'
    }

    const formData_80dediillness = {
        selected_illnessValue: selected_illness.value,
        citizen_typeValue: citizen_type,
        treatment_valueValue: treatment_value.value,
    };
    const jsonData = JSON.stringify(formData_80dediillness);
    localStorage.setItem('formData_80dediillness', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 3;
    }else{
        localStorage.setItem('currentTab', 3)
    }
}




function FileUpload_80ddb() {

    save_80dillness_temp();

    let apiUrl = "upload_80ddb_file";
    document.getElementById("Section_80ddb_form").action = apiUrl;
    document.getElementById("Section_80ddb_form").submit();
}


// 80E


function display_80E_file() {
    if (interest_education.value && interest_educationErrorSpan.textContent === '') {
        file_upload_80E.style.display = 'table-row';
    } else {
        file_upload_80E.style.display = 'none';
    }
    display_submit();
    disable_btns();
}

function validateInterest_education() {
    const convertedText_interest_education = document.getElementById("convertedText_interest_education");
    if (interest_education.value) {
        if (!Number.isInteger(Number(interest_education.value)) || interest_education.value.includes('.') || Number(interest_education.value) < 0) {
            interest_educationErrorSpan.textContent = 'Please enter positive integer.'
            convertedText_interest_education.textContent = '';
        } else if(Number(interest_education.value) == 0){
            interest_educationErrorSpan.textContent = ''
        }
         else {
            interest_educationErrorSpan.textContent = ''
            const amount = parseInt(interest_education.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_interest_education.textContent = `${convertedValue} Rupees Only`;                    
            if (Number(amount) >= 1000000) {                                        
                convertedText_interest_education.style.color = "red";
            } else {                                
                convertedText_interest_education.style.color = ""; // Reset color to default
            }
        }
    } else{
        convertedText_interest_education.textContent = '';
        interest_educationErrorSpan.textContent = '';
    }
    display_80E_file();
}



function save_80Education_temp() {
    const formData_80ded_ed = {
        interest_educationValue: interest_education.value,
    };
    const jsonData = JSON.stringify(formData_80ded_ed);
    localStorage.setItem('formData_80ded_ed', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 3;
    }else{
        localStorage.setItem('currentTab', 3)
    }
}



function FileUpload_80E() {

    save_80Education_temp();

    let apiUrl = "upload_80E_file";
    document.getElementById("section_80E_form").action = apiUrl;
    document.getElementById("section_80E_form").submit();
}






document.addEventListener("DOMContentLoaded", function () {



    const storedData_80ded = localStorage.getItem('formData_80ded');
    if (storedData_80ded) {
        var section80dyesbtn1 = document.getElementById('section80dyes');
        const storedFormData = JSON.parse(storedData_80ded);
        if (storedFormData) {
            medical_insurance_self_mip.value = storedFormData.medical_insurance_self_mipValue;
            medical_insurance_parents_mip.value = storedFormData.medical_insurance_parents_mipValue;
            mediclaim_insurance_parents_mip.value = storedFormData.mediclaim_insurance_parents_mipValue;
            preventive_health_checkup_mip.value = storedFormData.preventive_health_checkup_mipValue;

            section80dyesbtn1.checked = true;
            section80d = 'yes'
            toggleQuestions(section80d);

            section80dyes_mip.checked = true;
            radio1 = 'yes'
            section80d_fun(radio1)
        }
    }

    const storedData_80dediillness = localStorage.getItem('formData_80dediillness');
    if (storedData_80dediillness) {
        var section80dyesbtn1 = document.getElementById('section80dyes');
        var non_senior_citizenbtn = document.getElementById('non_senior_citizen');
        var senior_citizenbtn = document.getElementById('senior_citizen');
        var bothbtn = document.getElementById('both');

        const storedFormData = JSON.parse(storedData_80dediillness);
        if (storedFormData.selected_illnessValue) {
            selected_illness.value = storedFormData.selected_illnessValue;
            showradiobuttons();
            if (storedFormData.citizen_typeValue == 'non_senior_citizen') {
                non_senior_citizenbtn.checked = true;
                checkbox = 'non_senior_citizen'
                showCitizenshipFields(checkbox)
            } else if (storedFormData.citizen_typeValue == 'senior_citizen') {
                senior_citizenbtn.checked = true;
                checkbox = 'senior_citizen'
                showCitizenshipFields(checkbox);
            } else if (storedFormData.citizen_typeValue == 'both') {
                bothbtn.checked = true;
                checkbox = 'both'
                showCitizenshipFields(checkbox);
            }
            treatment_value.value = storedFormData.treatment_valueValue;

            section80dyesbtn1.checked = true;
            section80d = 'yes'
            toggleQuestions(section80d);
        }
    }



    const storedData_80ded_ed = localStorage.getItem('formData_80ded_ed');
    if (storedData_80ded_ed) {
        var section80dyesbtn1 = document.getElementById('section80dyes');
        const storedFormData = JSON.parse(storedData_80ded_ed);
        if (storedFormData) {
            interest_education.value = storedFormData.interest_educationValue;

            section80dyesbtn1.checked = true;
            section80d = 'yes'
            toggleQuestions(section80d);
        }
    }




    var section80dyesbtn = document.getElementById('section80dyes');
    var section80dnobtn = document.getElementById('section80dno');

    if (section80dyesbtn.checked === true) {
        checkbox = 'yes'
        toggleQuestions(checkbox);
    } else {
        checkbox = 'no'
        toggleQuestions(checkbox);
    }

    var section80dyes_mipbtn = document.getElementById('section80dyes_mip');
    var section80dno_mipbtn = document.getElementById('section80dno_mip');

    if (section80dyes_mipbtn.checked === true) {
        checkbox = 'yes'
        section80d_fun(checkbox);
    } else {
        checkbox = 'no'
        section80d_fun(checkbox);
    }

    var non_senior_citizenbtn = document.getElementById('non_senior_citizen');
    var senior_citizenbtn = document.getElementById('senior_citizen');
    var bothbtn = document.getElementById('both');

    if (non_senior_citizenbtn.checked === true) {
        checkbox = 'non_senior_citizen'
        showCitizenshipFields(checkbox);
    } else if (senior_citizenbtn.checked === true) {
        checkbox = 'senior_citizen'
        showCitizenshipFields(checkbox);
    } else if (bothbtn.checked === true) {
        checkbox = 'both'
        showCitizenshipFields(checkbox);
    }


    display_80d_file();
    display_file_80DDB();
    display_80E_file();
    showradiobuttons();
    validateInterest_education();
});