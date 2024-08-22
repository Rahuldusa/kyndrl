

var regimeValue = String(regimeValue);



// Set the minimum date to the current date
var currentDate = new Date();
var formattedCurrentDate = currentDate.toISOString().split('T')[0];

if (regimeValue == 'Old') {
    document.getElementById('sanctiondate3').max = formattedCurrentDate;
    document.getElementById('sanctiondate4').max = formattedCurrentDate;

    document.addEventListener("DOMContentLoaded", function () {
        var annualrentValue = document.getElementById('annualrent').value;

        var municipaltax = document.getElementById('municipaltax');
        var Homeinterest = document.getElementById('Homeinterest');
        var incomeloss = document.getElementById('incomeloss');
        var standerdded = document.getElementById('standerdded');
        var lendername2 = document.getElementById('lendername2');
        var lenderpan2 = document.getElementById('lenderpan2');
        var otherlendername2 = document.getElementById('otherlendername2');
        var otherlenderpan2 = document.getElementById('lenderpan2');
        var standerddedErrorSpan = document.getElementById('standerddedError');

        if (annualrentValue) {
            municipaltax.disabled = false;
            Homeinterest.disabled = false;
            lendername2.disabled = false;
            lenderpan2.disabled = false;

            housepropertyincomloss()
        } else {
            municipaltax.disabled = true;
            municipaltax.value = '';
            Homeinterest.disabled = true;
            Homeinterest.value = '';
            incomeloss.value = '';
            standerdded.value = '';
            lendername2.disabled = true;
            lendername2.value = '';
            lenderpan2.disabled = true;
            lenderpan2.value = '';
            otherlendername2.value = '';
            otherlenderpan2.value = '';
            standerddedErrorSpan.textContent = '';
        }



        var lendername1Value = document.getElementById('lendername1').value;
        var lenderPanInput1 = document.getElementById('lenderpan1');
        var otherLenderNameRow1 = document.getElementById('otherlendernm1');
        var otherLenderPanrow1 = document.getElementById('otherlenderpn1');

        if (lendername1Value) {
            if (lendername1Value == 'other') {
                lenderPanInput1.disabled = true;
                otherLenderNameRow1.style.display = 'table-row';  // Show other lender name row
                otherLenderPanrow1.style.display = 'table-row';
            } else {
                otherLenderNameRow1.style.display = 'none';  // Hide other lender name row
                otherLenderPanrow1.style.display = 'none'
                lenderPanInput1.disabled = false;
            }
        } else {
            otherLenderNameRow1.style.display = 'none';  // Hide other lender name row
            otherLenderPanrow1.style.display = 'none'
            lenderPanInput1.disabled = false;
        }


        var lendername2Value = document.getElementById('lendername2').value;
        var lenderPanInput2 = document.getElementById('lenderpan2');
        var otherLenderNameRow2 = document.getElementById('otherlendernm2');
        var otherLenderPanrow2 = document.getElementById('otherlenderpn2');

        if (lendername2Value) {
            if (lendername2Value == 'other') {
                lenderPanInput2.disabled = true;
                otherLenderNameRow2.style.display = 'table-row';  // Show other lender name row
                otherLenderPanrow2.style.display = 'table-row';
            } else {
                otherLenderNameRow2.style.display = 'none';  // Hide other lender name row
                otherLenderPanrow2.style.display = 'none'
                lenderPanInput2.disabled = false;
            }
        } else {
            otherLenderNameRow2.style.display = 'none';  // Hide other lender name row
            otherLenderPanrow2.style.display = 'none'
            lenderPanInput2.disabled = false;
        }

        var lendername3Value = document.getElementById('lendername3').value;
        var lenderPanInput3 = document.getElementById('lenderpan3');
        var otherLenderNameRow3 = document.getElementById('otherlendernm3');
        var otherLenderPanrow3 = document.getElementById('otherlenderpn3');

        if (lendername3Value) {
            if (lendername3Value == 'other') {
                lenderPanInput3.disabled = true;
                otherLenderNameRow3.style.display = 'table-row';  // Show other lender name row
                otherLenderPanrow3.style.display = 'table-row';
            } else {
                otherLenderNameRow3.style.display = 'none';  // Hide other lender name row
                otherLenderPanrow3.style.display = 'none'
                lenderPanInput3.disabled = false;
            }
        } else {
            otherLenderNameRow3.style.display = 'none';  // Hide other lender name row
            otherLenderPanrow3.style.display = 'none'
            lenderPanInput3.disabled = false;
        }

    });

}

var lenderNameSelect1 = document.getElementById('lendername1');
var lenderPanInput1 = document.getElementById('lenderpan1');
var otherLenderNameRow1 = document.getElementById('otherlendernm1');
var otherLenderPanrow1 = document.getElementById('otherlenderpn1');
var otherlendername1input1 = document.getElementById('otherlendername1');
var otherlenderpan1input1 = document.getElementById('otherlenderpan1');



if (regimeValue == 'Old') {
    lenderNameSelect1.addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var pan = selectedOption.getAttribute('data-pan');

        if (selectedOption.value === 'other') {
            lenderPanInput1.value = '';  // Clear the lenderpan1 value
            lenderPanInput1.disabled = true;  // Disable lenderpan1 input
            otherLenderNameRow1.style.display = 'table-row';  // Show other lender name row
            otherLenderPanrow1.style.display = 'table-row';

        } else {
            lenderPanInput1.value = pan;
            lenderPanInput1.disabled = false;  // Enable lenderpan1 input
            otherLenderNameRow1.style.display = 'none';  // Hide other lender name row
            otherLenderPanrow1.style.display = 'none'
            otherlenderpan1input1.value = '';
            otherlendername1input1.value = '';

        }


    });
}


