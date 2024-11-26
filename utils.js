
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBEWCLoBsUswfMd1nembSXfMNneFOACfwI",
    authDomain: "ejercicio1---tareas.firebaseapp.com",
    projectId: "ejercicio1---tareas",
    storageBucket: "ejercicio1---tareas.firebasestorage.app",
    messagingSenderId: "428046358801",
    appId: "1:428046358801:web:e7bbf776c919242f7b14b0"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getTasks() {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
        createCard(doc.id, doc.data());
    });
}

function createCard(id, tasks) {
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
    const pTitleText = document.createTextNode("Title: " + tasks.title);
    const hr = document.createElement('hr');
    const pDesc = document.createElement("p");
    const pDescText = document.createTextNode("Description: " + tasks.description);

    pTitle.appendChild(pTitleText);
    bodyDiv.appendChild(pTitle);
    bodyDiv.appendChild(hr);
    pDesc.appendChild(pDescText);
    bodyDiv.appendChild(pDesc);
    bodyDiv.appendChild(hr);

    const input = document.createElement("input");
    
    input.type = "button";
    input.value = "Borrar Tarea";
    input.setAttribute("name", "delete");
    input.setAttribute("id", id);
    bodyDiv.appendChild(input);

    //Botón para actualizar
    const inputModificar = document.createElement("input");
    inputModificar.type = "button";
    inputModificar.value = "Actualizar Tarea";
    inputModificar.setAttribute("name", "update");
    inputModificar.setAttribute("id", id);
    bodyDiv.appendChild(inputModificar);

    principalDiv.appendChild(bodyDiv);
    document.body.appendChild(principalDiv);
    const br = document.createElement("br");
    document.body.appendChild(br);
}

function generateRandomIdTask(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function insertTask(task) {
    await setDoc(doc(db, "tasks", generateRandomIdTask(20)), task);
    alert("Insertada la tarea: " + task.title);
}

export async function deleteTask(id) {
    await deleteDoc(doc(db, "tasks", id));
    alert("Borrada la tarea: " + id);
}