document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const nameInput = document.querySelector("input[type='text']");
    const genderInputs = document.querySelectorAll("input[name='gender']");
    const departmentInputs = document.querySelectorAll("input[type='checkbox']");
    const salarySelect = document.querySelector("select");
    const startDateSelect = document.querySelectorAll(".startDate, .startMonth, .startYear");
    const notesTextarea = document.querySelector("textarea");

    const resetButton = document.querySelector(".regResetButton button");
    const submitButton = document.querySelector(".regSubmitButton button");

    // Form validation function
    function validateForm() {
        let valid = true;

        // Name Validation
        if (nameInput.value.trim() === "") {
            alert("Name is required.");
            valid = false;
        }

        // Gender Validation
        if (![...genderInputs].some(input => input.checked)) {
            alert("Gender selection is required.");
            valid = false;
        }

        // Department Validation
        if (![...departmentInputs].some(input => input.checked)) {
            alert("At least one department must be selected.");
            valid = false;
        }

        // Salary Validation
        if (salarySelect.value === "Select Salary") {
            alert("Salary selection is required.");
            valid = false;
        }

        // Start Date Validation
        if ([...startDateSelect].some(select => select.value === "" || select.value === "Select Date")) {
            alert("Start Date is incomplete.");
            valid = false;
        }

        return valid;
    }

    // Reset Form
    if (resetButton) {
        resetButton.addEventListener("click", function() {
            form.reset();
        });
    }

    // Submit Form
    if (submitButton) {
        submitButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default form submission

            // Validate form before submitting
            if (validateForm()) {
                // Collect form data
                const formData = {
                    name: nameInput.value,
                    profileImage: document.querySelector("input[name='profileImage']:checked")?.value,
                    gender: document.querySelector("input[name='gender']:checked")?.value,
                    departments: [...departmentInputs].filter(input => input.checked).map(input => input.nextSibling.textContent.trim()),
                    salary: salarySelect.value,
                    startDate: {
                        day: document.querySelector(".startDate select").value,
                        month: document.querySelector(".startMonth select").value,
                        year: document.querySelector(".startYear select").value,
                    },
                    notes: notesTextarea.value
                };

                let existingData = localStorage.getItem('employeeData');
                existingData = existingData ? JSON.parse(existingData) : [];

                // Ensure existingData is an array
                if (!Array.isArray(existingData)) {
                    existingData = [];
                }

                // Add new form data to the array
                existingData.push(formData);

                // Save the updated array back to localStorage
                localStorage.setItem('employeeData', JSON.stringify(existingData));

                alert("Form submitted and data saved to local storage!");

                // Redirect to Employee Dashboard after submission
                window.location.href = 'employeeDashboard.html';
            } else {
                alert("Please fill all the fields correctly before submitting.");
            }
        });
    }
});
