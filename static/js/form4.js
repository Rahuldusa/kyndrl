
var regimeValue = String(regimeValue);

// Set the minimum date to the current date
var currentDate = new Date();
var formattedCurrentDate = currentDate.toISOString().split('T')[0];

if (regimeValue == 'Old') {
    document.getElementById('loansanctiondate').max = formattedCurrentDate;
}




var selfinsurance = document.getElementById('selfinsurance');
var checkup = document.getElementById('checkup');
var parantinsurance1 = document.getElementById('parantinsurance1'); //25000
var parantinsurance2 = document.getElementById('parantinsurance2');



function validateSelfInsurance(){
    if (selfinsurance.value){
        if (checkup.value){
            var new_value = 25000 - Number(checkup.value);
            if (Number(selfinsurance.value) > Number(new_value)){
                selfinsurance.value = Number(new_value)
            }
        } else {
            if (Number(selfinsurance.value) > Number(25000)){
                selfinsurance.value = Number(25000)
            }
        }
    }
}

function validateCheckup(){
    if (checkup.value){
        if (selfinsurance.value){
            var new_value = 25000 - Number(selfinsurance.value);

            if (5000 >= Number(new_value)){
                if(Number(checkup.value) > Number(new_value)){
                    checkup.value = Number(new_value)
                }
            } else {
                if(Number(checkup.value) > Number(5000)){
                    checkup.value = Number(5000)
                }
            }
        } else {
            if(Number(checkup.value) > Number(5000)){
                checkup.value = Number(5000)
            }
        }
    }
}

function validateParantInsurance1(){
    if (parantinsurance1.value){
        if (parantinsurance2.value){
            var new_value = 50000 - Number(parantinsurance2.value);

            if (Number(25000) >= Number(new_value)){
                if (Number(parantinsurance1.value) > Number(new_value)){
                    parantinsurance1.value = Number(new_value)
                }
            } else {
                if (Number(parantinsurance1.value) > Number(25000)){
                    parantinsurance1.value = Number(25000)
                }
            }
        } else {
            if (Number(parantinsurance1.value) > Number(25000)){
                parantinsurance1.value = Number(25000)
            }
        }
    }
}

function validateParantInsurance2(){
    if (parantinsurance2.value){
        if (parantinsurance1.value){
            var new_value = 50000 - Number(parantinsurance1.value);

            if (Number(parantinsurance2.value) > Number(new_value)){
                parantinsurance2.value = Number(new_value)
            }
        } else  {
            if (Number(parantinsurance2.value) > Number(50000)){
                parantinsurance2.value = Number(50000)
            }
        }
    }
}



function validateEducationInterest() {
    var educationinterestValue = document.getElementById('educationinterest').value;
    var educationinterestErrorSpan = document.getElementById('educationinterestError');

    const convertedText_educationinterest = document.getElementById("convertedText_educationinterest");

    if (educationinterestValue) {
        if (!Number.isInteger(Number(educationinterestValue)) || Number(educationinterestValue) < 0) {
            document.getElementById('savebtn4').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            educationinterestErrorSpan.textContent = 'Educational loan interest value must be positive integer number.'
            convertedText_educationinterest.textContent = '';
        } else if (Number(educationinterestValue) == 0) {
            convertedText_educationinterest.textContent = '';
        } else {
            // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
            document.getElementById('savebtn4').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            educationinterestErrorSpan.textContent = ''

            const amount = parseInt(educationinterestValue);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_educationinterest.textContent = `${convertedValue} Rupees Only`;
            // Apply red color if amount is greater than 1000000
            if (amount >= 1000000) {
                convertedText_educationinterest.style.color = "red";
            } else {
                convertedText_educationinterest.style.color = "";
            }

        }
    } else {
        document.getElementById('savebtn4').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        educationinterestErrorSpan.textContent = ''
        convertedText_educationinterest.textContent = '';
    }

}





