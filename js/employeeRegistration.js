// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector("form");
//     const nameInput = document.querySelector("input[type='text']");
//     const genderInputs = document.querySelectorAll("input[name='gender']");
//     const departmentInputs = document.querySelectorAll("input[type='checkbox']");
//     const salarySelect = document.querySelector("select");
//     const startDateSelect = {
//         day: document.querySelector(".startDate select"),
//         month: document.querySelector(".startMonth select"),
//         year: document.querySelector(".startYear select"),
//     };
//     const notesTextarea = document.querySelector("textarea");

//     const resetButton = document.querySelector(".regResetButton button");
//     const submitButton = document.querySelector(".regSubmitButton button");

//     // Check if editing an employee
//     let editIndex = localStorage.getItem("editEmployeeIndex");
//     let editEmployeeData = localStorage.getItem("editEmployeeData");

//     if (editEmployeeData) {
//         editEmployeeData = JSON.parse(editEmployeeData);

//         // Prefill form fields
//         nameInput.value = editEmployeeData.name;
//         salarySelect.value = editEmployeeData.salary;
//         notesTextarea.value = editEmployeeData.notes || "";

//         // Prefill gender
//         genderInputs.forEach(input => {
//             if (input.value === editEmployeeData.gender) {
//                 input.checked = true;
//             }
//         });

//         // Prefill departments
//         departmentInputs.forEach(input => {
//             if (editEmployeeData.departments.includes(input.nextSibling.textContent.trim())) {
//                 input.checked = true;
//             }
//         });

//         // Prefill profile image (this part was missing)
//         const profileImageInput = document.querySelector(`input[name="profileImage"][value="${editEmployeeData.profileImage}"]`);
//         if (profileImageInput) {
//             profileImageInput.checked = true;
//         }

//         // Prefill start date
//         startDateSelect.day.value = editEmployeeData.startDate.day;
//         startDateSelect.month.value = editEmployeeData.startDate.month;
//         startDateSelect.year.value = editEmployeeData.startDate.year;
//     }

//     // Form validation function
//     function validateForm() {
//         let valid = true;

//         if (nameInput.value.trim() === "") {
//             alert("Name is required.");
//             valid = false;
//         }

//         if (![...genderInputs].some(input => input.checked)) {
//             alert("Gender selection is required.");
//             valid = false;
//         }

//         if (![...departmentInputs].some(input => input.checked)) {
//             alert("At least one department must be selected.");
//             valid = false;
//         }
        

//         if (salarySelect.value === "Select Salary") {
//             alert("Salary selection is required.");
//             valid = false;
//         }

//         if (!startDateSelect.day.value || !startDateSelect.month.value || !startDateSelect.year.value) {
//             alert("Start Date is incomplete.");
//             valid = false;
//         }

//         return valid;
//     }

//     // Reset Form
//     if (resetButton) {
//         resetButton.addEventListener("click", function () {
//             form.reset();
//         });
//     }

//     // Submit Form
//     if (submitButton) {
//         submitButton.addEventListener("click", function (event) {
//             event.preventDefault();

//             if (validateForm()) {
//                 // Collect form data
//                 const formData = {
//                     name: nameInput.value,
//                     profileImage: document.querySelector("input[name='profileImage']:checked")?.value,
//                     gender: document.querySelector("input[name='gender']:checked")?.value,
//                     departments: [...departmentInputs].filter(input => input.checked).map(input => input.nextSibling.textContent.trim()),
//                     salary: salarySelect.value,
//                     startDate: {
//                         day: startDateSelect.day.value,
//                         month: startDateSelect.month.value,
//                         year: startDateSelect.year.value,
//                     },
//                     notes: notesTextarea.value
//                 };

//                 let existingData = localStorage.getItem("employeeData");
//                 existingData = existingData ? JSON.parse(existingData) : [];

//                 // Ensure existingData is an array
//                 if (!Array.isArray(existingData)) {
//                     existingData = [];
//                 }

//                 if (editIndex !== null) {
//                     // If editing, update the existing entry
//                     existingData[editIndex] = formData;
//                 } else {
//                     // Otherwise, add new entry
//                     existingData.push(formData);
//                 }

