
var dependentQuestion = document.getElementById("dependentDisabilityQuestion");
var selfQuestion = document.getElementById("selfDisabilityQuestion");

var dependentDisabilityFileUpload = document.getElementById("dependentDisability_file");
var selfDisabilityFileUpload = document.getElementById("selfDisability_file");

var paymentDependentDisability = document.getElementById("paymentDependentDisability");
var paymentSelfDisability = document.getElementById("paymentSelfDisability");



function empty_forms() {
    paymentSelfDisability.value = null;
    paymentDependentDisability.value = null;
    dependentDisabilityFileUpload.style.display = 'none';
    selfDisabilityFileUpload.style.display = 'none';
}



function other80udd(value) {
    if (value) {
        if (value === 'self') {
            selfQuestion.style.display = 'table-row';
            paymentDependentDisability.value = null;
            dependentQuestion.style.display = 'none';
            

        } else if (value === 'dependent') {
            dependentQuestion.style.display = 'table-row';
            paymentSelfDisability.value = null;
            selfQuestion.style.display = 'none';
            

        } else if (value === 'both') {
            selfQuestion.style.display = 'table-row';
            dependentQuestion.style.display = 'table-row';
            

        } else {
            dependentQuestion.style.display = 'none';
            selfQuestion.style.display = 'none';
            empty_forms();
            
            if (localStorage.getItem('formData_depend_80dd')) {
                localStorage.removeItem('formData_depend_80dd');
            }
        }
    }
    display_save3btn();
    save_father_ispan();
    files_display_section_none();
    display_submit();    
    disable_btns();
}

function validateDependentDropDown() {
    dependentDisabilityValue = paymentDependentDisability.value;
    if (dependentDisabilityValue === "75000" || dependentDisabilityValue === "125000") {
        dependentDisabilityFileUpload.style.display = "block";
    } else {
        dependentDisabilityFileUpload.style.display = "none";
    }
    // display_submit();
    disable_btns();
}

function validateSelfDropDown() {
    var selfDisabilityValue = paymentSelfDisability.value;
    if (selfDisabilityValue === "75000" || selfDisabilityValue === "125000") {
        selfDisabilityFileUpload.style.display = "block";
    } else {
        selfDisabilityFileUpload.style.display = "none";
    }
    // display_submit();
    disable_btns();
}


function save_depend_80udd() {

    var paymentDependent_value = null
    var paymentSelf_value = null

    if (paymentDependentDisability.value) {
        paymentDependent_value = paymentDependentDisability.value;
    }
    if (paymentSelfDisability.value) {
        paymentSelf_value = paymentSelfDisability.value;
    }

    const formData_depend_80dd = {
        paymentDependentDisabilityValue: paymentDependent_value,
        paymentSelfDisabilityValue: paymentSelf_value,
    };
    const jsonData = JSON.stringify(formData_depend_80dd);
    localStorage.setItem('formData_depend_80dd', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 3;
    }else{
        localStorage.setItem('currentTab', 3)
    }
}

function dependentFileUpload() {

    save_depend_80udd();

    let apiUrl = "upload_80DD_file";
    document.getElementById("_80uddC_form").action = apiUrl;
    document.getElementById("_80uddC_form").submit();
}


function self_FileUpload() {

    save_depend_80udd();

    let apiUrl = "upload_80U_file";
    document.getElementById("_80uddC_form").action = apiUrl;
    document.getElementById("_80uddC_form").submit();
}



document.addEventListener("DOMContentLoaded", function () {




    var section80uddselfbtn = document.getElementById('section80uddself');
    var section80udddependentbtn = document.getElementById('section80udddependent');
    var section80uddbothbtn = document.getElementById('section80uddboth');
    var section80uddnobtn = document.getElementById('section80uddno');

    const storedData_80udd = localStorage.getItem('formData_depend_80dd');
    if (storedData_80udd) {
        const storedFormData = JSON.parse(storedData_80udd);
        if (storedFormData.paymentDependentDisabilityValue && storedFormData.paymentSelfDisabilityValue) {
            paymentDependentDisability.value = storedFormData.paymentDependentDisabilityValue;
            paymentSelfDisability.value = storedFormData.paymentSelfDisabilityValue;
            section80uddbothbtn.checked = true;
            checkbox = 'both'
            other80udd(checkbox);
        } else if (storedFormData.paymentSelfDisabilityValue) {
            paymentSelfDisability.value = storedFormData.paymentSelfDisabilityValue;

            section80uddselfbtn.checked = true;
            checkbox = 'self'
            other80udd(checkbox);
        } else if (storedFormData.paymentDependentDisabilityValue) {
            paymentDependentDisability.value = storedFormData.paymentDependentDisabilityValue;

            section80udddependentbtn.checked = true;
            checkbox = 'dependent'
            other80udd(checkbox);
        }

    }



    if (section80uddselfbtn.checked === true) {
        checkbox = 'self'
        other80udd(checkbox);
    } else if (section80udddependentbtn.checked === true) {
        checkbox = 'dependent'
        other80udd(checkbox);
    } else if (section80uddbothbtn.checked === true) {
        checkbox = 'both'
        other80udd(checkbox);
    } else {
        checkbox = 'no'
        other80udd(checkbox);
    }
    validateDependentDropDown();
    validateSelfDropDown();

});