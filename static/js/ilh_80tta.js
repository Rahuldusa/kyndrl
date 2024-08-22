

var section80ttayesbtn = document.getElementById('section80ttayes');
var section80ttanobtn = document.getElementById('section80ttano');



var section80tta_ = document.getElementById('section80tta_questions');
// var upload_80tta_file = document.getElementById('file_upload_row_80tta')

var interest_80ttaInp = document.getElementById('interest_80tta');
var interest_80tta_errorSpan = document.getElementById('interest_80tta_error');


function hideFields_80tta() {
    interest_80ttaInp.value = null;
    interest_80tta_errorSpan.textContent = '';
    interest_80ttaInp.disabled = true;
    // upload_80tta_file.style.display = 'none';
}

function showSanctionedField_80tta(checkbox) {
    if (checkbox === 'yes') {
        section80tta_.style.display = 'block';
        validateotherInterest_oi2();

    } else {
        section80tta_.style.display = 'none';
        hideFields_80tta();
        validateotherInterest_oi2();
        
        if (localStorage.getItem('formData_80tta')) {
            localStorage.removeItem('formData_80tta');
        }
    }

    save_father_ispan();
    files_display_section_none();
    display_save2btn();
    display_submit();
    disable_btns();
}



// function display_80tta_file() {    
//     if (interest_80ttaInp.value && interest_80tta_errorSpan.textContent === '') {        
//         upload_80tta_file.style.display = 'table-row';
//     } else {        
//         upload_80tta_file.style.display = 'none';
//     }
//     display_submit();
//     disable_btns();
// }



function validateInterest_80tta() {
    if (interest_80ttaInp.value) {
        new_value = interest_80ttaInp.value;
        if (!Number.isInteger(Number(new_value)) || new_value.includes('.') || Number(new_value) < 0) {
            interest_80tta_errorSpan.textContent = 'Please enter a positive integer value.';
        } else if (Number(new_value) == 0) {
            interest_80tta_errorSpan.textContent = '';
        }
        else if (Number(new_value) >= Number(other_income_oiInp_value)) {
            document.getElementById('interest_80tta').value = other_income_oiInp_value;
            interest_80tta_errorSpan.textContent = '';
            alert('Interest Income from Savings account should not more than Other Income ')
            const formData_80tta = { interest_80ttaValue: interest_80ttaInp.value };
            const jsonData = JSON.stringify(formData_80tta);
            localStorage.setItem('formData_80tta', jsonData);


            if (localStorage.getItem('currentTab') !== null) {
                currentTab = 2;
            } else {
                localStorage.setItem('currentTab', 2)
            }

        }
        else {
            interest_80tta_errorSpan.textContent = '';
            const formData_80tta = { interest_80ttaValue: interest_80ttaInp.value };
            const jsonData = JSON.stringify(formData_80tta);
            localStorage.setItem('formData_80tta', jsonData);


            if (localStorage.getItem('currentTab') !== null) {
                currentTab = 2;
            } else {
                localStorage.setItem('currentTab', 2)
            }
        }
    } else {
        interest_80tta_errorSpan.textContent = '';
    }
    display_submit();
    disable_btns();

}

// function FileUpload_80tta() {
//     let apiUrl = "upload_80tta_file";
//     document.getElementById("ilh_80tta_form").action = apiUrl;
//     document.getElementById("ilh_80tta_form").submit();
// }




document.addEventListener("DOMContentLoaded", function () {
    var section80ttayesbtn = document.getElementById('section80ttayes');
    var section80ttanobtn = document.getElementById('section80ttano');


    const storedData_80tta = localStorage.getItem('formData_80tta');
    if (storedData_80tta) {
        const storedFormData = JSON.parse(storedData_80tta);
        if (storedFormData.interest_80ttaValue) {
            interest_80ttaInp.value = storedFormData.interest_80ttaValue;

            section80ttayesbtn.checked = true;
            checkbox = 'yes'
            showSanctionedField_80tta(checkbox);
        }
    }



    if (section80ttayesbtn.checked === true) {
        checkbox = 'yes'
        showSanctionedField_80tta(checkbox);
    } else {
        checkbox = 'no'
        showSanctionedField_80tta(checkbox);
    }
    // display_80tta_file();
});







