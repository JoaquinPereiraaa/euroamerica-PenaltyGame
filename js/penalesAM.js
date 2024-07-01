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
    { name: "Uruguay", flag: "../assets/banderas-america/uruguay.png" },
    { name: "Panama", flag: "../assets/banderas-america/panama.png" },
    { name: "Bolivia", flag: "../assets/banderas-america/bolivia.png" },
    { name: "Brasil", flag: "../assets/banderas-america/brasil.png" },
    { name: "Colombia", flag: "../assets/banderas-america/colombia.png" },
    { name: "Paraguay", flag: "../assets/banderas-america/paraguay.png" },
    { name: "Costa Rica", flag: "../assets/banderas-america/costa-rica.png" },
  ];

  // Variables globales
  let oponentes = [];
  let partidosJugados = 0;
  let rondas = ["fase de grupos", "cuartos de final", "semifinal", "final"];
  let rondaActual = 0;
  let goles = 0;
  let atajadas = 0;
  let penales = 5; // Cantidad de penales que vamos a jugar por partido
  let penalActual = 0;
  let oponente = null; // Variable global para el oponente
  let resultadoPartido = {}; // Variable global para el resultado del partido

  // Obtenemos el equipo elegido por el usuario usando el localStorage y json para poder traer objetos
  let equipoElegido = localStorage.getItem("equipoElegido");
  let equipoElegidoObj = JSON.parse(equipoElegido);
  let equipoUsuario = equipoElegidoObj.name;

  // Obtenemos los botones del arco
  let botonIzquierda = document.querySelector("#izquierda");
  let botonMedio = document.querySelector("#medio");
  let botonDerecha = document.querySelector("#derecha");

  // Obtenemos el texto del marcador
  let marcador = document.querySelector("#marcador");
  let frase = document.querySelector(".gol");
  function sortearOponentes() {
    oponentes = teams.filter((team) => team.name !== equipoElegidoObj.name);
    let random = Math.floor(Math.random() * oponentes.length);
    return oponentes[random];
  }

  function jugarPartido() {
    // Reiniciar el marcador y las variables de resultado
    goles = 0;
    atajadas = 0;
    penalActual = 0;

    oponente = sortearOponentes();
    let equipoRival = oponente.name;
    resultadoPartido = {
      golesUsuario: goles,
      atajadasOponente: atajadas,
      equipoUsuario: equipoUsuario,
      equipoRival: equipoRival,
    };

    // Actualizar marcador en la interfaz
    marcador.innerHTML = ` FECHA ${partidosJugados + 1} \n ${equipoUsuario} ${
      resultadoPartido.golesUsuario
    } vs ${oponente.name} ${resultadoPartido.atajadasOponente}`;
    frase.innerText = "COMENZO EL PARTIDO";
    // Incremento contador de partidos jugados
    partidosJugados++;
    console.log(`Partido número ${partidosJugados} vs ${equipoRival}`);
  }

  function manejarPenal(direccion) {
    if (penalActual >= penales) {
      alert("El partido ha terminado.");
      return;
    }

    // Lógica para simular el resultado del penal dependiendo de la dirección
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
        frase.innerText = `GOOOOOL `;
        break;
      case "atajada":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        frase.innerText = `ATAJADA`;
        break;
      case "afuera":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        frase.innerText = `AFUERAAAAA`;
        break;
      case "palo":
        atajadas++;
        resultadoPartido.atajadasOponente++;
        frase.innerText = `PALOOOOOOO`;
        break;
      default:
        alert("Error en el resultado.");
        break;
    }

    marcador.innerHTML = `${equipoUsuario} ${resultadoPartido.golesUsuario} vs ${oponente.name} ${resultadoPartido.atajadasOponente}`;

    if (penalActual === penales) {
      alert("fin del partido");
      setTimeout(() => {
        jugarPartido();
      }, 2000); // Jugar el prox partido cuando pasen los 2 seg de espera
    }
  }

  // Agregar eventos a los botones
  botonDerecha.addEventListener("click", () => manejarPenal("derecha"));
  botonIzquierda.addEventListener("click", () => manejarPenal("izquierda"));
  botonMedio.addEventListener("click", () => manejarPenal("medio"));

  // Iniciar el primer partido cuando carga la página
  jugarPartido();
});
