
empStartDate

var regimeValue = String(regimeValue);

var empStartDate = new Date(startdate);

var startdate = new Date(startdate);


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



var payingrentyesbtn = document.getElementById('payingrentyes');
var payingrentnobtn = document.getElementById('payingrentno');


var claimingHRAyesbtn = document.getElementById('claimingHRAyes');
var claimingHRAnobtn = document.getElementById('claimingHRAno');

var changeHRAyesbtn = document.getElementById('changeHRAyes');
var changeHRAnobtn = document.getElementById('changeHRAno');


var LandlordPAN1input = document.getElementById('LandlordPAN1');
var StartDate1input = document.getElementById('StartDate1');
var EndDate1input = document.getElementById('EndDate1');
var MonthRent1input = document.getElementById('MonthRent1');
var Pincode1input = document.getElementById('Pincode1');
var cityType1input = document.getElementById('cityType1');
var lanlordName1input = document.getElementById('lanlordName1');
var landlordContact1input = document.getElementById('landlordContact1');
var landlordAddress1input = document.getElementById('landlordAddress1');
var rentedAddress1input = document.getElementById('rentedAddress1');

var LandlordPAN1ErrorSpan = document.getElementById('LandlordPAN1Error');
var MonthRent1ErrorSpan = document.getElementById('MonthRent1Error');
var landlordContact1ErrorSpan = document.getElementById('landlordContact1Error');
var Pincode1ErrorSpan = document.getElementById('Pincode1Error');




var LandlordPAN2input = document.getElementById('LandlordPAN2');
var StartDate2input = document.getElementById('StartDate2');
var EndDate2input = document.getElementById('EndDate2');
var MonthRent2input = document.getElementById('MonthRent2');
var Pincode2input = document.getElementById('Pincode2');
var cityType2input = document.getElementById('cityType2');
var lanlordName2input = document.getElementById('lanlordName2');
var landlordContact2input = document.getElementById('landlordContact2');
var landlordAddress2input = document.getElementById('landlordAddress2');
var rentedAddress2input = document.getElementById('rentedAddress2');



var LandlordPAN2ErrorSpan = document.getElementById('LandlordPAN2Error');
var MonthRent2ErrorSpan = document.getElementById('MonthRent2Error');
var landlordContact2ErrorSpan = document.getElementById('landlordContact2Error');
var Pincode2ErrorSpan = document.getElementById('Pincode2Error');





// Form 3
var LandlordPAN3input = document.getElementById('LandlordPAN3');
var StartDate3input = document.getElementById('StartDate3');
var EndDate3input = document.getElementById('EndDate3');
var MonthRent3input = document.getElementById('MonthRent3');
var Pincode3input = document.getElementById('Pincode3');
var cityType3input = document.getElementById('cityType3');
var lanlordName3input = document.getElementById('lanlordName3');
var landlordContact3input = document.getElementById('landlordContact3');
var landlordAddress3input = document.getElementById('landlordAddress3');
var rentedAddress3input = document.getElementById('rentedAddress3');


var LandlordPAN3ErrorSpan = document.getElementById('LandlordPAN3Error');
var MonthRent3ErrorSpan = document.getElementById('MonthRent3Error');
var landlordContact3ErrorSpan = document.getElementById('landlordContact3Error');
var Pincode3ErrorSpan = document.getElementById('Pincode3Error');

// StartDate3input EndDate3input Pincode3input cityType3input
// Form 4
var LandlordPAN4input = document.getElementById('LandlordPAN4');
var StartDate4input = document.getElementById('StartDate4');
var EndDate4input = document.getElementById('EndDate4');
var MonthRent4input = document.getElementById('MonthRent4');
var Pincode4input = document.getElementById('Pincode4');
var cityType4input = document.getElementById('cityType4');
var lanlordName4input = document.getElementById('lanlordName4');
var landlordContact4input = document.getElementById('landlordContact4');
var landlordAddress4input = document.getElementById('landlordAddress4');
var rentedAddress4input = document.getElementById('rentedAddress4');



var LandlordPAN4ErrorSpan = document.getElementById('LandlordPAN4Error');
var MonthRent4ErrorSpan = document.getElementById('MonthRent4Error');
var landlordContact4ErrorSpan = document.getElementById('landlordContact4Error');
var Pincode4ErrorSpan = document.getElementById('Pincode4Error');


// Form 5
var LandlordPAN5input = document.getElementById('LandlordPAN5');
var StartDate5input = document.getElementById('StartDate5');
var EndDate5input = document.getElementById('EndDate5');
var MonthRent5input = document.getElementById('MonthRent5');
var Pincode5input = document.getElementById('Pincode5');
var cityType5input = document.getElementById('cityType5');
var lanlordName5input = document.getElementById('lanlordName5');
var landlordContact5input = document.getElementById('landlordContact5');
var landlordAddress5input = document.getElementById('landlordAddress5');
var rentedAddress5input = document.getElementById('rentedAddress5');


var LandlordPAN5ErrorSpan = document.getElementById('LandlordPAN5Error');
var MonthRent5ErrorSpan = document.getElementById('MonthRent5Error');
var landlordContact5ErrorSpan = document.getElementById('landlordContact5Error');
var Pincode5ErrorSpan = document.getElementById('Pincode5Error');





var lanlordName1ErrorSpan = document.getElementById('lanlordName1Error');
var lanlordName2ErrorSpan = document.getElementById('lanlordName2Error');
var lanlordName3ErrorSpan = document.getElementById('lanlordName3Error');
var lanlordName4ErrorSpan = document.getElementById('lanlordName4Error');
var lanlordName5ErrorSpan = document.getElementById('lanlordName5Error');


var hra_form1section = document.getElementById('hra_form1');
var hra_form2section = document.getElementById('hra_form2');





var rent_2 = document.getElementById('rent_2')
var rent_3 = document.getElementById('rent_3')
var rent_4 = document.getElementById('rent_4')
var rent_5 = document.getElementById('rent_5')





var file_upload_Section = document.getElementById('file_upload');



var edit_48_hrs1 = edit_48_hrs1;
var current_time_date1 = current_time_date1;
var currentDate1 = new Date();



edit_48_hrs1 = new Date(edit_48_hrs1)
current_time_date1 = new Date(current_time_date1)


var placeInput = document.getElementById('place');
var placeErrorSpan = document.getElementById('placeError');
var itproofcheckBox = document.getElementById('itproofcheck');




function file_upload_Section_display() {    
    file_upload_Section.style.display = 'flex';
}

function file_upload_Section_none() {    
    file_upload_Section.style.display = 'none';
}


var files_display_section = document.getElementById('files_display');

function files_display_section_display() {
    files_display_section.style.display = 'flex';
}



var ilhpyesbtn = document.getElementById('ilhpyes');
var section80oiyesbtn = document.getElementById('section80oiyes');
var section80ttayesbtn = document.getElementById('section80ttayes');
var section80dyesbtn = document.getElementById('section80dyes');

var section80dyes_mipbtn = document.getElementById('section80dyes_mip');

var section80uddselfbtn = document.getElementById('section80uddself');
var section80udddependentbtn = document.getElementById('section80udddependent');
var section80uddbothbtn = document.getElementById('section80uddboth');

var section80eeyes_80eebbtn = document.getElementById('section80eeyes_80eeb');
var section80ccdyesbtn = document.getElementById('section80ccdyes');
var section80Cyesbtn = document.getElementById('section80Cyes');





function files_display_section_none() {
    if (payingrentyesbtn.checked === true || ilhpyesbtn.checked === true || section80oiyesbtn.checked === true || section80ttayesbtn.checked === true || section80dyesbtn.checked === true || section80uddselfbtn.checked === true ||
        section80udddependentbtn.checked === true || section80uddbothbtn.checked === true || section80eeyes_80eebbtn.checked === true || section80ccdyesbtn.checked === true || section80Cyesbtn.checked === true) {
        files_display_section.style.display = 'flex';
        hra_form2section.style.display = 'flex';
    } else if (sectionyes_previousempbtn) {
        if (sectionyes_previousempbtn.checked === true) {
            files_display_section.style.display = 'flex';
            hra_form2section.style.display = 'flex';
        }
    } else {
        files_display_section.style.display = 'none';
        hra_form2section.style.display = 'none';
    }
}




function file_upload_Section() {

    if (MonthRent1input.value) {
        if ((isNaN(MonthRent1input.value) || MonthRent1input.value.includes('.') || parseFloat(MonthRent1input.value) <= 0)) {
            file_upload_Section.style.display = 'none';
            files_display_section.style.display = 'none';
        } else {
            file_upload_Section.style.display = 'flex';
            files_display_section.style.display = 'flex';
        }
    } else if (MonthRent2input.value) {
        if ((isNaN(MonthRent2input.value) || MonthRent2input.value.includes('.') || parseFloat(MonthRent2input.value) <= 0)) {
            file_upload_Section.style.display = 'none';
            files_display_section.style.display = 'none';
        } else {
            file_upload_Section.style.display = 'flex';
            files_display_section.style.display = 'flex';
        }
    } else if (MonthRent3input.value) {
        if ((isNaN(MonthRent3input.value) || MonthRent3input.value.includes('.') || parseFloat(MonthRent3input.value) <= 0)) {
            file_upload_Section.style.display = 'none';
            files_display_section.style.display = 'none';
        } else {
            file_upload_Section.style.display = 'flex';
            files_display_section.style.display = 'flex';
        }
    } else if (MonthRent4input.value) {
        if ((isNaN(MonthRent4input.value) || MonthRent4input.value.includes('.') || parseFloat(MonthRent4input.value) <= 0)) {
            file_upload_Section.style.display = 'none';
            files_display_section.style.display = 'none';
        } else {
            file_upload_Section.style.display = 'flex';
            files_display_section.style.display = 'flex';
        }
    } else if (MonthRent5input.value) {
        if ((isNaN(MonthRent5input.value) || MonthRent5input.value.includes('.') || parseFloat(MonthRent5input.value) <= 0)) {
            file_upload_Section.style.display = 'none';
            files_display_section.style.display = 'none';
        } else {
            file_upload_Section.style.display = 'flex';
            files_display_section.style.display = 'flex';
        }
    } else {
        file_upload_Section.style.display = 'none';
        files_display_section.style.display = 'none';
    }

}

function disabledbtns() {
    payingrentyesbtn.checked = false;
    payingrentnobtn.checked = true;
    changeHRAyesbtn.checked = false;
    changeHRAnobtn.checked = false;
    claimingHRAyesbtn.checked = false;
    claimingHRAnobtn.checked = false;
    file_upload_Section.style.display = 'none';
}




function disabledhraline_1() {

    if (LandlordPAN1input.value) {
        LandlordPAN1input.value = null;
    }
    if (EndDate1input.value) {
        EndDate1input.value = null;
    }
    if (MonthRent1input.value) {
        MonthRent1input.value = null;
    }
    if (Pincode1input.value) {
        Pincode1input.value = null;
    }
    if (cityType1input.value) {
        cityType1input.value = null;
    }
    if (lanlordName1input.value) {
        lanlordName1input.value = null;
    }
    if (landlordContact1input.value) {
        landlordContact1input.value = null;
    }
    if (landlordAddress1input.value) {
        landlordAddress1input.value = null;
    }
    if (rentedAddress1input.value) {
        rentedAddress1input.value = null;
    }

    LandlordPAN1ErrorSpan.textContent = '';
}

function disabledhraline_2() {

    // For Form 2
    if (LandlordPAN2input.value) {
        LandlordPAN2input.value = null;
    }
    if (StartDate2input.value) {
        StartDate2input.value = null;
    }
    if (EndDate2input.value) {
        EndDate2input.value = null;
    }
    if (MonthRent2input.value) {
        MonthRent2input.value = null;
    }
    if (Pincode2input.value) {
        Pincode2input.value = null;
    }
    if (cityType2input.value) {
        cityType2input.value = null;
    }
    if (lanlordName2input.value) {
        lanlordName2input.value = null;
    }
    if (landlordContact2input.value) {
        landlordContact2input.value = null;
    }
    if (landlordAddress2input.value) {
        landlordAddress2input.value = null;
    }
    if (rentedAddress2input.value) {
        rentedAddress2input.value = null;
    }
    LandlordPAN2ErrorSpan.textContent = '';
}

function disabledhraline_3() {

    // For Form 3
    if (LandlordPAN3input.value) {
        LandlordPAN3input.value = null;
    }
    if (StartDate3input.value) {
        StartDate3input.value = null;
    }
    if (EndDate3input.value) {
        EndDate3input.value = null;
    }
    if (MonthRent3input.value) {
        MonthRent3input.value = null;
    }
    if (Pincode3input.value) {
        Pincode3input.value = null;
    }
    if (cityType3input.value) {
        cityType3input.value = null;
    }
    if (lanlordName3input.value) {
        lanlordName3input.value = null;
    }
    if (landlordContact3input.value) {
        landlordContact3input.value = null;
    }
    if (landlordAddress3input.value) {
        landlordAddress3input.value = null;
    }
    if (rentedAddress3input.value) {
        rentedAddress3input.value = null;
    }
    LandlordPAN3ErrorSpan.textContent = '';

}

function disabledhraline_4() {

    // For Form 4
    if (LandlordPAN4input.value) {
        LandlordPAN4input.value = null;
    }
    if (StartDate4input.value) {
        StartDate4input.value = null;
    }
    if (EndDate4input.value) {
        EndDate4input.value = null;
    }
    if (MonthRent4input.value) {
        MonthRent4input.value = null;
    }
    if (Pincode4input.value) {
        Pincode4input.value = null;
    }
    if (cityType4input.value) {
        cityType4input.value = null;
    }
    if (lanlordName4input.value) {
        lanlordName4input.value = null;
    }
    if (landlordContact4input.value) {
        landlordContact4input.value = null;
    }
    if (landlordAddress4input.value) {
        landlordAddress4input.value = null;
    }
    if (rentedAddress4input.value) {
        rentedAddress4input.value = null;
    }

    LandlordPAN4ErrorSpan.textContent = '';

}

