import { transformTimestampToDate, calculateAge } from "./utils/date.js"; //Importo solo las funciones que necesito para este script para mejorar performance // Puedo usar por ejemplo: "calculateAge as A" y opero dentro de este script a la funcion como "A"

import transformToUpperCase from "./utils/text.js"; //Ya que agregue export default no hace falta aplicar con llave ya que viene directamente, con llave es porque hemos 

const users = [{
    fullname: 'John Doe',
    age: 30,
    email: 'admin@admin.com',
    id: '1',
    active: true,
    password: 'admin',
    bornDate: 725846400000,
    location: 'La Luna',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280',
    role: 'ADMIN_ROLE'
  },
  {
    fullname: 'Jane Doe',
    age: 25,
    email: 'jane.doe@example.com',
    id: '2',
    active: false,
    password: 'password456',
    bornDate: new Date('1998-05-05').getTime(),
    location: 'Mendoza',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280',
    role: 'CLIENT_ROLE'
  },
  {
    fullname: 'Alice Johnson',
    age: 35,
    email: 'alice.johnson@example.com',
    id: '3',
    active: true,
    password: 'password789',
    bornDate: new Date('1988-08-08').getTime(),
    location: 'Mendoza',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
  },
  {
    fullname: 'Michael Smith',
    age: 40,
    email: 'michael.smith@example.com',
    id: '4',
    active: false,
    password: 'password101',
    bornDate: new Date('1983-04-10').getTime(),
    location: 'San Luis',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
  },
  {
    fullname: 'Emily Johnson',
    age: 28,
    email: 'emily.johnson@example.com',
    id: '5',
    active: true,
    password: 'password202',
    bornDate: new Date('1995-02-15').getTime(),
    location: 'Córdoba',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
  },
  {
    fullname: 'Daniel Lee',
    age: 34,
    email: 'daniel.lee@example.com',
    id: '6',
    active: false,
    password: 'password303',
    bornDate: new Date('1989-07-07').getTime(),
    location: 'Buenos Aires',
    image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
  },
];

//Guardo en el local storage el array de usuarios
localStorage.setItem("usuarios", JSON.stringify(users))

// Recorrer el array
users.forEach((user) => {
    console.log(user.fullname)
});

// Defino tabla

const tableHTML = document.getElementById("table-container");
const userFormHTML = document.querySelector("#user-form"); /* Obtengo el formulario html */

// Obtengo los botones /Defino y luego de que pintamos la tabla obtenemos los botones con el atributo data-edit
let userButtonsEdit;

//Obtenemos input search y escuchamos el evento keyup para llamar a la funcion input search
const inputSearchHTML = document.getElementById("user-search");
inputSearchHTML.addEventListener("keyup", inputSearch) //Llama a la funcion input search y pasa todo el evento en este caso "keyup" alternativa ("keyup" (evt) => inputSearch(evt))

//Defino variable global como bandera
let isEditing;

//Obtengo el boton submit para cambiar sus estilos y el texto del boton
const btnSubmitHTML = document.querySelector("button[type='submit']") //alternativa solo recorrer el userFormHTML.queryselector...
const formContainerHTML = document.querySelector(".user-form-container")
//console.log(btnSubmitHTML)//imprimo para corroborar que lo obtengo