var lenderNameSelect2 = document.getElementById('lendername2');
var lenderPanInput2 = document.getElementById('lenderpan2');
var otherLenderNameRow2 = document.getElementById('otherlendernm2');
var otherLenderPanrow2 = document.getElementById('otherlenderpn2');
var otherlendername1input2 = document.getElementById('otherlendername2');
var otherlenderpan1input2 = document.getElementById('otherlenderpan2');


if (regimeValue == 'Old') {
    lenderNameSelect2.addEventListener('change', function () {

        var selectedOption = this.options[this.selectedIndex];
        var pan = selectedOption.getAttribute('data-pan');

        if (selectedOption.value === 'other') {
            lenderPanInput2.value = '';  // Clear the lenderpan1 value
            lenderPanInput2.disabled = true;  // Disable lenderpan1 input
            otherLenderNameRow2.style.display = 'table-row';  // Show other lender name row
            otherLenderPanrow2.style.display = 'table-row';

        } else {
            lenderPanInput2.value = pan;
            lenderPanInput2.disabled = false;  // Enable lenderpan1 input
            otherLenderNameRow2.style.display = 'none';  // Hide other lender name row
            otherLenderPanrow2.style.display = 'none'
            otherlenderpan1input2.value = '';
            otherlendername1input2.value = '';

        }
    });

}

var lenderNameSelect3 = document.getElementById('lendername3');
var lenderPanInput3 = document.getElementById('lenderpan3');
var otherLenderNameRow3 = document.getElementById('otherlendernm3');
var otherLenderPanrow3 = document.getElementById('otherlenderpn3');
var otherlendername1input3 = document.getElementById('otherlendername3');
var otherlenderpan1input3 = document.getElementById('otherlenderpan3');


if (regimeValue == 'Old') {
    lenderNameSelect3.addEventListener('change', function () {

        var selectedOption = this.options[this.selectedIndex];
        var pan = selectedOption.getAttribute('data-pan');

        if (selectedOption.value === 'other') {
            lenderPanInput3.value = '';  // Clear the lenderpan1 value
            lenderPanInput3.disabled = true;  // Disable lenderpan1 input
            otherLenderNameRow3.style.display = 'table-row';  // Show other lender name row
            otherLenderPanrow3.style.display = 'table-row';

        } else {
            lenderPanInput3.value = pan;
            lenderPanInput3.disabled = false;  // Enable lenderpan1 input
            otherLenderNameRow3.style.display = 'none';  // Hide other lender name row
            otherLenderPanrow3.style.display = 'none'
            otherlenderpan1input3.value = '';
            otherlendername1input3.value = '';
        }
    });

}


function validateOtherlenderpan1() {
    var otherlenderpan1Value = document.getElementById('otherlenderpan1');
    var otherlenderpan1ErrorSpan = document.getElementById('otherlenderpan1Error');


    var inputPAN = otherlenderpan1Value.value.toUpperCase(); // Convert input to uppercase
    otherlenderpan1Value.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (otherlenderpan1Value.value) {
        if (!panPattern.test(otherlenderpan1Value.value)) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            otherlenderpan1ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            otherlenderpan1ErrorSpan.textContent = '';
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        otherlenderpan1ErrorSpan.textContent = '';
    }
}


function validateOtherlenderpan2() {
    var otherlenderpan2Value = document.getElementById('otherlenderpan2');
    var otherlenderpan2ErrorSpan = document.getElementById('otherlenderpan2Error');

    
    var inputPAN = otherlenderpan2Value.value.toUpperCase(); // Convert input to uppercase
    otherlenderpan2Value.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (otherlenderpan2Value.value) {
        if (!panPattern.test(otherlenderpan2Value.value)) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            otherlenderpan2ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            otherlenderpan2ErrorSpan.textContent = '';
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        otherlenderpan2ErrorSpan.textContent = '';
    }
}

function validateOtherlenderpan3() {
    var otherlenderpan3Value = document.getElementById('otherlenderpan3');
    var otherlenderpan3ErrorSpan = document.getElementById('otherlenderpan3Error');

    var inputPAN = otherlenderpan3Value.value.toUpperCase(); // Convert input to uppercase
    otherlenderpan3Value.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (otherlenderpan3Value.value) {
        if (!panPattern.test(otherlenderpan3Value.value)) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            otherlenderpan3ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            otherlenderpan3ErrorSpan.textContent = '';
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        otherlenderpan3ErrorSpan.textContent = '';
    }
}

var selfloanValue = document.getElementById('selfloan');

var self_limit;

function validateSelfLoan() {
    
    if (selfloanValue.value){
        if (self_limit){
            if (Number(selfloanValue.value) > Number(self_limit)){
                selfloanValue.value = Number(self_limit)
            }
        } else{
            if (Number(selfloanValue.value) > Number(200000)){
                selfloanValue.value = Number(200000)
            }
        }
    }
    
}


function housepropertyincomloss() {
    var annualrentValue = document.getElementById('annualrent').value;
    var municipaltaxValue = document.getElementById('municipaltax').value;
    var HomeinterestValue = document.getElementById('Homeinterest').value;

    if (annualrentValue && municipaltaxValue && HomeinterestValue) {
        // document.getElementById('incomeloss').value = parseInt(((Number(annualrentValue) - Number(municipaltaxValue)) * 0.7) - Number(HomeinterestValue));        
        document.getElementById('incomeloss').value = (((Number(annualrentValue) - Number(municipaltaxValue)) * 0.7) - Number(HomeinterestValue)).toFixed();
    } else {
        document.getElementById('incomeloss').value = '';
    }

    if (annualrentValue && municipaltaxValue) {
        // document.getElementById('standerdded').value=parseInt(((Number(annualrentValue)-Number(municipaltaxValue))*0.3)); 
        var standerdded_var = document.getElementById('standerdded');
        var standerddedErrorSpan = document.getElementById('standerddedError');
        standerdded_var.value = ((Number(annualrentValue) - Number(municipaltaxValue)) * 0.3).toFixed();

        if (standerdded_var.value) {
            if (Number(standerdded_var.value) < 0) {
                document.getElementById('savebtn3').disabled = true;
                document.getElementById('PreviewSubmit').disabled = true;
                standerddedErrorSpan.textContent = 'standered deduction must be positive integer number.'
            } else {
                document.getElementById('savebtn3').disabled = false;
                document.getElementById('PreviewSubmit').disabled = false;
                standerddedErrorSpan.textContent = '';
            }
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            standerddedErrorSpan.textContent = '';
        }


    } else {
        document.getElementById('standerdded').value = '';
    }
}