function disabledhraline_5() {
    // For Form 5
    if (LandlordPAN5input.value) {
        LandlordPAN5input.value = null;
    }
    if (StartDate5input.value) {
        StartDate5input.value = null;
    }
    if (EndDate5input.value) {
        EndDate5input.value = null;
    }
    if (MonthRent5input.value) {
        MonthRent5input.value = null;
    }
    if (Pincode5input.value) {
        Pincode5input.value = null;
    }
    if (cityType5input.value) {
        cityType5input.value = null;
    }
    if (lanlordName5input.value) {
        lanlordName5input.value = null;
    }
    if (landlordContact5input.value) {
        landlordContact5input.value = null;
    }
    if (landlordAddress5input.value) {
        landlordAddress5input.value = null;
    }
    if (rentedAddress5input.value) {
        rentedAddress5input.value = null;
    }

    LandlordPAN5ErrorSpan.textContent = '';

}


function readOnlyfalseline_1() {

    if (claimingHRAyesbtn.checked == true || claimingHRAnobtn.checked == true) {
        if (changeHRAyesbtn.checked == true || changeHRAnobtn.checked == true) {
            LandlordPAN1input.readOnly = false;
            EndDate1input.readOnly = false;
            MonthRent1input.readOnly = false;
            Pincode1input.readOnly = false;
            lanlordName1input.readOnly = false;
            landlordContact1input.readOnly = false;
            landlordAddress1input.readOnly = false;
            rentedAddress1input.readOnly = false;
        }
    }
}


function readOnlyfalseline_2() {
    LandlordPAN2input.readOnly = false;
    EndDate2input.readOnly = false;
    MonthRent2input.readOnly = false;
    Pincode2input.readOnly = false;
    lanlordName2input.readOnly = false;
    landlordContact2input.readOnly = false;
    landlordAddress2input.readOnly = false;
    rentedAddress2input.readOnly = false;
}

function readOnlyfalseline_3() {

    LandlordPAN3input.readOnly = false;
    EndDate3input.readOnly = false;
    MonthRent3input.readOnly = false;
    Pincode3input.readOnly = false;
    lanlordName3input.readOnly = false;
    landlordContact3input.readOnly = false;
    landlordAddress3input.readOnly = false;
    rentedAddress3input.readOnly = false;

}

function readOnlyfalseline_4() {

    LandlordPAN4input.readOnly = false;
    EndDate4input.readOnly = false;
    MonthRent4input.readOnly = false;
    Pincode4input.readOnly = false;
    lanlordName4input.readOnly = false;
    landlordContact4input.readOnly = false;
    landlordAddress4input.readOnly = false;
    rentedAddress4input.readOnly = false;

}

function readOnlyfalseline_5() {

    LandlordPAN5input.readOnly = false;
    EndDate5input.readOnly = false;
    MonthRent5input.readOnly = false;
    Pincode5input.readOnly = false;
    lanlordName5input.readOnly = false;
    landlordContact5input.readOnly = false;
    landlordAddress5input.readOnly = false;
    rentedAddress5input.readOnly = false;
}


function readOnlytrueline_1() {
    LandlordPAN1input.readOnly = true;
    EndDate1input.readOnly = true;
    MonthRent1input.readOnly = true;
    Pincode1input.readOnly = true;
    lanlordName1input.readOnly = true;
    landlordContact1input.readOnly = true;
    landlordAddress1input.readOnly = true;
    rentedAddress1input.readOnly = true;
}

function readOnlytrueline_2() {
    LandlordPAN2input.readOnly = true;
    EndDate2input.readOnly = true;
    MonthRent2input.readOnly = true;
    Pincode2input.readOnly = true;
    lanlordName2input.readOnly = true;
    landlordContact2input.readOnly = true;
    landlordAddress2input.readOnly = true;
    rentedAddress2input.readOnly = true;
}

function readOnlytrueline_3() {
    LandlordPAN3input.readOnly = true;
    EndDate3input.readOnly = true;
    MonthRent3input.readOnly = true;
    Pincode3input.readOnly = true;
    lanlordName3input.readOnly = true;
    landlordContact3input.readOnly = true;
    landlordAddress3input.readOnly = true;
    rentedAddress3input.readOnly = true;
}

function readOnlytrueline_4() {
    LandlordPAN4input.readOnly = true;
    EndDate4input.readOnly = true;
    MonthRent4input.readOnly = true;
    Pincode4input.readOnly = true;
    lanlordName4input.readOnly = true;
    landlordContact4input.readOnly = true;
    landlordAddress4input.readOnly = true;
    rentedAddress4input.readOnly = true;
}

function readOnlytrueline_5() {
    LandlordPAN5input.readOnly = true;
    EndDate5input.readOnly = true;
    MonthRent5input.readOnly = true;
    Pincode5input.readOnly = true;
    lanlordName5input.readOnly = true;
    landlordContact5input.readOnly = true;
    landlordAddress5input.readOnly = true;
    rentedAddress5input.readOnly = true;
}






var Fathername = String(Fathername).toLowerCase();

function ValidateFatherName() {
    var fathernameValue = document.getElementById('fathername').value;
    var isyourpanyesbtn = document.getElementById('isyourpanyes');
    var isyourpannobtn = document.getElementById('isyourpanno');

    var fathernameErrorSpan = document.getElementById('fathernameError');

    var submissionsection = document.getElementById('submission');

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (fathernameValue) {
        if (!alphabetPattern.test(fathernameValue)) {
            isyourpanyesbtn.disabled = true;
            isyourpannobtn.disabled = true;
            isyourpanyesbtn.checked = false;
            isyourpannobtn.checked = false;
            submissionsection.style.display = 'none';
            hra_form1section.style.display = 'none';
            hra_form2section.style.display = 'none';
            fathernameErrorSpan.textContent = 'Name should contain only alphabets.';
            disabledbtns();
            disabledhraline_1();
            disabledhraline_2();
            disabledhraline_3();
            disabledhraline_4();
            disabledhraline_5();
            readOnlytrueline_1();

        } else {
            fathernameErrorSpan.textContent = "";
            isyourpanyesbtn.disabled = false;
            isyourpannobtn.disabled = false;
        }
    } else {
        isyourpanyesbtn.disabled = true;
        isyourpannobtn.disabled = true;
        isyourpanyesbtn.checked = false;
        isyourpannobtn.checked = false;
        submissionsection.style.display = 'none';
        hra_form1section.style.display = 'none';
        hra_form2section.style.display = 'none';
        fathernameErrorSpan.textContent = '';
        disabledbtns();
        disabledhraline_1();
        disabledhraline_2();
        disabledhraline_3();
        disabledhraline_4();
        disabledhraline_5();

    }

}

var ispanvalue

function Validateisyourpan(isyourpan) {
    var submissionsection = document.getElementById('submission');
    ispanvalue = isyourpan
    if (ispanvalue) {
        if (ispanvalue == 'yes') {
            submissionsection.style.display = 'block';
        } else {
            submissionsection.style.display = 'block';
            alert('Kindly Update PAN in Workday Immediately ')
        }
    } else {
        submissionsection.style.display = 'none';
    }
}

function Validateisyourpan_2(isyourpan) {
    var submissionsection = document.getElementById('submission');
    ispanvalue = isyourpan
    if (ispanvalue) {
        if (ispanvalue == 'yes') {
            submissionsection.style.display = 'block';
        } else {
            submissionsection.style.display = 'block';
        }
    } else {
        submissionsection.style.display = 'none';
    }
}





function Validateisyourpan_3(isyourpan) {
    var isyourpanyesbtn = document.getElementById('isyourpanyes');
    var isyourpannobtn = document.getElementById('isyourpanno');
    var submissionsection = document.getElementById('submission');
    ispanvalue = isyourpan
    if (ispanvalue) {
        if (ispanvalue == 'yes') {
            isyourpanyesbtn.checked = true;
            submissionsection.style.display = 'block';
        } else {
            isyourpannobtn.checked = true;
            submissionsection.style.display = 'block';
        }
    } else {
        submissionsection.style.display = 'none';
    }
}



function checkInputsAndEnableButton() {

    var landlordPAN1 = LandlordPAN1input.value;
    var startDate1 = StartDate1input.value;
    var endDate1 = EndDate1input.value;
    var monthrent1 = MonthRent1input.value;
    var pincode1 = Pincode1input.value;
    var cityType1 = cityType1input.value;
    var landlordName1 = lanlordName1input.value;
    var landlordContact1 = landlordContact1input.value;
    var landlordAddress1 = landlordAddress1input.value;
    var rentedAddress1 = rentedAddress1input.value;

    var LandlordPAN1ErrorSpan = document.getElementById('LandlordPAN1Error');



    if (current_time_date1 > edit_48_hrs1) {
        document.getElementById('addbtn1').disabled = true;
    } else if (startDate1 && endDate1) {
        if (monthrent1 === '' || monthrent1 == 0) {
            document.getElementById('addbtn1').disabled = false;
        } else if (pincode1 && cityType1 && landlordName1 && landlordPAN1 && monthrent1 > 0 &&
            landlordAddress1 && rentedAddress1 && LandlordPAN1ErrorSpan.textContent === '' && MonthRent1ErrorSpan.textContent === '' &&
            lanlordName1ErrorSpan.textContent === '' && landlordContact1ErrorSpan.textContent === '') {
            document.getElementById('addbtn1').disabled = false;
        } else {
            document.getElementById('addbtn1').disabled = true;
        }
        display_save1btn();
        display_submit();
        disable_btns();

    } else {
        document.getElementById('addbtn1').disabled = true;
    }




}

// Attach the function to the 'input' event for all relevant fields
function ValidatePan1() {
    var LandlordPAN1 = document.getElementById('LandlordPAN1');
    var LandlordPAN1ErrorSpan = document.getElementById('LandlordPAN1Error');

    var inputPAN = LandlordPAN1.value.toUpperCase(); // Convert input to uppercase
    LandlordPAN1.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            LandlordPAN1ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
            checkInputsAndEnableButton();
        } else {
            LandlordPAN1ErrorSpan.textContent = '';
            checkInputsAndEnableButton();
        }
    } else {
        LandlordPAN1ErrorSpan.textContent = '';
        checkInputsAndEnableButton();
    }
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}





document.addEventListener("DOMContentLoaded", function () {
    if (startdate <= financialYearStart) {
        StartDate1input.value = formatDate(financialYearStart);
    } else {
        StartDate1input.value = formatDate(startdate);
    }
});


function ValidateEndDate1() {
    var EndDate1value = document.getElementById('EndDate1').value;
    var EndDate1valueNew = new Date(EndDate1value);
    var StartDate1inputNew = new Date(StartDate1input.value);

    if (EndDate1valueNew) {
        if (EndDate1valueNew >= financialYearEnd) {
            EndDate1value = formatDate(financialYearEnd);
            document.getElementById('EndDate1').value = EndDate1value;
            addbtn1.style.display = 'none';
            checkInputsAndEnableButton();
            alert('Select date for current financial year only');
        } else if (EndDate1valueNew <= StartDate1inputNew) {

            StartDate1inputNew.setDate(StartDate1inputNew.getDate() + 1);
            EndDate1value = formatDate(StartDate1inputNew);
            document.getElementById('EndDate1').value = EndDate1value;
            addbtn1.style.display = 'inline-block';
            checkInputsAndEnableButton();
            alert('End Date can not be less than start date in Rent-1');
        } else {
            addbtn1.style.display = 'inline-block';
            checkInputsAndEnableButton();
        }
        checkInputsAndEnableButton();
    }

}




function ValidateMonthRent1() {

    var MonthRent1ErrorSpan = document.getElementById('MonthRent1Error');
    if (MonthRent1input.value) {

        if (isNaN(MonthRent1input.value) || MonthRent1input.value.includes('.') || parseFloat(MonthRent1input.value) < 0) {
            MonthRent1ErrorSpan.textContent = 'Rent should be valid positive integer.'
            file_upload_Section_none();
            checkInputsAndEnableButton();
        } else if (MonthRent1input.value == 0) {
            MonthRent1ErrorSpan.textContent = ''
            // file_upload_Section_none();
            checkInputsAndEnableButton();
        } else if (MonthRent1input.value > 0) {
            MonthRent1ErrorSpan.textContent = ''
            file_upload_Section_display();
            files_display_section_display();
            checkInputsAndEnableButton();
        } else {
            checkInputsAndEnableButton();
        }
    } else {
        MonthRent1ErrorSpan.textContent = ''
        file_upload_Section_none();
        checkInputsAndEnableButton();
    }

}

var pincodelst = [110, 4000, 6000, 7000]

function ValidatePincode1() {

    var cityType1 = document.getElementById('cityType1');
    var pincode1Input = document.getElementById('Pincode1');
    var pincode1 = pincode1Input.value;

    pincode1 = pincode1.replace(/\D/g, '');
    if (pincode1.length > 6) {
        pincode1 = pincode1.substring(0, 6);
    }

    pincode1Input.value = pincode1;
    var pincode1InputValue = pincode1Input.value
    if (pincode1InputValue) {
        if (pincode1InputValue.length == 6) {
            var found = pincodelst.some(function (pin) {
                return pincode1InputValue.startsWith(pin);
            });
            if (found) {
                cityType1.value = 'METRO';
                Pincode1ErrorSpan.textContent = ''
                checkInputsAndEnableButton();

            } else {
                cityType1.value = 'NON-METRO';
                Pincode1ErrorSpan.textContent = ''
                checkInputsAndEnableButton();
            }

        } else {
            cityType1.value = null;
            Pincode1ErrorSpan.textContent = 'invalid pincode'
            checkInputsAndEnableButton();
        }
    } else {
        cityType1.value = null;
        Pincode1ErrorSpan.textContent = ''
        checkInputsAndEnableButton();
    }

}




function validateLanlordName1() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (lanlordName1input.value) {
        if (!alphabetPattern.test(lanlordName1input.value)) {
            lanlordName1ErrorSpan.textContent = "Name should contain only alphabets.";
            checkInputsAndEnableButton();
        } else {
            lanlordName1ErrorSpan.textContent = "";
            checkInputsAndEnableButton();
        }
    } else {
        lanlordName1ErrorSpan.textContent = "";
        checkInputsAndEnableButton();
    }

}