userFormHTML.addEventListener("submit", (evento) =>{ /* Recibo "evento" que me envia el submit o cualquier otro evento que quiera disparar */
    evento.preventDefault() /* Lo que hago con esto es prevenir el comportamiento que tiene por defecto el formulario de enviarse y recargarse */
    
    const el = evento.target.elements /* Obtengo el valor del target del evento y todos sus elementos los guardo en una variable a la cual puedo acceder */
    
    if(el["password-repeat"].value !== el.password.value){
        Swal.fire("Error", "Las contraseñas no coinciden", "warning")
        return
    } /* Catcheo error de coincidencia de contraseña */
    /* let id;
    if(isEditing){
        id = isEditing;
    }else{
        id = crypto.randomUUID()
    } */ //alternativa en id aqui debajo: 
    const nuevoUsuario ={
        id: isEditing ? isEditing : crypto.randomUUID(), /* Simulamos un ID con este metodo. Valor ternario */
        fullname: el.fullname.value,
        email: el.email.value,
        password: el.password.value,
        location: el.location.value,
        image: el.image.value,
        bornDate: new Date(el.bornDate.value).getTime(), /* Lo transformo en un timestamp que es lo que voy a guardar */
        active: el.active.checked /* No tomamos el value en checkbox sino checked para tomar true/false */
        // numero: +el.numero.value /* Ejemplo de valor numerico para que no lo convierta a string le ponemos un + adelante */
    }

    console.log(nuevoUsuario)

    //Debo establecer un condicional para saber si tengo que pushear un elemento al array (nuevo usuario) o si estoy editando y tengo que buscar un usuario y reemplazarlo

    if(isEditing){
        //Buscar un usuario y reemplazarlo
        const userIndex = users.findIndex(user =>{
            return user.id === isEditing;
        })
        users[userIndex] = nuevoUsuario

    }else{
        //Agregar un usuario ya que es un user nuevo
        users.push(nuevoUsuario)
    }

    renderUsers(users);

    //Formateamos el formulario
    isEditing = null;
    formContainerHTML.classList.remove('form-edit')

    btnSubmitHTML.classList.add('btn-primary')
    btnSubmitHTML.classList.remove('btn-success')
    btnSubmitHTML.innerText = "Agregar";

    // Limpiamos el formulario
    userFormHTML.reset();

    // Hacemos foco en el primer input
    el.fullname.focus();

    // console.log(el.fullname.value)
    // console.log(el.email.value)
    // console.log(el.password.value)
    // console.log(el["password-repeat"].value) /* Accedo de esta manera ya que el " - " no lo interpreta */
    // console.log(el.bornDate.value)
    // console.log(el.location.value)
    // console.log(el.image.value)
    // console.log(el.active.value)
}) /* Lo ponemos al elemento html a escucharlo: espera (evento, funcion) (el evento que antes era onClick ahora "click" solo en JS) */


/* console.log(tableHTML.innerHTML);
tableHTML.innerHTML = `<h2> Valor modificado desde JS </h2>` */

// users.forEach((user) => {
//     tableHTML.innerHTML += `<div class="bg-dark text-white">${user.fullname}</div>` /* += para poder acumular */
// });

// Obtener body de la tabla
const tableBodyHTML = document.getElementById("table-body");

//Obtener total
const totalHTML = document.getElementById('total');

console.log(tableBodyHTML); /* Corroboro si devuelve la tabla - puedo aplicar console.dir para levantar todas las propiedades */

function renderUsers(arrayUsers){

    tableBodyHTML.innerHTML = ''; //Cada vez que ingresamos a la función limpiamos el body de la tabla y lo regeneramos  segun la búsqueda
    //Defino una variable total
    let total = 0;

    arrayUsers.forEach((user) => {
        //Acumulo edades
        total += user.age;
        
        tableBodyHTML.innerHTML+=`<tr>
                                        <td>
                                            <img class="user-image" src="${user.image}" alt="${user.fullname} avatar">
                                        </td>
                                        <td class="user-name">${user.fullname}</td>
                                        <td class="user-email">${user.email}</td>
                                        <td class="user-location">${user.location}</td>
                                        <td class="user-date">${transformTimestampToDate(user.bornDate)} <br> <small>${calculateAge(user.bornDate)}</small></td>
                                        <td class="user-actions">
                                            <button class="btn btn-danger btn-sm" data-delete="${user.id}"> <i class="fa-solid fa-trash"></i></button>
                                            <button class="btn btn-primary btn-sm" data-edit="${user.id}"><i class="fa-solid fa-pencil"></i></button>
                                        </td>
                                  </tr>` /* El ${user.id} lo encierro entre '' para pasarlo a string y que no lo trate como numero */
    });

    totalHTML.innerText = `$ ${total} ` /* Sumatoria de edades. */
    updateEditButtons(); //Llamo a la funcion
    updateDeleteButtons();
} //Fin de renderUsers

function updateEditButtons(){
    userButtonsEdit = document.querySelectorAll('button[data-edit]') /* Adquiero todos los que tienen este atributo que pongo entre corchetes [] */ 
    //console.log(userButtonsEdit) //Veo los botones obtenidos que tienen ciertos métodos y propiedades

    userButtonsEdit.forEach((btn) =>{ //Recorro y obtengo todos los botones
        //console.log(btn) 
        btn.addEventListener('click', (evt) =>{
            //console.log(evt.currentTarget) //Le agrego a todos los botones el evento de escuchar el 'click' y dispara una funcion flecha que recibe el evento y muestra el target por el console log

            const id = evt.currentTarget.dataset.edit //Saco el id del boton que se haya clickeado y por medio del "dataset" la propiedad edit "([data-edit])" sin el data- / Uso currentTarget para que tome donde hago click y no los hijos (el lapiz font awesome por ejemplo)

            console.log(id) //Imprimo para corroborar

            completeUserForm(id);
        }) 
    }) 
}

