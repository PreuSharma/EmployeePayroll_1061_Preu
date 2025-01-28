$(document).ready(function () {
    const empDashboardRow = $("#empDashboardRow");
    const searchInput = $(".search input");
    const employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

    // Render Employee Table
    function renderTable(data) {
        empDashboardRow.empty(); // Clear existing rows

        if (data.length > 0) {
            $.each(data, function (index, employee) {
                const row = $("<tr>");

                // Profile Image
                // Profile Image
                const profileImageCell = $("<td>");
                if (employee.profileImage) {
                    const profileImage = $("<img>").attr("src", `../assests/${employee.profileImage}.jpg`).addClass("profile-image");
                    profileImageCell.append(profileImage);
                } else {
                    profileImageCell.text("No image");
                }
                row.append(profileImageCell);


                // Name
                const nameCell = $("<td>").text(employee.name);
                row.append(nameCell);

                // Gender
                const genderCell = $("<td>").text(employee.gender);
                row.append(genderCell);

                // Department
                const departmentCell = $("<td>").text(employee.departments.join(", "));
                row.append(departmentCell);

                // Salary
                const salaryCell = $("<td>").text(employee.salary);
                row.append(salaryCell);

                // Start Date
                const startDateCell = $("<td>").text(`${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`);
                row.append(startDateCell);

                // Actions (Edit and Delete buttons)
                const actionsCell = $("<td>").html(`
                    <button class="edit-btn" onclick="editEmployee(${index})">Edit</button> 
                    <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
                `);
                row.append(actionsCell);

                empDashboardRow.append(row);
            });
        } else {
            empDashboardRow.html("<tr><td colspan='7'>No employee data found.</td></tr>");
        }
    }

    // Initial Table Render
    renderTable(employeeData);

    // Search Functionality
    searchInput.on("input", function () {
        const query = searchInput.val().toLowerCase();
        const filteredData = $.grep(employeeData, function (employee) {
            return (
                employee.name.toLowerCase().includes(query) ||
                employee.gender.toLowerCase().includes(query) ||
                employee.departments.some(dept => dept.toLowerCase().includes(query)) ||
                employee.salary.toLowerCase().includes(query) ||
                `${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`.includes(query)
            );
        });

        // Render table with filtered data
        renderTable(filteredData);
    });

    // Edit Employee Function
    window.editEmployee = function (index) {
        const employee = employeeData[index];
        const updatedName = prompt("Enter new name:", employee.name) || employee.name;
        const updatedGender = prompt("Enter new gender (Male/Female):", employee.gender) || employee.gender;
        const updatedDepartments = prompt("Enter departments (comma-separated):", employee.departments.join(", ")) || employee.departments.join(", ");
        const updatedSalary = prompt("Enter new salary:", employee.salary) || employee.salary;
        const updatedStartDate = prompt("Enter new start date (dd/mm/yyyy):", `${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`) || `${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`;

        const [day, month, year] = updatedStartDate.split("/");

        // Edit profile image logic (optional)
        const updatedProfileImage = prompt("Enter profile image name (img1, img2, img3, img4):", employee.profileImage) || employee.profileImage;

        employeeData[index] = {
            ...employee,
            name: updatedName,
            gender: updatedGender,
            departments: updatedDepartments.split(",").map(dept => dept.trim()),
            salary: updatedSalary,
            startDate: { day, month, year },
            profileImage: updatedProfileImage
        };

        localStorage.setItem("employeeData", JSON.stringify(employeeData));
        renderTable(employeeData);
        alert("Employee details updated successfully!");
    };

    // Delete Employee Function
    window.deleteEmployee = function (index) {
        if (confirm("Are you sure you want to delete this employee?")) {
            employeeData.splice(index, 1);
            localStorage.setItem("employeeData", JSON.stringify(employeeData));
            renderTable(employeeData);
            alert("Employee deleted successfully!");
        }
    };
});
