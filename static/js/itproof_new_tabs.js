

// var currentTab = 1;

if (current_page_1) {
    var currentTab = current_page_1;
    localStorage.setItem('currentTab', currentTab);
} 

if (localStorage.getItem('currentTab')) {    
    currentTab = parseInt(localStorage.getItem('currentTab'));
    localStorage.setItem('currentTab', currentTab);
    showTab(currentTab);
} else{
    showTab(1);
}




function showTab(tabNumber) {
    var tabs = document.getElementsByClassName('tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';

    }
    document.getElementById('tab' + tabNumber).style.display = 'block';
    currentTab = tabNumber;
    var topTabs = document.getElementsByClassName('nav-link');
    for (var i = 0; i < topTabs.length; i++) {
        topTabs[i].classList.remove('active-tab');
    }
    var activeTabs = document.getElementById('tab' + tabNumber + '_head')
    activeTabs.classList.add('active-tab')
    if (currentTab === 1) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline-block';
    }
    if (currentTab === 3) {
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
    }
    localStorage.setItem('currentTab', currentTab);
}

function conditionIsTrue() {
    return empStartDate >= financialYearStart && financialYearEnd >= empStartDate;
}

function showNextTab() {
    if (currentTab === 3) {
        showTab(1);
    }
    else if (currentTab === 1 && !conditionIsTrue()) {
        showTab(3);
    }
    else {
        showTab(currentTab + 1);
    }
    display_submit();
}


function showPrevTab() {
    if (currentTab === 1) {
        showTab(3);
    } else if (currentTab === 3 && !conditionIsTrue()) {
        showTab(1);
    }
    else {
        showTab(currentTab - 1);
    }
    display_submit();
}




var files_display_section = document.getElementById('files_display');
var hra_form2section = document.getElementById('hra_form2');

function files_display_section_none() {
    if (section80oiyesbtn.checked === true || sectionyes_previousempbtn.checked === true) {
        files_display_section.style.display = 'flex';
        hra_form2section.style.display = 'flex';
    } else {
        files_display_section.style.display = 'none';
        hra_form2section.style.display = 'none';
    }
}