var mobile_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]



function validatelandlordContact1() {
    if (landlordContact1input.value) {

        landlordContact1input.value = landlordContact1input.value.replace(/\D/g, '');
        if (landlordContact1input.value.length > 10) {
            landlordContact1input.value = landlordContact1input.value.substring(0, 10);
        }

        if (landlordContact1input.value.length == 10) {
            if (mobile_list.includes(parseInt(landlordContact1input.value[0]))) {
                landlordContact1ErrorSpan.textContent = "";
                checkInputsAndEnableButton();
            } else {
                landlordContact1ErrorSpan.textContent = "Invalid contact.";
                checkInputsAndEnableButton();
            }
        } else {
            landlordContact1ErrorSpan.textContent = "Invalid contact.";
            checkInputsAndEnableButton();
        }       

    } else {
        landlordContact1ErrorSpan.textContent = "";
        checkInputsAndEnableButton();
    }

}

document.getElementById('landlordAddress1').addEventListener('input', function () {
    checkInputsAndEnableButton();

});

document.getElementById('rentedAddress1').addEventListener('input', function () {
    checkInputsAndEnableButton();

});

// Call the function on page load to set the initial state of the button
checkInputsAndEnableButton();




var addbtn1 = document.getElementById('addbtn1')
var addbtn2 = document.getElementById('addbtn2')
var addbtn3 = document.getElementById('addbtn3')
var addbtn4 = document.getElementById('addbtn4')


var cancelbtn2 = document.getElementById('cancelbtn2')
var cancelbtn3 = document.getElementById('cancelbtn3')
var cancelbtn4 = document.getElementById('cancelbtn4')
var cancelbtn5 = document.getElementById('cancelbtn5')




var payingrentValue

function Validatepayingrent(payingrent) {
    
    var hra_form1section = document.getElementById('hra_form1');
    payingrentValue = payingrent
    if (payingrentValue) {
        if (payingrentValue == 'yes') {
            
            hra_form1section.style.display = 'table-row';
            if (StartDate2input.value) {
                rent_2.style.display = 'table-row';
                addbtn1.style.display = 'none';
                readOnlytrueline_1();
            }
            if (StartDate3input.value) {
                rent_3.style.display = 'table-row';
                addbtn2.style.display = 'none';
                readOnlytrueline_2();
            }
            if (StartDate4input.value) {
                rent_4.style.display = 'table-row';
                addbtn3.style.display = 'none';
                readOnlytrueline_3();
            }
            if (StartDate5input.value) {
                rent_5.style.display = 'table-row';
                addbtn4.style.display = 'none';
                readOnlytrueline_4();
            }

        } else {
            
            hra_form1section.style.display = 'none';
            rent_2.style.display = 'none';
            rent_3.style.display = 'none';
            rent_4.style.display = 'none';
            rent_5.style.display = 'none';
            disabledhraline_1();
            disabledhraline_2();
            disabledhraline_3();
            disabledhraline_4();
            disabledhraline_5();

            disabledbtns();

            if (localStorage.getItem('HRA_form_formData')) {
                localStorage.removeItem('HRA_form_formData');
            }
        }
    } else {
        hra_form1section.style.display = 'none';
        rent_2.style.display = 'none';
        rent_3.style.display = 'none';
        rent_4.style.display = 'none';
        rent_5.style.display = 'none';
        disabledhraline_1();
        disabledhraline_2();
        disabledhraline_3();
        disabledhraline_4();
        disabledhraline_5();
        file_upload_Section_none();

        disabledbtns();        
    }
    save_father_ispan();
    display_save1btn();
    display_submit();
    files_display_section_none();
    disable_btns();

}


var changeHRAValue = null

var claimingHRAValue = null



function hRA_Validation() {

    var EndDate1input = document.getElementById('EndDate1');
    var addbtn1btn = document.getElementById('addbtn1');

    if (changeHRAValue && claimingHRAValue) {
        if (changeHRAValue == 'yes' && claimingHRAValue == 'yes') {
            EndDate1input.readOnly = false;
            EndDate1input.value = null
            addbtn1btn.style.display = 'inline-block';
            readOnlyfalseline_1();
            checkInputsAndEnableButton();
        } else if (changeHRAValue == 'no' && claimingHRAValue == 'yes') {

            EndDate1input.value = formatDate(financialYearEnd);
            addbtn1btn.style.display = 'none';

            if (rent_2.style.display = 'table-row') {
                rent_2.style.display = 'none';
            }
            if (rent_3.style.display = 'table-row') {
                rent_3.style.display = 'none';
            }
            if (rent_4.style.display = 'table-row') {
                rent_4.style.display = 'none';
            }
            if (rent_5.style.display = 'table-row') {
                rent_5.style.display = 'none';
            }

            readOnlyfalseline_1();
            disabledhraline_2();
            disabledhraline_3();
            disabledhraline_4();
            disabledhraline_5();
            checkInputsAndEnableButton();

            EndDate1input.readOnly = true;
        } else if (changeHRAValue == 'yes' && claimingHRAValue == 'no') {
            EndDate1input.readOnly = false;
            EndDate1input.value = null
            addbtn1btn.style.display = 'inline-block';
            readOnlyfalseline_1();
            checkInputsAndEnableButton();
        } else if (changeHRAValue == 'no' && claimingHRAValue == 'no') {
            EndDate1input.readOnly = false;
            EndDate1input.value = null
            addbtn1btn.style.display = 'inline-block';
            readOnlyfalseline_1();
            checkInputsAndEnableButton();
        }

    }
    display_save1btn();
    display_submit();
    disable_btns();
}



function ValidateClaimingHRA(claimingHRA) {
    claimingHRAValue = claimingHRA
    hRA_Validation();
}

function ValidatechangeHRA(changeHRA) {
    changeHRAValue = changeHRA
    hRA_Validation();
}



function hRA_Validation_2() {

    var EndDate1input = document.getElementById('EndDate1');
    var addbtn1btn = document.getElementById('addbtn1');

    if (changeHRAValue && claimingHRAValue) {
        if (changeHRAValue == 'yes' && claimingHRAValue == 'yes') {
            EndDate1input.readOnly = false;
            // EndDate1input.value = null
            addbtn1btn.style.display = 'inline-block';
            readOnlyfalseline_1();
            checkInputsAndEnableButton();
        } else if (changeHRAValue == 'no' && claimingHRAValue == 'yes') {

            EndDate1input.value = formatDate(financialYearEnd);
            addbtn1btn.style.display = 'none';

            if (rent_2.style.display = 'table-row') {
                rent_2.style.display = 'none';
            }
            if (rent_3.style.display = 'table-row') {
                rent_3.style.display = 'none';
            }
            if (rent_4.style.display = 'table-row') {
                rent_4.style.display = 'none';
            }
            if (rent_5.style.display = 'table-row') {
                rent_5.style.display = 'none';
            }

            readOnlyfalseline_1();
            disabledhraline_2();
            disabledhraline_3();
            disabledhraline_4();
            disabledhraline_5();
            checkInputsAndEnableButton();

            EndDate1input.readOnly = true;
        } else if (changeHRAValue == 'yes' && claimingHRAValue == 'no') {
            EndDate1input.readOnly = false;
            // EndDate1input.value = null
            addbtn1btn.style.display = 'inline-block';
            readOnlyfalseline_1();
            checkInputsAndEnableButton();
        } else if (changeHRAValue == 'no' && claimingHRAValue == 'no') {
            EndDate1input.readOnly = false;
            // EndDate1input.value = null
            addbtn1btn.style.display = 'inline-block';
            readOnlyfalseline_1();
            checkInputsAndEnableButton();
        }

    }
    display_save1btn();
    display_submit();
    disable_btns();
}

function ValidateClaimingHRA1(claimingHRA) {
    claimingHRAValue = claimingHRA
    hRA_Validation_2();
}

function ValidatechangeHRA1(changeHRA) {
    changeHRAValue = changeHRA
    hRA_Validation_2();
}




function addbtn1fun() {

    if (addbtn1.disabled == false) {
        rent_2.style.display = 'table-row';
        addbtn1.style.display = 'none';

        var endDate1Value = EndDate1input.value;
        var endDate1 = new Date(endDate1Value);
        endDate1.setDate(endDate1.getDate() + 1);
        var nextDayDate1 = formatDate(endDate1);
        StartDate2input.value = nextDayDate1;
        readOnlytrueline_1();

    } else {
        if (!LandlordPAN1input.value) {
            LandlordPAN1input.setCustomValidity("Please fill this field");
            LandlordPAN1input.reportValidity();
        } else if (!EndDate1input.value) {
            EndDate1input.setCustomValidity("Please fill this field");
            EndDate1input.reportValidity();
        } else if (!MonthRent1input.value) {
            MonthRent1input.setCustomValidity("Please fill this field");
            MonthRent1input.reportValidity();
        } else if (!Pincode1input.value) {
            Pincode1input.setCustomValidity("Please fill this field");
            Pincode1input.reportValidity();
        } else if (!lanlordName1input.value) {
            lanlordName1input.setCustomValidity("Please fill this field");
            lanlordName1input.reportValidity();
        } else if (!landlordContact1input.value) {
            landlordContact1input.setCustomValidity("Please fill this field");
            landlordContact1input.reportValidity();
        } else if (!landlordAddress1input.value) {
            landlordAddress1input.setCustomValidity("Please fill this field");
            landlordAddress1input.reportValidity();
        } else if (!rentedAddress1input.value) {
            rentedAddress1input.setCustomValidity("Please fill this field");
            rentedAddress1input.reportValidity();
        }
    }
    display_save1btn();
    display_submit();
    disable_btns();
}




function checkInputsAndEnableButton2() {
    var LandlordPAN2 = LandlordPAN2input.value;
    var startDate2 = StartDate2input.value;
    var endDate2 = EndDate2input.value;
    var monthrent2 = MonthRent2input.value;
    var pincode2 = Pincode2input.value;
    var cityType2 = cityType2input.value;
    var landlordName2 = lanlordName2input.value;
    var landlordContact2 = landlordContact2input.value;
    var landlordAddress2 = landlordAddress2input.value;
    var rentedAddress2 = rentedAddress2input.value;

    var LandlordPAN2ErrorSpan = document.getElementById('LandlordPAN2Error');

    if (current_time_date1 > edit_48_hrs1) {
        document.getElementById('addbtn2').disabled = true;
        document.getElementById('cancelbtn2').disabled = true;
    } else if (startDate2 && endDate2) {
        if (monthrent2 === '' || monthrent2 == 0) {
            document.getElementById('addbtn2').disabled = false;
            document.getElementById('cancelbtn2').disabled = false;
        } else {
            if (pincode2 && cityType2 && landlordName2 && LandlordPAN2 && monthrent2 > 0 &&
                landlordAddress2 && rentedAddress2 && LandlordPAN2ErrorSpan.textContent === '' && MonthRent2ErrorSpan.textContent === '' &&
                lanlordName2ErrorSpan.textContent === '' && landlordContact2ErrorSpan.textContent === '') {
                document.getElementById('addbtn2').disabled = false;
                document.getElementById('cancelbtn2').disabled = false;

            } else {
                document.getElementById('addbtn2').disabled = true;
                document.getElementById('cancelbtn2').disabled = false;

            }
        }
        display_save1btn();
        display_submit();
        disable_btns();
    } else {
        document.getElementById('addbtn2').disabled = true;
        document.getElementById('cancelbtn2').disabled = false;
    }
}


function ValidatePan2() {
    var LandlordPAN2 = document.getElementById('LandlordPAN2');
    var LandlordPAN2ErrorSpan = document.getElementById('LandlordPAN2Error');

    var inputPAN = LandlordPAN2.value.toUpperCase(); // Convert input to uppercase
    LandlordPAN2.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;
    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            LandlordPAN2ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
            checkInputsAndEnableButton2();
        } else {
            LandlordPAN2ErrorSpan.textContent = '';
            checkInputsAndEnableButton2();
        }
    } else {
        LandlordPAN2ErrorSpan.textContent = '';
        checkInputsAndEnableButton2();
    }

}

document.getElementById('StartDate2').addEventListener('input', checkInputsAndEnableButton2);



function ValidateEndDate2() {
    var EndDate2value = document.getElementById('EndDate2').value;
    var EndDate2valueNew = new Date(EndDate2value);
    var StartDate2inputNew = new Date(StartDate2input.value)
    if (EndDate2valueNew) {
        if (EndDate2valueNew >= financialYearEnd) {
            EndDate2value = formatDate(financialYearEnd);
            document.getElementById('EndDate2').value = EndDate2value;
            addbtn2.style.display = 'none';
            checkInputsAndEnableButton2();
            alert('Select date for current financial year only');
        } else if (StartDate2inputNew >= EndDate2valueNew) {
            StartDate2inputNew.setDate(StartDate2inputNew.getDate() + 1);
            EndDate2value = formatDate(StartDate2inputNew);
            document.getElementById('EndDate2').value = EndDate2value;
            checkInputsAndEnableButton2();
            addbtn2.style.display = 'inline-block';
            alert('End Date can not be less than start date in Rent-2');
        } else {
            addbtn2.style.display = 'inline-block';
            checkInputsAndEnableButton2();
        }
        checkInputsAndEnableButton2();
    }

}





function ValidateMonthRent2() {

    var MonthRent2ErrorSpan = document.getElementById('MonthRent2Error');
    if (MonthRent2input.value) {

        if (isNaN(MonthRent2input.value) || MonthRent2input.value.includes('.') || parseFloat(MonthRent2input.value) < 0) {
            MonthRent2ErrorSpan.textContent = 'Rent should be valid positive integer.'
            file_upload_Section_none();

            checkInputsAndEnableButton2();
        } else if (MonthRent2input.value == 0) {
            MonthRent2ErrorSpan.textContent = ''
            // file_upload_Section_none();
            checkInputsAndEnableButton2();
        } else if (MonthRent2input.value > 0) {
            MonthRent2ErrorSpan.textContent = ''
            file_upload_Section_display();
            files_display_section_display();
            checkInputsAndEnableButton2();
        }
    } else {
        MonthRent2ErrorSpan.textContent = ''
        ValidateMonthRent1();
        checkInputsAndEnableButton2();
    }

}