function uploadSelf_file() {

    var self_file = document.getElementById('self_file')

    var self_loan_dt = document.getElementById('self_loan_dt')
    var selfloan = document.getElementById('selfloan')
    var lendername1 = document.getElementById('lendername1')
    var lenderpan1 = document.getElementById('lenderpan1')
    var otherlendername1 = document.getElementById('otherlendername1')
    var otherlenderpan1 = document.getElementById('otherlenderpan1')

    
    
    var annualrent = document.getElementById('annualrent')
    var municipaltax = document.getElementById('municipaltax')
    var Homeinterest = document.getElementById('Homeinterest')
    var incomeloss = document.getElementById('incomeloss')
    var standerdded = document.getElementById('standerdded')
    var lendername2 = document.getElementById('lendername2')
    var lenderpan2 = document.getElementById('lenderpan2')
    var otherlendername2 = document.getElementById('otherlendername2')
    var otherlenderpan2 = document.getElementById('otherlenderpan2')

    
   
    var sanctiondate3 = document.getElementById('sanctiondate3')
    var loanammount = document.getElementById('loanammount')
    var propertyvalue3 = document.getElementById('propertyvalue3')
    var hlinterest = document.getElementById('hlinterest')
    var lendername3 = document.getElementById('lendername3')
    var lenderpan3 = document.getElementById('lenderpan3')
    var otherlendername3 = document.getElementById('otherlendername3')
    var otherlenderpan3 = document.getElementById('otherlenderpan3')

    

    var sanctiondate4 = document.getElementById('sanctiondate4')    
    var havehousepropertyyes = document.getElementById('havehousepropertyyes')
    var havehousepropertyno = document.getElementById('havehousepropertyno')
    var propertyvalue4 = document.getElementById('propertyvalue4')
    var Eligibilityyes = document.getElementById('Eligibilityyes')
    var Eligibilityno = document.getElementById('Eligibilityno')

    
   
    var otherincome = document.getElementById('otherincome')
    var savinginterest = document.getElementById('savinginterest')

    var having_pro_80eea = null;
    var elig_80eea = null;

    if (havehousepropertyyes.checked == true){
        having_pro_80eea = 'yes';
    } else if (havehousepropertyno.checked == true){
        having_pro_80eea = 'no';
    }

    if (Eligibilityyes.checked == true){
        elig_80eea = 'yes';
    } else if (Eligibilityno.checked == true){
        elig_80eea = 'no';
    }


    const formData_ilhp_itd = {
        self_loan_dt: self_loan_dt.value,
        selfloan: selfloan.value,
        lendername1: lendername1.value,
        lenderpan1: lenderpan1.value,
        otherlendername1: otherlendername1.value,
        otherlenderpan1: otherlenderpan1.value,

        annualrent: annualrent.value,
        municipaltax: municipaltax.value,
        Homeinterest: Homeinterest.value,
        incomeloss: incomeloss.value,
        standerdded: standerdded.value,
        lendername2: lendername2.value,
        lenderpan2: lenderpan2.value,
        otherlendername2: otherlendername2.value,
        otherlenderpan2: otherlenderpan2.value,

        sanctiondate3: sanctiondate3.value,
        loanammount: loanammount.value,
        propertyvalue3: propertyvalue3.value,
        hlinterest: hlinterest.value,
        lendername3: lendername3.value,
        lenderpan3: lenderpan3.value,
        otherlendername3: otherlendername3.value,
        otherlenderpan3: otherlenderpan3.value,

        sanctiondate4: sanctiondate4.value,
        having_pro_80eea: having_pro_80eea,
        propertyvalue4: propertyvalue4.value,        
        elig_80eea: elig_80eea,

        otherincome: otherincome.value,
        savinginterest: savinginterest.value
    };
    const jsonData = JSON.stringify(formData_ilhp_itd);
    localStorage.setItem('formData_ilhp_itd', jsonData);    
    

    let apiUrl = "upload_Self_file";
    document.getElementById("form3").action = apiUrl;
    document.getElementById("form3").submit();
}



