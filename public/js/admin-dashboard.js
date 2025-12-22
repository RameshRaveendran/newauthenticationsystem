
// ====================== GLOBAL STATE ======================
let users = [];

// ====================== DOM ELEMENTS ======================
const usersTableBody = document.getElementById("usersTableBody");
const totalUsersEl = document.getElementById("totalUsers");

const editUserForm = document.getElementById("editUserForm");
const editUserIdInput = document.getElementById("editUserId");
const editUserNameInput = document.getElementById("editUserName");
const editUserEmailInput = document.getElementById("editUserEmail");
const editUserPasswordInput = document.getElementById("editUserPassword");
const editUserRoleSelect = document.getElementById("editUserRole");

const logoutBtn = document.getElementById("logoutBtn");

// ====================== FETCH USERS ======================
async function fetchUsers() {
  try {
    const res = await fetch("/admin/users");
    const data = await res.json();

    if (!data.success) {
  window.location.replace("/login");
  return;
}


    users = data.users;
    renderUsers();
  } catch (err) {
    alert("Server error while fetching users");
  }
}

// ====================== RENDER USERS ======================
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
        <button class="btn btn-small btn-primary" data-action="edit" data-id="${
          user._id
        }">
          Edit
        </button>
        <button class="btn btn-small btn-danger" data-action="delete" data-id="${
          user._id
        }">
          Delete
        </button>
      </td>
    `;

    usersTableBody.appendChild(tr);
  });

  totalUsersEl.textContent = users.length;
}

// ====================== LOAD USER INTO FORM ======================
function loadUserIntoForm(userId) {
  const user = users.find((u) => u._id === userId);
  if (!user) return;

  editUserIdInput.value = user._id;
  editUserNameInput.value = user.name;
  editUserEmailInput.value = user.email;
  editUserPasswordInput.value = "";
  editUserRoleSelect.value = user.role;
}

// ====================== TABLE ACTIONS (EDIT / DELETE) ======================
usersTableBody.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const action = button.dataset.action;
  const userId = button.dataset.id;

  // ---------- EDIT ----------
  if (action === "edit") {
    loadUserIntoForm(userId);
  }

  // ---------- DELETE ----------
if (action === "delete") {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This user will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel"
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`/admin/users/${userId}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (!data.success) {
      Swal.fire("Error", data.message, "error");
      return;
    }

    Swal.fire("Deleted!", data.message, "success");
    fetchUsers();

  } catch (err) {
    Swal.fire("Error", "Server error while deleting user", "error");
  }
}

});

// ====================== UPDATE USER ======================
editUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userId = editUserIdInput.value;
  if (!userId) {
    Swal.fire("Warning", "Please select a user first", "warning");
    return;
  }

  const payload = {
    email: editUserEmailInput.value.trim(),
    role: editUserRoleSelect.value
  };

  if (editUserPasswordInput.value.trim()) {
    payload.password = editUserPasswordInput.value.trim();
  }

  try {
    const res = await fetch(`/admin/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!data.success) {
      Swal.fire("Error", data.message, "error");
      return;
    }

    Swal.fire({
      title: "Updated!",
      text: data.message,
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });

    editUserForm.reset();
    editUserIdInput.value = "";
    fetchUsers();

  } catch (err) {
    Swal.fire("Error", "Server error while updating user", "error");
  }
});


// ====================== LOGOUT ======================
logoutBtn.addEventListener("click", async () => {
  const result = await Swal.fire({
    title: "Logout?",
    text: "Are you sure you want to logout?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Logout"
  });

  if (result.isConfirmed) {
    window.location.href = "/logout";
  }
});

// ====================== INIT ======================
document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});

// ====================== BACK BUTTON CACHE FIX ======================
window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});
