


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


var files_display_section = document.getElementById('files_display');
var hra_form2section = document.getElementById('hra_form2');
var section80oiyesbtn = document.getElementById('section80oiyes');



function files_display_section_none() {
    if (section80oiyesbtn.checked === true) {
        files_display_section.style.display = 'flex';
        hra_form2section.style.display = 'flex';    
    }else if (sectionyes_previousempbtn){
        if (sectionyes_previousempbtn.checked === true) {
            files_display_section.style.display = 'flex';
            hra_form2section.style.display = 'flex';    
        }
    } else {
        files_display_section.style.display = 'none';
        hra_form2section.style.display = 'none';        
    }
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



function SaveData() {

    let formDataForm1 = new FormData(document.getElementById("form1"));
    let formDataForm3 = new FormData(document.getElementById("form3"));
    let formDataForm4 = new FormData(document.getElementById("form4"));

    if (localStorage.getItem('Basic_form_formData')) {
        localStorage.removeItem('Basic_form_formData');
    }
    
 
    if (localStorage.getItem('other_form_formData')) {
        localStorage.removeItem('other_form_formData');
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

    
    let section80oi_form = new FormData(document.getElementById("section80oi_form"));
    
    for (let [key, value] of section80oi_form.entries()) {
        formDataForm1.append(key, value);
    }
    
    if (section80oiyesbtn.checked === true) {
        let other_form = new FormData(document.getElementById("other_form"));
        for (let [key, value] of other_form.entries()) {
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


    for (let [key, value] of formDataForm3.entries()) {
        formDataForm1.append(key, value);
    }
    for (let [key, value] of formDataForm4.entries()) {
        formDataForm1.append(key, value);
    }

    
    let section80oi_form = new FormData(document.getElementById("section80oi_form"));
    

    
    for (let [key, value] of section80oi_form.entries()) {
        formDataForm1.append(key, value);
    }
    

    
    if (section80oiyesbtn.checked === true) {
        let other_form = new FormData(document.getElementById("other_form"));
        for (let [key, value] of other_form.entries()) {
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
    display_save2btn();
}


function validateItproofcheck() {
    if (itproofcheckBox.checked == true) {
        document.getElementById('itproofcheck').value = true;

    } else {
        document.getElementById('itproofcheck').value = false;
    }
    display_submit();
    disable_btns();
    display_save2btn();
}


var edit_48_hrs1 = edit_48_hrs1;
var current_time_date1 = current_time_date1;


edit_48_hrs1 = new Date(edit_48_hrs1)
current_time_date1 = new Date(current_time_date1)


var view_oi_btn
if (other_income_oiInp.value) {
    view_oi_btn = document.getElementById('view_oi_btn')
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

    if (current_time_date1 > edit_48_hrs1) {

        var all_inputs = document.querySelectorAll('input');
        all_inputs.forEach(function (input) {
            input.readOnly = true;
        });

        if(view_oi_btn){
            view_oi_btn.disabled = true;
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
                
        var all_select = document.querySelectorAll('select');
        all_select.forEach(function (select) {
            select.disabled = true;
        });

        var all_radio_buttons = document.querySelectorAll('input[type="radio"]');
        all_radio_buttons.forEach(function (radio) {
            radio.disabled = true;
        });
       
        document.getElementById('itproofcheck').disabled = true;
        

    } else if (maker_1Date){
        var all_inputs = document.querySelectorAll('input');
        all_inputs.forEach(function (input) {
            input.readOnly = true;
        });

        if(view_oi_btn){
            view_oi_btn.disabled = true;
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
                
        var all_select = document.querySelectorAll('select');
        all_select.forEach(function (select) {
            select.disabled = true;
        });

        var all_radio_buttons = document.querySelectorAll('input[type="radio"]');
        all_radio_buttons.forEach(function (radio) {
            radio.disabled = true;
        });
       
        document.getElementById('itproofcheck').disabled = true;
    }
    // else{
    //     var all_inputs = document.querySelectorAll('input');
    //     all_inputs.forEach(function (input) {
    //         input.readOnly = false;
    //     });
    //     var all_buttons = document.querySelectorAll('button');
    //     all_buttons.forEach(function (button) {
    //         button.disabled = false;
    //     });
    //     var fileInputs = document.querySelectorAll('input[type="file"]');
    //     fileInputs.forEach(function (input) {
    //         input.disabled = false;
    //     });
    // }
});