function ValidatePincode2() {

    var cityType2 = document.getElementById('cityType2');
    var pincode2Input = document.getElementById('Pincode2');
    var pincode2 = pincode2Input.value;

    pincode2 = pincode2.replace(/\D/g, '');
    if (pincode2.length > 6) {
        pincode2 = pincode2.substring(0, 6);
    }
    pincode2Input.value = pincode2;
    var pincode2InputValue = pincode2Input.value
    if (pincode2InputValue) {
        if (pincode2InputValue.length == 6) {
            var found = pincodelst.some(function (pin) {
                return pincode2InputValue.startsWith(pin);
            });
            if (found) {
                cityType2.value = 'METRO';
                Pincode2ErrorSpan.textContent = ''
                checkInputsAndEnableButton2();

            } else {
                cityType2.value = 'NON-METRO';
                Pincode2ErrorSpan.textContent = ''
                checkInputsAndEnableButton2();
            }

        } else {
            cityType2.value = null;
            Pincode2ErrorSpan.textContent = 'invalid pincode'
            checkInputsAndEnableButton2();
        }
    } else {
        cityType2.value = null;
        Pincode2ErrorSpan.textContent = ''
        checkInputsAndEnableButton2();
    }

}




function validateLanlordName2() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (lanlordName2input.value) {
        if (!alphabetPattern.test(lanlordName2input.value)) {
            lanlordName2ErrorSpan.textContent = "Name should contain only alphabets.";
            checkInputsAndEnableButton2();
        } else {
            lanlordName2ErrorSpan.textContent = "";
            checkInputsAndEnableButton2();
        }
    } else {
        lanlordName2ErrorSpan.textContent = "";
        checkInputsAndEnableButton2();
    }

}


function validatelandlordContact2() {
    if (landlordContact2input.value) {

        landlordContact2input.value = landlordContact2input.value.replace(/\D/g, '');
        if (landlordContact2input.value.length > 10) {
            landlordContact2input.value = landlordContact2input.value.substring(0, 10);
        }
        if (landlordContact2input.value.length == 10) {
            if (mobile_list.includes(parseInt(landlordContact2input.value[0]))) {
                landlordContact2ErrorSpan.textContent = "";
                checkInputsAndEnableButton2();
            } else {
                landlordContact2ErrorSpan.textContent = "Invalid contact.";
                checkInputsAndEnableButton2();
            }
        } else {
            landlordContact2ErrorSpan.textContent = "Invalid contact.";
            checkInputsAndEnableButton2();
        }

    } else {
        landlordContact2ErrorSpan.textContent = "";
        checkInputsAndEnableButton2();
    }

}


document.getElementById('landlordAddress2').addEventListener('input', function () {
    checkInputsAndEnableButton2();

});
document.getElementById('rentedAddress2').addEventListener('input', function () {
    checkInputsAndEnableButton2();

});

checkInputsAndEnableButton2();




function addbtn2fun() {
    if (addbtn2.disabled == false) {
        rent_3.style.display = 'table-row';
        addbtn2.style.display = 'none';
        cancelbtn2.style.display = 'none';

        var endDate2Value = EndDate2input.value;
        var endDate2 = new Date(endDate2Value);
        endDate2.setDate(endDate2.getDate() + 1);
        var nextDayDate2 = formatDate(endDate2);
        StartDate3input.value = nextDayDate2;
        readOnlytrueline_2();

    } else {
        if (!LandlordPAN2input.value) {
            LandlordPAN2input.setCustomValidity("Please fill this field");
            LandlordPAN2input.reportValidity();
        } else if (!EndDate2input.value) {
            EndDate2input.setCustomValidity("Please fill this field");
            EndDate2input.reportValidity();
        } else if (!MonthRent2input.value) {
            MonthRent2input.setCustomValidity("Please fill this field");
            MonthRent2input.reportValidity();
        } else if (!Pincode2input.value) {
            Pincode2input.setCustomValidity("Please fill this field");
            Pincode2input.reportValidity();
        } else if (!lanlordName2input.value) {
            lanlordName2input.setCustomValidity("Please fill this field");
            lanlordName2input.reportValidity();
        } else if (!landlordContact2input.value) {
            landlordContact2input.setCustomValidity("Please fill this field");
            landlordContact2input.reportValidity();
        } else if (!landlordAddress2input.value) {
            landlordAddress2input.setCustomValidity("Please fill this field");
            landlordAddress2input.reportValidity();
        } else if (!rentedAddress2input.value) {
            rentedAddress2input.setCustomValidity("Please fill this field");
            rentedAddress2input.reportValidity();
        }
    }
    display_submit();
    disable_btns();
    display_save1btn();

}




function checkInputsAndEnableButton3() {
    var LandlordPAN3 = LandlordPAN3input.value;
    var startDate3 = StartDate3input.value;
    var endDate3 = EndDate3input.value;
    var monthrent3 = MonthRent3input.value;
    var pincode3 = Pincode3input.value;
    var cityType3 = cityType3input.value;
    var landlordName3 = lanlordName3input.value;
    var landlordContact3 = landlordContact3input.value;
    var landlordAddress3 = landlordAddress3input.value;
    var rentedAddress3 = rentedAddress3input.value;

    var LandlordPAN3ErrorSpan = document.getElementById('LandlordPAN3Error');


    if (current_time_date1 > edit_48_hrs1) {

        document.getElementById('addbtn3').disabled = true;
        document.getElementById('cancelbtn3').disabled = true;
    } else if (startDate3 && endDate3) {
        if (monthrent3 === '' || monthrent3 == 0) {
            document.getElementById('addbtn3').disabled = false;
            document.getElementById('cancelbtn3').disabled = false;

        } else {
            if (pincode3 && cityType3 && landlordName3 && LandlordPAN3 && monthrent3 > 0 &&
                landlordAddress3 && rentedAddress3 && LandlordPAN3ErrorSpan.textContent === '' && MonthRent3ErrorSpan.textContent === '' &&
                lanlordName3ErrorSpan.textContent === '' && landlordContact3ErrorSpan.textContent === '') {
                document.getElementById('addbtn3').disabled = false;
                document.getElementById('cancelbtn3').disabled = false;

            } else {
                document.getElementById('addbtn3').disabled = true;
                document.getElementById('cancelbtn3').disabled = false;

            }
        }
        display_submit();
        disable_btns();
        display_save1btn();
    } else {
        document.getElementById('addbtn3').disabled = true;
        document.getElementById('cancelbtn3').disabled = false;

    }

}


function ValidatePan3() {
    var LandlordPAN3 = document.getElementById('LandlordPAN3');
    var LandlordPAN3ErrorSpan = document.getElementById('LandlordPAN3Error');

    var inputPAN = LandlordPAN3.value.toUpperCase(); // Convert input to uppercase
    LandlordPAN3.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            LandlordPAN3ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
            checkInputsAndEnableButton3();
        } else {
            LandlordPAN3ErrorSpan.textContent = '';
            checkInputsAndEnableButton3();
        }
    } else {
        LandlordPAN3ErrorSpan.textContent = '';
        checkInputsAndEnableButton3();
    }
}

document.getElementById('StartDate3').addEventListener('input', checkInputsAndEnableButton3);


function ValidateEndDate3() {
    var EndDate3value = document.getElementById('EndDate3').value;
    var EndDate3valueNew = new Date(EndDate3value);
    var StartDate3inputNew = new Date(StartDate3input.value)
    if (EndDate3valueNew) {
        if (EndDate3valueNew >= financialYearEnd) {
            EndDate3value = formatDate(financialYearEnd);
            document.getElementById('EndDate3').value = EndDate3value;
            addbtn3.style.display = 'none';
            checkInputsAndEnableButton3();
            alert('Select date for current financial year only');
        } else if (StartDate3inputNew >= EndDate3valueNew) {
            StartDate3inputNew.setDate(StartDate3inputNew.getDate() + 1);
            EndDate3value = formatDate(StartDate3inputNew);
            document.getElementById('EndDate3').value = EndDate3value;
            addbtn3.style.display = 'inline-block';
            checkInputsAndEnableButton3();
            alert('End Date can not be less than start date in Rent-3');

        } else {
            addbtn3.style.display = 'inline-block';
            checkInputsAndEnableButton3();
        }
        checkInputsAndEnableButton3();
    }
}


function ValidateMonthRent3() {

    var MonthRent3ErrorSpan = document.getElementById('MonthRent3Error');
    if (MonthRent3input.value) {
        if (isNaN(MonthRent3input.value) || MonthRent3input.value.includes('.') || parseFloat(MonthRent3input.value) < 0) {
            MonthRent3ErrorSpan.textContent = 'Rent should be positive integer.'
            file_upload_Section_none();
            checkInputsAndEnableButton3();
        } else if (MonthRent3input.value == 0) {
            MonthRent3ErrorSpan.textContent = ''
            // file_upload_Section_none();
            checkInputsAndEnableButton3();
        } else if (MonthRent3input.value > 0) {
            MonthRent3ErrorSpan.textContent = ''
            file_upload_Section_display();
            files_display_section_display();
            checkInputsAndEnableButton3();
        }
    } else {
        MonthRent3ErrorSpan.textContent = ''
        ValidateMonthRent1();
        ValidateMonthRent2();
        checkInputsAndEnableButton3();
    }
}



function ValidatePincode3() {

    var cityType3 = document.getElementById('cityType3');
    var pincode3Input = document.getElementById('Pincode3');
    var pincode3 = pincode3Input.value;

    pincode3 = pincode3.replace(/\D/g, '');
    if (pincode3.length > 6) {
        pincode3 = pincode3.substring(0, 6);
    }
    pincode3Input.value = pincode3;
    var pincode3InputValue = pincode3Input.value
    if (pincode3InputValue) {
        if (pincode3InputValue.length == 6) {
            var found = pincodelst.some(function (pin) {
                return pincode3InputValue.startsWith(pin);
            });
            if (found) {
                cityType3.value = 'METRO';
                Pincode3ErrorSpan.textContent = ''
                checkInputsAndEnableButton3();

            } else {
                cityType3.value = 'NON-METRO';
                Pincode3ErrorSpan.textContent = ''
                checkInputsAndEnableButton3();
            }

        } else {
            cityType3.value = null;
            Pincode3ErrorSpan.textContent = 'invalid pincode'
            checkInputsAndEnableButton3();
        }
    } else {
        cityType3.value = null;
        Pincode3ErrorSpan.textContent = ''
        checkInputsAndEnableButton3();

    }
}



function validateLanlordName3() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (lanlordName3input.value) {
        if (!alphabetPattern.test(lanlordName3input.value)) {
            lanlordName3ErrorSpan.textContent = "Name should contain only alphabets.";
            checkInputsAndEnableButton3();
        } else {
            lanlordName3ErrorSpan.textContent = "";
            checkInputsAndEnableButton3();
        }
    } else {
        lanlordName3ErrorSpan.textContent = "";
        checkInputsAndEnableButton3();
    }
}


function validatelandlordContact3() {
    if (landlordContact3input.value) {

        console.log('landlordContact3input', landlordContact3input.value)
        landlordContact3input.value = landlordContact3input.value.replace(/\D/g, '');
        if (landlordContact3input.value.length > 10) {
            landlordContact3input.value = landlordContact3input.value.substring(0, 10);
        }
        if (landlordContact3input.value.length == 10) {
            if (mobile_list.includes(parseInt(landlordContact3input.value[0]))) {
                landlordContact3ErrorSpan.textContent = "";
                checkInputsAndEnableButton3();
            } else {
                landlordContact3ErrorSpan.textContent = "Invalid contact.";
                checkInputsAndEnableButton3();
            }
        } else {
            landlordContact3ErrorSpan.textContent = "Invalid contact.";
            checkInputsAndEnableButton3();
        }    
    } else {
        landlordContact3ErrorSpan.textContent = "";
        checkInputsAndEnableButton3();
    }
}

document.getElementById('landlordAddress3').addEventListener('input', function () {
    checkInputsAndEnableButton3();

});
document.getElementById('rentedAddress3').addEventListener('input', function () {
    checkInputsAndEnableButton3();

});

checkInputsAndEnableButton3();





function addbtn3fun() {

    if (addbtn3.disabled == false) {
        rent_4.style.display = 'table-row';
        addbtn3.style.display = 'none';
        cancelbtn3.style.display = 'none';

        var endDate3Value = EndDate3input.value;
        var endDate3 = new Date(endDate3Value);
        endDate3.setDate(endDate3.getDate() + 1);
        var nextDayDate3 = formatDate(endDate3);
        StartDate4input.value = nextDayDate3;
        readOnlytrueline_3();


    } else {
        if (!LandlordPAN3input.value) {
            LandlordPAN3input.setCustomValidity("Please fill this field");
            LandlordPAN3input.reportValidity();
        } else if (!EndDate3input.value) {
            EndDate3input.setCustomValidity("Please fill this field");
            EndDate3input.reportValidity();
        } else if (!MonthRent3input.value) {
            MonthRent3input.setCustomValidity("Please fill this field");
            MonthRent3input.reportValidity();
        } else if (!Pincode3input.value) {
            Pincode3input.setCustomValidity("Please fill this field");
            Pincode3input.reportValidity();
        } else if (!lanlordName3input.value) {
            lanlordName3input.setCustomValidity("Please fill this field");
            lanlordName3input.reportValidity();
        } else if (!landlordContact3input.value) {
            landlordContact3input.setCustomValidity("Please fill this field");
            landlordContact3input.reportValidity();
        } else if (!landlordAddress3input.value) {
            landlordAddress3input.setCustomValidity("Please fill this field");
            landlordAddress3input.reportValidity();
        } else if (!rentedAddress3input.value) {
            rentedAddress3input.setCustomValidity("Please fill this field");
            rentedAddress3input.reportValidity();
        }
    }
    display_submit();
    disable_btns();
    display_save1btn();
}





