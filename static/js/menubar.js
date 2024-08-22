
window.onload = function () {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");

    closeBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    // Event listener to close the sidebar if the user clicks outside of it
    document.addEventListener("click", function (event) {
        let target = event.target; // clicked element

        do {
            if (target == sidebar || target == closeBtn) {
                // This is a click inside the sidebar or the button, do nothing
                return;
            }

            // Go up the DOM
            target = target.parentNode;
        } while (target);

        // // This is a click outside, close the sidebar
        // if (sidebar.classList.contains("open")) {
        //     sidebar.classList.remove("open");
        //     menuBtnChange();
        // }
    });

    // Prevent the document click event from firing when sidebar is clicked
    sidebar.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
        }
    }

}

function logoutAndRedirect() {    
    let emplogout = "Emp_logout";
    window.location.href = emplogout;

}

// Add this function to toggle the 'sidebar-open' class on the body
function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
}

// Attach this function to the menu button's click event
document.getElementById('btn').addEventListener('click', toggleSidebar);


function redirecthome(){    
    let Emppage = "Emppage";
    window.location.href = Emppage;
}