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

// Recorrer el array
users.forEach((user) => {
    console.log(user.fullname)
});

// Defino tabla

const tableHTML = document.getElementById("table-container");

/* console.log(tableHTML.innerHTML);
tableHTML.innerHTML = `<h2> Valor modificado desde JS </h2>` */

// users.forEach((user) => {
//     tableHTML.innerHTML += `<div class="bg-dark text-white">${user.fullname}</div>` /* += para poder acumular */
// });

// Obtener body de la tabla
const tableBodyHTML = document.getElementById("table-body");

console.log(tableBodyHTML); /* Corroboro si devuelve la tabla - puedo aplicar console.dir para levantar todas las propiedades */

function renderUsers(arrayUsers){

    tableBodyHTML.innerHTML = ''; //Cada vez que ingresamos a la función limpiamos el body de la tabla y lo regeneramos  segun la búsqueda
    arrayUsers.forEach((user) => {
        tableBodyHTML.innerHTML+=`<tr>
                                        <td>
                                            <img class="user-image" src="${user.image}" alt="${user.fullname} avatar">
                                        </td>
                                        <td class="user-name">${user.fullname}</td>
                                        <td class="user-email">${user.email}</td>
                                        <td class="user-location">${user.location}</td>
                                        <td class="user-actions"></td>
                                  </tr>`
    });
}

renderUsers(users); //La llamo para inicializar la tabla en primera carga.


// onKeyUp
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


