// For now we use dummy users array.
// Later you can replace this with data from your backend (EJS, API, etc).

let users = [
  { _id: "1", name: "Ramesh", email: "ramesh@example.com", role: "user" },
  { _id: "2", name: "Suresh", email: "suresh@example.com", role: "user" },
  { _id: "3", name: "Admin", email: "admin@example.com", role: "admin" }
];

const usersTableBody = document.getElementById("usersTableBody");
const totalUsersEl = document.getElementById("totalUsers");

// Edit form elements
const editUserForm = document.getElementById("editUserForm");
const editUserIdInput = document.getElementById("editUserId");
const editUserNameInput = document.getElementById("editUserName");
const editUserEmailInput = document.getElementById("editUserEmail");
const editUserPasswordInput = document.getElementById("editUserPassword");

// Logout button
const logoutBtn = document.getElementById("logoutBtn");

// Render users in table
function renderUsers() {
  usersTableBody.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="btn btn-small btn-primary" data-action="edit" data-id="${user._id}">
          Edit
        </button>
        <button class="btn btn-small btn-danger" data-action="delete" data-id="${user._id}">
          Delete
        </button>
      </td>
    `;

    usersTableBody.appendChild(tr);
  });

  totalUsersEl.textContent = users.length;
}

// Load user data into edit form
function loadUserIntoForm(userId) {
  const user = users.find((u) => u._id === userId);
  if (!user) return;

  editUserIdInput.value = user._id;
  editUserNameInput.value = user.name;
  editUserEmailInput.value = user.email;
  editUserPasswordInput.value = "";
}

// Handle table button clicks (edit/delete)
usersTableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const userId = button.dataset.id;

  if (action === "edit") {
    // Show user in edit form
    loadUserIntoForm(userId);
  }

  if (action === "delete") {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    // TODO: in real app, call your backend:
    // fetch(`/admin/users/${userId}`, { method: 'DELETE' })

    // For now, just remove from array:
    users = users.filter((u) => u._id !== userId);
    renderUsers();

    // If the deleted user was currently loaded in form, clear form
    if (editUserIdInput.value === userId) {
      editUserForm.reset();
      editUserIdInput.value = "";
    }
  }
});

// Handle edit form submit (update email + password)
editUserForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const userId = editUserIdInput.value;
  const newEmail = editUserEmailInput.value.trim();
  const newPassword = editUserPasswordInput.value.trim();

  if (!userId) {
    alert("Please select a user from the table first.");
    return;
  }

  if (!newEmail || !newPassword) {
    alert("Email and password are required.");
    return;
  }

  // TODO: in real app, send request to backend:
  // fetch(`/admin/users/${userId}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email: newEmail, password: newPassword })
  // })

  // For now, just update local array to simulate:
  const userIndex = users.findIndex((u) => u._id === userId);
  if (userIndex !== -1) {
    users[userIndex].email = newEmail;
  }

  renderUsers();
  alert("User updated (front-end simulation). Connect API for real update!");
  editUserPasswordInput.value = "";
});

// Logout
logoutBtn.addEventListener("click", () => {
  // Option 1: redirect to logout route
  window.location.href = "/login";

  // Option 2 (if you use POST logout):
  // fetch('/logout', { method: 'POST' }).then(() => window.location.href = '/login');
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderUsers();
});
