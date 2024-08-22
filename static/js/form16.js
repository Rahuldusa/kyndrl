


// var financialYearStart = new Date(2024, 3, 1); // April 1st, 2023
// var financialYearEnd = new Date(2025, 2, 31); 
empStartDate

var regimeValue = String(regimeValue);

var empStartDate = new Date(empDoj);



var currentDate = new Date();
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


var declaration_section1 = document.getElementById('declaration_section1');
var declaration_section2 = document.getElementById('declaration_section2');
var no_declaration = document.getElementById('no_declaration');

var new_empStartDate = new Date(empStartDate.getFullYear(), empStartDate.getMonth() + 1, 18);
var new_financialYearStart = new Date(financialYearStart.getFullYear(), financialYearStart.getMonth(), 18);





document.addEventListener("DOMContentLoaded", function () {

    if (empStartDate >= financialYearStart && financialYearEnd >= empStartDate) {
        if (new_empStartDate >= currentDate) {
            declaration_section1.style.display = 'block';
            declaration_section2.style.display = 'block';
            no_declaration.style.display = 'none';
        } else {
            declaration_section1.style.display = 'none';
            declaration_section2.style.display = 'none';
            no_declaration.style.display = 'block';
        }
    } else if (financialYearStart >= empStartDate) {
        if (new_financialYearStart >= currentDate) {
            declaration_section1.style.display = 'block';
            declaration_section2.style.display = 'block';
            no_declaration.style.display = 'none';
        } else {
            declaration_section1.style.display = 'none';
            declaration_section2.style.display = 'none';
            no_declaration.style.display = 'block';
        }
    }

});


document.addEventListener("DOMContentLoaded", function () {
    var currentForm = getCookie('currentForm');

    if (currentForm) {
        showForm(currentForm);
    } else {
        // Display the Car Declarations form by default
        showForm('carDeclarations');
    }
});

