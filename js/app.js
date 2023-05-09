document.addEventListener("DOMContentLoaded", () => {
  main(); // Llamada a la función main una vez que el DOM esté cargado
});

function main() {
  //Variables
  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");

  //Functions

  registerEventListeners();

  function registerEventListeners() {
    // el evento blur se dispara cuando el input pierde el foco
    inputEmail.addEventListener("blur", validateInput);

    inputSubject.addEventListener("blur", validateInput);

    inputMessage.addEventListener("blur", validateInput);
  }

  function validateInput(e) {
    if (e.target.value.trim() === "") {
      // Si el contenido del input después de eliminar los espacios en blanco está vacío
      console.log("El input esta vació");
    } else {
      console.log("El input tiene información");
    }
  }
}