function updateDeleteButtons(){
    //Obtengo todos los botones "borrar" de la lista de usuarios
    const userButtonsDelete = document.querySelectorAll('button[data-delete]'); //Adquiero todos los que tienen este atributo que pongo entre corchetes[]
    //Por cada boton obtenido itero para agregar un listener del evento click en cada uno
    userButtonsDelete.forEach((btn) =>{
        btn.addEventListener('click', (evt)=>{
            //Cuando se haga click en un boton especifico, tomo el valor del atributo data-delete para obtener el id
            const id = evt.currentTarget.dataset.delete;
            //Llamo a la funcion deleteUser y le envio el id
            deleteUser(id);
        })
    })
}


function completeUserForm(idUser){
    console.log(`Complete Form ${idUser}`)
    
    isEditing = idUser; // Si estoy editando le doy a la variable el valor id del usuario
    //Buscar el usuario y obtenerlo
    const user = users.find((usr) =>{
        if(usr.id === idUser){
            return true
        }
        return false
    })
    //Considero en caso de no haber obtenido un usuario
    if(!user){
        Swal.fire("Error", "No se encontro usuario")
        return
    }
    //Rellenar el formulario con los datos de este usuario
    const el = userFormHTML.elements;

    el.fullname.value = user.fullname;
    el.email.value = user.email;
    el.password.value = user.password;
    el["password-repeat"].value = user.password;
    el.location.value = user.location;
    el.image.value = user.image;
    el.active.checked = user.active;
    el.bornDate.valueAsNumber = user.bornDate




    formContainerHTML.classList.add('form-edit')

    btnSubmitHTML.classList.remove('btn-primary')
    btnSubmitHTML.classList.add('btn-success')
    btnSubmitHTML.innerText = "Editar";

}

renderUsers(users); //La llamo para inicializar la tabla en primera carga.

// Delete User
function deleteUser(idUser){
    console.log(`Funciona el delete al user ${idUser}` )

    // Debería buscar el indice de ese elemento en el array
    const indice = users.findIndex((usr) =>{
        //Chequeo cuando el idUser coincide con el id de mi usr.
        if(idUser === usr.id){
            return true;
        }
    })
    // Contemplar si no existe el usuario
    if(indice < 0){
        // alert("El usuario no se encontró")
        // Swal.fire("Error!", "No se encontró el usuario", "error")
        Swal.fire({
            title: "Error!",
            text:"No se encontró el usuario",
            icon:"error",
            timer: 3000
        })
        return
    }
    // Debería eliminar el elemento del array
    users.splice(indice, 1)
    // Debería volver a píntar la tabla
    renderUsers(users)

}

// onKeyUp - Filter
function inputSearch(parametro){
    // console.log(parametro) /* Imprimo en consola para ver que recibo */
    console.log(parametro.target.value); /* Obtengo el target que es el contenido entero del input */

    //Tomar lo que la persona ha escrito en el input
    const search = parametro.target.value.toLowerCase();
    //Luego deberiamos recorrer el array y filtrar por todos aquellos usuarios cuyo nombre coincidan con la búsqueda
    const filteredUsers = users.filter((usr) => {
        //Filter para devolver un usuario yo tengo que asegurarme de retornar un true bajo cierta condicion
        if(usr.fullname.toLowerCase().includes(search)){
            return true;
        }
        return false;
    })
    //Pintamos nuevamente la tabla, solo que ahora con los resultados que quedaron en el filtro
    console.log(filteredUsers) //Imprimo consola para chequear filtrados
    renderUsers(filteredUsers);
}

// Ordenar
//Obtengo los elementos con ID Asc y Desc del html y escucho su click para llamar a la funciones correspondientes
document.getElementById("sortAsc").addEventListener("click", sortAsc)
document.getElementById("sortDesc").addEventListener("click", sortDesc)


function sortAsc(){
    users.sort((a,b)=>{
        if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){
            return 1;
        }
        if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){
            return -1;
        }
        return 0;
    })    
    renderUsers(users);
}

function sortDesc(){

    //? Metodo alternativo con API:  const collator = new Intl.Collator(undefined, {sensitivity: 'base'}) /* Llamo a API + nueva */

    // console.log('Se llamó a funcion ordenar descendente') //Corroboro que llamo bien a la funcion
    users.sort((a,b)=>{

        //? Metodo Alternativo: return collator.compare(b.fullname, a.fullname); /* Alternativa utilizando API Internacionalización de JS */        

        if(a.fullname.toLowerCase() < b.fullname.toLowerCase()){
            return 1;
        }
        if(a.fullname.toLowerCase() > b.fullname.toLowerCase()){
            return -1;
        }
        return 0;
    })    
    renderUsers(users);
}