function checkInputsAndEnableButton4() {
    var LandlordPAN4 = LandlordPAN4input.value;
    var startDate4 = StartDate4input.value;
    var endDate4 = EndDate4input.value;
    var monthrent4 = MonthRent4input.value;
    var pincode4 = Pincode4input.value;
    var cityType4 = cityType4input.value;
    var landlordName4 = lanlordName4input.value;
    var landlordContact4 = landlordContact4input.value;
    var landlordAddress4 = landlordAddress4input.value;
    var rentedAddress4 = rentedAddress4input.value;


    var LandlordPAN4ErrorSpan = document.getElementById('LandlordPAN4Error');

    if (current_time_date1 > edit_48_hrs1) {

        document.getElementById('addbtn4').disabled = true;
        document.getElementById('cancelbtn4').disabled = true;
    } else if (startDate4 && endDate4) {
        if (monthrent4 === '' || monthrent4 == 0) {
            document.getElementById('addbtn4').disabled = false;
            document.getElementById('cancelbtn4').disabled = false;

        } else {
            if (pincode4 && cityType4 && landlordName4 && LandlordPAN4 && monthrent4 > 0 &&
                landlordAddress4 && rentedAddress4 && LandlordPAN4ErrorSpan.textContent === '' && MonthRent4ErrorSpan.textContent === '' &&
                lanlordName4ErrorSpan.textContent === '' && landlordContact4ErrorSpan.textContent === '') {
                document.getElementById('addbtn4').disabled = false;
                document.getElementById('cancelbtn4').disabled = false;

            } else {
                document.getElementById('addbtn4').disabled = true;
                document.getElementById('cancelbtn4').disabled = false;

            }
        }
        display_submit();
        disable_btns();
        display_save1btn();
    } else {
        document.getElementById('addbtn4').disabled = true;
        document.getElementById('cancelbtn4').disabled = false;

    }

}


function ValidatePan4() {
    var LandlordPAN4 = document.getElementById('LandlordPAN4');
    var LandlordPAN4ErrorSpan = document.getElementById('LandlordPAN4Error');

    var inputPAN = LandlordPAN4.value.toUpperCase(); // Convert input to uppercase
    LandlordPAN4.value = inputPAN; // Update input value with uppercase version

    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            LandlordPAN4ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';
            checkInputsAndEnableButton4();
        } else {
            LandlordPAN4ErrorSpan.textContent = '';
            checkInputsAndEnableButton4();
        }
    } else {
        LandlordPAN4ErrorSpan.textContent = '';
        checkInputsAndEnableButton4();
    }
}

document.getElementById('StartDate4').addEventListener('input', checkInputsAndEnableButton4);


function ValidateEndDate4() {
    var EndDate4value = document.getElementById('EndDate4').value;
    var EndDate4valueNew = new Date(EndDate4value);
    var StartDate4inputNew = new Date(StartDate4input.value)
    if (EndDate4valueNew) {
        if (EndDate4valueNew >= financialYearEnd) {
            EndDate4value = formatDate(financialYearEnd);
            document.getElementById('EndDate4').value = EndDate4value;
            addbtn4.style.display = 'none';
            checkInputsAndEnableButton4();
            alert('Select date for current financial year only');
        } else if (EndDate4valueNew <= StartDate4inputNew) {
            StartDate4inputNew.setDate(StartDate4inputNew.getDate() + 1);
            EndDate4value = formatDate(StartDate4inputNew);
            document.getElementById('EndDate4').value = EndDate4value;
            addbtn4.style.display = 'inline-block';
            checkInputsAndEnableButton4();
            alert('End Date can not be less than start date in Rent-4');
        } else {
            addbtn4.style.display = 'inline-block';
            checkInputsAndEnableButton4();
        }
        checkInputsAndEnableButton4();
    }
}



function ValidateMonthRent4() {

    var MonthRent4ErrorSpan = document.getElementById('MonthRent4Error');
    if (MonthRent4input.value) {
        if (isNaN(MonthRent4input.value) || MonthRent4input.value.includes('.') || parseFloat(MonthRent4input.value) < 0) {
            MonthRent4ErrorSpan.textContent = 'Rent should be positive integer.'
            file_upload_Section_none();
            checkInputsAndEnableButton4();
        } else if (MonthRent4input.value == 0) {
            MonthRent4ErrorSpan.textContent = ''
            // file_upload_Section_none();
            checkInputsAndEnableButton4();
        } else if (MonthRent4input.value > 0) {
            MonthRent4ErrorSpan.textContent = ''
            file_upload_Section_display();
            files_display_section_display();
            checkInputsAndEnableButton4();
        }
    } else {
        MonthRent4ErrorSpan.textContent = ''
        ValidateMonthRent1();
        ValidateMonthRent2();
        ValidateMonthRent3();
        checkInputsAndEnableButton4();
    }
}




function ValidatePincode4() {

    var cityType4 = document.getElementById('cityType4');
    var pincode4Input = document.getElementById('Pincode4');
    var pincode4 = pincode4Input.value;

    pincode4 = pincode4.replace(/\D/g, '');
    if (pincode4.length > 6) {
        pincode4 = pincode4.substring(0, 6);
    }
    pincode4Input.value = pincode4;
    var pincode4InputValue = pincode4Input.value
    if (pincode4InputValue) {
        if (pincode4InputValue.length == 6) {
            var found = pincodelst.some(function (pin) {
                return pincode4InputValue.startsWith(pin);
            });
            if (found) {
                cityType4.value = 'METRO';
                Pincode4ErrorSpan.textContent = ''
                checkInputsAndEnableButton4();

            } else {
                cityType4.value = 'NON-METRO';
                Pincode4ErrorSpan.textContent = ''
                checkInputsAndEnableButton4();
            }

        } else {
            cityType4.value = null;
            Pincode4ErrorSpan.textContent = 'invalid pincode'
            checkInputsAndEnableButton4();
        }
    } else {
        cityType4.value = null;
        Pincode4ErrorSpan.textContent = ''
        checkInputsAndEnableButton4();
    }
}




function validateLanlordName4() {

    var alphabetPattern = /^[a-zA-Z]+$/;

    if (lanlordName4input.value) {
        if (!alphabetPattern.test(lanlordName4input.value)) {
            lanlordName4ErrorSpan.textContent = "Name should contain only alphabets.";
            checkInputsAndEnableButton4();
        } else {
            lanlordName4ErrorSpan.textContent = "";
            checkInputsAndEnableButton4();
        }
    } else {
        lanlordName4ErrorSpan.textContent = "";
        checkInputsAndEnableButton4();
    }
}



function validatelandlordContact4() {
    if (landlordContact4input.value) {

        landlordContact4input.value = landlordContact4input.value.replace(/\D/g, '');
        if (landlordContact4input.value.length > 10) {
            landlordContact4input.value = landlordContact4input.value.substring(0, 10);
        }
        if (landlordContact4input.value.length == 10) {
            if (mobile_list.includes(parseInt(landlordContact4input.value[0]))) {
                landlordContact4ErrorSpan.textContent = "";
                checkInputsAndEnableButton4();
            } else {
                landlordContact4ErrorSpan.textContent = "Invalid contact.";
                checkInputsAndEnableButton4();
            }
        } else {
            landlordContact4ErrorSpan.textContent = "Invalid contact.";
            checkInputsAndEnableButton4();
        }

    } else {
        landlordContact4ErrorSpan.textContent = "";
        checkInputsAndEnableButton4();
    }
}


document.getElementById('landlordAddress4').addEventListener('input', function () {
    checkInputsAndEnableButton4();

});

document.getElementById('rentedAddress4').addEventListener('input', function () {
    checkInputsAndEnableButton4();

});

checkInputsAndEnableButton4();



function addbtn4fun() {
    if (addbtn4.disabled == false) {
        rent_5.style.display = 'table-row';
        addbtn4.style.display = 'none';
        cancelbtn4.style.display = 'none';

        var endDate4Value = EndDate4input.value;
        var endDate4 = new Date(endDate4Value);
        endDate4.setDate(endDate4.getDate() + 1);
        var nextDayDate4 = formatDate(endDate4);
        StartDate5input.value = nextDayDate4;
        readOnlytrueline_4();

    } else {
        if (!LandlordPAN4input.value) {
            LandlordPAN4input.setCustomValidity("Please fill this field");
            LandlordPAN4input.reportValidity();
        } else if (!EndDate4input.value) {
            EndDate4input.setCustomValidity("Please fill this field");
            EndDate4input.reportValidity();
        } else if (!MonthRent4input.value) {
            MonthRent4input.setCustomValidity("Please fill this field");
            MonthRent4input.reportValidity();
        } else if (!Pincode4input.value) {
            Pincode4input.setCustomValidity("Please fill this field");
            Pincode4input.reportValidity();
        } else if (!lanlordName4input.value) {
            lanlordName4input.setCustomValidity("Please fill this field");
            lanlordName4input.reportValidity();
        } else if (!landlordContact4input.value) {
            landlordContact4input.setCustomValidity("Please fill this field");
            landlordContact4input.reportValidity();
        } else if (!landlordAddress4input.value) {
            landlordAddress4input.setCustomValidity("Please fill this field");
            landlordAddress4input.reportValidity();
        } else if (!rentedAddress4input.value) {
            rentedAddress4input.setCustomValidity("Please fill this field");
            rentedAddress4input.reportValidity();
        }
    }
    display_submit();
    disable_btns();
    display_save1btn();
}



function ValidatePan5() {
    var LandlordPAN5 = document.getElementById('LandlordPAN5');
    var LandlordPAN5ErrorSpan = document.getElementById('LandlordPAN5Error');

    var inputPAN = LandlordPAN5.value.toUpperCase(); // Convert input to uppercase
    LandlordPAN5.value = inputPAN; // Update input value with uppercase version


    var panPattern = /^[A-Za-z]{3}[CPHFATBLJGcphfatbljg][A-Za-z]\d{4}[A-Za-z]$/;

    if (inputPAN) {
        if (!panPattern.test(inputPAN)) {
            LandlordPAN5ErrorSpan.textContent = 'Please enter a valid PAN number with the specified pattern.';

        } else {
            LandlordPAN5ErrorSpan.textContent = '';

        }
    } else {
        LandlordPAN5ErrorSpan.textContent = '';

    }
    display_submit();
    disable_btns();
    display_save1btn();
}


function ValidateEndDate5() {
    var EndDate5value = document.getElementById('EndDate5').value;
    var EndDate5valueNew = new Date(EndDate5value);
    var StartDate5inputNew = new Date(StartDate5input.value)
    if (EndDate5valueNew) {
        if (EndDate5valueNew >= financialYearEnd) {
            EndDate5value = formatDate(financialYearEnd);
            document.getElementById('EndDate5').value = EndDate5value;

            alert('Select date for current financial year only');

        } else if (EndDate5valueNew <= StartDate5inputNew) {
            StartDate5inputNew.setDate(StartDate5inputNew.getDate() + 1);
            EndDate5value = formatDate(StartDate5inputNew);
            document.getElementById('EndDate5').value = EndDate5value;

            alert('End Date can not be less than start date in Rent-5');
        }
    }
    display_submit();
    disable_btns();
    display_save1btn();
}



function ValidateMonthRent5() {

    var MonthRent5ErrorSpan = document.getElementById('MonthRent5Error');
    if (MonthRent5input.value) {
        if (isNaN(MonthRent5input.value) || MonthRent5input.value.includes('.') || parseFloat(MonthRent5input.value) < 0) {
            MonthRent5ErrorSpan.textContent = 'Rent should be positive integer.'
            file_upload_Section_none();
        } else if (MonthRent5input.value == 0) {
            MonthRent5ErrorSpan.textContent = ''
            // file_upload_Section_none();
        } else if (MonthRent5input.value > 0) {
            MonthRent5ErrorSpan.textContent = ''
            file_upload_Section_display();
            files_display_section_display();
        }
    } else {
        MonthRent5ErrorSpan.textContent = ''
        ValidateMonthRent1();
        ValidateMonthRent2();
        ValidateMonthRent3();
        ValidateMonthRent4();

    }
    display_submit();
    disable_btns();
    display_save1btn();
}



function ValidatePincode5() {

    var cityType5 = document.getElementById('cityType5');
    var pincode5Input = document.getElementById('Pincode5');
    var pincode5 = pincode5Input.value;

    pincode5 = pincode5.replace(/\D/g, '');
    if (pincode5.length > 6) {
        pincode5 = pincode5.substring(0, 6);
    }
    pincode5Input.value = pincode5;
    var pincode5InputValue = pincode5Input.value
    if (pincode5InputValue) {
        if (pincode5InputValue.length == 6) {
            var found = pincodelst.some(function (pin) {
                return pincode5InputValue.startsWith(pin);
            });
            if (found) {
                cityType5.value = 'METRO';
                Pincode5ErrorSpan.textContent = ''

            } else {
                cityType5.value = 'NON-METRO';
                Pincode5ErrorSpan.textContent = ''

            }

        } else {
            cityType5.value = null;
            Pincode5ErrorSpan.textContent = 'invalid pincode'

        }
    } else {
        cityType5.value = null;
        Pincode5ErrorSpan.textContent = ''

    }
    display_submit();
    disable_btns();
    display_save1btn();
}

function validateLanlordName5() {

    var alphabetPattern = /^[a-zA-Z]+$/;
    if (lanlordName5input.value) {
        if (!alphabetPattern.test(lanlordName5input.value)) {
            lanlordName5ErrorSpan.textContent = "Name should contain only alphabets.";

        } else {
            lanlordName5ErrorSpan.textContent = "";

        }
    } else {
        lanlordName5ErrorSpan.textContent = "";

    }
    display_submit();
    disable_btns();
    display_save1btn();
}



