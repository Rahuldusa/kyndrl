
var band = band
var clc_new = clc_new
var have_car_new = have_car_new
var own_car_new = own_car_new
var cc_new = cc_new   // More than 1600 CC,   Less than 1600 CC


var f_claimedAmount = document.getElementById('f_claimedAmount');

var AmtClaimed = document.getElementById('AmtClaimed');

var d_DriveSal = document.getElementById('d_DriveSal');




function validateFuel() {
    if (f_claimedAmount.value) {
        new_value = f_claimedAmount.value;

        if (Number(new_value) > Number(rem_fuel)) {
            f_claimedAmount.value = null;
            alert('Claimed Amount must not be more than'+ rem_fuel + '.')
        }        
    }
}

function validateA_LTA() {
    if (band == 'A' || band == 'B' || band == 'C' || band == 'D') {
        if (AmtClaimed.value) {
            if (Number(AmtClaimed.value) > Number(350000)) {
                AmtClaimed.value = null;
                alert('Claimed Amount must not be more than 350000.');
            }
        }
    } else {
        if (AmtClaimed.value) {
            if (Number(AmtClaimed.value) > Number(200000)) {
                AmtClaimed.value = null;
                alert('Claimed Amount must not be more than 200000.');
            }
        }
    }
}

function validateA_driver() {
    if (d_DriveSal.value) {
        new_value = d_DriveSal.value;

        if (clc_new) {
            if (Number(new_value) > Number(2100)) {
                d_DriveSal.value = null;
                alert('Driver Salary must not be more than 2100.')
            }
        } else if (have_car_new) {
            if (Number(new_value) > Number(900)) {
                d_DriveSal.value = null;
                alert('Driver Salary must not be more than 900.')
            }
        }
    }
}

const f_expenseDate = document.getElementById('f_expenseDate');
const r_expenseDate = document.getElementById('r_expenseDate');
const ExpenseDt = document.getElementById('ExpenseDt');
const d_ExpenseDt = document.getElementById('d_ExpenseDt');

const StDt = document.getElementById('StDt');
const EndDt = document.getElementById('EndDt');




const currentDate = new Date();
const pastDate = new Date();
pastDate.setDate(currentDate.getDate() - 91);
const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};



function validateD_Fuel() {
    const selectedDate = new Date(f_expenseDate.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        f_expenseDate.value = null;
    }
}

function validateD_Road() {
    const selectedDate = new Date(r_expenseDate.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        r_expenseDate.value = null;
    }
}

function validateD_LTA() {
    const selectedDate = new Date(ExpenseDt.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        ExpenseDt.value = null;
    }
}

function validateD_driver() {
    const selectedDate = new Date(d_ExpenseDt.value);
    if (selectedDate > currentDate || selectedDate < pastDate) {
        alert('The date must be within last 90 days and not in future.');
        d_ExpenseDt.value = null;
    }
}


function validateStartDt() {    
    if (StDt.value) {
        const selectedDate = new Date(StDt.value);
        if (selectedDate > currentDate) {
            alert('The date must be not in future.');
            StDt.value = null;
            EndDt.value = null;
            EndDt.disabled = true;
        } else {
            EndDt.value = null;
            EndDt.disabled = false;
        }
    } else {
        EndDt.value = null;
        EndDt.disabled = true;
    }
}

function validateEndDt(){
    if (EndDt.value){
        const selectedDate = new Date(EndDt.value);
        const startdt = new Date(StDt.value);

        if (selectedDate > currentDate || selectedDate < startdt) {
            alert('The date must be after leave start date and not in future.');
            EndDt.value = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {

    if (f_expenseDate) {
        f_expenseDate.setAttribute('max', formatDateString(currentDate));
        f_expenseDate.setAttribute('min', formatDateString(pastDate));
    }

    if (r_expenseDate) {
        r_expenseDate.setAttribute('max', formatDateString(currentDate));
        r_expenseDate.setAttribute('min', formatDateString(pastDate));
    }


    if (ExpenseDt) {
        ExpenseDt.setAttribute('max', formatDateString(currentDate));
        ExpenseDt.setAttribute('min', formatDateString(pastDate));
    }

    if (d_ExpenseDt) {
        d_ExpenseDt.setAttribute('max', formatDateString(currentDate));
        d_ExpenseDt.setAttribute('min', formatDateString(pastDate));
    }

    if (StDt) {
        StDt.setAttribute('max', formatDateString(currentDate));
    }
    if (EndDt){
        EndDt.setAttribute('max', formatDateString(currentDate));
    }

});



document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('hidden.bs.modal', function () {
            const forms = modal.querySelectorAll('form');
            forms.forEach(form => {
                form.reset();
            });
        });
    });
});