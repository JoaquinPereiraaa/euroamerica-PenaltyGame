document.addEventListener("DOMContentLoaded", function () {
  const teams = [
    { name: "Argentina", flag: "../assets/banderas-america/argentina.png" },
    { name: "Peru", flag: "../assets/banderas-america/peru.png" },
    { name: "Chile", flag: "../assets/banderas-america/chile.png" },
    { name: "Canada", flag: "../assets/banderas-america/canada.png" },
    { name: "Mexico", flag: "../assets/banderas-america/mexico.png" },
    { name: "Ecuador", flag: "../assets/banderas-america/ecuador.png" },
    { name: "Venezuela", flag: "../assets/banderas-america/venezuela.png" },
    { name: "Jamaica", flag: "../assets/banderas-america/jamaica.png" },
    { name: "EEUU", flag: "../assets/banderas-america/estados-unidos.png" },
    {
      name: "Uruguay",
      flag: "../assets/banderas-america/uruguay.png",
    },
    { name: "Panama", flag: "../assets/banderas-america/panama.png" },
    { name: "Bolivia", flag: "../assets/banderas-america/bolivia.png" },
    { name: "Brasil", flag: "../assets/banderas-america/brasil.png" },
    { name: "Colombia", flag: "../assets/banderas-america/colombia.png" },
    { name: "Paraguay", flag: "../assets/banderas-america/paraguay.png" },
    { name: "Costa Rica", flag: "../assets/banderas-america/costa-rica.png" },
  ];

  const teamsContainer = document.getElementById("teams-container");

  const grupos = Math.ceil(teams.length / 4);
  const grupoA = teams.slice(0, grupos);
  const grupoB = teams.slice(grupos, grupos * 2);
  const grupoC = teams.slice(grupos * 2, grupos * 3);
  const grupoD = teams.slice(grupos * 3);

  const columns = [grupoA, grupoB, grupoC, grupoD];

  columns.forEach((group) => {
    const column = document.createElement("div");
    column.classList.add("teams-column");
    group.forEach((team) => {
      const button = createTeamButton(team);
      column.appendChild(button);
    });
    teamsContainer.appendChild(column);
  });
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
    window.location.href = "juegoCA.html";
  };

  cancelButton.onclick = () => {
    modal.style.display = "none";
  };
}