function validateAnnualRent() {

    var annualrentValue = document.getElementById('annualrent').value;
    var annualrentErrorSpan = document.getElementById('annualrentError');

    var municipaltax = document.getElementById('municipaltax');
    var Homeinterest = document.getElementById('Homeinterest');
    var incomeloss = document.getElementById('incomeloss');
    var standerdded = document.getElementById('standerdded');
    var lendername2 = document.getElementById('lendername2');
    var lenderpan2 = document.getElementById('lenderpan2');
    var otherlendername2 = document.getElementById('otherlendername2');
    var otherlenderpan2 = document.getElementById('lenderpan2');
    var standerddedErrorSpan = document.getElementById('standerddedError');

    const convertedText_annualLettable = document.getElementById("convertedText_annualLettable");

    if (annualrentValue) {
        if (!Number.isInteger(Number(annualrentValue)) || Number(annualrentValue) < 0) {
            municipaltax.disabled = true;
            municipaltax.value = '';
            Homeinterest.disabled = true;
            Homeinterest.value = '';
            incomeloss.disabled = true;
            incomeloss.value = '';
            standerdded.disabled = true;
            standerdded.value = '';
            lendername2.disabled = true;
            lendername2.value = '';
            lenderpan2.disabled = true;
            lenderpan2.value = '';
            otherlendername2.value = '';
            otherlenderpan2.value = '';
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            annualrentErrorSpan.textContent = 'rent must be positive integer number.'
            convertedText_annualLettable.textContent = '';
        } else if (Number(annualrentValue) == 0) {
            convertedText_annualLettable.textContent = '';
        }
        else {
            municipaltax.disabled = false;
            Homeinterest.disabled = false;
            // incomeloss.disabled = false;
            // standerdded.disabled = false;
            lendername2.disabled = false;
            lenderpan2.disabled = false;
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            annualrentErrorSpan.textContent = '';
            housepropertyincomloss()

            const amount = parseInt(annualrentValue);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_annualLettable.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_annualLettable.style.color = "red";
            } else {
                convertedText_annualLettable.style.color = "";
            }
        }
    } else {
        municipaltax.disabled = true;
        municipaltax.value = '';
        Homeinterest.disabled = true;
        Homeinterest.value = '';
        incomeloss.disabled = true;
        incomeloss.value = '';
        standerdded.disabled = true;
        standerdded.value = '';
        lendername2.disabled = true;
        lendername2.value = '';
        lenderpan2.disabled = true;
        lenderpan2.value = '';
        otherlendername2.value = '';
        otherlenderpan2.value = '';
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        annualrentErrorSpan.textContent = '';
        standerddedErrorSpan.textContent = '';
        housepropertyincomloss()
        convertedText_annualLettable.textContent = '';
    }

}


function validateMunicipalTax() {



    var municipaltaxValue = document.getElementById('municipaltax').value;
    var municipaltaxErrorSpan = document.getElementById('municipaltaxError');

    if (!Number.isInteger(Number(municipaltaxValue)) || Number(municipaltaxValue) < 0) {
        document.getElementById('savebtn3').disabled = true;
        document.getElementById('PreviewSubmit').disabled = true;
        municipaltaxErrorSpan.textContent = 'municipat tax must be positive integer number.'
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        municipaltaxErrorSpan.textContent = '';
        housepropertyincomloss()
    }
}



function validateHomeInterest() {


    var HomeinterestValue = document.getElementById('Homeinterest').value;
    var HomeinterestErrorSpan = document.getElementById('HomeinterestError');

    if (!Number.isInteger(Number(HomeinterestValue)) || Number(HomeinterestValue) < 0) {
        document.getElementById('savebtn3').disabled = true;
        document.getElementById('PreviewSubmit').disabled = true;
        HomeinterestErrorSpan.textContent = 'Home loan interest must be positive integer number.'

    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        HomeinterestErrorSpan.textContent = '';
        housepropertyincomloss()

    }

}


function makeFieldsReadonlyFor80EEA() {
    // Your code to make fields readonly for 80EEA

    var tableElement = document.getElementById('80EEA');

    tableElement.style.opacity = '0.5'; // You can adjust the opacity as needed

    document.getElementById('subtab4Error').textContent = 'You are not eligible for 80EEA'

    var fields80EEA = document.getElementById('80EEA').getElementsByTagName('input');
    for (var i = 0; i < fields80EEA.length; i++) {
        fields80EEA[i].readOnly = true;
    }
    for (var i = 0; i < fields80EEA.length; i++) {
        if (fields80EEA[i].id == 'sanctiondate4' || fields80EEA[i].id == 'propertyvalue4') {
            fields80EEA[i].value = '';
        }
    }

    var radioButtons = document.getElementsByClassName('radioButton');

    // Loop through each radio button and set the 'disabled' property to true
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = true;
        radioButtons[i].checked = false;
    }
}

function makeFieldsReadonlyFor80EEA1() {
    // Your code to make fields readonly for 80EEA

    var tableElement = document.getElementById('80EEA');

    tableElement.style.opacity = '0.5'; // You can adjust the opacity as needed

    document.getElementById('subtab4Error').textContent = 'You are not eligible for 80EEA'

    var fields80EEA = document.getElementById('80EEA').getElementsByTagName('input');
    for (var i = 0; i < fields80EEA.length; i++) {
        fields80EEA[i].readOnly = true;
    }
    for (var i = 0; i < fields80EEA.length; i++) {
        if (fields80EEA[i].id == 'sanctiondate4' || fields80EEA[i].id == 'propertyvalue4') {
            fields80EEA[i].value = '';
        }
    }
    var radioButtons = document.getElementsByClassName('radioButton');
    // Loop through each radio button and set the 'disabled' property to true
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = true;
        radioButtons[i].checked = false;
    }
    document.getElementsByName('Eligibility').value = 'No';
}

function enablefieldsfor80EEA() {

    var tableElement = document.getElementById('80EEA');

    tableElement.style.opacity = '1'; // You can adjust the opacity as needed
    document.getElementById('subtab4Error').textContent = ''

    var fields80EEA = document.getElementById('80EEA').getElementsByTagName('input');
    for (var i = 0; i < fields80EEA.length; i++) {
        if (fields80EEA[i].id !== 'sanctiondate4') {
            fields80EEA[i].readOnly = false;
        }
    }
    var radioButtons = document.getElementsByClassName('radioButton');

    // Loop through each radio button and set the 'disabled' property to true
    for (var i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = false;
    }
}

