

var section80ccdebpcheck = document.getElementById('section80ccdebp');
var section80ccdselfcheck = document.getElementById('section80ccdself');
var Inp_80ccd1bnps = document.getElementById('80ccd1bnps');
var prannumberInp = document.getElementById('prannumber');

var Inp_80ccd1bnpsErrorSpan = document.getElementById('80ccd1bnpsError');
var prannumberErrorSpan = document.getElementById('prannumberError');



function make_values_empty_80ccb() {
    Inp_80ccd1bnps.value = null;
    prannumberInp.value = null;
    Inp_80ccd1bnps.disabled = true;
    prannumberInp.disabled = true;
    Inp_80ccd1bnpsErrorSpan.textContent = '';
    prannumberErrorSpan.textContent = '';
    // document.getElementById('prannumber1').style.display = 'none'; // Hide PRAN number upload
    document.getElementById('80ccd1bnps1').style.display = 'none'; // Hide contribution upload
}

function make_values_empty_80ccb1() {
    section80ccdebpcheck.checked = false;
    section80ccdselfcheck.checked = false;
    Inp_80ccd1bnps.value = null;
    prannumberInp.value = null;
    Inp_80ccd1bnps.disabled = true;
    prannumberInp.disabled = true;
    Inp_80ccd1bnpsErrorSpan.textContent = '';
    prannumberErrorSpan.textContent = '';
    // document.getElementById('prannumber1').style.display = 'none'; // Hide PRAN number upload
    document.getElementById('80ccd1bnps1').style.display = 'none'; // Hide contribution upload
}

function other80ccd1b(value) {    
    var additionalQuestionsContainer = document.getElementById('section80ccd_questions');
    if (value === 'yes') {
        additionalQuestionsContainer.style.display = 'block';
        
    } else {
        additionalQuestionsContainer.style.display = 'none';
        document.getElementById('80ccd1bnps1').style.display = 'none'        
        make_values_empty_80ccb1();

        if (localStorage.getItem('formData_80ccd1b')) {
            localStorage.removeItem('formData_80ccd1b');
        }
    
    }
    display_save3btn();
    save_father_ispan();
    files_display_section_none();
    display_submit();    
    disable_btns();
}


function display_80ccd1bnps1() {
    if (section80ccdselfcheck.checked == true && Inp_80ccd1bnps.value &&
        Inp_80ccd1bnpsErrorSpan.textContent === '' && prannumberErrorSpan.textContent === '') {
        document.getElementById('80ccd1bnps1').style.display = 'block';
    } else {
        document.getElementById('80ccd1bnps1').style.display = 'none'
    }
    display_submit();
    disable_btns();
}

function validateNumberField13() { 
    var inputValue = Inp_80ccd1bnps.value;
    var errorSpan = Inp_80ccd1bnpsErrorSpan;
    
    var maxLimit = 50000;

    if (inputValue === "") {
        errorSpan.textContent = "";
        display_80ccd1bnps1();
        return;
    }
    if (isNaN(inputValue) || parseFloat(inputValue) < 0 || inputValue.includes('.')) {
        errorSpan.textContent = "Please enter a positive integer value.";
        display_80ccd1bnps1();
        return;
    }
    if (parseFloat(inputValue) > maxLimit) {
        Inp_80ccd1bnps.value = maxLimit        
        alert('The limit for Deduction for Self-contribution to Pension Account is up to Rs. 50,000.')
        display_80ccd1bnps1();
        return;
    }
    
    errorSpan.textContent = "";
    display_80ccd1bnps1();
    
}

function validateNumberField14() {
    var inputValue = prannumberInp.value;
    var errorSpan = prannumberErrorSpan;

    if (inputValue) {
        if (inputValue.length !== 12) {
            errorSpan.textContent = "PRAN number should be exactly 12 digits.";
        } else {
            errorSpan.textContent = "";
        }
    } else {
        errorSpan.textContent = '';
    }
    display_80ccd1bnps1();
    
}

