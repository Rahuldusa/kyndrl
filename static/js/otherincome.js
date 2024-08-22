var section80oiyesbtn = document.getElementById('section80oiyes');
var section80oinobtn = document.getElementById('section80oino');

var section80oi = document.getElementById('section80oi_questions');

var file_upload_rowoi_file = document.getElementById('file_upload_rowoi');
var other_income_oiInp = document.getElementById('other_income_oi');
var other_income_ErrorSpan = document.getElementById('other_income_Error');



function hideFields_oi() {
    other_income_oiInp.value = null;
    other_income_ErrorSpan.textContent = '';
    interest_80tta_errorSpan.textContent = '';

    document.getElementById('interest_80tta').disabled = true;
    document.getElementById('interest_80tta').value = null;
    // upload_80tta_file.style.display = 'none';
    file_upload_rowoi_file.style.display = 'none';

    section80ttayesbtn.checked = false;
    section80ttanobtn.checked = true;
    section80tta_.style.display = 'none';
}

function display_other_income_file() {
    if (other_income_oiInp.value && other_income_ErrorSpan.textContent === '') {
        file_upload_rowoi_file.style.display = 'table-row';
    } else {
        file_upload_rowoi_file.style.display = 'none';
    }
    display_submit();
    disable_btns();

}

function showSanctionedField_oi(checkbox) {
    if (checkbox === 'yes') {
        section80oi.style.display = 'block';

    } else {
        section80oi.style.display = 'none';
        hideFields_oi();
        if (localStorage.getItem('other_form_formData')) {
            localStorage.removeItem('other_form_formData');
        }
    }
    display_save2btn();
    save_father_ispan();
    files_display_section_none();
    display_submit();
    disable_btns();
}

var other_income_oiInp_value



function validateotherInterest_oi() {       
    const convertedText_otherincome = document.getElementById("convertedText_otherincome"); 
    if (other_income_oiInp.value) {
        new_value = other_income_oiInp.value;
        if (!Number.isInteger(Number(new_value)) || new_value.includes('.') || Number(new_value) < 0) {
            other_income_ErrorSpan.textContent = 'Please enter a positive integer value.';
            convertedText_otherincome.textContent = "";
        }else if(Number(new_value) == 0){
            other_income_ErrorSpan.textContent = '';
        }
         else if (new_value > 3000000) {
            other_income_oiInp.value = 3000000
            other_income_ErrorSpan.textContent = '';
            other_income_oiInp_value = 3000000;
            const amount = parseInt(other_income_oiInp.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_otherincome.textContent = `${ convertedValue } Rupees Only`;
            // Apply red color if amount is greater than 1000000
            if (amount >= 1000000) {
                convertedText_otherincome.style.color = "red";
                console.log('above 10 lakhs')
            } else {
                convertedText_otherincome.style.color = "";
            }
            document.getElementById('interest_80tta').disabled = false;
            alert("Kindly contact help center if you need to declare more than 30 LAC.");
        } else {
            document.getElementById('interest_80tta').disabled = false;
            other_income_ErrorSpan.textContent = '';
            other_income_oiInp_value = new_value;
            const amount = parseInt(other_income_oiInp.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_otherincome.textContent = `${ convertedValue } Rupees Only`;
            // Apply red color if amount is greater than 1000000
            if (amount >= 1000000) {
                convertedText_otherincome.style.color = "red";
                console.log('above 10 lakhs')
            } else {
                convertedText_otherincome.style.color = "";
            }
        }
    } else {
        document.getElementById('interest_80tta').disabled = true;
        other_income_ErrorSpan.textContent = '';
        convertedText_otherincome.textContent = "";
        document.getElementById('interest_80tta').value = null;
        // upload_80tta_file.style.display = 'none';
        alert("if you are declaring 80TTA, then other income needs to be declared");
    }
    display_other_income_file();

}



function validateotherInterest_oi2() {
    const convertedText_otherincome = document.getElementById("convertedText_otherincome"); 
    if (other_income_oiInp.value) {
        new_value = other_income_oiInp.value;
        if (!Number.isInteger(Number(new_value)) || new_value.includes('.') || Number(new_value) < 0) {
            other_income_ErrorSpan.textContent = '';
            convertedText_otherincome.textContent = "";
        }else if ( Number(new_value) == 0){
            other_income_ErrorSpan.textContent = '';
        }
         else if (new_value > 3000000) {
            other_income_oiInp.value = 3000000
            other_income_ErrorSpan.textContent = '';
            other_income_oiInp_value = 3000000;
            const amount = parseInt(other_income_oiInp.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_otherincome.textContent = `${ convertedValue } Rupees Only`;
            // Apply red color if amount is greater than 1000000
            if (amount >= 1000000) {
                convertedText_otherincome.style.color = "red";
                console.log('above 10 lakhs')
            } else {
                convertedText_otherincome.style.color = "";
            }
            document.getElementById('interest_80tta').disabled = false;
        } else {
            document.getElementById('interest_80tta').disabled = false;
            other_income_ErrorSpan.textContent = '';
            other_income_oiInp_value = new_value;
            const amount = parseInt(other_income_oiInp.value);
            const convertedValue = convertToIndianCurrency(amount);
            convertedText_otherincome.textContent = `${ convertedValue } Rupees Only`;
            // Apply red color if amount is greater than 1000000
            if (amount >= 1000000) {
                convertedText_otherincome.style.color = "red";
                console.log('above 10 lakhs')
            } else {
                convertedText_otherincome.style.color = "";
            }
        }
    } else {
        document.getElementById('interest_80tta').disabled = true;
        other_income_ErrorSpan.textContent = '';
        convertedText_otherincome.textContent = "";        
        document.getElementById('interest_80tta').value = null;
        // upload_80tta_file.style.display = 'none';
    }

}

function annualLettableValueFileUpload_oi() {

    const other_income_oi = document.getElementById('other_income_oi').value;
    const other_form_formData = {
        other_income_oi: other_income_oi
    };
    const jsonData = JSON.stringify(other_form_formData);
    localStorage.setItem('other_form_formData', jsonData);

    
    if (localStorage.getItem('currentTab') !== null) {
        currentTab = 2;
    }else{
        localStorage.setItem('currentTab', 2)
    }

    let apiUrl = "upload_other_income_file";
    document.getElementById("other_form").action = apiUrl;
    document.getElementById("other_form").submit();


}




document.addEventListener("DOMContentLoaded", function () {
    var section80oiyesbtn = document.getElementById('section80oiyes');
    var section80oino = document.getElementById('section80oino');


    const storedData_other = localStorage.getItem('other_form_formData');
    if (storedData_other) {
        const storedFormData = JSON.parse(storedData_other);
        if (storedFormData.other_income_oi) {
            section80oiyesbtn.checked = true;
            other_income_oiInp.value = storedFormData.other_income_oi;
            section80oi_value = 'yes'
            showSanctionedField_oi(section80oi_value);
        }
    }

    if (other_income_oiInp.value){

    }


    if (section80oiyesbtn.checked === true) {
        section80oi_value = 'yes'
        showSanctionedField_oi(section80oi_value);
    } else {
        section80oi_value = 'no'
        showSanctionedField_oi(section80oi_value);
    }
    display_other_income_file();
    validateotherInterest_oi2();



});