function showForm(formId) {
    // Remove the 'active-nav-link' class from all nav links
    document.querySelectorAll('.nav-link').forEach(function (navLink) {
        navLink.classList.remove('active-nav-link');
    });

    // Add the 'active-nav-link' class to the clicked nav link
    var clickedNavLink = document.querySelector('[onclick="showForm(\'' + formId + '\')"]');
    clickedNavLink.classList.add('active-nav-link');

    // Remove 'active-nav-link' class from the parent li if it's inside a dropdown
    var parentLi = clickedNavLink.closest('.dropdown');
    if (parentLi) {
        parentLi.classList.remove('active-nav-link');
    }

    // Hide all forms
    document.querySelectorAll('.form').forEach(function (form) {
        form.style.display = 'none';
    });

    // Show the selected form
    document.getElementById(formId + 'Form').style.display = 'block';

    // Get the current form from the cookie
    var currentForm = getCookie('currentForm');

    // Update the cookie to store the current form
    setCookie('currentForm', formId, 1); // Expires in 1 day

    // Hide or show the preview button based on the current form
    var previewButton1
    var New_Submitbtn
    if (regimeValue == 'Old') {
        var previewButton1 = document.getElementById('PreviewSubmit');
    }
    if (regimeValue == 'New') {
        var New_Submitbtn = document.getElementById('New_Submit');
    }

    if (formId === 'carDeclarations') {
        if (previewButton1) {
            previewButton1.style.display = 'none';
        }
        if (New_Submitbtn) {
            New_Submitbtn.style.display = 'none';
        }

    } else {
        if (previewButton1) {
            previewButton1.style.display = 'block';
        }
        if (New_Submitbtn) {
            New_Submitbtn.style.display = 'block';
        }
    }


}

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function getCookie(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

window.addEventListener('beforeunload', function () {
    // No need to clear anything on unload
});


function navigate(action) {
    // Get all the nav links
    var navLinks = document.querySelectorAll('.nav-link');

    // Find the index of the currently active nav link
    var currentIndex = -1;
    navLinks.forEach(function (navLink, index) {
        if (navLink.classList.contains('active-nav-link')) {
            currentIndex = index;
        }
    });

    // Update the index based on the navigation action
    if (action === 'previous') {
        currentIndex = Math.max(0, currentIndex - 1);
    } else if (action === 'next') {
        currentIndex = Math.min(navLinks.length - 1, currentIndex + 1);
    }

    // Get the formId of the new active nav link
    var newActiveNavLink = navLinks[currentIndex];
    var formId = newActiveNavLink.getAttribute('onclick').match(/showForm\('(.*)'\)/)[1];

    // Trigger the showForm function for the new formId
    showForm(formId);
}






function PreviewSubmit() {
    // Get selected values
    var pannum = document.querySelector('input[name="pannum"]').value;
    var startdate = document.querySelector('input[name="startdate"]').value;
    var rent = document.querySelector('input[name="rent"]').value;
    var name = document.getElementById('name').value;
    var contact = document.querySelector('input[name="contact"]').value;
    var citytype = document.getElementById('citytype').value;
    var Paddress = document.querySelector('textarea[name="Paddress"]').value;
    var Taddress = document.querySelector('textarea[name="Taddress"]').value;
    var pincode = document.querySelector('input[name="pincode"]').value;

    var lifeInsurance = document.querySelector('input[name="lifeInsurance"]').value;
    var timeDeposit = document.querySelector('input[name="timeDeposit"]').value;
    var ulip = document.querySelector('input[name="ulip"]').value;
    var savingsCertificate = document.querySelector('input[name="savingsCertificate"]').value;
    var interestNSC = document.querySelector('input[name="interestNSC"]').value;
    var ppf = document.querySelector('input[name="ppf"]').value;
    var houseLoan = document.querySelector('input[name="houseLoan"]').value;
    var tuitionFee = document.querySelector('input[name="tuitionFee"]').value;
    var mutualFund = document.querySelector('input[name="mutualFund"]').value;
    var termDeposit = document.querySelector('input[name="termDeposit"]').value;
    var sukanyaSamriddhi = document.querySelector('input[name="sukanyaSamriddhi"]').value;

    var self_loan_dt = document.querySelector('input[name="self_loan_dt"]').value;
    var selfloan = document.querySelector('input[name="selfloan"]').value;
    var lendername1 = document.getElementById('lendername1').value;
    var lenderpan1 = document.querySelector('input[name="lenderpan1"]').value;

    var otherlendername1 = document.querySelector('input[name="otherlendername1"]').value;
    var otherlenderpan1 = document.getElementById('otherlenderpan1').value;

    var annualvalue = document.querySelector('input[name="annualvalue"]').value;
    var municipaltax = document.querySelector('input[name="municipaltax"]').value;
    var Homeinterest = document.querySelector('input[name="Homeinterest"]').value;
    var incomeloss = document.querySelector('input[name="incomeloss"]').value;
    var standerdded = document.querySelector('input[name="standerdded"]').value;
    var lendername2 = document.getElementById('lendername2').value;
    var lenderpan2 = document.querySelector('input[name="lenderpan2"]').value;

    var otherlendername2 = document.querySelector('input[name="otherlendername2"]').value;
    var otherlenderpan2 = document.getElementById('otherlenderpan2').value;

    var sanctiondate3 = document.querySelector('input[name="sanctiondate3"]').value;
    var loanammount = document.querySelector('input[name="loanammount"]').value;
    var propertyvalue3 = document.querySelector('input[name="propertyvalue3"]').value;
    var hlinterest = document.querySelector('input[name="hlinterest"]').value;
    var lendername3 = document.getElementById('lendername3').value;
    var lenderpan3 = document.querySelector('input[name="lenderpan3"]').value;

    var otherlendername3 = document.querySelector('input[name="otherlendername3"]').value;
    var otherlenderpan3 = document.getElementById('otherlenderpan3').value;

    var sanctiondate4 = document.querySelector('input[name="sanctiondate4"]').value;

    var havehouseproperty
    var havehousepropertyyesValue = document.getElementById('havehousepropertyyes');
    var havehousepropertynoValue = document.getElementById('havehousepropertyno');

    if (havehousepropertyyesValue.checked == true) {
        havehouseproperty = 'Yes';
    } else if (havehousepropertynoValue.checked == true) {
        havehouseproperty = 'No';
    }

    var propertyvalue4 = document.querySelector('input[name="propertyvalue4"]').value;
    var Eligibility = document.getElementsByName('Eligibility').value;
    var otherincome = document.querySelector('input[name="otherincome"]').value;
    var savinginterest = document.querySelector('input[name="savinginterest"]').value;


    var nonseniorcitizenvalue = document.getElementById('nonseniorcitizen');
    var seniorcitizenvalue = document.getElementById('seniorcitizen');
    var bothcitizenvalue = document.getElementById('bothcitizen');



    var medicaltreatmentfield = '';

    if (nonseniorcitizenvalue.checked == true) {
        medicaltreatmentfield = 'nonseniorcitizen';
    } else if (seniorcitizenvalue.checked == true) {
        medicaltreatmentfield = 'seniorcitizen';
    } else if (bothcitizenvalue.checked == true) {
        medicaltreatmentfield = 'bothcitizen';
    }




    var selfinsurance = document.querySelector('input[name="selfinsurance"]').value;
    var parantinsurance1 = document.querySelector('input[name="parantinsurance1"]').value;
    var parantinsurance2 = document.querySelector('input[name="parantinsurance2"]').value;
    var checkup = document.querySelector('input[name="checkup"]').value;
    var illnesstype = document.getElementById('illnesstype').value;
    // var illnesstype = document.querySelector('input[name="illnesstype"]').value;
    var medicaltreatmentinput = document.querySelector('input[name="medicaltreatmentvalue"]').value;
    var education_loan_dt = document.querySelector('input[name="education_loan_dt"]').value;
    var educationinterest = document.querySelector('input[name="educationinterest"]').value;
    var handicaped = document.getElementById('handicaped').value;
    var dependhandicape = document.getElementById('dependhandicape').value;
    var vehicletype = document.getElementById('vehicletype').value;
    var loansanctiondate = document.querySelector('input[name="loansanctiondate"]').value;
    var carinterest = document.querySelector('input[name="carinterest"]').value;
    var ccd80 = document.querySelector('input[name="ccd80"]').value;
    var prannumb = document.querySelector('input[name="prannumb"]').value;





    if (empStartDate < financialYearStart) {

    }

    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
        var empsalary = document.querySelector('input[name="empsalary"]').value;
        var professionaltax = document.querySelector('input[name="professionaltax"]').value;
        var providentfund = document.querySelector('input[name="providentfund"]').value;
        var incometax6 = document.querySelector('input[name="incometax6"]').value;
    }

    // Create a message with selected values for form2
    var message = "<h5>Selected values for House Rent Allowance</h5>";
    message += "<table class='bordered-table'>";
    message += "<tr><td style='width: 500px;'>Starting Date:</td><td><input value='" + startdate + "' readonly></td></tr>";
    message += "<tr><td>Rent Per Month:</td><td><input value='" + rent + "' readonly></td></tr>";
    message += "<tr><td>Landlord's Name:</td><td><input value='" + name + "' readonly></td></tr>";
    message += "<tr><td>Landlord's PAN number:</td><td><input value='" + pannum + "' readonly></td></tr>";
    message += "<tr><td>Landlord's Contact:</td><td><input value='" + contact + "' readonly></td></tr>";
    message += "<tr><td>City Type:</td><td><input value='" + citytype + "' readonly></td></tr>";
    message += "<tr><td>Landlord's Address:</td><td><input value='" + Paddress + "' readonly></td></tr>";
    message += "<tr><td>Address of Rented Property:</td><td><input value='" + Taddress + "' readonly></td></tr>";
    message += "<tr><td>Pincode:</td><td><input value='" + pincode + "' readonly></td></tr>";
    message += "</table>";


    // Create a message with selected values for form3
    message += "<h5>Selected values for Income/Loss Property</h5>";
    message += "<table class='bordered-table'>";
    message += "<tr><td style='width: 500px;'>Loan Sanctioned Date:</td><td><input value='" + self_loan_dt + "' readonly></td></tr>";
    message += "<tr><td style='width: 500px;'>Self Occupied Home Loan Interest:</td><td><input value='" + selfloan + "' readonly></td></tr>";
    message += "<tr><td>Loan Lender's Name:</td><td><input value='" + lendername1 + "' readonly></td></tr>";
    if (lendername1 == 'other') {
        message += "<tr><td>Other Self Loan Lender's Name:</td><td><input value='" + otherlendername1 + "' readonly></td></tr>";
        message += "<tr><td>Other Self Loan Lender's PAN:</td><td><input value='" + otherlenderpan1 + "' readonly></td></tr>";
    } else {
        message += "<tr><td>Loan Lender's PAN:</td><td><input value='" + lenderpan1 + "' readonly></td></tr>";
    }
    message += "<tr><td>Annual Lettable Value(Rent Received for the Full Year):</td><td><input value='" + annualvalue + "' readonly></td></tr>";
    message += "<tr><td>Municipal Property Tax:</td><td><input value='" + municipaltax + "' readonly></td></tr>";
    message += "<tr><td>Home Loan Interest:</td><td><input value='" + Homeinterest + "' readonly></td></tr>";
    message += "<tr><td>Income/Loss on House Property:</td><td><input value='" + incomeloss + "' readonly></td></tr>";
    message += "<tr><td>Standard Deduction (30%):</td><td><input value='" + standerdded + "' readonly></td></tr>";
    message += "<tr><td>Loan Lender's Name:</td><td><input value='" + lendername2 + "' readonly></td></tr>";

    if (lendername2 == 'other') {
        message += "<tr><td>Other Let Loan Lender's Name:</td><td><input value='" + otherlendername2 + "' readonly></td></tr>";
        message += "<tr><td>Other Let Loan Lender's PAN:</td><td><input value='" + otherlenderpan2 + "' readonly></td></tr>";
    } else {
        message += "<tr><td>Loan Lender's PAN:</td><td><input value='" + lenderpan2 + "' readonly></td></tr>";
    }

    message += "<tr><td>Loan sanctioned date:</td><td><input value='" + sanctiondate3 + "' readonly></td></tr>";
    message += "<tr><td>Loan Amount:</td><td><input value='" + loanammount + "' readonly></td></tr>";
    message += "<tr><td>Property Value:</td><td><input value='" + propertyvalue3 + "' readonly></td></tr>";
    message += "<tr><td>Home Loan Interest:</td><td><input value='" + hlinterest + "' readonly></td></tr>";
    message += "<tr><td>Loan Lender's Name:</td><td><input value='" + lendername3 + "' readonly></td></tr>";
    message += "<tr><td>Loan Lender's PAN:</td><td><input value='" + lenderpan3 + "' readonly></td></tr>";
    if (lendername3 == 'other') {
        message += "<tr><td>Other 80ee Loan Lender's Name:</td><td><input value='" + otherlendername3 + "' readonly></td></tr>";
        message += "<tr><td>Other 80ee Loan Lender's PAN:</td><td><input value='" + otherlenderpan3 + "' readonly></td></tr>";
    } else {
        message += "<tr><td>Loan Lender's PAN:</td><td><input value='" + lenderpan3 + "' readonly></td></tr>";
    }
    message += "<tr><td>Loan sanctioned date:</td><td><input value='" + sanctiondate4 + "' readonly></td></tr>";
    message += "<tr><td>Do you own another property other than this:</td><td><input value='" + havehouseproperty + "' readonly></td></tr>";
    message += "<tr><td>Property Value:</td><td><input value='" + propertyvalue4 + "' readonly></td></tr>";
    message += "<tr><td>Eligibility:</td><td><input value='" + Eligibility + "' readonly></td></tr>";
    message += "<tr><td>Other Income Unspecified:</td><td><input value='" + otherincome + "' readonly></td></tr>";
    message += "<tr><td>Interest Income from Savings account(Maximum up to Rs.10,000):</td><td><input value='" + savinginterest + "' readonly></td></tr>";
    message += "</table>";


    // Create a message with selected values for form4
    message += "<h5>Selected values for 80 Other Deductions</h5>";
    message += "<table class='bordered-table'>";
    message += "<tr><td style='width: 500px;'>Mediclaim Insurance for Self/Spouse and Children:</td><td><input value='" + selfinsurance + "' readonly></td></tr>";
    message += "<tr><td>Mediclaim Insurance for Parents - Non Senior Citizen:</td><td><input value='" + parantinsurance1 + "' readonly></td></tr>";
    message += "<tr><td>Mediclaim Insurance for Parents - Senior Citizen:</td><td><input value='" + parantinsurance2 + "' readonly></td></tr>";
    message += "<tr><td>Preventive Health Checkup:</td><td><input value='" + checkup + "' readonly></td></tr>";
    message += "<tr><td>Critical illness:</td><td><input value='" + illnesstype + "' readonly></td></tr>";
    message += "<tr><td>80 DDB-Medical Treatment for Critical Illness selected field:</td><td><input value='" + medicaltreatmentfield + "' readonly></td></tr>";
    message += "<tr><td>Medical treatment for specified diseases:</td><td><input value='" + medicaltreatmentinput + "' readonly></td></tr>";
    message += "<tr><td>Education Loan Sanctioned Date:</td><td><input value='" + education_loan_dt + "' readonly></td></tr>";
    message += "<tr><td>Interest on education loan for higher studies:</td><td><input value='" + educationinterest + "' readonly></td></tr>";
    message += "<tr><td>Deduction for self disability/ handicapped:</td><td><input value='" + handicaped + "' readonly></td></tr>";
    message += "<tr><td>Deduction for Dependent disability/ handicapped:</td><td><input value='" + dependhandicape + "' readonly></td></tr>";
    message += "<tr><td>Vehicle Type:</td><td><input value='" + vehicletype + "' readonly></td></tr>";
    message += "<tr><td>Loan sanctioned date:</td><td><input value='" + loansanctiondate + "' readonly></td></tr>";
    message += "<tr><td>Interest on Car Loan:</td><td><input value='" + carinterest + "' readonly></td></tr>";
    message += "<tr><td>80 CCD (1B) - Deduction for Self-contribution to Pension Account (NPS):</td><td><input value='" + ccd80 + "' readonly></td></tr>";
    message += "<tr><td>PRAN number:</td><td><input value='" + prannumb + "' readonly></td></tr>";
    message += "</table>";

    // Create a message with selected values for form5
    message += "<h5>Selected values for 80C Declaration</h5>";
    message += "<table class='bordered-table'>";
    message += "<tr><td style='width: 500px;'>Life Insurance:</td><td><input value='" + lifeInsurance + "' readonly></td></tr>";
    message += "<tr><td>5 year time deposit:</td><td><input value='" + timeDeposit + "' readonly></td></tr>";
    message += "<tr><td>Contribution to ULIP:</td><td><input value='" + ulip + "' readonly></td></tr>";
    message += "<tr><td>Subscription to NSC:</td><td><input value='" + savingsCertificate + "' readonly></td></tr>";
    message += "<tr><td>Interest on NSC:</td><td><input value='" + interestNSC + "' readonly></td></tr>";
    message += "<tr><td>Contribution to PPF:</td><td><input value='" + ppf + "' readonly></td></tr>";
    message += "<tr><td>House loan principal / Stamp Duty & Registration fees:</td><td><input value='" + houseLoan + "' readonly></td></tr>";
    message += "<tr><td>Tuition fee - Children(Max two children):</td><td><input value='" + tuitionFee + "' readonly></td></tr>";
    message += "<tr><td>Subscription to Mutual Fund:</td><td><input value='" + mutualFund + "' readonly></td></tr>";
    message += "<tr><td>5 Year Term Deposit:</td><td><input value='" + termDeposit + "' readonly></td></tr>";
    message += "<tr><td>Sukanya Samriddhi:</td><td><input value='" + sukanyaSamriddhi + "' readonly></td></tr>";
    message += "</table>";

    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
        message += "<h5>Selected values for Previous Employment</h5>";
        message += "<table class='bordered-table'>";
        message += "<tr><td style='width: 500px;'>Salary as privision u/s 17(1):</td><td><input value='" + empsalary + "' readonly></td></tr>";
        message += "<tr><td>Professional Tax:</td><td><input value='" + professionaltax + "' readonly></td></tr>";
        message += "<tr><td>Provident Fund:</td><td><input value='" + providentfund + "' readonly></td></tr>";
        message += "<tr><td>Income Tax:</td><td><input value='" + incometax6 + "' readonly></td></tr>";
        message += "</table>";
    }

    


    // Display the message in the modal
    document.getElementById('Allpreviewmessage').innerHTML = message;
    $('#Allpreviewmodal').modal('show');
}



