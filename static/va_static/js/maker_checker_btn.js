

document.getElementById('downloadAll').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.file-checkbox');
    let delay = 0;
    const downloadDelay = 500; // Delay in milliseconds (adjust as needed)

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const fileUrl = checkbox.getAttribute('data-file');
            setTimeout(() => {
                downloadFile(fileUrl);
            }, delay);
            delay += downloadDelay;
        }
    });
});

document.getElementById('viewAll').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.file-checkbox');
    let delay = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const fileUrl = checkbox.getAttribute('data-file');            
            setTimeout(() => {                
                openFileInNewTab(fileUrl);
            }, delay);
            delay += 200; // Adjust the delay time as necessary
        }
    });
});





document.getElementById('downloadAll_1').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.file_1-checkbox_1');
    let delay = 0;
    const downloadDelay = 500; // Delay in milliseconds (adjust as needed)

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const fileUrl = checkbox.getAttribute('data-file');
            setTimeout(() => {
                downloadFile(fileUrl);
            }, delay);
            delay += downloadDelay;
        }
    });
});


document.getElementById('viewAll_1').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.file_1-checkbox_1');
    let delay = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const fileUrl = checkbox.getAttribute('data-file');            
            setTimeout(() => {                
                openFileInNewTab(fileUrl);
            }, delay);
            delay += 200; // Adjust the delay time as necessary
        }
    });
});


if (empsub_2) {
        
    document.getElementById('downloadAll_3').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.file-checkbox_3');
        let delay = 0;
        const downloadDelay = 500; // Delay in milliseconds (adjust as needed)

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const fileUrl = checkbox.getAttribute('data-file');
                setTimeout(() => {
                    downloadFile(fileUrl);
                }, delay);
                delay += downloadDelay;
            }
        });
    });

    document.getElementById('viewAll_3').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.file-checkbox_3');
        let delay = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const fileUrl = checkbox.getAttribute('data-file');
                setTimeout(() => {
                    openFileInNewTab(fileUrl);
                }, delay);
                delay += 200; // Adjust the delay time as necessary
            }
        });
    });
}


if (empsub_3) {

        
    document.getElementById('downloadAll_4').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.file_1-checkbox_4');
        let delay = 0;
        const downloadDelay = 500; // Delay in milliseconds (adjust as needed)

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const fileUrl = checkbox.getAttribute('data-file');
                setTimeout(() => {
                    downloadFile(fileUrl);
                }, delay);
                delay += downloadDelay;
            }
        });
    });



    document.getElementById('viewAll_4').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('.file_1-checkbox_4');
        let delay = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const fileUrl = checkbox.getAttribute('data-file');
                setTimeout(() => {
                    openFileInNewTab(fileUrl);
                }, delay);
                delay += 200; // Adjust the delay time as necessary
            }
        });
    });
}


function downloadFile(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


function openFileInNewTab(fileUrl) {    
    window.open(fileUrl, '_blank');
}