function other(value) {
    var contributionField = document.getElementById('80ccd1bnps');
    var pranNumberField = document.getElementById('prannumber');

    if (value === 'self') {
        contributionField.disabled = false;
        pranNumberField.disabled = false;

    } else if (value === 'contribution') {
        contributionField.disabled = true; // Disable contribution field
        pranNumberField.disabled = true; // Disable PRAN number field
        alert("It will be directly considered from payroll")
        make_values_empty_80ccb();
    } else {
        contributionField.disabled = true;
        pranNumberField.disabled = true;
    }
    display_80ccd1bnps1();
    
}


function other_1(value) {
    var contributionField = document.getElementById('80ccd1bnps');
    var pranNumberField = document.getElementById('prannumber');

    if (value === 'self') {
        contributionField.disabled = false;
        pranNumberField.disabled = false;

    } else if (value === 'contribution') {
        contributionField.disabled = true; // Disable contribution field
        pranNumberField.disabled = true; // Disable PRAN number field        
        make_values_empty_80ccb();
    } else {
        contributionField.disabled = true;
        pranNumberField.disabled = true;
    }
    display_80ccd1bnps1();
    
}

function submit_80ccd1b_file() {


    var type_80ccd1b = null

    
    if (section80ccdebpcheck.checked == true){
        type_80ccd1b = 'contribution';
    } else if (section80ccdselfcheck.checked == true){
        type_80ccd1b = 'self'
    }
    const formData_80ccd1b = {
        type_80ccd1bValue: type_80ccd1b,
        Inp_80ccd1bnpsValue: Inp_80ccd1bnps.value,
        prannumberInpValue: prannumberInp.value,

    };    
    const jsonData = JSON.stringify(formData_80ccd1b);    
    localStorage.setItem('formData_80ccd1b', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 3;
    }else{
        localStorage.setItem('currentTab', 3)
    }



    let apiUrl = "upload_80ccd1b_file";
    document.getElementById("80ccd1b").action = apiUrl;    
    document.getElementById("80ccd1b").submit();
}



document.addEventListener("DOMContentLoaded", function () {
    var section80ccdyesbtn = document.getElementById('section80ccdyes');
    var section80ccdnobtn = document.getElementById('section80ccdno');

    var section80ccdebp = document.getElementById('section80ccdebp');
    var section80ccdselfbtn = document.getElementById('section80ccdself');


    const storedData_80ccd1b = localStorage.getItem('formData_80ccd1b');
    if (storedData_80ccd1b) {        
        const storedFormData = JSON.parse(storedData_80ccd1b);            
        if(storedFormData){   
            
            
            section80ccdyesbtn.checked = true;
            checkbox = 'yes'
            other80ccd1b(checkbox);
            
            if (storedFormData.type_80ccd1bValue == 'contribution'){
                section80ccdyesbtn.checked = true;
                checkbox1 = 'contribution'
                other_1(checkbox1);
            } else if (storedFormData.type_80ccd1bValue == 'self'){
                section80ccdselfbtn.checked = true;
                checkbox1 = 'self'
                other_1(checkbox1);
                
                Inp_80ccd1bnps.value = storedFormData.Inp_80ccd1bnpsValue;
                prannumberInp.value = storedFormData.prannumberInpValue;
            }
            
            
        }
    }


    if (section80ccdyesbtn.checked === true) {
        checkbox = 'yes'
        other80ccd1b(checkbox);
    } else {
        checkbox = 'no'
        other80ccd1b(checkbox);
    }    

    
    if (section80ccdebp.checked === true) {
        checkbox = 'contribution'
        other_1(checkbox);
    }else if (section80ccdselfbtn.checked === true) {
        checkbox = 'self'
        other_1(checkbox);
    }    

    validateSanctionedDate_80eeb();
});

