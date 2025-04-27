const correctUsername = "admin";  // Hardcoded username
const correctPassword = "password";  // Hardcoded password

function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (username === correctUsername && password === correctPassword) {
        document.getElementById("login-form").style.display = "none";  // Hide login form
        document.getElementById("reports-section").style.display = "block";  // Show reports

        const reports = JSON.parse(localStorage.getItem("waterReports")) || [];
        const reportsList = document.getElementById("reports-list");
        reportsList.innerHTML = "";  // Clear existing reports

        reports.forEach((report, index) => {
            const reportDiv = document.createElement("div");
            reportDiv.classList.add("report");
            reportDiv.innerHTML = 
                <h5>Report #${index + 1}</h5>
                <p><strong>Location:</strong> ${report.location}</p>
                <p><strong>Quality:</strong> ${report.quality}%</p>
                <p><strong>Status:</strong> ${report.status}</p>
                ${report.photo ? <p><strong>Photo:</strong> ${report.photo}</p> : ''}
            ;
            reportsList.appendChild(reportDiv);
        });
    } else {
        alert("Invalid login credentials.");
    }
}
