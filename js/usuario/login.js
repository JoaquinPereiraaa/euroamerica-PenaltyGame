const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = Users.find(
    (user) => user.email === email && user.password === password
  );
  if (!validUser) {
    return Swal.fire({
      icon: "error",
      title: "Upsss",
      text: `Usuario y/o contraseña incorrectos`,
    });
  }
  Swal.fire({
    title: `HOLAAA ${validUser.name}`,
    text: `Diviértete jugando la EUROCOPA`,
    icon: "success",
    willClose: () => {
      localStorage.setItem("login_success", JSON.stringify(validUser));
      window.location.href = "../euro.html";
    },
  });
});