function uploadEducation_file() {    

    var selfinsurance = document.getElementById('selfinsurance')
    var parantinsurance1 = document.getElementById('parantinsurance1')
    var parantinsurance2 = document.getElementById('parantinsurance2')
    var checkup = document.getElementById('checkup')
    
    var illnesstype = document.getElementById('illnesstype')
    var nonseniorcitizen = document.getElementById('nonseniorcitizen')
    var seniorcitizen = document.getElementById('seniorcitizen')
    var bothcitizen = document.getElementById('bothcitizen')
    var medicaltreatmentinput = document.getElementById('medicaltreatmentinput')
   
    var education_file = document.getElementById('education_file')

    var education_loan_dt = document.getElementById('education_loan_dt')
    var educationinterest = document.getElementById('educationinterest')
    
    var handicaped = document.getElementById('handicaped')
    var dependhandicape = document.getElementById('dependhandicape')
    
    var loansanctiondate = document.getElementById('loansanctiondate')
    var carinterest = document.getElementById('carinterest')
    
    var ccd80 = document.getElementById('ccd80')
    var prannumb = document.getElementById('prannumb')

    var ill_ness_check = null;

    if (nonseniorcitizen.checked == true){
        ill_ness_check = 'nonseniorcitizen'
    } else if (seniorcitizen.checked == true){
        ill_ness_check = 'seniorcitizen'
    } else if (bothcitizen.checked == true){
        ill_ness_check = 'bothcitizen'
    } 


    const formData_80d = {
        selfinsurance: selfinsurance.value,
        parantinsurance1: parantinsurance1.value,
        parantinsurance2: parantinsurance2.value,
        checkup: checkup.value,

        illnesstype: illnesstype.value,
        ill_ness_check: ill_ness_check,
        medicaltreatmentinput: medicaltreatmentinput.value,

        education_loan_dt: education_loan_dt.value,
        educationinterest: educationinterest.value,
        
        handicaped: handicaped.value,
        dependhandicape: dependhandicape.value,

        loansanctiondate: loansanctiondate.value,
        carinterest: carinterest.value,

        ccd80: ccd80.value,
        prannumb: prannumb.value
    };
    const jsonData = JSON.stringify(formData_80d);
    localStorage.setItem('formData_80d', jsonData);    


    let apiUrl = "upload_education_file";
    document.getElementById("form4").action = apiUrl;
    document.getElementById("form4").submit();
}



function makeFieldsReadonlyFor80EEB() {

    var tableElement = document.getElementById('80EEB');

    tableElement.style.opacity = '0.5'; // You can adjust the opacity as needed

    document.getElementById('A80EEBError').textContent = 'You are not eligible for 80EEB'

    // document.getElementById('vehicletype').value = '';
    // document.getElementById('loansanctiondate').disabled = true;
    document.getElementById('loansanctiondate').value = '';
    document.getElementById('carinterest').disabled = true;
    document.getElementById('carinterest').value = '';
}


function enablefieldsfor80EEB() {

    var tableElement = document.getElementById('80EEB');

    tableElement.style.opacity = '1'; // You can adjust the opacity as needed
    document.getElementById('A80EEBError').textContent = ''

    document.getElementById('loansanctiondate').disabled = false;
    document.getElementById('carinterest').disabled = false;
}



function validateCarInterest() {
    var carinterestValue = document.getElementById('carinterest').value;
    var carinterestErrorSpan = document.getElementById('carinterestError');

    if (carinterestValue) {
        if (!Number.isInteger(Number(carinterestValue)) || Number(carinterestValue) < 0) {
            document.getElementById('savebtn4').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            carinterestErrorSpan.textContent = 'Car interest interest value must be positive integer number.'

        } else {
            document.getElementById('savebtn4').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            carinterestErrorSpan.textContent = ''

        }
    } else {
        document.getElementById('savebtn4').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        carinterestErrorSpan.textContent = ''

    }
}


