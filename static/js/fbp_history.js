


document.addEventListener('DOMContentLoaded', function () {
    var fileSections = document.getElementsByClassName('file_section');

    for (var i = 0; i < fileSections.length; i++) {
        var fileSection = fileSections[i];

        if (verL2Dt) {
            if (!Sub2dt) {
                if (claim_status == 'On Hold') {
                    fileSection.style.display = 'block';
                } else {
                    fileSection.style.display = 'none';
                }
            } else {
                fileSection.style.display = 'none';
            }
        } else {
            fileSection.style.display = 'none';
        }
    }
});