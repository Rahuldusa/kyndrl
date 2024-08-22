

let currentDate = new Date();

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

if (checker_3Date != null) {
    var checker_3Date = new Date(checker_3Date);
}

var section_name = document.getElementById('section_name')
var file_input = document.getElementById('file_input')
var file_upload_btn = document.getElementById('file_upload_btn')

var resub_1
var resub_2

if (checker_1Date && !checker_2Date && !checker_3Date) {
    resub_1 = document.getElementById('resub_1')
}
if (checker_1Date && checker_2Date && !checker_3Date) {
    resub_2 = document.getElementById('resub_2')
}

var resub_file_upload = document.getElementById('resub_file_upload');

// 80c - 2
// 80c. nscInterest_file - 3
// all - 1

function enable_inp() {
    if (section_name.value) {
        file_input.disabled = false;
    } else {
        file_input.disabled = true;
    }
}

// function file_upload_resub1(){
//     inp_name = section_name.value

//     if (inp_name === 'nscInterest_file'){        
//         let apiUrl = "upload_80c_nsc_int_file_r1";
//         apiUrl += `?name=${encodeURIComponent(inp_name)}`;
//         resub_file_upload.action = apiUrl;
//         resub_file_upload.submit();
//     } else if(inp_name === 'lifeInsurance_file' || inp_name === 'postOfficeDeposit_file' || inp_name === 'ulip_file' || 
//               inp_name === 'nscSubscription_file' || inp_name === 'ppf_file' || inp_name === 'houseLoan_file' || 
//               inp_name === 'tuitionFee_file' || inp_name === 'mutualFund_file' || inp_name === 'termDeposit_file' ||
//               inp_name === 'sukanyaSamriddhi_file'){

//                 let apiUrl = "upload_80c_file_r1";
//                 apiUrl += `?name=${encodeURIComponent(inp_name)}`;                
//                 resub_file_upload.action = apiUrl;
//                 resub_file_upload.submit();
//     } else {
//         let apiUrl = "upload_all_file_r1";
//         apiUrl += `?name=${encodeURIComponent(inp_name)}`;
//         resub_file_upload.action = apiUrl;
//         resub_file_upload.submit();
//     }    
// }

function file_upload_resub1() {
    const inp_name = document.getElementById('section_name').value;

    let apiUrl;
    if (inp_name === 'lifeInsurance_file' || inp_name === 'postOfficeDeposit_file' || inp_name === 'ulip_file' ||
        inp_name === 'nscSubscription_file' || inp_name === 'ppf_file' || inp_name === 'houseLoan_file' ||
        inp_name === 'tuitionFee_file' || inp_name === 'mutualFund_file' || inp_name === 'termDeposit_file' ||
        inp_name === 'sukanyaSamriddhi_file') {

        apiUrl = "upload_80c_file_r1";
    } else if (inp_name === 'nscInterest_file') {
        apiUrl = "upload_80c_nsc_int_file_r1";
    } else {
        apiUrl = "upload_all_file_r1";
    }
    apiUrl += `?name=${encodeURIComponent(inp_name)}`;
    document.getElementById('resub_file_upload').action = apiUrl;
    document.getElementById('resub_file_upload').submit();
}


function file_upload_resub2() {
    const inp_name = document.getElementById('section_name').value;

    let apiUrl;
    if (inp_name === 'lifeInsurance_file' || inp_name === 'postOfficeDeposit_file' || inp_name === 'ulip_file' ||
        inp_name === 'nscSubscription_file' || inp_name === 'ppf_file' || inp_name === 'houseLoan_file' ||
        inp_name === 'tuitionFee_file' || inp_name === 'mutualFund_file' || inp_name === 'termDeposit_file' ||
        inp_name === 'sukanyaSamriddhi_file') {

        apiUrl = "upload_80c_file_r2";
    } else if (inp_name === 'nscInterest_file') {
        apiUrl = "upload_80c_nsc_int_file_r2";
    } else {
        apiUrl = "upload_all_file_r2";
    }
    apiUrl += `?name=${encodeURIComponent(inp_name)}`;
    document.getElementById('resub_file_upload').action = apiUrl;
    document.getElementById('resub_file_upload').submit();
}




function Save_resub1() {
    window.location.href = 'resub_1';
}

function Save_resub2() {
    window.location.href = 'resub_2';
}



var th_6_day_resub1 = document.querySelectorAll('th[class="6_day_resub1"]')
var th_6_day_resub2 = document.querySelectorAll('th[class="6_day_resub2"]')

var td_6_day_resub1 = document.querySelectorAll('td[class="6_day_resub1"]')
var td_6_day_resub2 = document.querySelectorAll('td[class="6_day_resub2"]')

var td_6_day_resub1_2 = document.querySelectorAll('td[class="6_day_resub1 allowed_am"]')
var td_6_day_resub2_2 = document.querySelectorAll('td[class="6_day_resub2 allowed_am"]')


var file_upload_section = document.getElementById('file_upload_section');