function validatelandlordContact5() {
    if (landlordContact5input.value) {

        landlordContact5input.value = landlordContact5input.value.replace(/\D/g, '');
        if (landlordContact5input.value.length > 10) {
            landlordContact5input.value = landlordContact5input.value.substring(0, 10);

        }
        if (landlordContact5input.value.length == 10) {
            if (mobile_list.includes(parseInt(landlordContact5input.value[0]))) {
                landlordContact5ErrorSpan.textContent = "";
            } else {
                landlordContact5ErrorSpan.textContent = "Invalid contact.";

            }
        } else {
            landlordContact5ErrorSpan.textContent = "Invalid contact.";

        }

    } else {
        landlordContact5ErrorSpan.textContent = "";
    }
    display_submit();
    disable_btns();
    display_save1btn();
}


document.getElementById('landlordAddress5').addEventListener('input', function () {
    display_submit();
    disable_btns();
    display_save1btn();
});

document.getElementById('rentedAddress5').addEventListener('input', function () {
    display_submit();
    disable_btns();
    display_save1btn();
});



function cancelbtn5fun() {
    rent_5.style.display = 'none';
    addbtn4.style.display = 'inline-block';
    cancelbtn4.style.display = 'inline-block';
    disabledhraline_5();
    readOnlyfalseline_4();
    display_submit();
    disable_btns();
    display_save1btn();
}


function cancelbtn4fun() {
    if (cancelbtn3.disabled == false) {
        rent_4.style.display = 'none';
        addbtn3.style.display = 'inline-block';
        cancelbtn3.style.display = 'inline-block';
        disabledhraline_4();
        readOnlyfalseline_3();
        display_submit();
        disable_btns();
        display_save1btn();
    }
}


function cancelbtn3fun() {
    if (cancelbtn3.disabled == false) {
        rent_3.style.display = 'none';
        addbtn2.style.display = 'inline-block';
        cancelbtn2.style.display = 'inline-block';
        disabledhraline_3();
        readOnlyfalseline_2();
        display_submit();
        disable_btns();
        display_save1btn();
    }
}


function cancelbtn2fun() {

    if (cancelbtn2.disabled == false) {
        rent_2.style.display = 'none';
        addbtn1.style.display = 'inline-block';
        disabledhraline_2();
        readOnlyfalseline_1();
        display_submit();
        disable_btns();
        display_save1btn();
    }
}




function save_data_localstorage() {

    var changeHRA__newvalue = null
    var claimingHRA_newvalue = null

    if (claimingHRAyesbtn.checked == true) {
        claimingHRA_newvalue = 'yes';
    } else if (claimingHRAnobtn.checked == true) {
        claimingHRA_newvalue = 'no';
    } else {
        claimingHRA_newvalue = null
    }



    if (changeHRAyesbtn.checked == true) {
        changeHRA__newvalue = 'yes';
    } else if (changeHRAnobtn.checked == true) {
        changeHRA__newvalue = 'no';
    } else {
        changeHRA__newvalue = null
    }



    var LandlordPAN2input_value = null;
    var StartDate2input_value = null;
    var EndDate2input_value = null;
    var MonthRent2input_value = null;
    var Pincode2input_value = null;
    var cityType2input_value = null;
    var lanlordName2input_value = null;
    var landlordContact2input_value = null;
    var landlordAddress2input_value = null;
    var rentedAddress2input_value = null;

    if (rent_2.style.display == 'table-row') {
        var LandlordPAN2input_value = LandlordPAN2input.value;
        var StartDate2input_value = StartDate2input.value;
        var EndDate2input_value = EndDate2input.value;
        var MonthRent2input_value = MonthRent2input.value;
        var Pincode2input_value = Pincode2input.value;
        var cityType2input_value = cityType2input.value;
        var lanlordName2input_value = lanlordName2input.value;
        var landlordContact2input_value = landlordContact2input.value;
        var landlordAddress2input_value = landlordAddress2input.value;
        var rentedAddress2input_value = rentedAddress2input.value;
    }


    var LandlordPAN3input_value = null;
    var StartDate3input_value = null;
    var EndDate3input_value = null;
    var MonthRent3input_value = null;
    var Pincode3input_value = null;
    var cityType3input_value = null;
    var lanlordName3input_value = null;
    var landlordContact3input_value = null;
    var landlordAddress3input_value = null;
    var rentedAddress3input_value = null;

    if (rent_3.style.display == 'table-row') {
        var LandlordPAN3input_value = LandlordPAN3input.value;
        var StartDate3input_value = StartDate3input.value;
        var EndDate3input_value = EndDate3input.value;
        var MonthRent3input_value = MonthRent3input.value;
        var Pincode3input_value = Pincode3input.value;
        var cityType3input_value = cityType3input.value;
        var lanlordName3input_value = lanlordName3input.value;
        var landlordContact3input_value = landlordContact3input.value;
        var landlordAddress3input_value = landlordAddress3input.value;
        var rentedAddress3input_value = rentedAddress3input.value;
    }


    // types1
    var LandlordPAN4input_value = null;
    var StartDate4input_value = null;
    var EndDate4input_value = null;
    var MonthRent4input_value = null;
    var Pincode4input_value = null;
    var cityType4input_value = null;
    var lanlordName4input_value = null;
    var landlordContact4input_value = null;
    var landlordAddress4input_value = null;
    var rentedAddress4input_value = null;

    // types2
    if (rent_4.style.display == 'table-row') {
        LandlordPAN4input_value = LandlordPAN4input.value;
        StartDate4input_value = StartDate4input.value;
        EndDate4input_value = EndDate4input.value;
        MonthRent4input_value = MonthRent4input.value;
        Pincode4input_value = Pincode4input.value;
        cityType4input_value = cityType4input.value;
        lanlordName4input_value = lanlordName4input.value;
        landlordContact4input_value = landlordContact4input.value;
        landlordAddress4input_value = landlordAddress4input.value;
        rentedAddress4input_value = rentedAddress4input.value;
    }

    // types1
    var LandlordPAN5input_value = null;
    var StartDate5input_value = null;
    var EndDate5input_value = null;
    var MonthRent5input_value = null;
    var Pincode5input_value = null;
    var cityType5input_value = null;
    var lanlordName5input_value = null;
    var landlordContact5input_value = null;
    var landlordAddress5input_value = null;
    var rentedAddress5input_value = null;

    // types2
    if (rent_5.style.display == 'table-row') {
        LandlordPAN5input_value = LandlordPAN5input.value;
        StartDate5input_value = StartDate5input.value;
        EndDate5input_value = EndDate5input.value;
        MonthRent5input_value = MonthRent5input.value;
        Pincode5input_value = Pincode5input.value;
        cityType5input_value = cityType5input.value;
        lanlordName5input_value = lanlordName5input.value;
        landlordContact5input_value = landlordContact5input.value;
        landlordAddress5input_value = landlordAddress5input.value;
        rentedAddress5input_value = rentedAddress5input.value;
    }


    const HRA_form_formData = {

        claimingHRAValue_new: claimingHRA_newvalue,
        changeHRAValue_new: changeHRA__newvalue,

        LandlordPAN1inputValue: LandlordPAN1input.value,
        StartDate1inputValue: StartDate1input.value,
        EndDate1inputValue: EndDate1input.value,
        MonthRent1inputValue: MonthRent1input.value,
        Pincode1inputValue: Pincode1input.value,
        cityType1inputValue: cityType1input.value,
        lanlordName1inputValue: lanlordName1input.value,
        landlordContact1inputValue: landlordContact1input.value,
        landlordAddress1inputValue: landlordAddress1input.value,
        rentedAddress1inputValue: rentedAddress1input.value,


        LandlordPAN2inputValue: LandlordPAN2input_value,
        StartDate2inputValue: StartDate2input_value,
        EndDate2inputValue: EndDate2input_value,
        MonthRent2inputValue: MonthRent2input_value,
        Pincode2inputValue: Pincode2input_value,
        cityType2inputValue: cityType2input_value,
        lanlordName2inputValue: lanlordName2input_value,
        landlordContact2inputValue: landlordContact2input_value,
        landlordAddress2inputValue: landlordAddress2input_value,
        rentedAddress2inputValue: rentedAddress2input_value,

        LandlordPAN3inputValue: LandlordPAN3input_value,
        StartDate3inputValue: StartDate3input_value,
        EndDate3inputValue: EndDate3input_value,
        MonthRent3inputValue: MonthRent3input_value,
        Pincode3inputValue: Pincode3input_value,
        cityType3inputValue: cityType3input_value,
        lanlordName3inputValue: lanlordName3input_value,
        landlordContact3inputValue: landlordContact3input_value,
        landlordAddress3inputValue: landlordAddress3input_value,
        rentedAddress3inputValue: rentedAddress3input_value,

        LandlordPAN4inputValue: LandlordPAN4input_value,
        StartDate4inputValue: StartDate4input_value,
        EndDate4inputValue: EndDate4input_value,
        MonthRent4inputValue: MonthRent4input_value,
        Pincode4inputValue: Pincode4input_value,
        cityType4inputValue: cityType4input_value,
        lanlordName4inputValue: lanlordName4input_value,
        landlordContact4inputValue: landlordContact4input_value,
        landlordAddress4inputValue: landlordAddress4input_value,
        rentedAddress4inputValue: rentedAddress4input_value,

        LandlordPAN5inputValue: LandlordPAN5input_value,
        StartDate5inputValue: StartDate5input_value,
        EndDate5inputValue: EndDate5input_value,
        MonthRent5inputValue: MonthRent5input_value,
        Pincode5inputValue: Pincode5input_value,
        cityType5inputValue: cityType5input_value,
        lanlordName5inputValue: lanlordName5input_value,
        landlordContact5inputValue: landlordContact5input_value,
        landlordAddress5inputValue: landlordAddress5input_value,
        rentedAddress5inputValue: rentedAddress5input_value

    };
    const jsonData = JSON.stringify(HRA_form_formData);
    localStorage.setItem('HRA_form_formData', jsonData);

    if (localStorage.getItem('currentTab') !== null) {        
        currentTab = 1;
    }else{
        localStorage.setItem('currentTab', 1)        
    }
}




function uploadFile1() {
    save_data_localstorage();
    
    document.getElementById('rent_form').submit();
}

function uploadFile2() {
    save_data_localstorage();
    
    document.getElementById('pan_form').submit();
}



function openPdf(index, empid, filename, file_path) {
    var new_empid = empid.split(",");
    var empid1 = new_empid[0];
    var filaname = filename;
    var filepath = file_path;

    var file_paths = filepath.split('/');
    var new_file_path = file_paths[3];
    var url = "/static/media/" + empid1 + "/" + new_file_path;

    var New_fileName = filaname.replace(/\./g, '');
    var fileStatus = document.querySelector('input[name="' + New_fileName + '"]:checked').value;

    if (fileStatus == 'submit') {
        var elementId = 'openPdf_' + index;
        document.getElementById(elementId).href = url;
        document.getElementById(elementId).target = "_blank";
    } else {
        alert('File is ignored and cannot be displayed.');
    }
}



function Validateplace() {

    var alphabetPattern = /^[a-zA-Z]+$/;
    if (placeInput.value) {
        if (!alphabetPattern.test(placeInput.value)) {
            placeErrorSpan.textContent = "Place should contain only alphabets.";

        } else {
            placeErrorSpan.textContent = "";
        }
    } else {
        placeErrorSpan.textContent = "";

    }
    display_submit();
    disable_btns();
    display_save1btn();
}


function validateItproofcheck() {
    if (itproofcheckBox.checked == true) {
        document.getElementById('itproofcheck').value = true;

    } else {
        document.getElementById('itproofcheck').value = false;
    }
    display_submit();
    disable_btns();
    display_save1btn();
}