function validateLoanSanctionDate() {
    
    var loansanctiondateValue = document.getElementById('loansanctiondate').value;
    var selectedDate = new Date(loansanctiondateValue);
    var financialYearStart = new Date(2019, 3, 1); // 
    var financialYearEnd = new Date(2023, 2, 31);   // 

    var pdfUrl = document.getElementById('pdf-url-80eeb').getAttribute('data-pdf-url');

    if (selectedDate) {
        if (selectedDate <= financialYearStart || selectedDate >= financialYearEnd) {
            var message = "";
            message += "You are not eligible for 80EEB" + "<br>";
            message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

            // Display the message in the modal
            document.getElementById('80EEBmessage').innerHTML = message;
            $('#80EEBmodal').modal('show');

            makeFieldsReadonlyFor80EEB();

        } else {
            enablefieldsfor80EEB();
        }
    } else {
        enablefieldsfor80EEB();
    }
}


function validateCc80() {

    var ccd80Value = document.getElementById('ccd80').value;
    var ccd80ErrorSpan = document.getElementById('ccd80Error');

    if (ccd80Value) {
        if (!Number.isInteger(Number(ccd80Value)) || Number(ccd80Value) < 0) {
            document.getElementById('savebtn4').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            ccd80ErrorSpan.textContent = 'Deduction for Self-contribution to Pension Account (NPS) value must be positive integer number.'

        } else if (ccd80Value > 50000) {
            document.getElementById('ccd80').value = 50000;
            document.getElementById('savebtn4').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            ccd80ErrorSpan.textContent = ''

        } else {
            // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
            document.getElementById('savebtn4').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            ccd80ErrorSpan.textContent = ''

        }
    } else {
        document.getElementById('savebtn4').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        ccd80ErrorSpan.textContent = ''

    }

}

function cancelForm4() {
    medicaltreatmentvalue = '';
}

function validatePrannum() {
    var prannumbValue = document.getElementById('prannumb').value;
    var prannumbErrorSpan = document.getElementById('prannumbError');

    if (prannumbValue) {
        if (prannumbValue.length > 12 || prannumbValue.length < 12) {
            document.getElementById('savebtn4').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            prannumbErrorSpan.textContent = 'PRAN value must be exactly 12 characters long.'

        } else {
            document.getElementById('savebtn4').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            prannumbErrorSpan.textContent = ''

        }
    } else {
        document.getElementById('savebtn4').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        prannumbErrorSpan.textContent = ''

    }
}







var medicaltreatmentvalue


function MedicalTreatment(medicaltreatment) {

    medicaltreatmentvalue = medicaltreatment
    document.getElementById('medicaltreatmentinput').readOnly = false;
    var medicaltreatmentinputvalue = document.getElementById('medicaltreatmentinput').value;
    var medicaltreatmentinputErrorSpan = document.getElementById('medicaltreatmentinputError');

    if (medicaltreatmentvalue) {
        if (medicaltreatmentvalue == 'nonseniorcitizen') {
            if (Number(medicaltreatmentinputvalue) > 40000) {
                document.getElementById('medicaltreatmentinput').value = 40000;
                document.getElementById('savebtn4').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                medicaltreatmentinputErrorSpan.textContent = 'Medical treatment value must be less than or equal to 40000.'
            } else {
                document.getElementById('savebtn4').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                medicaltreatmentinputErrorSpan.textContent = '';
            }
        } else {
            if (Number(medicaltreatmentinputvalue) > 100000) {
                document.getElementById('medicaltreatmentinput').value = 100000;
                document.getElementById('savebtn4').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                medicaltreatmentinputErrorSpan.textContent = 'Medical treatment value must be less than or equal to 100000.'
            } else {
                document.getElementById('savebtn4').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                medicaltreatmentinputErrorSpan.textContent = '';
            }
        }

    } else {
        document.getElementById('medicaltreatmentinput').readOnly = true;
    }
}


