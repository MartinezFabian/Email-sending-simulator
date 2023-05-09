document.addEventListener("DOMContentLoaded", () => {
  main(); // Llamada a la función main una vez que el DOM esté cargado
});

function main() {
  //Variables
  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const form = document.querySelector("#form");

  //Functions

  registerEventListeners();

  function registerEventListeners() {
    // el evento blur se dispara cuando el input pierde el foco
    inputEmail.addEventListener("blur", validateInput);

    inputSubject.addEventListener("blur", validateInput);

    inputMessage.addEventListener("blur", validateInput);
  }

  function validateInput(e) {
    // Si el contenido del input después de eliminar los espacios en blanco está vacío
    if (e.target.value.trim() === "") {
      const parentElement = e.target.parentElement; //obtenemos el div padre del input
      let message = "";

      //según el id del input obtenemos el mensaje de error
      switch (e.target.id) {
        case "email":
          message = "El campo email es obligatorio";
          break;
        case "subject":
          message = "El campo asunto es obligatorio";
          break;
        case "message":
          message = "El campo mensaje es obligatorio";
          break;
      }

      showMessageError(message, parentElement);
    } else {
      console.log("El input tiene información");
    }
  }

  function showMessageError(message, parentElement) {
    //comprar si ya existe el mensaje de error en el div padre del input
    const existMessageError = parentElement.querySelector(
      ".form__message--error"
    );

    if (existMessageError) {
      return;
    }

    //generar el mensaje de error en el HTML
    const messageErrorElement = document.createElement("P");
    messageErrorElement.textContent = message;
    messageErrorElement.classList.add("form__message", "form__message--error");

    //Agregar el mensaje de error dentro del elemento padre del input
    parentElement.appendChild(messageErrorElement);
  }
}