if (regimeValue == 'Old') {
    document.getElementById('Allpreviewcancle').addEventListener('click', function () {
        var Allpreviewmodal = document.getElementById('Allpreviewmodal');
        if (Allpreviewmodal) {
            $(Allpreviewmodal).modal('hide');
        }        
    });
}




// function Allpreviewsubmit() {

//     let formDataForm2 = new FormData(document.getElementById("form2"));
//     let formDataForm3 = new FormData(document.getElementById("form3"));
//     let formDataForm4 = new FormData(document.getElementById("form4"));
//     let formDataForm5 = new FormData(document.getElementById("form5"));

//     if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
//         let formDataForm6 = new FormData(document.getElementById("form6"));        
//         for (let [key, value] of formDataForm6.entries()) {
//             formDataForm2.append(key, value);
//         }
//     }

//     for (let [key, value] of formDataForm5.entries()) {
//         formDataForm2.append(key, value);
//     }
//     for (let [key, value] of formDataForm3.entries()) {
//         formDataForm2.append(key, value);
//     } 
//     for (let [key, value] of formDataForm4.entries()) {
//         formDataForm2.append(key, value);
//     }

//     let apiUrl = "TaxDeclaration_submit";


//     formDataForm2.action = apiUrl;    
//     formDataForm2.submit();
// }