//                 // Save updated data
//                 localStorage.setItem("employeeData", JSON.stringify(existingData));

//                 // Clear edit data
//                 localStorage.removeItem("editEmployeeIndex");
//                 localStorage.removeItem("editEmployeeData");

//                 alert("Employee data saved successfully!");
//                 window.location.href = "employeeDashboard.html";
//             } else {
//                 alert("Please fill all the fields correctly before submitting.");
//             }
//         });
//     }
// });





















































document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("input[type='text']");
    const genderInputs = document.querySelectorAll("input[name='gender']");
    const departmentInputs = document.querySelectorAll("input[type='checkbox']");
    const salarySelect = document.querySelector("select");
    const startDateSelect = {
        day: document.querySelector(".startDate select"),
        month: document.querySelector(".startMonth select"),
        year: document.querySelector(".startYear select"),
    };
    const notesTextarea = document.querySelector("textarea");

    const resetButton = document.querySelector(".regResetButton button");
    const submitButton = document.querySelector(".regSubmitButton button");

    // Check if editing an employee
    let editId = localStorage.getItem("editEmployeeId");

    if (editId) {
        fetch(`http://localhost:5000/employees/${editId}`)
            .then(response => response.json())
            .then(data => {
                nameInput.value = data.name;
                salarySelect.value = data.salary;
                notesTextarea.value = data.notes || "";

                genderInputs.forEach(input => {
                    if (input.value === data.gender) {
                        input.checked = true;
                    }
                });

                departmentInputs.forEach(input => {
                    if (data.departments.includes(input.nextSibling.textContent.trim())) {
                        input.checked = true;
                    }
                });

                const profileImageInput = document.querySelector(`input[name="profileImage"][value="${data.profileImage}"]`);
                if (profileImageInput) {
                    profileImageInput.checked = true;
                }

                startDateSelect.day.value = data.startDate.day;
                startDateSelect.month.value = data.startDate.month;
                startDateSelect.year.value = data.startDate.year;
            })
            .catch(error => console.error("Error fetching employee data:", error));
    }

    function validateForm() {
        let valid = true;

        if (nameInput.value.trim() === "") {
            alert("Name is required.");
            valid = false;
        }

        if (![...genderInputs].some(input => input.checked)) {
            alert("Gender selection is required.");
            valid = false;
        }

        if (![...departmentInputs].some(input => input.checked)) {
            alert("At least one department must be selected.");
            valid = false;
        }

        if (salarySelect.value === "Select Salary") {
            alert("Salary selection is required.");
            valid = false;
        }

        if (!startDateSelect.day.value || !startDateSelect.month.value || !startDateSelect.year.value) {
            alert("Start Date is incomplete.");
            valid = false;
        }

        return valid;
    }

    if (resetButton) {
        resetButton.addEventListener("click", function () {
            form.reset();
        });
    }

    if (submitButton) {
        submitButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (validateForm()) {
                const formData = {
                    name: nameInput.value,
                    profileImage: document.querySelector("input[name='profileImage']:checked")?.value,
                    gender: document.querySelector("input[name='gender']:checked")?.value,
                    departments: [...departmentInputs].filter(input => input.checked).map(input => input.nextSibling.textContent.trim()),
                    salary: salarySelect.value,
                    startDate: {
                        day: startDateSelect.day.value,
                        month: startDateSelect.month.value,
                        year: startDateSelect.year.value,
                    },
                    notes: notesTextarea.value
                };

                if (editId) {
                    fetch(`http://localhost:5000/employees/${editId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    })
                    .then(() => {
                        localStorage.removeItem("editEmployeeId");
                        alert("Employee updated successfully!");
                        window.location.href = "employeeDashboard.html";
                    });
                } else {
                    fetch("http://localhost:5000/employees", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    })
                    .then(() => {
                        alert("Employee added successfully!");
                        window.location.href = "employeeDashboard.html";
                    });
                }
                window.location.href="employeeDashboard.html"; //redirect
            } else {
                alert("Please fill all the fields correctly before submitting.");
            }
        });
    }
});
