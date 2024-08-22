
var submit_section_1 = document.getElementById('submit_section');

// var SaveDatabtn = document.getElementById('SaveData');



var SubmitData_btn

var SaveData_btn = document.getElementById('SaveData');
var SaveData2_btn = document.getElementById('SaveData2');



var other_file = String(other_file).toLowerCase();

// Previous Employement
var saved_previous_emp_empid = String(saved_previous_emp_empid)

var previous_empl_file = String(previous_empl_file).toLowerCase();

var other_declaration_file_1 = String(other_declaration_file_1).toLowerCase();



var prevBtn_btn = document.getElementById('prevBtn');
var nextBtn_btn = document.getElementById('nextBtn');



var SaveData5_btn
var sectionyes_previousempbtn
var savebtn_prev_section

if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
    sectionyes_previousempbtn = document.getElementById('sectionyes_previousemp');
    SaveData5_btn = document.getElementById('SaveData5');
    savebtn_prev_section = document.getElementById('savebtn_prev');
}


var savebtn_Other = document.getElementById('savebtn_Other');

var savedata_section = document.getElementById('savedata_section');



function display_func(){
    displayFlag_2 = true;

    if (current_time_date1 > edit_48_hrs1) {
        displayFlag_2 = false;
    }
    if (maker_1Date){
        displayFlag_2 = false;
    }
    if (displayFlag_2) {                
        savedata_section.style.display = 'block';         
    } else {                
        savedata_section.style.display = 'none';        
    }
}



function display_submit() {

    let displayFlag = true;

    if (localStorage.getItem('currentTab')) {
        if (currentTab == 3) {
            let displayFlag_2 = true;
            if (!saved_Ilhp_empid && !saved_previous_emp_empid) {
                displayFlag_2 = false;
            }

            if (!placeInput.value || placeErrorSpan.textContent != '' || itproofcheckBox.checked == false) {
                displayFlag_2 = false;
            }
            if (other_income_oiInp.value > 0 && !other_declaration_file_1) {
                displayFlag_2 = false;
            }

            if (current_time_date1 > edit_48_hrs1) {
                displayFlag_2 = false;
            }
            if (maker_1Date){
                displayFlag_2 = false;
            }

            if (displayFlag_2) {
                submit_section_1.style.display = 'block';
                SubmitData_btn = document.getElementById('SubmitData');
            } else {
                submit_section_1.style.display = 'none';
                SubmitData_btn = '';
            }
        }
    }

    if (section80oiyesbtn.checked == true) {
        if (!other_income_oiInp.value) {
            displayFlag = false;
        }
    }

    if (other_income_oiInp.value > 0 && !other_declaration_file_1) {
        displayFlag = false;
    }

    if (other_income_oiInp.value > 0 && !other_file) {
        displayFlag = false;
    }
    if (empStartDate >= financialYearStart && empStartDate <= financialYearEnd) {
        if (salary_previousemp.value > 0 && !previous_empl_file) {
            displayFlag = false;
        }
    }


    if (sectionyes_previousempbtn) {
        if (sectionyes_previousempbtn.checked == true) {
            if (!salary_previousemp.value) {
                displayFlag = false;
            }
        }
    }

    if (saved_basic_empid) {
        if (saved_basic_current_page == '1') {
            if (!section80oiyesbtn.checked == true) {
                saved_basic_current_page = 'None'
            }
        }
        if (sectionyes_previousempbtn) {
            if (saved_basic_current_page == '2') {
                if (!sectionyes_previousempbtn.checked == true) {
                    saved_basic_current_page = 'None'
                }
            }
        }
    }
    if (saved_basic_empid) {
        if (saved_basic_current_page != 'None') {
            displayFlag = false;
        }
    }

    if (displayFlag) {
        prevBtn_btn.disabled = false;
        nextBtn_btn.disabled = false;
    } else {
        prevBtn_btn.disabled = true;
        nextBtn_btn.disabled = true;
    }

    

}

function disable_btns() {
    let disable_btns_Flag = true;


   

    if (localStorage.getItem('currentTab')) {
        if (currentTab == 3) {
            let disable_btns_Flag2 = true;
            
            if (!placeInput.value || placeErrorSpan.textContent != '' || itproofcheckBox.checked == false) {
                disable_btns_Flag2 = false;
            }

            if (disable_btns_Flag2) {
                SaveData_btn.disabled = false;
                if (SubmitData_btn) {
                    SubmitData_btn.disabled = false;
                }
            } else {
                SaveData_btn.disabled = true;
                if (SubmitData_btn) {
                    SubmitData_btn.disabled = false;
                }
            }
        }
    }

    if (section80oiyesbtn.checked == true) {
        if (other_income_ErrorSpan.textContent != '') {
            disable_btns_Flag = false;
        }
        if (!other_income_oiInp.value) {
            disable_btns_Flag = false;
        }
    }

    if (sectionyes_previousempbtn) {
        if (sectionyes_previousempbtn.checked == true) {
            if (salary_previousemp_Error.textContent != '' || provident_fund_Error.textContent != '' || professional_tax_Error.textContent != '' || income_tax_Error.textContent != '') {
                disable_btns_Flag = false;
            }
            if (!salary_previousemp.value) {
                disable_btns_Flag = false;
            }
        }
    }

    if (disable_btns_Flag == false) {
        SaveData2_btn.disabled = true;
        if (SaveData5_btn) {
            SaveData5_btn.disabled = true;
        }
        if (SubmitData_btn) {
            SubmitData_btn.disabled = true;
        }
    } else {

        SaveData2_btn.disabled = false;
        if (SaveData5_btn) {
            SaveData5_btn.disabled = false;
        }
        if (SubmitData_btn) {
            SubmitData_btn.disabled = false;
        }
    }
    
}



document.addEventListener("DOMContentLoaded", function () {
    display_submit();
    disable_btns();
    display_func();
});




function display_save2btn() {
    let displayFlag = true;
    if (section80oiyesbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }
    if (current_time_date1 > edit_48_hrs1) {
        displayFlag = false;
    }
    if (maker_1Date){
        displayFlag = false;
    }
    if (displayFlag) {
        savebtn_Other.style.display = 'block';
    } else {
        savebtn_Other.style.display = 'none';
    }
}



function display_save5btn() {

    let displayFlag = true;
    if (sectionyes_previousempbtn.checked == true) {
        displayFlag = true;
    } else {
        displayFlag = false;
    }
    if (current_time_date1 > edit_48_hrs1) {
        displayFlag = false;
    }
    if (maker_1Date){
        displayFlag = false;
    }
    if (displayFlag) {
        savebtn_prev_section.style.display = 'block';
    } else {
        savebtn_prev_section.style.display = 'none';
    }
}