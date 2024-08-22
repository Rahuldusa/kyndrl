
// inputEmpNo.setAttribute('required', 'required');
// controlNoFrom.removeAttribute('required');


var num_start = Number(num_start);
var num_end = Number(num_end)

var submit_1 = document.getElementById('submit_1');
var submit_2 = document.getElementById('submit_2');

var maker_form = document.getElementById('maker_form');

var empNo_btn = document.getElementById('empNo');
var inputEmpNo = document.getElementById('inputEmpNo');

var controlNo_btn = document.getElementById('controlNo');
var controlNoFrom = document.getElementById('controlNoFrom');
var controlNoTo = document.getElementById('controlNoTo');

var error_message = document.getElementById('error_message');


document.getElementById('empNo').addEventListener('change', function () {
    document.getElementById('inputEmpNo').classList.remove('hide');
    document.getElementById('controlNoFields').classList.add('hide');
    submit_2.style.display = 'none';
    submit_1.style.display = 'block';        
});


document.getElementById('controlNo').addEventListener('change', function () {
    document.getElementById('inputEmpNo').classList.add('hide');
    document.getElementById('controlNoFields').classList.remove('hide');
    submit_2.style.display = 'block';
    submit_1.style.display = 'none';
    
});

function validateInputEmpNo(){
    if (inputEmpNo.value){
        submit_1.disabled = false;
    }else{
        submit_1.disabled = true;
    }
}

function enable_cn_btn(){
    if (controlNoFrom.value && controlNoTo.value && error_message.textContent === '' ){
        submit_2.disabled = false;
    }else{
        submit_2.disabled = true;
    }
}


function validate_inputEmpNo() {
    if (inputEmpNo.value) {
        empNo_btn.checked = true;
        inputEmpNo.classList.remove('hide');
        document.getElementById('controlNoFields').classList.add('hide');
        submit_2.style.display = 'none';
        submit_1.style.display = 'block';
    }
}

function validate_controlNo(){
    if (controlNoFrom.value || controlNoTo.value){
        controlNo_btn.checked = true;
        document.getElementById('inputEmpNo').classList.add('hide');
        document.getElementById('controlNoFields').classList.remove('hide');
        submit_2.style.display = 'block';
        submit_1.style.display = 'none';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    validate_inputEmpNo();
    validate_controlNo();
});

document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.onkeydown = function (event) {
            return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code !== 'Space';
        };
    });
});

function validate_from_no(){
    if (controlNoFrom.value){        
        if (Number(controlNoFrom.value) < Number(num_start) || Number(controlNoFrom.value) > Number(num_end)){
            error_message.textContent = 'please enter value between range.'            
        } else{            
            error_message.textContent = '';
        }
    }else{
        error_message.textContent = '';
    }
    enable_cn_btn();
}


function validate_to_no(){
    if (controlNoTo.value){
        if (Number(controlNoTo.value) < Number(controlNoFrom.value)){
            error_message.textContent = 'End value must be more than Start value.'
        } else if (Number(controlNoTo.value) < Number(num_start) || Number(controlNoTo.value) > Number(num_end)){
            error_message.textContent = 'please enter value between range.'
        } else{
            error_message.textContent = '';
        }
    } else{
        error_message.textContent = '';
    } 
    enable_cn_btn();
}



function Submit_function() {        
    var apiUrl = 'maker_emp_page'
    
    // Create a new form dynamically
    var newForm = document.createElement("form");
    newForm.action = apiUrl;
    newForm.method = maker_form.method;  // Preserving the method (GET/POST) from the original form
    newForm.target = "_blank";  // This ensures the form submits to a new tab

    // Add all the input elements from the original form to the new form
    var formData = new FormData(maker_form);
    formData.forEach(function(value, key){
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        newForm.appendChild(input);
    });

    // Append the new form to the body and submit it
    document.body.appendChild(newForm);
    newForm.submit();

    // Remove the form from the DOM after submitting
    document.body.removeChild(newForm);
}



function Submit_1_function() {    
    var apiUrl = 'maker_control_number'
    maker_form.action = apiUrl;
    maker_form.submit();
}
