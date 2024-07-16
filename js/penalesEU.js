// Variables globales
let equipoElegido = JSON.parse(localStorage.getItem("equipoElegido"));
let teams = [];
const marcador = document.querySelector("#marcador");
const botonIzquierdo = document.querySelector("#izquierda");
const botonMedio = document.querySelector("#medio");
const botonDerecha = document.querySelector("#derecha");
const grupoContainer = document.querySelector(".grupo");
let rivalesFaseDeGrupos = [];
let partidosJugados = 0;
const penales = 5;
let resultadoPartido = {};
let goles = 0;
let atajadas = 0;
let penalActual = 0;
let oponente = "";
let puntos = 0;
let fase = ["grupos", "octavos", "cuartos", "semis", "final"];
const texto = document.querySelector(".gol");

// Cargar datos desde el archivo JSON
fetch("../json/teams-eurocopa.json")
  .then((response) => response.json())
  .then((data) => {
    teams = data; // Asignar los datos a la variable teams

    // Obtener el equipo elegido desde el localStorage
    if (equipoElegido) {
      // Filtrar los equipos que pertenecen al mismo grupo que el equipo elegido
      rivalesFaseDeGrupos = teams.filter(
        (team) =>
          team.group === equipoElegido.group && team.name !== equipoElegido.name
      );

      // Mostrar el primer partido
      mostrarGrupo();
      jugarPartido();
    }
  })
  .catch((err) => console.error(err));

function mostrarGrupo() {
  grupoContainer.innerHTML = `<h2>Grupo ${equipoElegido.group}</h2>
    <ul class="listaGrupo">
      <li><img src="${equipoElegido.flag}" height="60px"><strong>${equipoElegido.name}</strong></li>
      <li><img src="${rivalesFaseDeGrupos[0].flag}" height="60px">${rivalesFaseDeGrupos[0].name}</li>
      <li><img src="${rivalesFaseDeGrupos[1].flag}" height="60px">${rivalesFaseDeGrupos[1].name}</li>
      <li><img src="${rivalesFaseDeGrupos[2].flag}" height="60px">${rivalesFaseDeGrupos[2].name}</li>
    </ul>`;
}

function jugarPartido() {
  goles = 0;
  atajadas = 0;
  penalActual = 0;
  oponente = rivalesFaseDeGrupos[partidosJugados].name;
  resultadoPartido = {
    golesUsuario: goles,
    atajadasOponente: atajadas,
    equipoUsuario: equipoElegido,
    equipoRival: oponente,
  };
  marcador.innerHTML = ` FECHA ${partidosJugados + 1} \n ${
    equipoElegido.name
  } ${resultadoPartido.golesUsuario} vs ${oponente} ${
    resultadoPartido.atajadasOponente
  }`;

  // Deshabilitar botones al inicio del partido
  botonDerecha.disabled = true;
  botonIzquierdo.disabled = true;
  botonMedio.disabled = true;

  // Incremento contador de partidos jugados
  partidosJugados++;
  console.log(`Partido número ${partidosJugados} vs ${oponente}`);
}

function patear(direccion) {
  if (penalActual < penales) {
    let resultadoPenal = Math.random();
    let resultado;
    if (resultadoPenal < 0.1) {
      resultado = "afuera";
    } else if (resultadoPenal < 0.15) {
      resultado = "palo";
    } else if (resultadoPenal < 0.35) {
      resultado = "atajada";
    } else {
      switch (direccion) {
        case "derecha":
          resultado = "gol a la derecha";
          break;
        case "izquierda":
          resultado = "gol a la izquierda";
          break;
        case "medio":
          resultado = "gol en el medio";
          break;
        default:
          resultado = "gol en el centro";
          break;
      }
    }
    penalActual++;

    switch (resultado) {
      case "gol a la izquierda":
      case "gol en el medio":
      case "gol a la derecha":
        goles++;
        resultadoPartido.golesUsuario++;
        texto.innerText = "GOOOOOOOLAZOO!";
        break;
      case "atajada":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "ATAJADON!";
        break;
      case "afuera":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "LA MANDÓ A LAS NUBES!!!";
        break;
      case "palo":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "PALOOOOOOOO!!";
        break;
      default:
        alert("Error en el resultado.");
        break;
    }
    // Mostrar el texto por 1 segundo
    setTimeout(() => {
      texto.innerText = "";
    }, 1000);
    marcador.innerHTML = `${equipoElegido.name} ${resultadoPartido.golesUsuario} vs ${oponente} ${resultadoPartido.atajadasOponente}`;

    if (penalActual === penales) {
      // Desactivar botones al finalizar los 5 penales
      botonDerecha.disabled = true;
      botonIzquierdo.disabled = true;
      botonMedio.disabled = true;

      if (goles > atajadas) {
        puntos += 3;
        console.log(`Ganó ${equipoElegido.name}`);
      }
      console.log("Fin del partido");
      setTimeout(() => {
        if (partidosJugados < 3) {
          jugarPartido();
          // Activar botones para el próximo partido
          botonDerecha.disabled = false;
          botonIzquierdo.disabled = false;
          botonMedio.disabled = false;
        } else {
          console.log(`Puntos acumulados: ${puntos}`);
          if (puntos >= 6) {
            let rivalSorteado = sortearRival();
            Swal.fire({
              title: "¡Que Crack!",
              text: `Pasaste a la siguiente Fase junto a ${rivalSorteado.name}. Pronto podrás jugar la fase final!`,
              icon: "success",
              willClose: () => {
                window.location.href = "./jugar.html";
              },
            });
          } else {
            let equiposSorteados = sortearRivales();
            Swal.fire({
              icon: "error",
              title: "¡No me la contes!",
              text: `Quedaste eliminado! Los siguientes equipos pasaron de fase: ${equiposSorteados[0].name} y ${equiposSorteados[1].name}`,
              footer: '<a href="../jugar.html">Volver a Jugar</a>',
              willClose: () => {
                window.location.href = "./jugar.html";
              },
            });
          }
        }
      }, 2000); // Jugar el próximo partido después de 2 segundos de espera
    }
  }
}

function sortearRival() {
  let posiblesRivales = teams.filter(
    (team) => team.group !== equipoElegido.group
  );
  let indiceAleatorio = Math.floor(Math.random() * posiblesRivales.length);
  return posiblesRivales[indiceAleatorio];
}

function sortearRivales() {
  let posiblesRivales = teams.filter(
    (team) => team.group !== equipoElegido.group
  );
  let equiposSorteados = [];
  while (equiposSorteados.length < 2) {
    let indiceAleatorio = Math.floor(Math.random() * posiblesRivales.length);
    let equipoSeleccionado = posiblesRivales.splice(indiceAleatorio, 1)[0];
    equiposSorteados.push(equipoSeleccionado);
  }
  return equiposSorteados;
}

botonDerecha.addEventListener("click", () => patear("derecha"));
botonIzquierdo.addEventListener("click", () => patear("izquierda"));
botonMedio.addEventListener("click", () => patear("medio"));
