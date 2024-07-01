document.addEventListener("DOMContentLoaded", function () {
  const teams = [
    /* GRUPO A*/
    { name: "Alemania", flag: "../assets/banderas-euro/alemania.png" },
    { name: "Escocia", flag: "../assets/banderas-euro/escocia.png" },
    { name: "Hungría", flag: "../assets/banderas-euro/hungria.png" },
    { name: "Suiza", flag: "../assets/banderas-euro/suiza.png" },
    /* GRUPO B*/
    { name: "España", flag: "../assets/banderas-euro/españa.png" },
    { name: "Croacia", flag: "../assets/banderas-euro/croacia.png" },
    { name: "Italia", flag: "../assets/banderas-euro/italia.png" },
    { name: "Albania", flag: "../assets/banderas-euro/albania.png" },
    /* GRUPO C*/
    { name: "Eslovenia", flag: "../assets/banderas-euro/eslovenia.png" },
    { name: "Dinamarca", flag: "../assets/banderas-euro/dinamarca.png" },
    { name: "Serbia", flag: "../assets/banderas-euro/serbia.png" },
    { name: "Inglaterra", flag: "../assets/banderas-euro/inglaterra.png" },
    /* GRUPO D*/
    { name: "Polonia", flag: "../assets/banderas-euro/polonia.png" },
    { name: "Países Bajos", flag: "../assets/banderas-euro/paises-bajos.png" },
    { name: "Austria", flag: "../assets/banderas-euro/austria.png" },
    { name: "Francia", flag: "../assets/banderas-euro/francia.png" },
    /* GRUPO E*/
    { name: "Bélgica", flag: "../assets/banderas-euro/belgica.png" },
    { name: "Eslovaquia", flag: "../assets/banderas-euro/eslovaquia.png" },
    { name: "Rumania", flag: "../assets/banderas-euro/rumania.png" },
    { name: "Ucrania", flag: "../assets/banderas-euro/ucrania.png" },
    /* GRUPO E*/
    { name: "Turquía", flag: "../assets/banderas-euro/turquia.png" },
    { name: "Georgia", flag: "../assets/banderas-euro/georgia.png" },
    { name: "Portugal", flag: "../assets/banderas-euro/portugal.png" },
    { name: "Chequia", flag: "../assets/banderas-euro/republica-checa.png" },
  ];

  const teamsContainer = document.getElementById("teams-container");

  // Divide los equipos en cuatro grupos
  const grupos = Math.ceil(teams.length / 6);
  const grupoA = teams.slice(0, grupos);
  const grupoB = teams.slice(grupos, grupos * 2);
  const grupoC = teams.slice(grupos * 2, grupos * 3);
  const grupoD = teams.slice(grupos * 3, grupos * 4);
  const grupoE = teams.slice(grupos * 4, grupos * 5);
  const grupoF = teams.slice(grupos * 5, grupos * 6);

  const columns = [grupoA, grupoB, grupoC, grupoD, grupoE, grupoF];

  columns.forEach((group) => {
    const column = document.createElement("div");
    column.classList.add("teams-column");
    group.forEach((team) => {
      const button = createTeamButton(team);
      column.appendChild(button);
    });
    teamsContainer.appendChild(column);
  });

  function createTeamButton(team) {
    const button = document.createElement("button");
    button.classList.add("team-button");

    const img = document.createElement("img");
    img.src = team.flag;
    img.alt = `${team.name} Flag`;

    const span = document.createElement("span");
    span.textContent = team.name;

    button.appendChild(img);
    button.appendChild(span);

    button.addEventListener("click", () => {
      showModal(team);
    });
    return button;
  }

  function showModal(team) {
    const modal = document.getElementById("team-modal");
    const modalImage = document.getElementById("modal-team-image");
    modalImage.src = team.flag;
    modalImage.alt = `${team.name} Flag`;

    modal.style.display = "flex";

    const acceptButton = document.getElementById("modal-accept-button");
    const cancelButton = document.getElementById("modal-cancel-button");

    acceptButton.onclick = () => {
      localStorage.setItem("equipoElegido", JSON.stringify(team));
      window.location.href = "juegoEU.html";
    };

    cancelButton.onclick = () => {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    const modal = document.getElementById("team-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