function makeFieldsReadonly() {
    var fields = document.getElementById('80EE').getElementsByTagName('input');

    var tableElement = document.getElementById('80EE');

    tableElement.style.opacity = '0.5';

    for (var i = 0; i < fields.length; i++) {
        fields[i].readOnly = true;
        fields[i].value = '';
    }
    for (var i = 0; i < fields.length; i++) {
        fields[i].value = '';
    }

    var selects = document.getElementById('80EE').getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
        selects[i].value = '';
    }
    document.getElementById('subtab3Error').textContent = 'You are not eligible for 80EE'
}


function makeFieldsReadonly1() {
    var fields = document.getElementById('80EE').getElementsByTagName('input');

    var tableElement = document.getElementById('80EE');

    tableElement.style.opacity = '0.5';

    for (var i = 0; i < fields.length; i++) {
        fields[i].readOnly = true;
    }

    for (var i = 0; i < fields.length; i++) {
        fields[i].value = '';
    }

    var selects = document.getElementById('80EE').getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = true;
        selects[i].value = '';
    }

    document.getElementById('subtab3Error').textContent = 'You are not eligible for 80EE'


}

function enableFields() {
    var fields = document.getElementById('80EE').getElementsByTagName('input');

    var tableElement = document.getElementById('80EE');

    tableElement.style.opacity = '1';

    for (var i = 0; i < fields.length; i++) {
        if (fields[i].id !== 'sanctiondate3') {
            fields[i].readOnly = false;
        }
    }

    var selects = document.getElementById('80EE').getElementsByTagName('select');
    for (var i = 0; i < selects.length; i++) {
        selects[i].disabled = false;
    }
    document.getElementById('subtab3Error').textContent = '';
    // Disable 80EEA

}

function validateSanctiondate3() {

    var sanctiondate3Value = document.getElementById('sanctiondate3').value;
    var selectedDate = new Date(sanctiondate3Value);
    var financialYearStart = new Date(2016, 3, 1); // April 1st, 2023
    var financialYearEnd = new Date(2017, 2, 31);   // March 31st, 2024

    var tableElement = document.getElementById('80EE');

    var pdfUrl = document.getElementById('pdf-url-80ee').getAttribute('data-pdf-url');

    if (selectedDate) {
        if (selectedDate <= financialYearStart || selectedDate >= financialYearEnd) {
            
            var message = "";
            message += "You are not eligible for 80EE" + "<br>";
            message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

            // Display the message in the modal
            document.getElementById('80EEAErrorMSGmessage').innerHTML = message;
            $('#80EEAErrorMSGmodal').modal('show');

            // You can adjust the opacity as needed
            makeFieldsReadonly();
            enablefieldsfor80EEA();

        } else {

            enableFields();
            makeFieldsReadonlyFor80EEA();
        }
    } else {

        enableFields();
        enablefieldsfor80EEA();
    }
}

