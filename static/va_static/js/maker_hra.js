


function validateAllow_rent_1() {
    if (allow_rent_1.value) {
        inputValue = allow_rent_1.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allow_rent_1Error.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allow_rent_1Error.textContent = '';
        } else if (Number(inputValue) > Number(itd1.value)) {
            allow_rent_1Error.textContent = '';
            allow_rent_1.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allow_rent_1Error.textContent = '';
        }
    } else {
        allow_rent_1Error.textContent = '';
    }
    submit_btn_enable();
}


function validateAllow_rent_1_2(){
    if (allow_rent_1_2.value){
        total_value = Number(allow_rent_1_2.value) + Number(allow_rent_1.value)
        if (Number(total_value) > Number(itd1.value)){
            allow_rent_1_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllow_rent_1_3(){
    if (allow_rent_1_3.value){
        total_value = Number(allow_rent_1_3.value) + Number(allow_rent_1_2.value) + Number(allow_rent_1.value)
        if (Number(total_value) > Number(itd1.value)){
            allow_rent_1_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllow_rent_2() {
    if (allow_rent_2.value) {
        inputValue = allow_rent_2.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allow_rent_2Error.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allow_rent_2Error.textContent = '';
        } else if (Number(inputValue) > Number(itd2.value)) {
            allow_rent_2Error.textContent = '';
            allow_rent_2.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allow_rent_2Error.textContent = '';
        }
    } else {
        allow_rent_2Error.textContent = '';
    }
    submit_btn_enable();
}


function validateAllow_rent_2_2(){
    if (allow_rent_2_2.value){
        total_value = Number(allow_rent_2_2.value) + Number(allow_rent_2.value)
        if (Number(total_value) > Number(itd2.value)){
            allow_rent_2_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllow_rent_2_3(){
    if (allow_rent_2_3.value){
        total_value = Number(allow_rent_2_3.value) + Number(allow_rent_2_2.value) + Number(allow_rent_2.value)
        if (Number(total_value) > Number(itd2.value)){
            allow_rent_2_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllow_rent_3() {
    if (allow_rent_3.value) {
        inputValue = allow_rent_3.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allow_rent_3Error.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allow_rent_3Error.textContent = '';
        } else if (Number(inputValue) > Number(itd3.value)) {
            allow_rent_3Error.textContent = '';
            allow_rent_3.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allow_rent_3Error.textContent = '';
        }
    } else {
        allow_rent_3Error.textContent = '';
    }
    submit_btn_enable();
}


function validateAllow_rent_3_2(){
    if (allow_rent_3_2.value){
        total_value = Number(allow_rent_3_2.value) + Number(allow_rent_3.value)
        if (Number(total_value) > Number(itd3.value)){
            allow_rent_3_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllow_rent_3_3(){
    if (allow_rent_3_3.value){
        total_value = Number(allow_rent_3_3.value) + Number(allow_rent_3_2.value) + Number(allow_rent_3.value)
        if (Number(total_value) > Number(itd3.value)){
            allow_rent_3_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function validateAllow_rent_4() {
    if (allow_rent_4.value) {
        inputValue = allow_rent_4.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allow_rent_4Error.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allow_rent_4Error.textContent = '';
        } else if (Number(inputValue) > Number(itd4.value)) {
            allow_rent_4Error.textContent = '';
            allow_rent_4.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allow_rent_4Error.textContent = '';
        }
    } else {
        allow_rent_4Error.textContent = '';
    }
    submit_btn_enable();
}


function validateAllow_rent_4_2(){
    if (allow_rent_4_2.value){
        total_value = Number(allow_rent_4_2.value) + Number(allow_rent_4.value)
        if (Number(total_value) > Number(itd4.value)){
            allow_rent_4_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllow_rent_4_3(){
    if (allow_rent_4_3.value){
        total_value = Number(allow_rent_4_3.value) + Number(allow_rent_4_2.value) + Number(allow_rent_4.value)
        if (Number(total_value) > Number(itd4.value)){
            allow_rent_4_3.value = 0
            alert('Sum of allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}

function validateAllow_rent_5() {
    if (allow_rent_5.value) {
        inputValue = allow_rent_5.value
        if (isNaN(inputValue) || inputValue.includes('.') || parseFloat(inputValue) < 0) {
            allow_rent_5Error.textContent = 'Please enter positive integer only.';
        } else if (parseFloat(inputValue) == 0) {
            allow_rent_5Error.textContent = '';
        } else if (Number(inputValue) > Number(itd5.value)) {
            allow_rent_5Error.textContent = '';
            allow_rent_5.value = 0
            alert('Allowed amount should not more than declared amount.')
        } else {
            allow_rent_5Error.textContent = '';
        }
    } else {
        allow_rent_5Error.textContent = '';
    }
    submit_btn_enable();
}


function validateAllow_rent_5_2(){
    if (allow_rent_5_2.value){
        total_value = Number(allow_rent_5_2.value) + Number(allow_rent_5.value)
        if (Number(total_value) > Number(itd5.value)){
            allow_rent_5_2.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_2();
}


function validateAllow_rent_5_3(){
    if (allow_rent_5_3.value){
        total_value = Number(allow_rent_5_3.value) + Number(allow_rent_5_2.value) + Number(allow_rent_5.value)
        if (Number(total_value) > Number(itd5.value)){
            allow_rent_5_3.value = 0
            alert('Sum of both allowed amounts must not be more than declared amount.')
        }
    }
    submit_btn_enable_3();
}


function ValidateEndDate1() {
    if (ita1enddt.value) {
        var ita1stdt_new = new Date(ita1stdt.value);
        var ita1enddt_new = new Date(ita1enddt.value);

        if (ita1stdt_new > ita1enddt_new) {
            ita1stdt_new.setDate(ita1stdt_new.getDate() + 1);
            var nextDayDate_1 = formatDate(ita1stdt_new);
            ita1enddt.value = nextDayDate_1;
            var ita1enddt_new_1 = new Date(ita1enddt.value);
            if (itd2stdt_value) {
                ita1enddt_new_1.setDate(ita1enddt_new_1.getDate() + 1);
                var nextDayDate1 = formatDate(ita1enddt_new_1);
                ita2stdt.value = nextDayDate1;
            }
            if (!itd3stdt_value) {
                ita2enddt.readOnly = true;
            } else {
                ita2enddt.readOnly = false;
            }
            alert('End date in rent-1 must not before start date');
        } else if (ita1enddt_new > financialYearEnd) {
            document.getElementById('ita1enddt').value = formatDate(financialYearEnd);
            if (itd2stdt_value) {
                ita2stdt.value = null;
                ita2enddt.value = null;                
                ita2enddt.readOnly = true;
            }
            if (itd3stdt_value) {
                ita3stdt.value = null;
                ita3enddt.value = null;                
                ita3enddt.readOnly = true;
            }
            if (itd4stdt_value) {
                ita4stdt.value = null;
                ita4enddt.value = null;                
                ita4enddt.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt.value = null;
                ita5enddt.value = null;                
                ita5enddt.readOnly = true;
            }
            alert('End date in rent-1 must be in between current financial year');
        } else {            
            if (itd2stdt_value) {
                ita1enddt_new.setDate(ita1enddt_new.getDate() + 1);
                var nextDayDate1 = formatDate(ita1enddt_new);
                ita2stdt.value = nextDayDate1;
            }
            if (!itd3stdt_value) {
                ita2enddt.readOnly = true;
            } else {
                ita2enddt.readOnly = false;
            }
            
            if (itd5stdt_value){
                ita5enddt.value = itd5enddt.value;
                ita5enddt.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt.value = itd4enddt.value;
                ita4enddt.readOnly = true;
            }else if (itd3stdt_value){
                ita3enddt.value = itd3enddt.value;
                ita3enddt.readOnly = true;
            }else if (itd2stdt_value){
                ita2enddt.value = itd2enddt.value;
                ita2enddt.readOnly = true;
            }
        }
    }else{
        if (itd2stdt_value) {        
            ita2stdt.value = null;            
        }
        if (itd3stdt_value) {        
            ita3stdt.value = null;            
        }
        if (itd4stdt_value) {        
            ita4stdt.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt.value = itd5enddt.value;
            ita5enddt.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt.value =itd4enddt.value;
            ita4enddt.readOnly = true;
        }else if (itd3stdt_value){
            ita3enddt.value = itd3enddt.value;
            ita3enddt.readOnly = true;
        }else if (itd2stdt_value){
            ita2enddt.value = itd2enddt.value;
            ita2enddt.readOnly = true;
        }      
    }
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}


function ValidateEndDate1_2() {
    if (ita1enddt_2.value) {
        var ita1stdt_2_new = new Date(ita1stdt_2.value);
        var ita1enddt_2_new = new Date(ita1enddt_2.value);

        if (ita1stdt_2_new > ita1enddt_2_new) {
            ita1stdt_2_new.setDate(ita1stdt_2_new.getDate() + 1);
            var nextDayDate_1 = formatDate(ita1stdt_2_new);
            ita1enddt_2.value = nextDayDate_1;
            var ita1enddt_2_new_1 = new Date(ita1enddt_2.value);
            if (itd2stdt_value) {
                ita1enddt_2_new_1.setDate(ita1enddt_2_new_1.getDate() + 1);
                var nextDayDate1 = formatDate(ita1enddt_2_new_1);
                ita2stdt_2.value = nextDayDate1;
            }
            if (!itd3stdt_value) {
                ita2enddt_2.readOnly = true;
            } else {
                ita2enddt_2.readOnly = false;
            }
            alert('End date in rent-1 must not before start date');
        } else if (ita1enddt_2_new > financialYearEnd) {
            document.getElementById('ita1enddt_2').value = formatDate(financialYearEnd);
            if (itd2stdt_value) {
                ita2stdt_2.value = null;
                ita2enddt_2.value = null;                
                ita2enddt_2.readOnly = true;
            }
            if (itd3stdt_value) {
                ita3stdt_2.value = null;
                ita3enddt_2.value = null;                
                ita3enddt_2.readOnly = true;
            }
            if (itd4stdt_value) {
                ita4stdt_2.value = null;
                ita4enddt_2.value = null;                
                ita4enddt_2.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt_2.value = null;
                ita5enddt_2.value = null;                
                ita5enddt_2.readOnly = true;
            }
            alert('End date in rent-1 must be in between current financial year');
        } else {            
            if (itd2stdt_value) {
                ita1enddt_2_new.setDate(ita1enddt_2_new.getDate() + 1);
                var nextDayDate1 = formatDate(ita1enddt_2_new);
                ita2stdt_2.value = nextDayDate1;
            }
            if (!itd3stdt_value) {
                ita2enddt_2.readOnly = true;
            } else {
                ita2enddt_2.readOnly = false;
            }
            
            if (itd5stdt_value){
                ita5enddt_2.value = itd5enddt.value;
                ita5enddt_2.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt_2.value = itd4enddt.value;
                ita4enddt_2.readOnly = true;
            }else if (itd3stdt_value){
                ita3enddt_2.value = itd3enddt.value;
                ita3enddt_2.readOnly = true;
            }else if (itd2stdt_value){
                ita2enddt_2.value = itd2enddt.value;
                ita2enddt_2.readOnly = true;
            }
        }
    }else{
        if (itd2stdt_value) {        
            ita2stdt_2.value = null;            
        }
        if (itd3stdt_value) {        
            ita3stdt_2.value = null;            
        }
        if (itd4stdt_value) {        
            ita4stdt_2.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt_2.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_2.value = itd5enddt.value;
            ita5enddt_2.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt_2.value =itd4enddt.value;
            ita4enddt_2.readOnly = true;
        }else if (itd3stdt_value){
            ita3enddt_2.value = itd3enddt.value;
            ita3enddt_2.readOnly = true;
        }else if (itd2stdt_value){
            ita2enddt_2.value = itd2enddt.value;
            ita2enddt_2.readOnly = true;
        }      
    }
    submit_btn_enable_2();
}


function ValidateEndDate1_3() {
    if (ita1enddt_3.value) {
        var ita1stdt_3_new = new Date(ita1stdt_3.value);
        var ita1enddt_3_new = new Date(ita1enddt_3.value);

        if (ita1stdt_3_new > ita1enddt_3_new) {
            ita1stdt_3_new.setDate(ita1stdt_3_new.getDate() + 1);
            var nextDayDate_1 = formatDate(ita1stdt_3_new);
            ita1enddt_3.value = nextDayDate_1;
            var ita1enddt_3_new_1 = new Date(ita1enddt_3.value);
            if (itd2stdt_value) {
                ita1enddt_3_new_1.setDate(ita1enddt_3_new_1.getDate() + 1);
                var nextDayDate1 = formatDate(ita1enddt_3_new_1);
                ita2stdt_3.value = nextDayDate1;
            }
            if (!itd3stdt_value) {
                ita2enddt_3.readOnly = true;
            } else {
                ita2enddt_3.readOnly = false;
            }
            alert('End date in rent-1 must not before start date');
        } else if (ita1enddt_3_new > financialYearEnd) {
            document.getElementById('ita1enddt_3').value = formatDate(financialYearEnd);
            if (itd2stdt_value) {
                ita2stdt_3.value = null;
                ita2enddt_3.value = null;                
                ita2enddt_3.readOnly = true;
            }
            if (itd3stdt_value) {
                ita3stdt_3.value = null;
                ita3enddt_3.value = null;                
                ita3enddt_3.readOnly = true;
            }
            if (itd4stdt_value) {
                ita4stdt_3.value = null;
                ita4enddt_3.value = null;                
                ita4enddt_3.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt_3.value = null;
                ita5enddt_3.value = null;                
                ita5enddt_3.readOnly = true;
            }
            alert('End date in rent-1 must be in between current financial year');
        } else {            
            if (itd2stdt_value) {
                ita1enddt_3_new.setDate(ita1enddt_3_new.getDate() + 1);
                var nextDayDate1 = formatDate(ita1enddt_3_new);
                ita2stdt_3.value = nextDayDate1;
            }
            if (!itd3stdt_value) {
                ita2enddt_3.readOnly = true;
            } else {
                ita2enddt_3.readOnly = false;
            }
            
            if (itd5stdt_value){
                ita5enddt_3.value = itd5enddt.value;
                ita5enddt_3.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt_3.value = itd4enddt.value;
                ita4enddt_3.readOnly = true;
            }else if (itd3stdt_value){
                ita3enddt_3.value = itd3enddt.value;
                ita3enddt_3.readOnly = true;
            }else if (itd2stdt_value){
                ita2enddt_3.value = itd2enddt.value;
                ita2enddt_3.readOnly = true;
            }
        }
    }else{
        if (itd2stdt_value) {        
            ita2stdt_3.value = null;            
        }
        if (itd3stdt_value) {        
            ita3stdt_3.value = null;            
        }
        if (itd4stdt_value) {        
            ita4stdt_3.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt_3.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_3.value = itd5enddt.value;
            ita5enddt_3.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt_3.value =itd4enddt.value;
            ita4enddt_3.readOnly = true;
        }else if (itd3stdt_value){
            ita3enddt_3.value = itd3enddt.value;
            ita3enddt_3.readOnly = true;
        }else if (itd2stdt_value){
            ita2enddt_3.value = itd2enddt.value;
            ita2enddt_3.readOnly = true;
        }      
    }
    submit_btn_enable_3();
}


function ValidateEndDate2() {
    if (ita2enddt.value) {
        var ita2stdt_new = new Date(ita2stdt.value);
        var ita2enddt_new = new Date(ita2enddt.value);

        if (ita2stdt_new > ita2enddt_new) {
            ita2stdt_new.setDate(ita2stdt_new.getDate() + 1);
            var nextDayDate_2 = formatDate(ita2stdt_new);
            ita2enddt.value = nextDayDate_2;
            var ita2enddt_new_1 = new Date(ita2enddt.value);
            if (itd3stdt_value) {
                ita2enddt_new_1.setDate(ita2enddt_new_1.getDate() + 1);
                var nextDayDate2 = formatDate(ita2enddt_new_1);
                ita3stdt.value = nextDayDate2;
            }
            if (!itd4stdt_value) {
                ita3enddt.readOnly = true;
            } else {
                ita3enddt.readOnly = false;
            }
            alert('End date in rent-2 must not before start date');
        } else if (ita2enddt_new > financialYearEnd) {
            document.getElementById('ita2enddt').value = formatDate(financialYearEnd);
            if (itd3stdt_value) {
                ita3stdt.value = null;
                ita3enddt.value = null;
                ita3enddt.readOnly = true;
            }  
            if (itd4stdt_value) {
                ita4stdt.value = null;
                ita4enddt.value = null;                
                ita4enddt.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt.value = null;
                ita5enddt.value = null;                
                ita5enddt.readOnly = true;
            }          
            alert('End date in rent-2 must be in between current financial year');
        } else {            
            if (itd3stdt_value) {
                ita2enddt_new.setDate(ita2enddt_new.getDate() + 1);
                var nextDayDate2 = formatDate(ita2enddt_new);
                ita3stdt.value = nextDayDate2;
            }
            if (!itd4stdt_value) {
                ita3enddt.readOnly = true;
            } else {
                ita3enddt.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt.value = itd5enddt.value;
                ita5enddt.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt.value = itd4enddt.value;
                ita4enddt.readOnly = true;
            }else if (itd3stdt_value){
                ita3enddt.value = itd3enddt.value;
                ita3enddt.readOnly = true;
            }
        }
    }else{
        
        if (itd3stdt_value) {        
            ita3stdt.value = null;            
        }
        if (itd4stdt_value) {        
            ita4stdt.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt.value = itd5enddt.value;
            ita5enddt.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt.value =itd4enddt.value;
            ita4enddt.readOnly = true;
        }else if (itd3stdt_value){
            ita3enddt.value = itd3enddt.value;
            ita3enddt.readOnly = true;
        }           
    }
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}



function ValidateEndDate2_2() {
    if (ita2enddt_2.value) {
        var ita2stdt_2_new = new Date(ita2stdt_2.value);
        var ita2enddt_2_new = new Date(ita2enddt_2.value);

        if (ita2stdt_2_new > ita2enddt_2_new) {
            ita2stdt_2_new.setDate(ita2stdt_2_new.getDate() + 1);
            var nextDayDate_2 = formatDate(ita2stdt_2_new);
            ita2enddt_2.value = nextDayDate_2;
            var ita2enddt_2_new_1 = new Date(ita2enddt_2.value);
            if (itd3stdt_value) {
                ita2enddt_2_new_1.setDate(ita2enddt_2_new_1.getDate() + 1);
                var nextDayDate2 = formatDate(ita2enddt_2_new_1);
                ita3stdt_2.value = nextDayDate2;
            }
            if (!itd4stdt_value) {
                ita3enddt_2.readOnly = true;
            } else {
                ita3enddt_2.readOnly = false;
            }
            alert('End date in rent-2 must not before start date');
        } else if (ita2enddt_2_new > financialYearEnd) {
            document.getElementById('ita2enddt_2').value = formatDate(financialYearEnd);
            if (itd3stdt_value) {
                ita3stdt_2.value = null;
                ita3enddt_2.value = null;
                ita3enddt_2.readOnly = true;
            }  
            if (itd4stdt_value) {
                ita4stdt_2.value = null;
                ita4enddt_2.value = null;                
                ita4enddt_2.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt_2.value = null;
                ita5enddt_2.value = null;                
                ita5enddt_2.readOnly = true;
            }          
            alert('End date in rent-2 must be in between current financial year');
        } else {            
            if (itd3stdt_value) {
                ita2enddt_2_new.setDate(ita2enddt_2_new.getDate() + 1);
                var nextDayDate2 = formatDate(ita2enddt_2_new);
                ita3stdt_2.value = nextDayDate2;
            }
            if (!itd4stdt_value) {
                ita3enddt_2.readOnly = true;
            } else {
                ita3enddt_2.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt_2.value = itd5enddt.value;
                ita5enddt_2.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt_2.value = itd4enddt.value;
                ita4enddt_2.readOnly = true;
            }else if (itd3stdt_value){
                ita3enddt_2.value = itd3enddt.value;
                ita3enddt_2.readOnly = true;
            }
        }
    }else{
        
        if (itd3stdt_value) {        
            ita3stdt_2.value = null;            
        }
        if (itd4stdt_value) {        
            ita4stdt_2.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt_2.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_2.value = itd5enddt.value;
            ita5enddt_2.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt_2.value =itd4enddt.value;
            ita4enddt_2.readOnly = true;
        }else if (itd3stdt_value){
            ita3enddt_2.value = itd3enddt.value;
            ita3enddt_2.readOnly = true;
        }           
    }
    submit_btn_enable_2();
}


function ValidateEndDate2_3() {
    if (ita2enddt_3.value) {
        var ita2stdt_3_new = new Date(ita2stdt_3.value);
        var ita2enddt_3_new = new Date(ita2enddt_3.value);

        if (ita2stdt_3_new > ita2enddt_3_new) {
            ita2stdt_3_new.setDate(ita2stdt_3_new.getDate() + 1);
            var nextDayDate_3 = formatDate(ita2stdt_3_new);
            ita2enddt_3.value = nextDayDate_3;
            var ita2enddt_3_new_1 = new Date(ita2enddt_3.value);
            if (itd3stdt_value) {
                ita2enddt_3_new_1.setDate(ita2enddt_3_new_1.getDate() + 1);
                var nextDayDate2 = formatDate(ita2enddt_3_new_1);
                ita3stdt_3.value = nextDayDate2;
            }
            if (!itd4stdt_value) {
                ita3enddt_3.readOnly = true;
            } else {
                ita3enddt_3.readOnly = false;
            }
            alert('End date in rent-2 must not before start date');
        } else if (ita2enddt_3_new > financialYearEnd) {
            document.getElementById('ita2enddt_3').value = formatDate(financialYearEnd);
            if (itd3stdt_value) {
                ita3stdt_3.value = null;
                ita3enddt_3.value = null;
                ita3enddt_3.readOnly = true;
            }  
            if (itd4stdt_value) {
                ita4stdt_3.value = null;
                ita4enddt_3.value = null;                
                ita4enddt_3.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt_3.value = null;
                ita5enddt_3.value = null;                
                ita5enddt_3.readOnly = true;
            }          
            alert('End date in rent-2 must be in between current financial year');
        } else {            
            if (itd3stdt_value) {
                ita2enddt_3_new.setDate(ita2enddt_3_new.getDate() + 1);
                var nextDayDate2 = formatDate(ita2enddt_3_new);
                ita3stdt_3.value = nextDayDate2;
            }
            if (!itd4stdt_value) {
                ita3enddt_3.readOnly = true;
            } else {
                ita3enddt_3.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt_3.value = itd5enddt.value;
                ita5enddt_3.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt_3.value = itd4enddt.value;
                ita4enddt_3.readOnly = true;
            }else if (itd3stdt_value){
                ita3enddt_3.value = itd3enddt.value;
                ita3enddt_3.readOnly = true;
            }
        }
    }else{
        
        if (itd3stdt_value) {        
            ita3stdt_3.value = null;            
        }
        if (itd4stdt_value) {        
            ita4stdt_3.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt_3.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_3.value = itd5enddt.value;
            ita5enddt_3.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt_3.value =itd4enddt.value;
            ita4enddt_3.readOnly = true;
        }else if (itd3stdt_value){
            ita3enddt_3.value = itd3enddt.value;
            ita3enddt_3.readOnly = true;
        }           
    }
    submit_btn_enable_3();
}



function ValidateEndDate3() {
    if (ita3enddt.value) {
        var ita3stdt_new = new Date(ita3stdt.value);
        var ita3enddt_new = new Date(ita3enddt.value);

        if (ita3stdt_new > ita3enddt_new) {
            ita3stdt_new.setDate(ita3stdt_new.getDate() + 1);
            var nextDayDate_3 = formatDate(ita3stdt_new);
            ita3enddt.value = nextDayDate_3;
            var ita3enddt_new_1 = new Date(ita3enddt.value);
            if (itd4stdt_value) {
                ita3enddt_new_1.setDate(ita3enddt_new_1.getDate() + 1);
                var nextDayDate3 = formatDate(ita3enddt_new_1);
                ita4stdt.value = nextDayDate3;
            }
            if (!itd4stdt_value) {
                ita4enddt.readOnly = true;
            } else {
                ita4enddt.readOnly = false;
            }
            alert('End date in rent-3 must not before start date');
        } else if (ita3enddt_new > financialYearEnd) {
            document.getElementById('ita3enddt').value = formatDate(financialYearEnd);
            if (itd4stdt_value) {
                ita4stdt.value = null;
                ita4enddt.value = null;
                ita4enddt.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt.value = null;
                ita5enddt.value = null;                
                ita5enddt.readOnly = true;
            }
            alert('End date in rent-3 must be in between current financial year');
        } else {            
            if (itd4stdt_value) {
                ita3enddt_new.setDate(ita3enddt_new.getDate() + 1);
                var nextDayDate3 = formatDate(ita3enddt_new);
                ita4stdt.value = nextDayDate3;
            }
            if (!itd4stdt_value) {
                ita4enddt.readOnly = true;
            } else {
                ita4enddt.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt.value = itd5enddt.value;
                ita5enddt.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt.value = itd4enddt.value;
                ita4enddt.readOnly = true;
            }
        }
    }else{
        
        if (itd4stdt_value) {        
            ita4stdt.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt.value = itd5enddt.value;
            ita5enddt.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt.value =itd4enddt.value;
            ita4enddt.readOnly = true;
        }          
    }
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}


function ValidateEndDate3_2() {
    if (ita3enddt_2.value) {
        var ita3stdt_2_new = new Date(ita3stdt_2.value);
        var ita3enddt_2_new = new Date(ita3enddt_2.value);

        if (ita3stdt_2_new > ita3enddt_2_new) {
            ita3stdt_2_new.setDate(ita3stdt_2_new.getDate() + 1);
            var nextDayDate_3 = formatDate(ita3stdt_2_new);
            ita3enddt_2.value = nextDayDate_3;
            var ita3enddt_2_new_1 = new Date(ita3enddt_2.value);
            if (itd4stdt_value) {
                ita3enddt_2_new_1.setDate(ita3enddt_2_new_1.getDate() + 1);
                var nextDayDate3 = formatDate(ita3enddt_2_new_1);
                ita4stdt_2.value = nextDayDate3;
            }
            if (!itd4stdt_value) {
                ita4enddt_2.readOnly = true;
            } else {
                ita4enddt_2.readOnly = false;
            }
            alert('End date in rent-3 must not before start date');
        } else if (ita3enddt_2_new > financialYearEnd) {
            document.getElementById('ita3enddt_2').value = formatDate(financialYearEnd);
            if (itd4stdt_value) {
                ita4stdt_2.value = null;
                ita4enddt_2.value = null;
                ita4enddt_2.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt_2.value = null;
                ita5enddt_2.value = null;                
                ita5enddt_2.readOnly = true;
            }
            alert('End date in rent-3 must be in between current financial year');
        } else {            
            if (itd4stdt_value) {
                ita3enddt_2_new.setDate(ita3enddt_2_new.getDate() + 1);
                var nextDayDate3 = formatDate(ita3enddt_2_new);
                ita4stdt_2.value = nextDayDate3;
            }
            if (!itd4stdt_value) {
                ita4enddt_2.readOnly = true;
            } else {
                ita4enddt_2.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt_2.value = itd5enddt.value;
                ita5enddt_2.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt_2.value = itd4enddt.value;
                ita4enddt_2.readOnly = true;
            }
        }
    }else{
        
        if (itd4stdt_value) {        
            ita4stdt_2.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt_2.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_2.value = itd5enddt.value;
            ita5enddt_2.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt_2.value =itd4enddt.value;
            ita4enddt_2.readOnly = true;
        }          
    }
    submit_btn_enable_2();
}


function ValidateEndDate3_3() {
    if (ita3enddt_3.value) {
        var ita3stdt_3_new = new Date(ita3stdt_3.value);
        var ita3enddt_3_new = new Date(ita3enddt_3.value);

        if (ita3stdt_3_new > ita3enddt_3_new) {
            ita3stdt_3_new.setDate(ita3stdt_3_new.getDate() + 1);
            var nextDayDate_3 = formatDate(ita3stdt_3_new);
            ita3enddt_3.value = nextDayDate_3;
            var ita3enddt_3_new_1 = new Date(ita3enddt_3.value);
            if (itd4stdt_value) {
                ita3enddt_3_new_1.setDate(ita3enddt_3_new_1.getDate() + 1);
                var nextDayDate3 = formatDate(ita3enddt_3_new_1);
                ita4stdt_3.value = nextDayDate3;
            }
            if (!itd4stdt_value) {
                ita4enddt_3.readOnly = true;
            } else {
                ita4enddt_3.readOnly = false;
            }
            alert('End date in rent-3 must not before start date');
        } else if (ita3enddt_3_new > financialYearEnd) {
            document.getElementById('ita3enddt_3').value = formatDate(financialYearEnd);
            if (itd4stdt_value) {
                ita4stdt_3.value = null;
                ita4enddt_3.value = null;
                ita4enddt_3.readOnly = true;
            }
            if (itd5stdt_value) {
                ita5stdt_3.value = null;
                ita5enddt_3.value = null;                
                ita5enddt_3.readOnly = true;
            }
            alert('End date in rent-3 must be in between current financial year');
        } else {            
            if (itd4stdt_value) {
                ita3enddt_3_new.setDate(ita3enddt_3_new.getDate() + 1);
                var nextDayDate3 = formatDate(ita3enddt_3_new);
                ita4stdt_3.value = nextDayDate3;
            }
            if (!itd4stdt_value) {
                ita4enddt_3.readOnly = true;
            } else {
                ita4enddt_3.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt_3.value = itd5enddt.value;
                ita5enddt_3.readOnly = true;
            }else if (itd4stdt_value){
                ita4enddt_3.value = itd4enddt.value;
                ita4enddt_3.readOnly = true;
            }
        }
    }else{
        
        if (itd4stdt_value) {        
            ita4stdt_3.value = null;            
        }
        if (itd5stdt_value) {        
            ita5stdt_3.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_3.value = itd5enddt.value;
            ita5enddt_3.readOnly = true;
        }else if (itd4stdt_value){
            ita4enddt_3.value =itd4enddt.value;
            ita4enddt_3.readOnly = true;
        }          
    }
    submit_btn_enable_3();
}




function ValidateEndDate4() {
    if (ita4enddt.value) {
        var ita4stdt_new = new Date(ita4stdt.value);
        var ita4enddt_new = new Date(ita4enddt.value);

        if (ita4stdt_new > ita4enddt_new) {
            ita4stdt_new.setDate(ita4stdt_new.getDate() + 1);
            var nextDayDate_4 = formatDate(ita4stdt_new);
            ita4enddt.value = nextDayDate_4;
            var ita4enddt_new_1 = new Date(ita4enddt.value);
            if (itd5stdt_value) {
                ita4enddt_new_1.setDate(ita4enddt_new_1.getDate() + 1);
                var nextDayDate4 = formatDate(ita4enddt_new_1);
                ita5stdt.value = nextDayDate4;
            }
            if (!itd5stdt_value) {
                ita5enddt.readOnly = true;
            } else {
                ita5enddt.readOnly = false;
            }
            alert('End date in rent-4 must not before start date');
        } else if (ita4enddt_new > financialYearEnd) {
            document.getElementById('ita4enddt').value = formatDate(financialYearEnd);
            if (itd5stdt_value) {
                ita5stdt.value = null;
                ita5enddt.value = null;
                ita5enddt.readOnly = true;
            }
            alert('End date in rent-4 must be in between current financial year');
        } else {            
            if (itd5stdt_value) {
                ita4enddt_new.setDate(ita4enddt_new.getDate() + 1);
                var nextDayDate4 = formatDate(ita4enddt_new);
                ita5stdt.value = nextDayDate4;
            }
            if (!itd5stdt_value) {
                ita5enddt.readOnly = true;
            } else {
                ita5enddt.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt.value = itd5enddt.value;
                ita5enddt.readOnly = true;
            }
        }
    }else{
       
        if (itd5stdt_value) {        
            ita5stdt.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt.value = itd5enddt.value;
            ita5enddt.readOnly = true;
        }        
    }
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}



function ValidateEndDate4_2() {
    if (ita4enddt_2.value) {
        var ita4stdt_2_new = new Date(ita4stdt_2.value);
        var ita4enddt_2_new = new Date(ita4enddt_2.value);

        if (ita4stdt_2_new > ita4enddt_2_new) {
            ita4stdt_2_new.setDate(ita4stdt_2_new.getDate() + 1);
            var nextDayDate_4 = formatDate(ita4stdt_2_new);
            ita4enddt_2.value = nextDayDate_4;
            var ita4enddt_2_new_1 = new Date(ita4enddt_2.value);
            if (itd5stdt_value) {
                ita4enddt_2_new_1.setDate(ita4enddt_2_new_1.getDate() + 1);
                var nextDayDate4 = formatDate(ita4enddt_2_new_1);
                ita5stdt_2.value = nextDayDate4;
            }
            if (!itd5stdt_value) {
                ita5enddt_2.readOnly = true;
            } else {
                ita5enddt_2.readOnly = false;
            }
            alert('End date in rent-4 must not before start date');
        } else if (ita4enddt_2_new > financialYearEnd) {
            document.getElementById('ita4enddt_2').value = formatDate(financialYearEnd);
            if (itd5stdt_value) {
                ita5stdt_2.value = null;
                ita5enddt_2.value = null;
                ita5enddt_2.readOnly = true;
            }
            alert('End date in rent-4 must be in between current financial year');
        } else {            
            if (itd5stdt_value) {
                ita4enddt_2_new.setDate(ita4enddt_2_new.getDate() + 1);
                var nextDayDate4 = formatDate(ita4enddt_2_new);
                ita5stdt_2.value = nextDayDate4;
            }
            if (!itd5stdt_value) {
                ita5enddt_2.readOnly = true;
            } else {
                ita5enddt_2.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt_2.value = itd5enddt.value;
                ita5enddt_2.readOnly = true;
            }
        }
    }else{
       
        if (itd5stdt_value) {        
            ita5stdt_2.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_2.value = itd5enddt.value;
            ita5enddt_2.readOnly = true;
        }        
    }
    submit_btn_enable_2();
}



function ValidateEndDate4_3() {
    if (ita4enddt_3.value) {
        var ita4stdt_3_new = new Date(ita4stdt_3.value);
        var ita4enddt_3_new = new Date(ita4enddt_3.value);

        if (ita4stdt_3_new > ita4enddt_3_new) {
            ita4stdt_3_new.setDate(ita4stdt_3_new.getDate() + 1);
            var nextDayDate_4 = formatDate(ita4stdt_3_new);
            ita4enddt_3.value = nextDayDate_4;
            var ita4enddt_3_new_1 = new Date(ita4enddt_3.value);
            if (itd5stdt_value) {
                ita4enddt_3_new_1.setDate(ita4enddt_3_new_1.getDate() + 1);
                var nextDayDate4 = formatDate(ita4enddt_3_new_1);
                ita5stdt_3.value = nextDayDate4;
            }
            if (!itd5stdt_value) {
                ita5enddt_3.readOnly = true;
            } else {
                ita5enddt_3.readOnly = false;
            }
            alert('End date in rent-4 must not before start date');
        } else if (ita4enddt_3_new > financialYearEnd) {
            document.getElementById('ita4enddt_3').value = formatDate(financialYearEnd);
            if (itd5stdt_value) {
                ita5stdt_3.value = null;
                ita5enddt_3.value = null;
                ita5enddt_3.readOnly = true;
            }
            alert('End date in rent-4 must be in between current financial year');
        } else {            
            if (itd5stdt_value) {
                ita4enddt_3_new.setDate(ita4enddt_3_new.getDate() + 1);
                var nextDayDate4 = formatDate(ita4enddt_3_new);
                ita5stdt_3.value = nextDayDate4;
            }
            if (!itd5stdt_value) {
                ita5enddt_3.readOnly = true;
            } else {
                ita5enddt_3.readOnly = false;
            }
            if (itd5stdt_value){
                ita5enddt_3.value = itd5enddt.value;
                ita5enddt_3.readOnly = true;
            }
        }
    }else{
       
        if (itd5stdt_value) {        
            ita5stdt_3.value = null;            
        }         
        if (itd5stdt_value){
            ita5enddt_3.value = itd5enddt.value;
            ita5enddt_3.readOnly = true;
        }        
    }
    submit_btn_enable_3();
}




function btn_fun() {
    if (empsub_1 && !empsub_2 && !empsub_3){
        submit_btn_enable();
    }else if (empsub_1 && empsub_2 && !empsub_3){
        submit_btn_enable_2();
    }else if (empsub_1 && empsub_2 && empsub_3){
        submit_btn_enable_3();
    }
}



document.addEventListener('DOMContentLoaded', (event) => {
    const inputs = document.querySelectorAll('input[type="number"]');

    inputs.forEach(input => {
        if (input.id !== 'allowed_incomeLossOnHouseProperty' && input.id !== 'allowed_standardDeduction') {
            input.onkeydown = function (event) {
                return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code !== 'Space';
            };                    
        }
    });

    
});