document.addEventListener("DOMContentLoaded", function () {
    if (checker_1Date && !checker_2Date) {        
        if (checker_1Date_6days < currentDate) {        
            
            section_name.disabled = true
            file_input.disabled = true
            file_upload_btn.disabled = true


            if (resub_1) {
                resub_1.style.display = 'none';
            }
            if (resub_2) {
                resub_2.style.display = 'none';
            }

            if (!empsub_2){      
                file_upload_section.style.display = 'none'; 
                td_6_day_resub1_2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                }); 
                td_6_day_resub2_2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                }); 
                td_6_day_resub1.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                });
                td_6_day_resub2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                }); 
                th_6_day_resub1.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                }); 
                th_6_day_resub2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                });                
            } else{
                file_upload_section.style.display = 'row';
                td_6_day_resub1_2.forEach(function (td) {
                    td.style.display = 'none';
                });
                td_6_day_resub2_2.forEach(function (td) {
                    td.style.display = 'none';
                });
                td_6_day_resub1.forEach(function (td) {
                    td.style.display = 'none';
                });
                td_6_day_resub2.forEach(function (td) {
                    td.style.display = 'none';
                });
                th_6_day_resub1.forEach(function (td) {
                    td.style.display = 'none';
                });
                th_6_day_resub2.forEach(function (td) {
                    td.style.display = 'none';
                });
            }
        } else {   

            file_upload_section.style.display = 'row';

            section_name.disabled = false
            file_upload_btn.disabled = false


            if (resub_1) {
                resub_1.style.display = 'block';
            }
            if (resub_2) {
                resub_2.style.display = 'block';
            }
            td_6_day_resub1_2.forEach(function (td) {
                td.style.display = 'none';
            });
            td_6_day_resub2_2.forEach(function (td) {
                td.style.display = 'none';
            });
            td_6_day_resub1.forEach(function (td) {
                td.style.display = 'none';
            });
            td_6_day_resub2.forEach(function (td) {
                td.style.display = 'none';
            });
            th_6_day_resub1.forEach(function (td) {
                td.style.display = 'none';
            });
            th_6_day_resub2.forEach(function (td) {
                td.style.display = 'none';
            });
            
          
        }
    } else if (checker_2Date && !checker_3Date) {
        if (checker_2Date_6days < currentDate) {
            section_name.disabled = true
            file_input.disabled = true
            file_upload_btn.disabled = true

            if (resub_1) {
                resub_1.style.display = 'none';
            }
            if (resub_2) {
                resub_2.style.display = 'none';
            }    
            th_6_day_resub1.forEach(function (td) {
                td.style.display = 'none';
            });      
            td_6_day_resub1_2.forEach(function (td) {                    
                td.style.display = 'none';
            });  
            td_6_day_resub1.forEach(function (td) {                    
                td.style.display = 'none';
            }); 

            if (!empsub_3){             
                file_upload_section.style.display = 'none';                 
                td_6_day_resub2_2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                });
                td_6_day_resub2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                }); 
                th_6_day_resub2.forEach(function (td) {                    
                    td.style.display = 'table-cell';
                });                
            } else{
                file_upload_section.style.display = 'row';
                td_6_day_resub2_2.forEach(function (td) {
                    td.style.display = 'none';
                });
                td_6_day_resub2.forEach(function (td) {
                    td.style.display = 'none';
                });
                th_6_day_resub2.forEach(function (td) {
                    td.style.display = 'none';
                });
            }
            

        } else {
            file_upload_section.style.display = 'row';
            section_name.disabled = false
            file_upload_btn.disabled = false

            if (resub_1) {
                resub_1.style.display = 'block';
            }
            if (resub_2) {
                resub_2.style.display = 'block';
            }
            td_6_day_resub1_2.forEach(function (td) {
                td.style.display = 'none';
            });
            td_6_day_resub2_2.forEach(function (td) {
                td.style.display = 'none';
            });
            td_6_day_resub1.forEach(function (td) {
                td.style.display = 'none';
            });
            td_6_day_resub2.forEach(function (td) {
                td.style.display = 'none';
            });

            th_6_day_resub1.forEach(function (td) {
                td.style.display = 'none';
            });
            th_6_day_resub2.forEach(function (td) {
                td.style.display = 'none';
            });
                    
        }
    } 
    else if (checker_3Date) {                
        
        td_6_day_resub1_2.forEach(function (td) {
            td.style.display = 'none';
        });

        td_6_day_resub2_2.forEach(function (td) {
            td.style.display = 'none';
        });

        td_6_day_resub1.forEach(function (td) {
            td.style.display = 'none';
        });

        td_6_day_resub2.forEach(function (td) {
            td.style.display = 'none';
        });
               

        th_6_day_resub1.forEach(function (td) {
            td.style.display = 'none';
        });
        th_6_day_resub2.forEach(function (td) {
            td.style.display = 'none';
        });
    }

    if (empsub_2 && !checker_2Date) {
        section_name.disabled = true
        file_input.disabled = true
        file_upload_btn.disabled = true

        if (resub_1) {
            resub_1.style.display = 'none';
        }
        if (resub_2) {
            resub_2.style.display = 'none';
        }
    }
    if (empsub_2 && checker_2Date && empsub_3 && !checker_3Date) {
        section_name.disabled = true
        file_input.disabled = true
        file_upload_btn.disabled = true

        if (resub_1) {
            resub_1.style.display = 'none';
        }
        if (resub_2) {
            resub_2.style.display = 'none';
        }
    }
});