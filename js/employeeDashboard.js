// $(document).ready(function () {
//     const empDashboardRow = $("#empDashboardRow");
//     const searchInput = $(".search input");
//     const employeeData = JSON.parse(localStorage.getItem("employeeData")) || [];

//     // Render Employee Table
//     function renderTable(data) {
//         empDashboardRow.empty(); // Clear existing rows

//         if (data.length > 0) {
//             $.each(data, function (index, employee) {
//                 const row = $("<tr>");

//                 // Profile Image
//                 const profileImageCell = $("<td>");
//                 if (employee.profileImage) {
//                     const profileImage = $("<img>")
//                         .attr("src", `../assests/${employee.profileImage}.jpg`)
//                         .addClass("profile-image");
//                     profileImageCell.append(profileImage);
//                 } else {
//                     profileImageCell.text("No image");
//                 }
//                 row.append(profileImageCell);

//                 // Name
//                 const nameCell = $("<td>").text(employee.name);
//                 row.append(nameCell);

//                 // Gender
//                 const genderCell = $("<td>").text(employee.gender);
//                 row.append(genderCell);

//                 // Department
//                 const departmentCell = $("<td>").text(employee.departments.join(", "));
//                 row.append(departmentCell);

//                 // Salary
//                 const salaryCell = $("<td>").text(employee.salary);
//                 row.append(salaryCell);

//                 // Start Date
//                 const startDateCell = $("<td>").text(`${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`);
//                 row.append(startDateCell);

//                 // Actions (Edit and Delete buttons)
//                 const actionsCell = $("<td>").html(`
//                     <button class="edit-btn" data-index="${index}">Edit</button> 
//                     <button class="delete-btn" data-index="${index}">Delete</button>
//                 `);
//                 row.append(actionsCell);

//                 empDashboardRow.append(row);
//             });
//         } else {
//             empDashboardRow.html("<tr><td colspan='7'>No employee data found.</td></tr>");
//         }
//     }

//     // Initial Table Render
//     renderTable(employeeData);

//     // Search Functionality
//     searchInput.on("input", function () {
//         const query = searchInput.val().toLowerCase();
//         const filteredData = $.grep(employeeData, function (employee) {
//             return (
//                 employee.name.toLowerCase().includes(query) ||
//                 employee.gender.toLowerCase().includes(query) ||
//                 employee.departments.some(dept => dept.toLowerCase().includes(query)) ||
//                 employee.salary.toLowerCase().includes(query) ||
//                 `${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`.includes(query)
//             );
//         });

//         // Render table with filtered data
//         renderTable(filteredData);
//     });

//     // Edit Employee Function
//     $(document).on("click", ".edit-btn", function () {
//         const index = $(this).data("index");
//         const employee = employeeData[index];

//         // Store selected employee details and index in localStorage
//         localStorage.setItem("editEmployeeIndex", index);
//         localStorage.setItem("editEmployeeData", JSON.stringify(employee));

//         // Navigate to registration page for editing
//         window.location.href = "employeeRegistration.html";
//     });

//     // Delete Employee Function
//     $(document).on("click", ".delete-btn", function () {
//         const index = $(this).data("index");
//         if (confirm("Are you sure you want to delete this employee?")) {
//             employeeData.splice(index, 1);
//             localStorage.setItem("employeeData", JSON.stringify(employeeData));
//             renderTable(employeeData);
//             alert("Employee deleted successfully!");
//         }
//     });
// });
































































































$(document).ready(function () {
    const empDashboardRow = $("#empDashboardRow");
    const searchInput = $(".search input");

    function fetchEmployees() {
        $.get("http://localhost:5000/employees", function (data) {
            renderTable(data);
        });
    }

    function renderTable(data) {
        empDashboardRow.empty();

        if (data.length > 0) {
            $.each(data, function (index, employee) {
                const row = $("<tr>");

                const profileImageCell = $("<td>");
                if (employee.profileImage) {
                    const profileImage = $("<img>")
                        .attr("src", `../assests/${employee.profileImage}.jpg`)
                        .addClass("profile-image");
                    profileImageCell.append(profileImage);
                } else {
                    profileImageCell.text("No image");
                }
                row.append(profileImageCell);

                row.append($("<td>").text(employee.name));
                row.append($("<td>").text(employee.gender));
                row.append($("<td>").text(employee.departments.join(", ")));
                row.append($("<td>").text(employee.salary));
                row.append($("<td>").text(`${employee.startDate.day}/${employee.startDate.month}/${employee.startDate.year}`));

                // const actionsCell = $("<td>").html(`
                //     <button class="edit-btn" data-id="${employee.id}">Edit</button> 
                //     <button class="delete-btn" data-id="${employee.id}">Delete</button>
                // `);

                const actionsCell = $("<td>").html(`
                    <button class="edit-btn" data-id="${employee.id}">
                        <i class="fas fa-edit"></i> 
                    </button> 
                    <button class="delete-btn" data-id="${employee.id}">
                        <i class="fas fa-trash-alt"></i> 
                    </button>
                `);
                
                row.append(actionsCell);

                empDashboardRow.append(row);
            });
        } else {
            empDashboardRow.html("<tr><td colspan='7'>No employee data found.</td></tr>");
        }
    }

    fetchEmployees();

    searchInput.on("input", function () {
        const query = searchInput.val().toLowerCase();
        $.get("http://localhost:5000/employees", function (data) {
            const filteredData = data.filter(employee =>
                employee.name.toLowerCase().includes(query) ||
                employee.gender.toLowerCase().includes(query) ||
                employee.departments.some(dept => dept.toLowerCase().includes(query)) ||
                employee.salary.toLowerCase().includes(query)
            );
            renderTable(filteredData);
        });
    });

    $(document).on("click", ".edit-btn", function () {
        const id = $(this).data("id");
        localStorage.setItem("editEmployeeId", id);
        window.location.href = "employeeRegistration.html";
    });

    $(document).on("click", ".delete-btn", function () {
        const id = $(this).data("id");
        if (confirm("Are you sure you want to delete this employee?")) {
            $.ajax({
                url: `http://localhost:5000/employees/${id}`,
                type: "DELETE",
                success: function () {
                    alert("Employee deleted successfully!");
                    fetchEmployees();
                }
            });
        }
    });
});
