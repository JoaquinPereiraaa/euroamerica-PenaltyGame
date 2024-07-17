let teams = [];

fetch("../json/teams-america.json")
  .then((response) => response.json())
  .then((data) => {
    teams = data;
    crearBotones();
  })
  .catch((err) => console.error(err));

let teamsContainer = document.getElementById("teams-container");

function crearBotones() {
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
      if (team.flag) {
        const button = createTeamButton(team);
        column.appendChild(button);
      } else {
        console.error(`El equipo ${team.name} no tiene una propiedad 'flag'.`);
      }
    });
    teamsContainer.appendChild(column);
  });
}

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

document.addEventListener("DOMContentLoaded", function () {
  teamsContainer = document.getElementById("teams-container");
});