function SaveData() {

    let formDataForm1 = new FormData(document.getElementById("form1"));
    let formDataForm3 = new FormData(document.getElementById("form3"));
    let formDataForm4 = new FormData(document.getElementById("form4"));

    if (localStorage.getItem('Basic_form_formData')) {
        localStorage.removeItem('Basic_form_formData');
    }
    
    if (localStorage.getItem('HRA_form_formData')) {
        localStorage.removeItem('HRA_form_formData');
    }

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

    if (localStorage.getItem('other_form_formData')) {
        localStorage.removeItem('other_form_formData');
    }


    if (localStorage.getItem('formData_80tta')) {
        localStorage.removeItem('formData_80tta');
    }

    if (localStorage.getItem('formData_80ded')) {
        localStorage.removeItem('formData_80ded');
    }

    if (localStorage.getItem('formData_80dediillness')) {
        localStorage.removeItem('formData_80dediillness');
    }

    if (localStorage.getItem('formData_80ded_ed')) {
        localStorage.removeItem('formData_80ded_ed');
    }

    if (localStorage.getItem('formData_depend_80dd')) {
        localStorage.removeItem('formData_depend_80dd');
    }


    if (localStorage.getItem('formData_veh_80eeb')) {
        localStorage.removeItem('formData_veh_80eeb');
    }

    if (localStorage.getItem('formData_80ccd1b')) {
        localStorage.removeItem('formData_80ccd1b');
    }

    if (localStorage.getItem('formData_80c_contribution')) {
        localStorage.removeItem('formData_80c_contribution');
    }

    if (localStorage.getItem('formData_previous')) {
        localStorage.removeItem('formData_previous');
    }



    for (let [key, value] of formDataForm3.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of formDataForm4.entries()) {
        formDataForm1.append(key, value);
    }

    let payingrent_form = new FormData(document.getElementById("payingrent_form"));

    let ilhp_form = new FormData(document.getElementById("ilhp_form"));
    let section80oi_form = new FormData(document.getElementById("section80oi_form"));
    let section80tta_form = new FormData(document.getElementById("section80tta_form"));

    let toggleQuestions_form = new FormData(document.getElementById("toggleQuestions_form"));


    let section80udd_form = new FormData(document.getElementById("section80udd_form"));
    let section80ee_80eeb_form = new FormData(document.getElementById("section80ee_80eeb_form"));
    let section80ccd_form = new FormData(document.getElementById("section80ccd_form"));
    let section80C_form = new FormData(document.getElementById("section80C_form"));


    for (let [key, value] of payingrent_form.entries()) {
        formDataForm1.append(key, value);
    }

    for (let [key, value] of ilhp_form.entries()) {
        formDataForm1.append(key, value);
    }

    for (let [key, value] of section80oi_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80tta_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of toggleQuestions_form.entries()) {
        formDataForm1.append(key, value);
    }

    if (section80dyesbtn.checked === true) {
        let section80d_mip_form = new FormData(document.getElementById("section80d_mip_form"));
        for (let [key, value] of section80d_mip_form.entries()) {
            formDataForm1.append(key, value);
        }
    }
    for (let [key, value] of section80udd_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80ee_80eeb_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80ccd_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80C_form.entries()) {
        formDataForm1.append(key, value);
    }


    if (payingrentyesbtn.checked === true) {
        let formDataForm5 = new FormData(document.getElementById("form5"));
        for (let [key, value] of formDataForm5.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (ilhpyesbtn.checked === true) {
        let ilhp = new FormData(document.getElementById("ilhp"));
        for (let [key, value] of ilhp.entries()) {
            formDataForm1.append(key, value);
        }
    }
    if (section80oiyesbtn.checked === true) {
        let other_form = new FormData(document.getElementById("other_form"));
        for (let [key, value] of other_form.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (section80ttayesbtn.checked === true) {
        let ilh_80tta_form = new FormData(document.getElementById("ilh_80tta_form"));
        for (let [key, value] of ilh_80tta_form.entries()) {
            formDataForm1.append(key, value);
        }
    }
    if (section80dyesbtn.checked === true) {
        let Section_80ddb_form = new FormData(document.getElementById("Section_80ddb_form"));
        for (let [key, value] of Section_80ddb_form.entries()) {
            formDataForm1.append(key, value);
        }
        let section_80E_form = new FormData(document.getElementById("section_80E_form"));
        for (let [key, value] of section_80E_form.entries()) {
            formDataForm1.append(key, value);
        }
        if (section80dyes_mipbtn.checked === true) {
            let section80d_form = new FormData(document.getElementById("section80d_form"));
            for (let [key, value] of section80d_form.entries()) {
                formDataForm1.append(key, value);
            }
        }
    }

    if (section80uddselfbtn.checked === true || section80udddependentbtn.checked === true || section80uddbothbtn.checked === true) {
        let _80uddC_form = new FormData(document.getElementById("_80uddC_form"));
        for (let [key, value] of _80uddC_form.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (section80eeyes_80eebbtn.checked === true) {
        let _80eeb_form = new FormData(document.getElementById("_80eeb_form"));
        for (let [key, value] of _80eeb_form.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (section80ccdyesbtn.checked === true) {
        let cc_80ccd1b = new FormData(document.getElementById("80ccd1b"));
        for (let [key, value] of cc_80ccd1b.entries()) {
            formDataForm1.append(key, value);
        }
    }
    if (section80Cyesbtn.checked === true) {
        let _80cC = new FormData(document.getElementById("80cC"));
        for (let [key, value] of _80cC.entries()) {
            formDataForm1.append(key, value);
        }
    }


    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {

        let section_previousemp_form = new FormData(document.getElementById("section_previousemp_form"));
        for (let [key, value] of section_previousemp_form.entries()) {
            formDataForm1.append(key, value);
        }
        if (sectionyes_previousempbtn.checked === true) {
            let previousemp_form = new FormData(document.getElementById("previousemp_form"));
            for (let [key, value] of previousemp_form.entries()) {
                formDataForm1.append(key, value);
            }
        }
    }


    // Create a new FormData object for the combined data
    let combinedFormData = new FormData();

    // Append data from formDataForm1 to combinedFormData
    for (let [key, value] of formDataForm1.entries()) {
        combinedFormData.append(key, value);
    }

    let apiUrl = "save_it_proof";


    let hiddenForm = document.createElement('form');
    hiddenForm.style.display = 'none';
    hiddenForm.action = apiUrl;
    hiddenForm.method = 'POST';


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
}


function SubmitData() {
    let formDataForm1 = new FormData(document.getElementById("form1"));
    let formDataForm3 = new FormData(document.getElementById("form3"));
    let formDataForm4 = new FormData(document.getElementById("form4"));

    localStorage.clear();    
    
    for (let [key, value] of formDataForm3.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of formDataForm4.entries()) {
        formDataForm1.append(key, value);
    }

    let payingrent_form = new FormData(document.getElementById("payingrent_form"));

    let ilhp_form = new FormData(document.getElementById("ilhp_form"));
    let section80oi_form = new FormData(document.getElementById("section80oi_form"));
    let section80tta_form = new FormData(document.getElementById("section80tta_form"));

    let toggleQuestions_form = new FormData(document.getElementById("toggleQuestions_form"));


    let section80udd_form = new FormData(document.getElementById("section80udd_form"));
    let section80ee_80eeb_form = new FormData(document.getElementById("section80ee_80eeb_form"));
    let section80ccd_form = new FormData(document.getElementById("section80ccd_form"));
    let section80C_form = new FormData(document.getElementById("section80C_form"));


    for (let [key, value] of payingrent_form.entries()) {
        formDataForm1.append(key, value);
    }

    for (let [key, value] of ilhp_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80oi_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80tta_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of toggleQuestions_form.entries()) {
        formDataForm1.append(key, value);
    }

    if (section80dyesbtn.checked === true) {
        let section80d_mip_form = new FormData(document.getElementById("section80d_mip_form"));
        for (let [key, value] of section80d_mip_form.entries()) {
            formDataForm1.append(key, value);
        }
    }
    for (let [key, value] of section80udd_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80ee_80eeb_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80ccd_form.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of section80C_form.entries()) {
        formDataForm1.append(key, value);
    }


    if (payingrentyesbtn.checked === true) {
        let formDataForm5 = new FormData(document.getElementById("form5"));
        for (let [key, value] of formDataForm5.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (ilhpyesbtn.checked === true) {
        let ilhp = new FormData(document.getElementById("ilhp"));
        for (let [key, value] of ilhp.entries()) {
            formDataForm1.append(key, value);
        }
    }
    if (section80oiyesbtn.checked === true) {
        let other_form = new FormData(document.getElementById("other_form"));
        for (let [key, value] of other_form.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (section80ttayesbtn.checked === true) {
        let ilh_80tta_form = new FormData(document.getElementById("ilh_80tta_form"));
        for (let [key, value] of ilh_80tta_form.entries()) {
            formDataForm1.append(key, value);
        }
    }
    if (section80dyesbtn.checked === true) {
        let Section_80ddb_form = new FormData(document.getElementById("Section_80ddb_form"));
        for (let [key, value] of Section_80ddb_form.entries()) {
            formDataForm1.append(key, value);
        }
        let section_80E_form = new FormData(document.getElementById("section_80E_form"));
        for (let [key, value] of section_80E_form.entries()) {
            formDataForm1.append(key, value);
        }
        if (section80dyes_mipbtn.checked === true) {
            let section80d_form = new FormData(document.getElementById("section80d_form"));
            for (let [key, value] of section80d_form.entries()) {
                formDataForm1.append(key, value);
            }
        }
    }

    if (section80uddselfbtn.checked === true || section80udddependentbtn.checked === true || section80uddbothbtn.checked === true) {
        let _80uddC_form = new FormData(document.getElementById("_80uddC_form"));
        for (let [key, value] of _80uddC_form.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (section80eeyes_80eebbtn.checked === true) {
        let _80eeb_form = new FormData(document.getElementById("_80eeb_form"));
        for (let [key, value] of _80eeb_form.entries()) {
            formDataForm1.append(key, value);
        }
    }

    if (section80ccdyesbtn.checked === true) {
        let cc_80ccd1b = new FormData(document.getElementById("80ccd1b"));
        for (let [key, value] of cc_80ccd1b.entries()) {
            formDataForm1.append(key, value);
        }
    }
    if (section80Cyesbtn.checked === true) {
        let _80cC = new FormData(document.getElementById("80cC"));
        for (let [key, value] of _80cC.entries()) {
            formDataForm1.append(key, value);
        }
    }


    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {

        let section_previousemp_form = new FormData(document.getElementById("section_previousemp_form"));
        for (let [key, value] of section_previousemp_form.entries()) {
            formDataForm1.append(key, value);
        }
        if (sectionyes_previousempbtn.checked === true) {
            let previousemp_form = new FormData(document.getElementById("previousemp_form"));
            for (let [key, value] of previousemp_form.entries()) {
                formDataForm1.append(key, value);
            }
        }
    }


    // Create a new FormData object for the combined data
    let combinedFormData = new FormData();

    // Append data from formDataForm1 to combinedFormData
    for (let [key, value] of formDataForm1.entries()) {
        combinedFormData.append(key, value);
    }

    let apiUrl = "Submit_it_proof";


    let hiddenForm = document.createElement('form');
    hiddenForm.style.display = 'none';
    hiddenForm.action = apiUrl;
    hiddenForm.method = 'POST';


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
}

var view_hra_btn

if (EndDate1input.value) {
    view_hra_btn = document.getElementById('view_hra_btn');
}

var view_both_btn

if (selfOccupiedHousePropertyInp.value && annualLettableValueInp.value) {
    view_both_btn = document.getElementById('view_both_btn');
}

var view_self_btn
if (selfOccupiedHousePropertyInp.value) {
    view_self_btn = document.getElementById('view_self_btn');
}

var view_let_btn
if (annualLettableValueInp.value) {
    view_let_btn = document.getElementById('view_let_btn');
}

var view_hrahl_btn
if (EndDate1input.value && selfOccupiedHousePropertyInp.value) {
    view_hrahl_btn = document.getElementById('view_hrahl_btn');
}

var view_oi_btn
if (other_income_oiInp.value) {
    view_oi_btn = document.getElementById('view_oi_btn')
}

var view_80tta_btn
if (interest_80ttaInp.value) {
    view_80tta_btn = document.getElementById('view_80tta_btn')
}

var view_80d_btn
if (medical_insurance_self_mip.value || paymentDependentDisability.value || paymentSelfDisability.value || treatment_value.value || interest_education.value) {
    view_80d_btn = document.getElementById('view_80d_btn')
}

var view_80eeb_btn
if (loan_sanctioned_date_80eeb.value) {
    view_80eeb_btn = document.getElementById('view_80eeb_btn')
}

var view_80c_btn
if (paymentLifeInsuranceInp.value || ppfContributionInp.value || tuitionFeeInp.value || sukanyaSamriddhiInp.value) {
    view_80c_btn = document.getElementById('view_80c_btn')
}


var millisecondsInSixDays = 144 * 60 * 60 * 1000;

if (empsub_1 != null) {
    var empsub_1 = new Date(empsub_1);
}


if (empsub_2 != null) {
    var empsub_2 = new Date(empsub_2);
}

if (empsub_3 != null) {
    var empsub_3 = new Date(empsub_3);
}


if (maker_1Date != null) {
    var maker_1Date = new Date(maker_1Date);
}


var checker_1Date
var checker_1Date_6days
if (checker_1Date != null) {
    checker_1Date = new Date(checker_1Date);
    checker_1Date_6days = new Date(checker_1Date.getTime() + millisecondsInSixDays);
}

var checker_2Date
var checker_2Date_6days
if (checker_2Date != null) {
    checker_2Date = new Date(checker_2Date);
    checker_2Date_6days = new Date(checker_2Date.getTime() + millisecondsInSixDays);
}



function Resub_Submit_1(){
    window.location.href = 'resub_1';
}

function Resub_Submit_2(){
    window.location.href = 'resub_2';
}


document.addEventListener("DOMContentLoaded", function () {

    ValidateFatherName();
    var isyourpanyesbtn = document.getElementById('isyourpanyes');
    var isyourpannobtn = document.getElementById('isyourpanno');
    if (isyourpanyesbtn.checked === true) {
        isyourpan = 'yes'
        Validateisyourpan_2(isyourpan);
    } else if (isyourpannobtn.checked === true) {
        isyourpan = 'no'
        Validateisyourpan_2(isyourpan);
    } else {
        isyourpan = null;
        Validateisyourpan_2(isyourpan);
    }


    
    var payingrentyesbtn = document.getElementById('payingrentyes');
    var payingrentnobtn = document.getElementById('payingrentno');


    const storedData_hra = localStorage.getItem('HRA_form_formData');
    if (storedData_hra) {
        const storedFormData = JSON.parse(storedData_hra);
        if (storedFormData.claimingHRAValue_new) {


            payingrentyesbtn.checked = true;
            payingrent = 'yes'
            Validatepayingrent(payingrent);
            

            if (storedFormData.claimingHRAValue_new == 'yes') {
                claimingHRAyesbtn.checked = true;
                claimingHRAValue_new = 'yes'
                ValidateClaimingHRA1(claimingHRAValue_new)

            } else if (storedFormData.claimingHRAValue_new == 'no') {
                claimingHRAnobtn.checked = true;
                claimingHRAValue_new = 'no'
                ValidateClaimingHRA1(claimingHRAValue_new)
            } else {
                claimingHRAyesbtn.checked = false;
                claimingHRAnobtn.checked = false;
                claimingHRAValue_new = null
                ValidateClaimingHRA1(claimingHRAValue_new)
            }

            if (storedFormData.changeHRAValue_new == 'yes') {
                changeHRAyesbtn.checked = true;
                changeHRAValue_new = 'yes'
                ValidatechangeHRA1(changeHRAValue_new)

            } else if (storedFormData.changeHRAValue_new == 'no') {
                changeHRAnobtn.checked = true;
                changeHRAValue_new = 'no'
                ValidatechangeHRA1(changeHRAValue_new)
            } else {
                changeHRAyesbtn.checked = false;
                changeHRAnobtn.checked = false;
                changeHRAValue_new = null
                ValidatechangeHRA1(changeHRAValue_new)
            }

            LandlordPAN1input.value = storedFormData.LandlordPAN1inputValue;
            StartDate1input.value = storedFormData.StartDate1inputValue;
            EndDate1input.value = storedFormData.EndDate1inputValue;
            MonthRent1input.value = storedFormData.MonthRent1inputValue;
            Pincode1input.value = storedFormData.Pincode1inputValue;
            cityType1input.value = storedFormData.cityType1inputValue;
            lanlordName1input.value = storedFormData.lanlordName1inputValue;
            landlordContact1input.value = storedFormData.landlordContact1inputValue;
            landlordAddress1input.value = storedFormData.landlordAddress1inputValue;
            rentedAddress1input.value = storedFormData.rentedAddress1inputValue;

            LandlordPAN2input.value = storedFormData.LandlordPAN2inputValue;
            StartDate2input.value = storedFormData.StartDate2inputValue;
            EndDate2input.value = storedFormData.EndDate2inputValue;
            MonthRent2input.value = storedFormData.MonthRent2inputValue;
            Pincode2input.value = storedFormData.Pincode2inputValue;
            cityType2input.value = storedFormData.cityType2inputValue;
            lanlordName2input.value = storedFormData.lanlordName2inputValue;
            landlordContact2input.value = storedFormData.landlordContact2inputValue;
            landlordAddress2input.value = storedFormData.landlordAddress2inputValue;
            rentedAddress2input.value = storedFormData.rentedAddress2inputValue;

            LandlordPAN3input.value = storedFormData.LandlordPAN3inputValue;
            StartDate3input.value = storedFormData.StartDate3inputValue;
            EndDate3input.value = storedFormData.EndDate3inputValue;
            MonthRent3input.value = storedFormData.MonthRent3inputValue;
            Pincode3input.value = storedFormData.Pincode3inputValue;
            cityType3input.value = storedFormData.cityType3inputValue;
            lanlordName3input.value = storedFormData.lanlordName3inputValue;
            landlordContact3input.value = storedFormData.landlordContact3inputValue;
            landlordAddress3input.value = storedFormData.landlordAddress3inputValue;
            rentedAddress3input.value = storedFormData.rentedAddress3inputValue;

            LandlordPAN4input.value = storedFormData.LandlordPAN4inputValue;
            StartDate4input.value = storedFormData.StartDate4inputValue;
            EndDate4input.value = storedFormData.EndDate4inputValue;
            MonthRent4input.value = storedFormData.MonthRent4inputValue;
            Pincode4input.value = storedFormData.Pincode4inputValue;
            cityType4input.value = storedFormData.cityType4inputValue;
            lanlordName4input.value = storedFormData.lanlordName4inputValue;
            landlordContact4input.value = storedFormData.landlordContact4inputValue;
            landlordAddress4input.value = storedFormData.landlordAddress4inputValue;
            rentedAddress4input.value = storedFormData.rentedAddress4inputValue;


            LandlordPAN5input.value = storedFormData.LandlordPAN5inputValue;
            StartDate5input.value = storedFormData.StartDate5inputValue;
            EndDate5input.value = storedFormData.EndDate5inputValue;
            MonthRent5input.value = storedFormData.MonthRent5inputValue;
            Pincode5input.value = storedFormData.Pincode5inputValue;
            cityType5input.value = storedFormData.cityType5inputValue;
            lanlordName5input.value = storedFormData.lanlordName5inputValue;
            landlordContact5input.value = storedFormData.landlordContact5inputValue;
            landlordAddress5input.value = storedFormData.landlordAddress5inputValue;
            rentedAddress5input.value = storedFormData.rentedAddress5inputValue;


        }
    } else {        
        if (payingrentyesbtn.checked === true) {
            payingrent = 'yes'
            Validatepayingrent(payingrent);
        } else {
            payingrent = 'no'
            Validatepayingrent(payingrent);
        }
    }



    var claimingHRAyesradio = document.getElementById('claimingHRAyes');
    var claimingHRAnoradio = document.getElementById('claimingHRAno');

    if (claimingHRAyesradio.checked == true) {
        claimingHRAValue = 'yes'
        ValidateClaimingHRA1(claimingHRAValue)

    } else if (claimingHRAnoradio.checked == true) {
        claimingHRAValue = 'no'
        ValidateClaimingHRA1(claimingHRAValue)
    } else {
        claimingHRAValue = null
        ValidateClaimingHRA1(claimingHRAValue)
    }

    var changeHRAyesradio = document.getElementById('changeHRAyes');
    var changeHRAnoradio = document.getElementById('changeHRAno');

    if (changeHRAyesradio.checked == true) {
        changeHRA = 'yes'
        ValidatechangeHRA1(changeHRA)

    } else if (changeHRAnoradio.checked == true) {
        changeHRA = 'no'
        ValidatechangeHRA1(changeHRA)
    } else {
        changeHRA = null
        ValidatechangeHRA1(changeHRA)
    }

    if (EndDate2input.value == financialYearEnd) {

    }

    if (StartDate2input.value) {
        rent_2.style.display = 'table-row';
        addbtn1.style.display = 'none';
        readOnlytrueline_1();

    }

    if (StartDate3input.value) {

        rent_3.style.display = 'table-row';
        addbtn2.style.display = 'none';
        cancelbtn2.style.display = 'none';
        readOnlytrueline_2();
    }

    if (StartDate4input.value) {
        rent_4.style.display = 'table-row';
        addbtn3.style.display = 'none';
        cancelbtn3.style.display = 'none';
        readOnlytrueline_3();
    }

    if (StartDate5input.value) {

        rent_5.style.display = 'table-row';
        addbtn4.style.display = 'none';
        cancelbtn4.style.display = 'none';
        readOnlytrueline_4();
    }

    if (MonthRent1input.value) {
        ValidateMonthRent1();
    }

    if (MonthRent2input.value) {
        ValidateMonthRent2();
    }

    if (MonthRent3input.value) {        
        ValidateMonthRent3();
    }
    if (MonthRent4input.value) {
        ValidateMonthRent4();
    }
    if (MonthRent5input.value) {
        ValidateMonthRent5();
    }

    if (EndDate1input.value) {
        var EndDate1valueNew = new Date(EndDate1input.value);
        if (EndDate1valueNew >= financialYearEnd) {
            addbtn1.style.display = 'none';
        }
    }
    if (EndDate2input.value) {
        var EndDate2valueNew = new Date(EndDate2input.value);
        if (EndDate2valueNew >= financialYearEnd) {
            addbtn2.style.display = 'none';
        }
    }
    if (EndDate3input.value) {
        var EndDate3valueNew = new Date(EndDate3input.value);
        if (EndDate3valueNew >= financialYearEnd) {
            addbtn3.style.display = 'none';
        }
    }
    if (EndDate4input.value) {
        var EndDate4valueNew = new Date(EndDate4input.value);
        if (EndDate4valueNew >= financialYearEnd) {
            addbtn4.style.display = 'none';
        }
    }




    if (current_time_date1 > edit_48_hrs1) {

        var all_inputs = document.querySelectorAll('input');
        all_inputs.forEach(function (input) {
            input.readOnly = true;
        });

        var all_select = document.querySelectorAll('select');
        all_select.forEach(function (select) {
            select.disabled = true;
        });

        var all_radio_buttons = document.querySelectorAll('input[type="radio"]');
        all_radio_buttons.forEach(function (radio) {
            radio.disabled = true;
        });


        if (view_hra_btn) {
            view_hra_btn.disabled = true;
        }

        if (view_both_btn) {
            view_both_btn.disabled = true;
        }

        if (view_self_btn) {
            view_self_btn.disabled = true;
        }

        if (view_let_btn) {
            view_let_btn.disabled = true;
        }

        if (view_hrahl_btn) {
            view_hrahl_btn.disabled = true;
        }

        if (view_oi_btn) {
            view_oi_btn.disabled = true;
        }

        if (view_80tta_btn) {
            view_80tta_btn.disabled = true;
        }

        if (view_80d_btn) {
            view_80d_btn.disabled = true;
        }

        if (view_80eeb_btn) {
            view_80eeb_btn.disabled = true;
        }

        if (view_80c_btn) {
            view_80c_btn.disabled = true;
        }

        // if (checker_1Date || checker_2Date) {                       
        //     if (checker_1Date && !checker_2Date) {                                              
        //         if (checker_1Date_6days > current_time_date1) {    
        //             var all_buttons = document.querySelectorAll('button');
        //             all_buttons.forEach(function (button) {
        //                 if (!button.hasAttribute('data-bs-toggle')) {
        //                     button.disabled = false;
        //                 }
        //             });

        //             var fileInputs = document.querySelectorAll('input[type="file"]');
        //             fileInputs.forEach(function (input) {
        //                 input.disabled = false;
        //             });
        //             document.getElementById('resub_btn1').style.display = 'block';                    
        //         } else {            
        //             var all_buttons = document.querySelectorAll('button');
        //             all_buttons.forEach(function (button) {
        //                 if (!button.hasAttribute('data-bs-toggle')) {
        //                     button.disabled = true;
        //                 }
        //             });

        //             var fileInputs = document.querySelectorAll('input[type="file"]');
        //             fileInputs.forEach(function (input) {
        //                 input.disabled = true;
        //             });
        //             document.getElementById('resub_btn1').style.display = 'none';                    
        //         }
        //     } else if (checker_2Date) {                       
        //         if (checker_2Date_6days > current_time_date1) {                                                         
        //             var all_buttons = document.querySelectorAll('button');
        //             all_buttons.forEach(function (button) {
        //                 if (!button.hasAttribute('data-bs-toggle')) {
        //                     button.disabled = false;
        //                 }
        //             });

        //             var fileInputs = document.querySelectorAll('input[type="file"]');
        //             fileInputs.forEach(function (input) {
        //                 input.disabled = false;
        //             });
        //             document.getElementById('resub_btn2').style.display = 'block';
        //         } else {
                    
        //             var all_buttons = document.querySelectorAll('button');
        //             all_buttons.forEach(function (button) {
        //                 if (!button.hasAttribute('data-bs-toggle')) {
        //                     button.disabled = true;
        //                 }
        //             });

        //             var fileInputs = document.querySelectorAll('input[type="file"]');
        //             fileInputs.forEach(function (input) {
        //                 input.disabled = true;
        //             });
        //             document.getElementById('resub_btn2').style.display = 'none';
        //         }
        //     }

        // } 

        
        var all_buttons = document.querySelectorAll('button');
        all_buttons.forEach(function (button) {
            button.disabled = true;
        });

        var fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(function (input) {
            input.disabled = true;
        });
        document.getElementById('resub_btn1').style.display = 'none';
        document.getElementById('resub_btn2').style.display = 'none';
   
        document.getElementById('cancelbtn5').disabled = true;
        document.getElementById('cancelbtn4').disabled = true;
        document.getElementById('cancelbtn3').disabled = true;
        document.getElementById('cancelbtn2').disabled = true;

        document.getElementById('itproofcheck').disabled = true;
    } else if (maker_1Date){
        var all_inputs = document.querySelectorAll('input');
        all_inputs.forEach(function (input) {
            input.readOnly = true;
        });

        var all_select = document.querySelectorAll('select');
        all_select.forEach(function (select) {
            select.disabled = true;
        });

        var all_radio_buttons = document.querySelectorAll('input[type="radio"]');
        all_radio_buttons.forEach(function (radio) {
            radio.disabled = true;
        });


        if (view_hra_btn) {
            view_hra_btn.disabled = true;
        }

        if (view_both_btn) {
            view_both_btn.disabled = true;
        }

        if (view_self_btn) {
            view_self_btn.disabled = true;
        }

        if (view_let_btn) {
            view_let_btn.disabled = true;
        }

        if (view_hrahl_btn) {
            view_hrahl_btn.disabled = true;
        }

        if (view_oi_btn) {
            view_oi_btn.disabled = true;
        }

        if (view_80tta_btn) {
            view_80tta_btn.disabled = true;
        }

        if (view_80d_btn) {
            view_80d_btn.disabled = true;
        }

        if (view_80eeb_btn) {
            view_80eeb_btn.disabled = true;
        }

        if (view_80c_btn) {
            view_80c_btn.disabled = true;
        }

        var all_buttons = document.querySelectorAll('button');
        all_buttons.forEach(function (button) {
            button.disabled = true;
        });

        var fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(function (input) {
            input.disabled = true;
        });
        document.getElementById('resub_btn1').style.display = 'none';
        document.getElementById('resub_btn2').style.display = 'none';
    



        document.getElementById('cancelbtn5').disabled = true;
        document.getElementById('cancelbtn4').disabled = true;
        document.getElementById('cancelbtn3').disabled = true;
        document.getElementById('cancelbtn2').disabled = true;

        document.getElementById('itproofcheck').disabled = true;



    }
    // else {

    //     if (rent_2.style.display == 'table-row') {
    //         readOnlytrueline_1();
    //     }

    //     if (rent_3.style.display == 'table-row') {
    //         readOnlytrueline_1();
    //         readOnlytrueline_2();
    //     }

    //     if (rent_4.style.display == 'table-row') {
    //         readOnlytrueline_1();
    //         readOnlytrueline_2();
    //         readOnlytrueline_3();
    //     }

    //     if (rent_5.style.display == 'table-row') {
    //         readOnlytrueline_1();
    //         readOnlytrueline_2();
    //         readOnlytrueline_3();
    //         readOnlytrueline_4();
    //     }

    //     var all_radio_buttons = document.querySelectorAll('input[type="radio"]');
    //     all_radio_buttons.forEach(function (radio) {
    //         if (radio.name !== "isyourpan" && radio.value !== "submit") {
    //             radio.disabled = false;
    //         }
    //     });

    //     var all_select = document.querySelectorAll('select');
    //     all_select.forEach(function (select) {
    //         select.disabled = false;
    //     });


    //     var all_buttons = document.querySelectorAll('button');
    //     all_buttons.forEach(function (button) {
    //         if (button.id !== "SaveData" && button.id !== "SubmitData") {
    //             button.disabled = false;
    //         }
    //     });
    //     document.getElementById('cancelbtn5').disabled = false;

    //     document.getElementById('itproofcheck').disabled = false;


    //     var fileInputs = document.querySelectorAll('input[type="file"]');

    //     fileInputs.forEach(function (input) {
    //         input.disabled = false;
    //     });

    // }

});
