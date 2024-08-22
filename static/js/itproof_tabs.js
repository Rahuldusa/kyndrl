

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
    if (currentTab === 6) {
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
    if (currentTab === 6) {
        showTab(1);
    }
    else if (currentTab === 4 && !conditionIsTrue()) {
        showTab(6);
    }
    else {
        showTab(currentTab + 1);
    }
    display_submit();
    disable_btns();
}


function showPrevTab() {
    if (currentTab === 1) {
        showTab(6);
    } else if (currentTab === 6 && !conditionIsTrue()) {
        showTab(4);
    }
    else {
        showTab(currentTab - 1);
    }
    display_submit();
    disable_btns();
}