var sub_btn_1 = document.getElementById('sub_btn_1');

var it_dec_check1 = document.getElementById('it_dec_check1');

function enable_btn_1(){
    if (it_dec_check1.checked == true){
        sub_btn_1.disabled = false;
    } else{
        sub_btn_1.disabled = true;
    }
}




function Allpreviewsubmit() {

    if (sub_btn_1.disabled == false){

        if (localStorage.getItem('formData_ilhp_itd')) {
            localStorage.removeItem('formData_ilhp_itd');
        }

        if (localStorage.getItem('formData_80d')) {
            localStorage.removeItem('formData_80d');
        }

        let formDataForm2 = new FormData(document.getElementById("form2"));
        let formDataForm3 = new FormData(document.getElementById("form3"));
        let formDataForm4 = new FormData(document.getElementById("form4"));
        let formDataForm5 = new FormData(document.getElementById("form5"));

        if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
            let formDataForm6 = new FormData(document.getElementById("form6"));
            for (let [key, value] of formDataForm6.entries()) {
                formDataForm2.append(key, value);
            }
        }

        // Append data from other forms to formDataForm2
        for (let [key, value] of formDataForm5.entries()) {
            formDataForm2.append(key, value);
        }
        for (let [key, value] of formDataForm3.entries()) {
            formDataForm2.append(key, value);
        }
        for (let [key, value] of formDataForm4.entries()) {
            formDataForm2.append(key, value);
        }

        // Create a new FormData object for the combined data
        let combinedFormData = new FormData();

        // Append data from formDataForm2 to combinedFormData
        for (let [key, value] of formDataForm2.entries()) {
            combinedFormData.append(key, value);
        }

        let apiUrl = "TaxDeclaration_submit";

        // Create a hidden form element to submit the data
        let hiddenForm = document.createElement('form');
        hiddenForm.style.display = 'none';
        hiddenForm.action = apiUrl;
        hiddenForm.method = 'POST';

        // Append combinedFormData to hiddenForm
        for (let [key, value] of combinedFormData.entries()) {
            let input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        }

        // Append hiddenForm to the document body and submit it
        document.body.appendChild(hiddenForm);
        hiddenForm.submit();
    } else {
        if (it_dec_check1.checked == false) {
            it_dec_check1.setCustomValidity("Please check this field");
            it_dec_check1.reportValidity();            
        }
    }
}




