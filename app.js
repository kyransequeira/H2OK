document.getElementById('water-quality').addEventListener('input', function () {
    const qualityValue = this.value;
    document.getElementById('water-quality-value').innerText = `Quality: ${qualityValue}%`;
});

function submitReport() {
    const location = document.getElementById("location").value;
    const quality = document.getElementById("water-quality").value;
    const status = document.getElementById("status").value;
    const photo = document.getElementById("photo").files[0];

    if (location && quality && status) {
        let reports = JSON.parse(localStorage.getItem("waterReports")) || [];
        const newReport = { location, quality, status, photo: photo ? photo.name : null };
        reports.push(newReport);
        localStorage.setItem("waterReports", JSON.stringify(reports));

        alert("Report submitted!");

        // Reset form after submission
        document.getElementById("location").value = "";
        document.getElementById("water-quality").value = 50;
        document.getElementById("status").value = "Working";
        document.getElementById("photo").value = "";
        document.getElementById("water-quality-value").innerText = "Quality: 50%";
    } else {
        alert("Please fill out all the fields before submitting.");
    }
}