function validateMedicalTreatment() {
    var medicaltreatmentinputvalue = document.getElementById('medicaltreatmentinput').value;
    var medicaltreatmentinputErrorSpan = document.getElementById('medicaltreatmentinputError');

    if (medicaltreatmentvalue) {
        if (medicaltreatmentvalue == 'nonseniorcitizen') {
            if (medicaltreatmentinputvalue) {
                if (!Number.isInteger(Number(medicaltreatmentinputvalue)) || Number(medicaltreatmentinputvalue) < 0) {
                    document.getElementById('savebtn4').disabled = true;
                    document.getElementById('PreviewSubmit').disabled = true;
                    medicaltreatmentinputErrorSpan.textContent = 'Medical treatment value must be positive integer number.'
                } else if (Number(medicaltreatmentinputvalue) > 40000) {
                    document.getElementById('medicaltreatmentinput').value = 40000;
                    document.getElementById('savebtn4').disabled = false;
                    document.getElementById('PreviewSubmit').disabled = false;
                    medicaltreatmentinputErrorSpan.textContent = 'Medical treatment value must be less than or equal to 40000.'
                } else {
                    // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
                    document.getElementById('savebtn4').disabled = false;
                    document.getElementById('PreviewSubmit').disabled = false;
                    medicaltreatmentinputErrorSpan.textContent = ''
                }
            } else {
                // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
                document.getElementById('savebtn4').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                medicaltreatmentinputErrorSpan.textContent = ''
            }
        } else {
            if (medicaltreatmentinputvalue) {
                if (!Number.isInteger(Number(medicaltreatmentinputvalue)) || Number(medicaltreatmentinputvalue) < 0) {
                    document.getElementById('savebtn4').disabled = true;
                    document.getElementById('PreviewSubmit').disabled = true;
                    medicaltreatmentinputErrorSpan.textContent = 'Medical treatment value must be positive integer number.'
                } else if (Number(medicaltreatmentinputvalue) > 100000) {
                    document.getElementById('medicaltreatmentinput').value = 100000;
                    document.getElementById('savebtn4').disabled = false;
                    document.getElementById('PreviewSubmit').disabled = false;
                    medicaltreatmentinputErrorSpan.textContent = 'Medical treatment value must be less than or equal to 100000.'
                } else {
                    // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
                    document.getElementById('savebtn4').disabled = false;
                    document.getElementById('PreviewSubmit').disabled = false;
                    medicaltreatmentinputErrorSpan.textContent = ''
                }
            } else {
                // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
                document.getElementById('savebtn4').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                medicaltreatmentinputErrorSpan.textContent = ''
            }

        }
    } else {
        document.getElementById('medicaltreatmentinput').readOnly = true;
    }

}

var education_loan_dt = document.getElementById('education_loan_dt');

var currentDate_1 = new Date();
var formattedCurrentDate_1 = currentDate_1.toISOString().split('T')[0];
document.getElementById('education_loan_dt').max = formattedCurrentDate_1;

function ValidateEducation_loan_dt() {

    if (education_loan_dt.value) {
        var inputDateValue = education_loan_dt.value;
        var inputDate = new Date(inputDateValue);

        var currentDate = new Date();
        if (inputDate > currentDate) {
            education_loan_dt.value = null;
            alert('selected date must not be future date.')
        }
    }
}

function validateillnesstype() {
    var illnesstypeValue = document.getElementById('illnesstype').value;
    var medicaltreatmentsect = document.getElementById('medicaltreatmentsect');

    var nonseniorcitizen = document.getElementById('nonseniorcitizen');
    var seniorcitizen = document.getElementById('seniorcitizen');
    var bothcitizen = document.getElementById('bothcitizen');

    var medicaltreatmentinputValue = document.getElementById('medicaltreatmentinput');


    if (illnesstypeValue) {
        medicaltreatmentsect.style.display = 'table-row';
    } else {
        medicaltreatmentsect.style.display = 'none';
        nonseniorcitizen.checked = false;
        seniorcitizen.checked = false;
        bothcitizen.checked = false;
        medicaltreatmentinputValue.value = null;
        medicaltreatmentinputValue.readOnly = true;
    }
}


