





// Set the minimum date to the current date
var currentDate = new Date();
var formattedCurrentDate = currentDate.toISOString().split('T')[0];
document.getElementById('carreg_ts').max = formattedCurrentDate;

var Band = String(Band);

// Function to check if the input is a valid date and is on or before the current date
function isValidDate(dateString) {
    var regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    var inputDate = new Date(dateString);
    var currentDate = new Date();

    return inputDate <= currentDate;
}



function enablepreview() {

    

    var havecarclcValue = document.getElementById('havecarclc');
    var havecarpersonalValue = document.getElementById('havecarpersonal');

    if (havecarclcValue.checked == true) {
        havecarvalue = 'CLC';

    } else if (havecarpersonalValue.checked == true) {
        havecarvalue = 'Personal';
    }

    var owncaryesValue = document.getElementById('owncaryes');
    var owncarnoValue = document.getElementById('owncarno');

    if (owncaryesValue.checked == true) {
        owncarvalue = 'Yes';
    } else if (owncarnoValue.checked == true) {
        owncarvalue = 'No';
    }

    if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
    var havedriveryesValue = document.getElementById('havedriveryes');
    var havedrivernoValue = document.getElementById('havedriverno');

    if (havedriveryesValue.checked == true) {
        havedrivervalue = 'Yes';
    } else if (havedrivernoValue.checked == true) {
        havedrivervalue = 'No';
    }
}

    var registrationNumber = document.querySelector('input[name="carregnum"]').value;
    // Validate registration number format
    var pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    var isRegistrationNumberValid = pattern.test(registrationNumber);

    var engineCapacity = document.querySelector('select[name="enginecp"]').value;
    var registrationDateInput = document.querySelector('input[name="carreg_ts"]');
    var registrationDate = registrationDateInput.value;

    // Validate registration date
    var isRegistrationDateValid = isValidDate(registrationDate);

    


    //&& isRegistrationNumberValid && engineCapacity && isRegistrationDateValid && havedrivervalue

   

    if (havecarvalue) {
        if (havecarvalue == 'Personal') {
            
            if (owncarvalue) {
                if (owncarvalue === 'No') {
                    document.getElementById('previewButton1').disabled = false;
                } else if (owncarvalue === 'Yes') {
                    if (isRegistrationNumberValid && engineCapacity && isRegistrationDateValid) {

                        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
                            if (havedrivervalue) {
                                document.getElementById('previewButton1').disabled = false;
                            } else {
                                document.getElementById('previewButton1').disabled = true;
                            }
                        } else {
                            document.getElementById('previewButton1').disabled = false;
                        }
                    } else{
                        document.getElementById('previewButton1').disabled = true;
                    }

                } else {
                    document.getElementById('previewButton1').disabled = true;
                }
            } else {
                document.getElementById('previewButton1').disabled = true;
            }
        } else if (havecarvalue == 'CLC') {

            

            if (isRegistrationNumberValid && engineCapacity && isRegistrationDateValid) {
                if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
                    if (havedrivervalue) {
                        document.getElementById('previewButton1').disabled = false;
                    } else {
                        document.getElementById('previewButton1').disabled = true;
                    }
                } else {
                    document.getElementById('previewButton1').disabled = false;
                }
            }
        } else {
            document.getElementById('previewButton1').disabled = true;
        }
    } else {
        document.getElementById('previewButton1').disabled = true;
    }

}


var havedrivervalue

if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {

    function haveDriver(havedriver) {
        havedrivervalue = havedriver;
        enablepreview();
    }
}

var havecarvalue