function validateLoanAmmount() {

    var loanammountValue = document.getElementById('loanammount').value;
    var loanammountErrorSpan = document.getElementById('loanammountError')
    var tableElement = document.getElementById('80EE');

    var pdfUrl = document.getElementById('pdf-url-80ee').getAttribute('data-pdf-url');

    if (loanammountValue) {
        if (!Number.isInteger(Number(loanammountValue)) || Number(loanammountValue) < 0) {

            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;

            loanammountErrorSpan.textContent = 'loan value must be positive integer number.'

        } else if (Number(loanammountValue) > 3500000) {

            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            loanammountErrorSpan.textContent = ''

            var message = "";
            message += "You are not eligible for 80EE" + "<br>";
            message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

            // Display the message in the modal
            document.getElementById('80EEAErrorMSGmessage').innerHTML = message;
            $('#80EEAErrorMSGmodal').modal('show');

            // You can adjust the opacity as needed
            makeFieldsReadonly();
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            loanammountErrorSpan.textContent = ''
            enableFields();
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        loanammountErrorSpan.textContent = ''
        enableFields();
    }
}

function validatePropertyValue3() {

    var propertyvalue3Value = document.getElementById('propertyvalue3').value;
    var propertyvalue3ErrorSpan = document.getElementById('propertyvalue3Error');

    var tableElement = document.getElementById('80EE');

    var pdfUrl = document.getElementById('pdf-url-80ee').getAttribute('data-pdf-url');

    if (propertyvalue3Value) {
        if (!Number.isInteger(Number(propertyvalue3Value)) || Number(propertyvalue3Value) < 0) {

            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;

            propertyvalue3ErrorSpan.textContent = 'property value must be positive integer number.'

        } else if (Number(propertyvalue3Value) > 5000000) {

            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            propertyvalue3ErrorSpan.textContent = ''

            var message = "";
            message += "You are not eligible for 80EE" + "<br>";
            message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

            // Display the message in the modal
            document.getElementById('80EEAErrorMSGmessage').innerHTML = message;
            $('#80EEAErrorMSGmodal').modal('show');
            // You can adjust the opacity as needed
            makeFieldsReadonly();
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            propertyvalue3ErrorSpan.textContent = ''
            enableFields();
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        propertyvalue3ErrorSpan.textContent = ''
        enableFields();
    }
}

function validateHomeLoanInterest() {
    var hlinterestValue = document.getElementById('hlinterest').value;
    var hlinterestErrorSpan = document.getElementById('hlinterestError');

    if (hlinterestValue) {
        if (!Number.isInteger(Number(hlinterestValue)) || Number(hlinterestValue) < 0) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            hlinterestErrorSpan.textContent = 'Home loan interest value must be positive integer number.'
        } else if (hlinterestValue > 50000) {
            document.getElementById('hlinterest').value = 50000;
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            hlinterestErrorSpan.textContent = ''
        } else {
            // document.getElementById('hlinterest').value = parseInt(hlinterestValue);
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            hlinterestErrorSpan.textContent = ''
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        hlinterestErrorSpan.textContent = ''
    }
}


function autoselecteligible() {
    var sanctiondate4Value = document.getElementById('sanctiondate4').value;
    var havehousepropertyno = document.getElementById('havehousepropertyno');
    var propertyvalue4Value = document.getElementById('propertyvalue4').value;

    if (sanctiondate4Value && havehousepropertyno.checked == true && propertyvalue4Value) {
        document.getElementById('Eligibilityyes').checked = true;
        document.getElementsByName('Eligibility').value = 'Yes';
        
        if (self_limit == 200000 || !self_limit) {
            alert('self-occupied value limit up to Rs. 3,50,000.')
        }
        self_limit = 350000;
        if (Number(selfloanValue.value) > Number(self_limit)){
            selfloanValue.value = Number(self_limit)
        }

    } else {
        document.getElementById('Eligibilityyes').checked = false;
        document.getElementById('Eligibilityno').checked = true;
        document.getElementsByName('Eligibility').value = 'No';
       
        if (self_limit == 350000 ||  !self_limit) {
            alert('self-occupied value limit up to Rs. 2,00,000.')
        }
        self_limit = 200000;

        if (Number(selfloanValue.value) > Number(self_limit)){
            selfloanValue.value = Number(self_limit)
        }

    }
}


function validateSanctiondate4() {
    var sanctiondate4Value = document.getElementById('sanctiondate4').value;
    var selectedDate = new Date(sanctiondate4Value);
    var financialYearStart = new Date(2019, 3, 1); // April 1st, 2023
    var financialYearEnd = new Date(2022, 2, 31);   // March 31st, 2024

    var pdfUrl = document.getElementById('pdf-url-80eea').getAttribute('data-pdf-url');

    if (selectedDate) {
        if (selectedDate <= financialYearStart || selectedDate >= financialYearEnd) {

            var message = "";
            message += "You are not eligible for 80EEA" + "<br>";
            message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

            // Display the message in the modal
            document.getElementById('80EEAErrorMSGmessage').innerHTML = message;
            $('#80EEAErrorMSGmodal').modal('show');

            makeFieldsReadonlyFor80EEA1();

        } else {
            makeFieldsReadonly1();
            enablefieldsfor80EEA();
            autoselecteligible();

        }
    } else {
        enablefieldsfor80EEA();
        enableFields();
    }
}


function validateHavehouseproperty(radioButton) {
    var selectedValue = radioButton.value;

    var pdfUrl = document.getElementById('pdf-url-80eea').getAttribute('data-pdf-url');

    if (selectedValue === 'Yes') {
        var message = "";
        message += "You are not eligible for 80EEA" + "<br>";
        message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

        // Display the message in the modal
        document.getElementById('80EEAErrorMSGmessage').innerHTML = message;
        $('#80EEAErrorMSGmodal').modal('show');
        makeFieldsReadonlyFor80EEA1();
        
    } 
    autoselecteligible();

}

function validatePropertyValue4() {

    var propertyvalue4Value = document.getElementById('propertyvalue4').value;
    var propertyvalue4ErrorSpan = document.getElementById('propertyvalue4Error');

    var pdfUrl = document.getElementById('pdf-url-80eea').getAttribute('data-pdf-url');

    if (propertyvalue4Value) {
        if (!Number.isInteger(Number(propertyvalue4Value)) || Number(propertyvalue4Value) < 0) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            propertyvalue4ErrorSpan.textContent = 'Property value must be positive integer number.'

        } else if (propertyvalue4Value > 4500000) {

            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            propertyvalue4ErrorSpan.textContent = ''

            var message = "";
            message += "You are not eligible for 80EEA" + "<br>";
            message += "<a href='" + pdfUrl + "' target='_blank'>Click here to know the reason</a>"

            // Display the message in the modal
            document.getElementById('80EEAErrorMSGmessage').innerHTML = message;
            $('#80EEAErrorMSGmodal').modal('show');
            makeFieldsReadonlyFor80EEA1();
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            propertyvalue4ErrorSpan.textContent = ''
            
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        propertyvalue4ErrorSpan.textContent = ''
    }

    autoselecteligible();
}



var otherincomeValue1 = 0;

if (regimeValue == 'Old') {
    document.addEventListener("DOMContentLoaded", function () {
        var otherincomeValue = document.getElementById('otherincome').value;

        if (otherincomeValue) {
            otherincomeValue1 = otherincomeValue;
        }

    });
}

function validateOtherIncome() {
    var otherincomeValue = document.getElementById('otherincome').value;
    var otherincomeErrorSpan = document.getElementById('otherincomeError');

    var savinginterest = document.getElementById('savinginterest');

    const convertedText_otherincome = document.getElementById("convertedText_otherincome");

    if (otherincomeValue) {
        if (!Number.isInteger(Number(otherincomeValue)) || Number(otherincomeValue) < 0) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            otherincomeErrorSpan.textContent = 'Other Income value must be positive integer number.'
            convertedText_otherincome.textContent = '';
            savinginterest.value = null;
            savinginterest.disabled = true;

        } else if (Number(otherincomeValue) == 0) {
            convertedText_otherincome.textContent = '';
            savinginterest.disabled = false;
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            otherincomeErrorSpan.textContent = ''
            otherincomeValue1 = otherincomeValue;
            
            savinginterest.disabled = false;

            const amount = parseInt(otherincomeValue);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_otherincome.textContent = `${convertedValue} Rupees Only`;            
            if (amount >= 1000000) {
                convertedText_otherincome.style.color = "red";
            } else {
                convertedText_otherincome.style.color = "";
            }
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        otherincomeErrorSpan.textContent = ''
        otherincomeValue1 = 0;
        convertedText_otherincome.textContent = '';
        savinginterest.value = null;
        savinginterest.disabled = true;
    }
    validateSavingInterest();
}


function validateSavingInterest() { 

    var otherincomeValue = document.getElementById('otherincome').value;
    var savinginterest = document.getElementById('savinginterest');
    var savinginterestValue = document.getElementById('savinginterest').value;
    var savinginterestErrorSpan = document.getElementById('savinginterestError')

    if (savinginterestValue) {
        if (!Number.isInteger(Number(savinginterestValue)) || Number(savinginterestValue) < 0) {
            document.getElementById('savebtn3').disabled = true;
            document.getElementById('PreviewSubmit').disabled = true;
            savinginterestErrorSpan.textContent = 'Interest Income value must be positive integer number.'

        } else if (Number(savinginterestValue) > Number(otherincomeValue)) {
            document.getElementById('savinginterest').value = Number(otherincomeValue);
        
            savinginterestErrorSpan.textContent = 'The interest income value should not exceed the amount declared in Other Income.'
        } else {
            document.getElementById('savebtn3').disabled = false;
            document.getElementById('PreviewSubmit').disabled = false;
            savinginterestErrorSpan.textContent = ''
        }
    } else {
        document.getElementById('savebtn3').disabled = false;
        document.getElementById('PreviewSubmit').disabled = false;
        savinginterestErrorSpan.textContent = ''

    }    
}


var self_loan_dt = document.getElementById('self_loan_dt');

var currentDate_1 = new Date();
var formattedCurrentDate_1 = currentDate_1.toISOString().split('T')[0];

if (regimeValue == 'Old') {
    document.getElementById('self_loan_dt').max = formattedCurrentDate_1;
}


var section_80ee = document.getElementById('section_80ee');
var section_80eea = document.getElementById('section_80eea');

var sanctiondate3 = document.getElementById('sanctiondate3');
var loanammount = document.getElementById('loanammount');
var propertyvalue3 = document.getElementById('propertyvalue3');
var hlinterest = document.getElementById('hlinterest');
var lendername3 = document.getElementById('lendername3');
var lenderpan3 = document.getElementById('lenderpan3');
var otherlendername3 = document.getElementById('otherlendername3');
var otherlenderpan3 = document.getElementById('otherlenderpan3');


var sanctiondate4 = document.getElementById('sanctiondate4');
var havehousepropertyyes = document.getElementById('havehousepropertyyes');
var havehousepropertyno = document.getElementById('havehousepropertyno');
var propertyvalue4 = document.getElementById('propertyvalue4');
var Eligibilityyes = document.getElementById('Eligibilityyes');
var Eligibilityno = document.getElementById('Eligibilityno');



function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function ValidateSelf_loan_dt() {
    var startDate_1 = new Date('2016-04-01');
    var endDate_1 = new Date('2017-03-31');

    var startDate_2 = new Date('2019-04-01');
    var endDate_2 = new Date('2022-03-31');

    if (self_loan_dt.value) {
        var inputDateValue = self_loan_dt.value;
        var inputDate = new Date(inputDateValue);

        var currentDate = new Date();
        if (inputDate > currentDate) {
            self_loan_dt.value = null;
            alert('selected date must not be future date.')
        } else if (inputDate >= startDate_1 && endDate_1 >= inputDate) {            
            section_80ee.style.display = 'block';
            section_80eea.style.display = 'none';
            sanctiondate3.value = formatDate(inputDate)
            
            enableFields();

            sanctiondate4.value = null;
            havehousepropertyyes.checked = false;
            havehousepropertyno.checked = false;
            propertyvalue4.value = null;
            Eligibilityyes.checked = false;
            Eligibilityno.checked = false;

            sanctiondate3.readOnly = true;
            sanctiondate4.readOnly = true;
            
            
        } else if (inputDate >= startDate_2 && endDate_2 >= inputDate) {
            
            section_80eea.style.display = 'block';
            section_80ee.style.display = 'none';
            sanctiondate4.value = formatDate(inputDate)

            enablefieldsfor80EEA();

            sanctiondate3.value = null;
            loanammount.value = null;
            propertyvalue3.value = null;
            hlinterest.value = null;
            lendername3.value = null;
            lenderpan3.value = null;
            otherlendername3.value = null;
            otherlenderpan3.value = null;

            sanctiondate3.readOnly = true;
            sanctiondate4.readOnly = true;

            autoselecteligible();
        } else {
            section_80ee.style.display = 'none';
            section_80eea.style.display = 'none';

            sanctiondate3.value = null;
            loanammount.value = null;
            propertyvalue3.value = null;
            hlinterest.value = null;
            lendername3.value = null;
            lenderpan3.value = null;
            otherlendername3.value = null;
            otherlenderpan3.value = null;


            sanctiondate4.value = null;
            havehousepropertyyes.checked = false;
            havehousepropertyno.checked = false;
            propertyvalue4.value = null;
            Eligibilityyes.checked = false;
            Eligibilityno.checked = false;

            sanctiondate3.readOnly = true;
            sanctiondate4.readOnly = true;

            if (self_limit == 350000 || !self_limit) {
                alert('self-occupied value limit up to Rs. 2,00,000.')
            }

            self_limit = 200000;
            if (Number(selfloanValue.value) > Number(self_limit)){
                selfloanValue.value = Number(self_limit)
            }
        }
    } else {
        section_80ee.style.display = 'none';
        section_80eea.style.display = 'none';

        sanctiondate3.value = null;
        loanammount.value = null;
        propertyvalue3.value = null;
        hlinterest.value = null;
        lendername3.value = null;
        lenderpan3.value = null;
        otherlendername3.value = null;
        otherlenderpan3.value = null;

        sanctiondate4.value = null;
        havehousepropertyyes.checked = false;
        havehousepropertyno.checked = false;
        propertyvalue4.value = null;
        Eligibilityyes.checked = false;
        Eligibilityno.checked = false;

        sanctiondate3.readOnly = true;
        sanctiondate4.readOnly = true;
        
        self_limit = 200000;
        if (Number(selfloanValue.value) > Number(self_limit)){
            selfloanValue.value = Number(self_limit)
        }
    }
    
}


function temp_incomeLoss_fun(){
    
    if (localStorage.getItem('formData_ilhp_itd')) {
        localStorage.removeItem('formData_ilhp_itd');
    }

    let apiUrl = "temp_incomeLoss";
    document.getElementById("form3").action = apiUrl;
    document.getElementById("form3").submit();
}


if (regimeValue == 'Old') {

    document.addEventListener("DOMContentLoaded", function () {

        var self_loan_dt = document.getElementById('self_loan_dt')
        if (self_loan_dt.value) {
            ValidateSelf_loan_dt();
        }

        var sanctiondate4 = document.getElementById('sanctiondate4');
        if (sanctiondate4){
            if (sanctiondate4.value) {
                autoselecteligible();
            }
        }

        if (document.getElementById('annualrent').value){
            validateAnnualRent();
        }

        const formData_ilhp_itd = localStorage.getItem('formData_ilhp_itd');
        if (formData_ilhp_itd) {
            const storedFormData = JSON.parse(formData_ilhp_itd);        

            var self_file = document.getElementById('self_file')

            var self_loan_dt = document.getElementById('self_loan_dt')
            var selfloan = document.getElementById('selfloan')
            var lendername1 = document.getElementById('lendername1')
            var lenderpan1 = document.getElementById('lenderpan1')
            var otherlendername1 = document.getElementById('otherlendername1')
            var otherlenderpan1 = document.getElementById('otherlenderpan1')

            

            var annualrent = document.getElementById('annualrent')
            var municipaltax = document.getElementById('municipaltax')
            var Homeinterest = document.getElementById('Homeinterest')
            var incomeloss = document.getElementById('incomeloss')
            var standerdded = document.getElementById('standerdded')
            var lendername2 = document.getElementById('lendername2')
            var lenderpan2 = document.getElementById('lenderpan2')
            var otherlendername2 = document.getElementById('otherlendername2')
            var otherlenderpan2 = document.getElementById('otherlenderpan2')

                                
            var sanctiondate3 = document.getElementById('sanctiondate3')
            var loanammount = document.getElementById('loanammount')
            var propertyvalue3 = document.getElementById('propertyvalue3')
            var hlinterest = document.getElementById('hlinterest')
            var lendername3 = document.getElementById('lendername3')
            var lenderpan3 = document.getElementById('lenderpan3')
            var otherlendername3 = document.getElementById('otherlendername3')
            var otherlenderpan3 = document.getElementById('otherlenderpan3')    
            
            

            var sanctiondate4 = document.getElementById('sanctiondate4')    
            var havehousepropertyyes = document.getElementById('havehousepropertyyes')
            var havehousepropertyno = document.getElementById('havehousepropertyno')
            var propertyvalue4 = document.getElementById('propertyvalue4')
            var Eligibilityyes = document.getElementById('Eligibilityyes')
            var Eligibilityno = document.getElementById('Eligibilityno')        
                 
            var otherincome = document.getElementById('otherincome')
            var savinginterest = document.getElementById('savinginterest')

            


            var having_pro_80eea = null;
            var elig_80eea = null;


            self_loan_dt.value = storedFormData.self_loan_dt;
            selfloan.value = storedFormData.selfloan;
            lendername1.value = storedFormData.lendername1;
            lenderpan1.value = storedFormData.lenderpan1;
            otherlendername1.value = storedFormData.otherlendername1;
            otherlenderpan1.value = storedFormData.otherlenderpan1;

            annualrent.value = storedFormData.annualrent;
            municipaltax.value = storedFormData.municipaltax;
            Homeinterest.value = storedFormData.Homeinterest;
            incomeloss.value = storedFormData.incomeloss;
            standerdded.value = storedFormData.standerdded;
            lendername2.value = storedFormData.lendername2;
            lenderpan2.value = storedFormData.lenderpan2;
            otherlendername2.value = storedFormData.otherlendername2;
            otherlenderpan2.value = storedFormData.otherlenderpan2;

            if (sanctiondate3){
                sanctiondate3.value = storedFormData.sanctiondate3;
                loanammount.value = storedFormData.loanammount;
                propertyvalue3.value = storedFormData.propertyvalue3;
                hlinterest.value = storedFormData.hlinterest;
                lendername3.value = storedFormData.lendername3;
                lenderpan3.value = storedFormData.lenderpan3;
                otherlendername3.value = storedFormData.otherlendername3;
                otherlenderpan3.value = storedFormData.otherlenderpan3;
            }
            
            if (sanctiondate4){
                sanctiondate4.value = storedFormData.sanctiondate4;
                propertyvalue4.value = storedFormData.propertyvalue4;
                if (storedFormData.having_pro_80eea == 'yes'){
                    havehousepropertyyes.checked = true;
                } else if (storedFormData.having_pro_80eea == 'no'){
                    havehousepropertyno.checked = true;
                } 
                if (storedFormData.elig_80eea == 'yes'){
                    Eligibilityyes.checked = true;
                } else if (storedFormData.elig_80eea == 'no'){
                    Eligibilityno.checked = true;
                } 
            }
            otherincome.value = storedFormData.otherincome;
            savinginterest.value = storedFormData.savinginterest;
                        
        }

    });

}

document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById('otherincome').value){
        validateOtherIncome()
    }

});