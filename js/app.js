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

      showErrorMessage(message, parentElement);
    } else {
      //si el contenido del input no esta vacío

      //si el input es de email y el email ingresado es invalido
      if (e.target.id === "email" && !validateEmail(e.target.value)) {
        showErrorMessage("El email no es válido", e.target.parentElement);
        return;
      }

      // eliminamos el mensaje de error si existe
      clearErrorMessages(e.target.parentElement);
    }
  }

  function showErrorMessage(message, parentElement) {
    //verifica si ya existe un mensaje de error y si es asi lo elimina
    clearErrorMessages(parentElement);

    //generar el mensaje de error en el HTML
    const errorMessageElement = document.createElement("P");
    errorMessageElement.textContent = message;
    errorMessageElement.classList.add("form__message", "form__message--error");

    //Agregar el mensaje de error dentro del elemento padre del input
    parentElement.appendChild(errorMessageElement);
  }

  function clearErrorMessages(parentElement) {
    // Buscar un mensaje de error dentro del elemento padre
    const errorMessage = parentElement.querySelector(".form__message--error");
    // Verificar si se encontró un mensaje de error
    if (errorMessage) {
      errorMessage.remove(); // Eliminar el mensaje de error
    }
  }

  function validateEmail(email) {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Utilizar el método match para verificar si el correo electrónico ingresado coincide con la expresión regular
    const result = email.match(regex) !== null;

    return result;
  }
}