function haveCar(havecar) {

    var owncaryesValue = document.getElementById('owncaryes');
    var owncarnoValue = document.getElementById('owncarno');

    var otheroptionDiv1 = document.getElementById('otheroption1');
    var otheroptionDiv2 = document.getElementById('otheroption2');
    var otheroptionDiv3 = document.getElementById('otheroption3');

    if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
        var otheroptionDiv4 = document.getElementById('otheroption4');
    }

    havecarvalue = havecar
    var ownOptionsDiv = document.getElementById('ownOptions');
    if (havecarvalue == 'Personal') {

        ownOptionsDiv.style.display = 'table-row';  // Show as a table row

        otheroptionDiv1.style.display = 'none';
        otheroptionDiv2.style.display = 'none';
        otheroptionDiv3.style.display = 'none';

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            otheroptionDiv4.style.display = 'none';
        }

        enablepreview();
    } else if (havecarvalue == 'CLC') {

        owncaryesValue.checked = false;
        owncarnoValue.checked = false;

        otheroptionDiv1.style.display = 'table-row';
        otheroptionDiv2.style.display = 'table-row';
        otheroptionDiv3.style.display = 'table-row';

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            otheroptionDiv4.style.display = 'table-row';
        }

        ownOptionsDiv.style.display = 'none';
        enablepreview();
    }
}

var owncarvalue

function ownCar(owncar) {
    owncarvalue = owncar
    var otheroptionDiv1 = document.getElementById('otheroption1');
    var otheroptionDiv2 = document.getElementById('otheroption2');
    var otheroptionDiv3 = document.getElementById('otheroption3');

    if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
        var otheroptionDiv4 = document.getElementById('otheroption4');
        var havedriveryesValue = document.getElementById('havedriveryes');
        var havedrivernoValue = document.getElementById('havedriverno');
    }

    var rnumberValue = document.getElementById('rnumber');
    var enginecpValue = document.getElementById('enginecp');
    var carreg_tsValue = document.getElementById('carreg_ts');

    if (owncarvalue == 'No') {

        rnumberValue.value = null;
        enginecpValue.value = null;
        carreg_tsValue.value = null;

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            havedriveryesValue.checked = false;
            havedrivernoValue.checked = false;
            otheroptionDiv4.style.display = 'none';
        }
        otheroptionDiv1.style.display = 'none';
        otheroptionDiv2.style.display = 'none';
        otheroptionDiv3.style.display = 'none';
        

        enablepreview();

    } else {

        otheroptionDiv1.style.display = 'table-row';
        otheroptionDiv2.style.display = 'table-row';
        otheroptionDiv3.style.display = 'table-row';

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            otheroptionDiv4.style.display = 'table-row';
        }
        enablepreview();


    }
}


function validateCarReg() {
    let carregInput = document.getElementById("rnumber");
    let carregnumInput = document.getElementById("rnumber").value;
    var pattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;

    var inputPAN = carregnumInput.toUpperCase(); // Convert input to uppercase
    carregInput.value = inputPAN; // Update input value with uppercase version

    if (carregnumInput === "") {
        document.getElementById('savebtn1').disabled = false;
        document.getElementById("carregnumerror").innerHTML = ""; // Clear error message when input is empty
    } else if (!pattern.test(carregnumInput)) {
        document.getElementById('savebtn1').disabled = true;

        document.getElementById("carregnumerror").innerHTML = "please enter valid registration number";
    } else {
        document.getElementById('savebtn1').disabled = false;

        document.getElementById("carregnumerror").innerHTML = ""; // Clear error message when input is valid
        enablepreview();
    }
    

}


function validateCarRegDate() {

    var carregDateInput = document.getElementById('carreg_ts');  // Fix the ID here
    var carregDateErrorSpan = document.getElementById('carregDateError');  // Fix the ID here
    // Get the input date value and convert it to a Date object
    var inputDateValue = carregDateInput.value;
    var inputDate = new Date(inputDateValue);

    // Get the current date
    var currentDate = new Date();

    // Validate if the input date is on or before the current date
    if (inputDate > currentDate) {
        document.getElementById('savebtn1').disabled = true;
        carregDateErrorSpan.textContent = 'Registration date cannot be in the future.';
    } else {
        document.getElementById('savebtn1').disabled = false;
        carregDateErrorSpan.textContent = '';
        enablepreview();
    }
}


function saveForm1() {
    let apiUrl = "temp_carDeclarations";
    document.getElementById("form1").action = apiUrl;
    document.getElementById("form1").submit();

}


