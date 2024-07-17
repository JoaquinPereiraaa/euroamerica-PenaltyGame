const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (password.length < 8 || password.length > 20) {
    return Swal.fire({
      icon: "error",
      title: "Error",
      text: "La contraseña debe tener entre 8 y 20 caracteres",
    });
  }
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  const isUserRegistered = Users.find((user) => user.email === email);

  if (isUserRegistered) {
    return Swal.fire({
      icon: "error",
      title: "Upsss",
      text: `Ya hay un usuario creado con ese email`,
    });
  }
  Users.push({ name: name, email: email, password: password });
  localStorage.setItem("users", JSON.stringify(Users));
  Swal.fire({
    title: "BIENVENIDO",
    text: `${name} Te direccionaremos al Login para que pongas tus datos que ya fueron aceptados`,
    icon: "success",
    willClose: () => {
      window.location.href = "./login.html";
    },
  });
});
