/* ===== SENARAI RALAT YANG DIBETULKAN (Part 1) =====
// Error 1  (grade.html, Line 9):  onsubmit="checkMark()" -> onsubmit="return checkMark()"
//          (tanpa return, borang tetap dihantar & halaman dimuat semula, result hilang)
// Error 2  (grade.html, Line 17): showtable() -> showTable()  (huruf besar T)
// Error 3  (grade.html, Line 19): src="grades.js" -> src="grade.js"  (nama fail salah)
// Error 4  (grade.js, Line 5):    if (name = "") -> if (name === "")  (= ialah assignment, bukan perbandingan)
// Error 5  (grade.js, Line 14):   mark < 0 && mark > 100 -> mark < 0 || mark > 100  (tiada nombor boleh <0 DAN >100)
// Error 6  (grade.js, Line 28):   getElementByID -> getElementById  (huruf kecil 'd')
// Error 7  (grade.js, Line 30):   style.colour -> style.color  (ejaan CSS/JS ialah 'color')
// Error 8  (grade.js, Line 31):   return true -> return false  (kekal di halaman, result tidak hilang)
// Error 9  (grade.js, Line 38):   let i = 1 -> let i = 0  (baris pertama, grade A, tertinggal)
// Error 10 (grade.js, Line 42):   innerHtml -> innerHTML  (huruf besar HTML)
*/

function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Error 4 dibetulkan: === ; trim() supaya nama yang hanya ruang kosong juga ditolak
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }
    // Part 2 (Step 5): semak mark kosong DAHULU, kerana isNaN("") ialah false
    // (rentetan kosong ditukar jadi 0) dan akan terlepas semakan isNaN
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }
    mark = Number(mark);
    // Error 5 dibetulkan: guna || (ATAU)
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Error 6 dibetulkan: getElementById
    document.getElementById("result").innerHTML = name + " got grade " + grade;

    // Part 2 (Step 6): warna mengikut gred (green = A,B ; orange = C ; red = F)
    let colour;
    if (grade === "A" || grade === "B") {
        colour = "green";
    } else if (grade === "C") {
        colour = "orange";
    } else {
        colour = "red";
    }
    // Error 7 dibetulkan: style.color
    document.getElementById("result").style.color = colour;

    // Part 2 (Step 8): papar tarikh & masa semakan menggunakan Date()
    document.getElementById("dateTime").innerHTML = "Checked on: " + new Date();

    // Error 8 dibetulkan: return false supaya borang tidak dihantar & halaman tidak refresh
    return false;
}

// Part 2 (Step 7): jana nombor bulat rawak 0-100 dan letak dalam medan mark
function randomMark() {
    // Math.random() beri 0 hingga <1; darab 101 -> 0 hingga <101; floor -> 0..100
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];
    // Part 2 (Step 9): baris header supaya boleh digayakan dengan CSS
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    // Error 9 dibetulkan: mula dari i = 0
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";
    // Error 10 dibetulkan: innerHTML
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
