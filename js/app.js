document.addEventListener("DOMContentLoaded", () => {
  main(); // Llamada a la función main una vez que el DOM esté cargado
});

function main() {
  //Variables
  const inputEmail = document.querySelector("#email");
  const inputSubject = document.querySelector("#subject");
  const inputMessage = document.querySelector("#message");
  const btnSend = document.querySelector("#button-send");
  const btnReset = document.querySelector("#button-reset");
  const form = document.querySelector("#form");

  const emailData = {
    email: "",
    subject: "",
    message: "",
  };

  //Functions

  registerEventListeners();

  function registerEventListeners() {
    // el evento "input" se dispara cuando el valor del input cambia
    inputEmail.addEventListener("input", validateInput);

    inputSubject.addEventListener("input", validateInput);

    inputMessage.addEventListener("input", validateInput);

    btnReset.addEventListener("click", resetForm);
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
      emailData[e.target.name] = ""; // limpiamos el valor del objeto emailData
      checkEmailData();
    } else {
      //si el contenido del input no esta vacío

      //si el input es de email y el email ingresado es invalido
      if (e.target.id === "email" && !validateEmail(e.target.value)) {
        showErrorMessage("El email no es válido", e.target.parentElement);
        emailData[e.target.name] = ""; // limpiamos el valor del objeto emailData
        checkEmailData();
        return;
      }

      // eliminamos el mensaje de error si existe
      clearErrorMessages(e.target.parentElement);

      //el valor de input paso las validaciones entonces asignamos su valor al objeto emailData
      emailData[e.target.name] = e.target.value.trim().toLowerCase();

      checkEmailData();
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

  // Habilita el botón de envío del formulario si todas las propiedades del objeto emailData tienen valores no vacíos
  function checkEmailData() {
    if (Object.values(emailData).includes("")) {
      btnSend.classList.add("form-button--opacity");
      btnSend.disabled = true;
    } else {
      btnSend.classList.remove("form-button--opacity");
      btnSend.disabled = false;
    }
  }

  function resetForm(e) {
    //evitar que se produzca el comportamiento predeterminado
    e.preventDefault();

    //limpiar el objeto emailData
    emailData.email = "";
    emailData.message = "";
    emailData.subject = "";

    //deshabilitar el btnSend
    checkEmailData();

    //limpiar el form
    form.reset();

    //limpiar mensajes de error si existen
    clearErrorMessages(inputEmail.parentElement);
    clearErrorMessages(inputSubject.parentElement);
    clearErrorMessages(inputMessage.parentElement);
  }
}