// fetch(apiUrl, {
//     method: 'POST',
//     body: formDataForm2,
// })


// let redirectUrl = "ITDeclarations";


// setTimeout(function () {
//     alert("Values for IT declarations are submitted successfully.");


//     window.location.href = redirectUrl;

//     // Reload the page after the redirection
//     window.location.reload();
// }, 1000); // Adjust the delay (in milliseconds) as needed


// var Allpreviewmodal = document.getElementById('Allpreviewmodal');
// if (Allpreviewmodal) {
//     $(Allpreviewmodal).modal('hide');
// }




document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        if (input.id !== 'incomeloss' && input.id !== 'standerdded') {
            input.onkeydown = function (event) {
                return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code !== 'Space';
            };

            if (input.id !== 'contact' && input.id !== 'prannumb') {
                input.addEventListener('input', function () {
                    if (input.value > Number(10000000)) {
                        input.value = Number(10000000);

                        if (input.id === 'annualrent'){
                            convertedText_annualLettable.textContent = 'One crore rupees';
                        }
                        if (input.id === 'otherincome'){
                            convertedText_otherincome.textContent = 'One crore rupees';
                        }
                        if (input.id === 'educationinterest'){
                            convertedText_educationinterest.textContent = 'One crore rupees';
                        }
                    }
                });
            }
        }
    });
});

 