function Previewform1() {

    // Get selected values
    var haveCar = document.querySelector('input[name="havecar"]:checked').value;

    if (haveCar == "Personal") {
        var ownCar = document.querySelector('input[name="owncar"]:checked').value;
        if (ownCar == "Yes") {
            if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
                var haveDriver = document.querySelector('input[name="havedriver"]:checked').value;
            }
            var registrationNumber = document.querySelector('input[name="carregnum"]').value;
            var engineCapacity = document.querySelector('select[name="enginecp"]').value;
            var registrationDate = document.querySelector('input[name="carreg_ts"]').value;

        } else if (ownCar === "No") {

            if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
                var haveDriver = document.querySelector('input[name="havedriver"]:checked');
                haveDriver = haveDriver ? haveDriver.value : 'N/A';
            }


            var registrationNumber = document.querySelector('input[name="carregnum"]').value;
            registrationNumber = registrationNumber ? registrationNumber.value : 'N/A';

            var engineCapacity = document.querySelector('select[name="enginecp"]').value;
            engineCapacity = engineCapacity ? engineCapacity.value : 'N/A';

            var registrationDate = document.querySelector('input[name="carreg_ts"]').value;
            registrationDate = registrationDate ? registrationDate.value : 'N/A';

        }
    } else if (haveCar === "CLC") {
        var ownCar = document.querySelector('input[name="owncar"]:checked');
        ownCar = ownCar ? ownCar.value : 'N/A';

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            var haveDriver = document.querySelector('input[name="havedriver"]:checked').value;
        }

        var registrationNumber = document.querySelector('input[name="carregnum"]').value;
        var engineCapacity = document.querySelector('select[name="enginecp"]').value;
        var registrationDate = document.querySelector('input[name="carreg_ts"]').value;
    }


    var message = "";
    message += "<h5>Selected values for Car Declaration</h5>";
    message += "<table class='bordered-table'>";
    message += "<tr><td style='width: 500px;'>Do you have a CLC/Personal Car? :</td><td><input value='" + haveCar + "' readonly></td></tr>";
    if (haveCar === 'Personal') {
        message += "<tr><td>Do you own the Car? :</td><td><input value='" + ownCar + "' readonly></td></tr>";

        if (ownCar === 'Yes') {
            message += "<tr><td>Car's Registration Number::</td><td><input value='" + registrationNumber + "' readonly></td></tr>";
            message += "<tr><td>Car's Engine Capacity:</td><td><input value='" + engineCapacity + "' readonly></td></tr>";
            message += "<tr><td>Car's Registration Date:</td><td><input value='" + registrationDate + "' readonly></td></tr>";

            if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
                message += "<tr><td>Do you have a Driver?:</td><td><input value='" + haveDriver + "' readonly></td></tr>";
            }
        }
    } else if (haveCar === 'CLC') {
        message += "<tr><td>Car's Registration Number::</td><td><input value='" + registrationNumber + "' readonly></td></tr>";
        message += "<tr><td>Car's Engine Capacity:</td><td><input value='" + engineCapacity + "' readonly></td></tr>";
        message += "<tr><td>Car's Registration Date:</td><td><input value='" + registrationDate + "' readonly></td></tr>";

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            message += "<tr><td>Do you have a Driver?:</td><td><input value='" + haveDriver + "' readonly></td></tr>";
        }
    }


    message += "</table>";



    // Display the message in the modal
    document.getElementById('confirmationMessage').innerHTML = message;
    $('#confirmationModal1').modal('show');

}


document.getElementById('cancelButton').addEventListener('click', function () {
    var confirmationModal = document.getElementById('confirmationModal1');
    if (confirmationModal) {
        $(confirmationModal).modal('hide');
    }    
});



var it_car_check = document.getElementById('it_car_check');

var sub_btn_car = document.getElementById('sub_btn_car');

function enable_btn_car(){
    if (it_car_check.checked == true){
        sub_btn_car.disabled = false;
    } else{
        sub_btn_car.disabled = true;
    }
}


