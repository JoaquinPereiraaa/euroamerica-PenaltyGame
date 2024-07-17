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
const texto = document.querySelector(".gol");
const opcionesGol = document.querySelector(".arco");
const puntaje = document.querySelector(".puntaje");

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
      switch (direccion) {
        case "derecha":
          resultado = "fuera derecha";
          break;
        case "izquierda":
          resultado = "fuera izquierda";
          break;
        case "medio":
          resultado = "fuera medio";
          break;
        default:
          resultado = "fuera medio";
          break;
      }
    } else if (resultadoPenal < 0.15) {
      switch (direccion) {
        case "derecha":
          resultado = "palo derecha";
          break;
        case "izquierda":
          resultado = "palo izquierda";
          break;
        case "medio":
          resultado = "palo medio";
          break;
        default:
          resultado = "palo medio";
          break;
      }
    } else if (resultadoPenal < 0.35) {
      switch (direccion) {
        case "derecha":
          resultado = "atajada a la derecha";
          break;
        case "izquierda":
          resultado = "atajada a la izquierda";
          break;
        case "medio":
          resultado = "atajada en el medio";
          break;
        default:
          resultado = "atajada en el medio";
          break;
      }
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
        goles++;
        resultadoPartido.golesUsuario++;
        texto.innerText = "GOOOOOOOLAZOO!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/golIzquierda.jpeg')";
        break;
      case "gol en el medio":
        goles++;
        resultadoPartido.golesUsuario++;
        texto.innerText = "GOOOOOOOLAZOO!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/golMedio.jpeg')";
        break;
      case "gol a la derecha":
        goles++;
        resultadoPartido.golesUsuario++;
        texto.innerText = "GOOOOOOOLAZOO!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/golDerecha.jpeg')";
        break;
      case "atajada a la derecha":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "ATAJADON!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/atajadaDerecha.jpeg')";
        break;
      case "atajada a la izquierda":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "ATAJADON!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/atajadaIzquierda.jpeg')";
        break;
      case "atajada en el medio":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "ATAJADON!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/atajadaMedio.jpeg')";
        break;
      case "fuera medio":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "LA MANDÓ A LAS NUBES!!!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/fueraMedio.jpeg')";
        break;
      case "fuera derecha":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "LA MANDÓ A LAS NUBES!!!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/fueraDerecha.jpeg')";
        break;
      case "fuera izquierda":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "LA MANDÓ A LAS NUBES!!!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/fueraIzquierda.jpeg')";
        break;
      case "palo medio":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "PALOOOOOOOO!!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/paloMedio.jpeg')";
        break;
      case "palo derecha":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "PALOOOOOOOO!!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/paloDerecha.jpeg')";
        break;
      case "palo izquierda":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        texto.innerText = "PALOOOOOOOO!!";
        opcionesGol.style.backgroundImage =
          "url('../assets/img/direccionDisparo/paloIzquierda.jpeg')";
        break;
      default:
        alert("Error en el resultado.");
        break;
    }

    // Mostrar el texto por 1 segundo
    setTimeout(() => {
      texto.innerText = "";
    }, 1000);
    setTimeout(() => {
      opcionesGol.style.backgroundImage = "";
    }, 1000);
    marcador.innerHTML = `${equipoElegido.name} ${resultadoPartido.golesUsuario} vs ${oponente} ${resultadoPartido.atajadasOponente}`;

    if (penalActual === penales) {
      // Desactivar botones al finalizar los 5 penales
      botonDerecha.disabled = true;
      botonIzquierdo.disabled = true;
      botonMedio.disabled = true;

      if (goles > atajadas) {
        puntos += 3;
        puntaje.innerText = `Puntos: ${puntos}`;
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
              footer: '<a href="euro.html">Volver a Jugar</a>',
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
    (team) =>
      team.group === equipoElegido.group && team.name !== equipoElegido.name
  );
  let indiceAleatorio = Math.floor(Math.random() * posiblesRivales.length);
  return posiblesRivales[indiceAleatorio];
}

function sortearRivales() {
  let posiblesRivales = teams.filter(
    (team) =>
      team.group === equipoElegido.group && team.name !== equipoElegido.name
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
