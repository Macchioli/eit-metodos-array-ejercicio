const formHTML = document.querySelector("#login")
//En el localstorage tenemos la lista de usuarios
console.log(formHTML)

//Leer el LocalStorage para tener los users y guardarlos en una variable
let users = JSON.parse(localStorage.getItem("usuarios"))
console.log(users)
//Tomar los datos del formulario

formHTML.addEventListener("submit", (evt)=>{
    evt.preventDefault();

    const el = evt.target
    const emailInput = el.email.value;
    const passwordInput = el.password.value;

    //Recorrer el array de ususarios si existe un user con el email que tomamos el input (find)
    const user = users.find((usr)=>{
        if(usr.email.toLowerCase() === emailInput.toLowerCase()){
            return true;
        } //Alternativa : users.find(usr) => usr.email === emailInput
    })


    //❌ Si no encontré usuario o el password es incorrecto indicar mediante algun mensaje que algo no salió bien
    if(!user || user.password !== passwordInput){
        Swal.fire({
            title:"Error al ingresar",
            text: "Algunos de los datos no son correctos",
            icon: error
        })
        return
    }

    // ✅ Verificamos que el pass del usuario sea igual al del user que encontramos por find
    //Indicar que el login fue correcto
    Swal.fire({
        title: "Login correcto",
        text: "Será redireccionado en unos instantes",
        icon: "success"
    })


    //Redirigir al usuario al home
    setTimeout(() => {
        window.location.href="/"
    }, 2000); //Lo enviamos al index (carpeta raiz /) luego de 2 segundos


    //Guardar el usuario en el localStorage con la key currentUser
    user.password = undefined;
    localStorage.setItem("user", JSON.stringify(user))

})

// const userForm = document.getElementById("login")
// function login(usuarioEncontrado){
        
//         console.log(usuarioEncontrado)
//        /*  if(usuarioEncontrado){
//             if(usuarioEncontrado.password)
//         }
//          */

    
// }

// function evtSubmit(){
//         userForm.addEventListener("submit", (evt)=>{
//         evt.preventDefault();
//         console.log(evt.target.email.value)

//         const usuarioEncontrado = users.find((usr)=>{
//             if(usr.email === evt.target.email){
//                 return true;
//             }
//         })
//     })
//     login(usuarioEncontrado);
// }

//Escuchar el evento submit

//Verificar el usuario