function temp_Other_fun(){
    
    if (localStorage.getItem('formData_80d')) {
        localStorage.removeItem('formData_80d');
    }

    let apiUrl = "temp_Other";
    document.getElementById("form4").action = apiUrl;
    document.getElementById("form4").submit();
}

if (regimeValue == 'Old') {

    document.addEventListener("DOMContentLoaded", function () {
        validateillnesstype();

        var nonseniorcitizen = document.getElementById('nonseniorcitizen');
        var seniorcitizen = document.getElementById('seniorcitizen');
        var bothcitizen = document.getElementById('bothcitizen');

        if (nonseniorcitizen.checked == true) {
            medicaltreatmentvalue = 'nonseniorcitizen';
            document.getElementById('medicaltreatmentinput').readOnly = false;
            validateMedicalTreatment();
        } else if (seniorcitizen.checked == true) {
            medicaltreatmentvalue = 'seniorcitizen';
            document.getElementById('medicaltreatmentinput').readOnly = false;
            validateMedicalTreatment();
        } else if (bothcitizen.checked == true) {
            medicaltreatmentvalue = 'bothcitizen';
            document.getElementById('medicaltreatmentinput').readOnly = false;
            validateMedicalTreatment();
        }

                
        if (document.getElementById('educationinterest').value){
            validateEducationInterest();
        }

        var selfinsuranceValue = document.getElementById('selfinsurance');
        if (selfinsuranceValue.value){
            validateSelfInsurance();
        }


    });




    const formData_80d = localStorage.getItem('formData_80d');
    if (formData_80d) {
        const storedFormData = JSON.parse(formData_80d);        

        var selfinsurance = document.getElementById('selfinsurance')
        var parantinsurance1 = document.getElementById('parantinsurance1')
        var parantinsurance2 = document.getElementById('parantinsurance2')
        var checkup = document.getElementById('checkup')
        
        var illnesstype = document.getElementById('illnesstype')
        var nonseniorcitizen = document.getElementById('nonseniorcitizen')
        var seniorcitizen = document.getElementById('seniorcitizen')
        var bothcitizen = document.getElementById('bothcitizen')
        var medicaltreatmentinput = document.getElementById('medicaltreatmentinput')
    
        var education_file = document.getElementById('education_file')

        var education_loan_dt = document.getElementById('education_loan_dt')
        var educationinterest = document.getElementById('educationinterest')
        
        var handicaped = document.getElementById('handicaped')
        var dependhandicape = document.getElementById('dependhandicape')
        
        var loansanctiondate = document.getElementById('loansanctiondate')
        var carinterest = document.getElementById('carinterest')
        
        var ccd80 = document.getElementById('ccd80')
        var prannumb = document.getElementById('prannumb')

        var ill_ness_check = null;


        selfinsurance.value = storedFormData.selfinsurance;
        parantinsurance1.value = storedFormData.parantinsurance1;
        parantinsurance2.value = storedFormData.parantinsurance2;
        checkup.value = storedFormData.checkup;
        
        illnesstype.value = storedFormData.illnesstype;
        ill_ness_check = storedFormData.ill_ness_check;

        if (ill_ness_check == 'nonseniorcitizen'){
            nonseniorcitizen.checked = true
        } else if (ill_ness_check == 'seniorcitizen'){
            seniorcitizen.checked = true
        } else if (ill_ness_check == 'bothcitizen'){
            bothcitizen.checked = true
        }
        medicaltreatmentinput.value = storedFormData.medicaltreatmentinput;


        education_loan_dt.value = storedFormData.education_loan_dt;
        educationinterest.value = storedFormData.educationinterest;

        handicaped.value = storedFormData.handicaped;
        dependhandicape.value = storedFormData.dependhandicape;
        
        loansanctiondate.value = storedFormData.loansanctiondate;
        carinterest.value = storedFormData.carinterest;

        ccd80.value = storedFormData.ccd80;
        prannumb.value = storedFormData.prannumb;
                    
    }
}

