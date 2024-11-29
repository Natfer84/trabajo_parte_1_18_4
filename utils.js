// Importar las funciones necesarias de Firebase Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';  // <-- Aquí
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
//initializeApp: Es una función de la biblioteca de Firebase que se utiliza para inicializar tu aplicación de Firebase.
// Configuración e inicialización de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCQZ_kaAFlYG0QMtVuFBFbY7zyxn6xlg30",
    authDomain: "ejercicio-con-tiempo-26-11.firebaseapp.com",
    projectId: "ejercicio-con-tiempo-26-11",
    storageBucket: "ejercicio-con-tiempo-26-11.firebasestorage.app",
    messagingSenderId: "610766481122",
    appId: "1:610766481122:web:d42e4e5cfe6d42f8fd20bb"
};
//firebaseConfig: Es un objeto con la configuración específica de tu proyecto Firebase (lo que conecta tu app a tu cuenta de Firebase).
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Función para obtener tareas de Firestore
export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "trabajo"));
    querySnapshot.forEach((doc) => {
        createCard(doc.id, doc.data());
    });
}

//Creamos el cuerpo del fomulario donde se ve la NUEVA tarea creada.
function createCard(id, data) {
    const principalDiv = document.createElement('div');
    principalDiv.setAttribute("class", "card bg-light mb-3");
    principalDiv.style = "max-width: 20rem;";
    principalDiv.setAttribute("name", id);

    const headerDiv = document.createElement('div');
    const contentDiv = document.createTextNode("Id: " + id);
    headerDiv.setAttribute("class", "card-header");
    headerDiv.appendChild(contentDiv);
    principalDiv.appendChild(headerDiv);

    const bodyDiv = document.createElement('div');
    const pTitle = document.createElement("p");
    const pTitleText = document.createTextNode("Titulo: " + data.title);
    const hr = document.createElement('hr');
    const pDesc = document.createElement("p");
    const pDescText = document.createTextNode("Description: " + data.description);

    pTitle.appendChild(pTitleText);
    bodyDiv.appendChild(pTitle);
    bodyDiv.appendChild(hr);
    pDesc.appendChild(pDescText);
    bodyDiv.appendChild(pDesc);
    bodyDiv.appendChild(hr);
    
    // Botón de eliminar tarea
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Borrar Tarea";
    deleteButton.setAttribute("name", "delete");
    deleteButton.classList.add("deletess");
    deleteButton.setAttribute("id", id);
    bodyDiv.appendChild(deleteButton);

    // Botón de actualizar tarea
    const updateButton = document.createElement("input");
    updateButton.type = "button";
    updateButton.value = "Actualizar Tarea";
    updateButton.setAttribute("name", "update");
    updateButton.classList.add("updates");
    updateButton.setAttribute("id", id);
    bodyDiv.appendChild(updateButton);

    principalDiv.appendChild(bodyDiv);
    document.body.appendChild(principalDiv);
    const br = document.createElement("br");
    document.body.appendChild(br);

    // Añadir eventos para botones
    deleteButton.addEventListener("click", () => deleteTask(id));
    updateButton.addEventListener("click", () => mostrarFormularioEditar(id, data.title, data.description));
}

// Función para mostrar el formulario de la NUEVA tarea creada
export function mostrarFormularioEditar(id, title, description) {
    document.getElementById("task-titles").value = title;
    document.getElementById("task-descriptions").value = description;
    document.getElementById("contenedorActualizar").style.display = "block";
    const formActualizar = document.getElementById("formActualizarTarea");
    formActualizar.setAttribute("data-id", id);
}


function generateRandomIdTask(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        //Math.random(): Genera un número decimal aleatorio entre 0 y 1.
        //* charactersLength: Escala ese número para estar entre 0 y el total de caracteres
        //Math.floor: Redondea hacia abajo para obtener un índice válido.
    }
    return result;
}

// Función para insertar una nueva tarea en Firestore
export async function insertTask(trabajo) {
    await setDoc(doc(db, "trabajo", generateRandomIdTask(20)), trabajo);
    alert("Insertada la tarea: " + trabajo.title);
}

// Función para eliminar una tarea de Firestore
export async function deleteTask(id) {
    await deleteDoc(doc(db, "trabajo", id));
    alert("Borrada la tarea: " + id);
}

// Función para actualizar una tarea en Firestore
export async function updateTask(id, updatedTask) {
    const taskDoc = doc(db, "trabajo", id);
    try {
        await updateDoc(taskDoc, updatedTask);
        alert("Tarea actualizada con éxito");
    } catch (e) {
        console.error("Error actualizando la tarea: ", e);
    }
}