function submitForm1() {

    if (sub_btn_car.disabled == false){
        document.getElementById('form1').submit();
    } else{
        if (it_car_check.checked == false) {
            it_car_check.setCustomValidity("Please check this field");
            it_car_check.reportValidity();            
        }
    }
}




// Function to convert number to Indian currency text format
function convertToIndianCurrency(number) {
    const numberWords = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tensWords = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (Number(number) > Number(10000000)){
        number = Number(10000000)
    }

    if (number === 0) {
        return "Zero";
    }

    if (number < 20) {
        return numberWords[number];
    }

    if (number < 100) {
        return tensWords[Math.floor(number / 10)] + (number % 10 !== 0 ? " " + numberWords[number % 10] : "");
    }

    if (number < 1000) {
        return numberWords[Math.floor(number / 100)] + " Hundred" + (number % 100 !== 0 ? " " + convertToIndianCurrency(number % 100) : "");
    }

    if (number < 100000) {
        return convertToIndianCurrency(Math.floor(number / 1000)) + " Thousand" + (number % 1000 !== 0 ? " " + convertToIndianCurrency(number % 1000) : "");
    }

    if (number < 10000000) {
        return convertToIndianCurrency(Math.floor(number / 100000)) + " Lakh" + (number % 100000 !== 0 ? " " + convertToIndianCurrency(number % 100000) : "");
    }

    if (number < 1000000000) {
        return convertToIndianCurrency(Math.floor(number / 10000000)) + " Crore" + (number % 10000000 !== 0 ? " " + convertToIndianCurrency(number % 10000000) : "");
    }

    return "Enter valid amount below one crore";
}





document.addEventListener("DOMContentLoaded", function () {

    

    var havecarclcValue = document.getElementById('havecarclc');
    var havecarpersonalValue = document.getElementById('havecarpersonal');

    var ownOptionsDiv = document.getElementById('ownOptions');

    var owncaryesValue = document.getElementById('owncaryes');
    var owncarnoValue = document.getElementById('owncarno');

    var otheroptionDiv1 = document.getElementById('otheroption1');
    var otheroptionDiv2 = document.getElementById('otheroption2');
    var otheroptionDiv3 = document.getElementById('otheroption3');

    var otheroptionDiv4 = ''

    if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
        otheroptionDiv4 = document.getElementById('otheroption4');
    }


    if (havecarclcValue.checked == true) {
        ownOptionsDiv.style.display = 'none';

        otheroptionDiv1.style.display = 'table-row';
        otheroptionDiv2.style.display = 'table-row';
        otheroptionDiv3.style.display = 'table-row';

        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
        otheroptionDiv4.style.display = 'table-row';
        }

    } else if (havecarpersonalValue.checked == true) {
        ownOptionsDiv.style.display = 'table-row';

        if (owncaryesValue.checked == true) {
            otheroptionDiv1.style.display = 'table-row';
            otheroptionDiv2.style.display = 'table-row';
            otheroptionDiv3.style.display = 'table-row';
            if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            otheroptionDiv4.style.display = 'table-row';
            }
        } else if (owncarnoValue.checked == true) {
            otheroptionDiv1.style.display = 'none';
            otheroptionDiv2.style.display = 'none';
            otheroptionDiv3.style.display = 'none';
            if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            otheroptionDiv4.style.display = 'none';
            }
        } else {
            otheroptionDiv1.style.display = 'none';
            otheroptionDiv2.style.display = 'none';
            otheroptionDiv3.style.display = 'none';
            if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
            otheroptionDiv4.style.display = 'none';
            }
        }
    } else {
        ownOptionsDiv.style.display = 'none';
        otheroptionDiv1.style.display = 'none';
        otheroptionDiv2.style.display = 'none';
        otheroptionDiv3.style.display = 'none';
        if (Band == '08' || Band == '8' || Band == '09' || Band == '9' || Band == '10' || Band == 'A' || Band == 'B' || Band == 'C' || Band == 'D') {
        otheroptionDiv4.style.display = 'none';
        }
    }


    enablepreview();

});
