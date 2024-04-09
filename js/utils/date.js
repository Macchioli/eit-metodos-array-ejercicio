

//Función para transformar un timstamp a una string fecha

export function transformTimestampToDate(dateTimeStamp){ //Con "export" las dejo al alcance de otro archivo que las requiera
    // //Debe recibir un valor en timestamp
    // const date = new Date(dateTimeStamp)

    // //Debe devolver una fecha en formato string 01/05/2024
    // let day = date.getDate();
    // if(day<10){
    //     day = "0" + day;
    // }
    // let month = date.getMonth()+1; //Le sumo 1 porque devuelve el mes arrancando por enero = 0
    //                                    //El mes es <10 agregar 0 adelante
    // month = month < 10 ? "0" + month : month;
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`

    //Alternativa 2

    const dateFormat = new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })

    const date = dateFormat.format(dateTimeStamp)

    return date
}
//Función para calcular la edad del usuario a partir del bornDate

export function calculateAge(dateTimeStamp){
    //Calcular la edad del usuario

        // const nowDate = new Date();
        // const nowYear = nowDate.getFullYear();
        // const nowMonth = nowDate.getMonth();
        // const nowDay = nowDate.getDate();

        // const bornDate = new Date(dateTimeStamp);
        // const bornYear = bornDate.getFullYear();
        // const bornMonth = bornDate.getMonth();
        // const bornDay = bornDate.getDate();

        // let age = nowYear - bornYear;

        // if(bornMonth > nowMonth){
        //     age --; //Resto 1 porque si el mes de nacimiento es mayor al mes actual todavia no cumplió.
        //     return age
        // }

        // if(bornMonth === nowMonth && bornDay > nowDay){
        //     age --;
        //     return age
        // }

        // return age;

    //Alternativa 2:

    const now =  new Date().getTime();

    const diff = now - dateTimeStamp;

    const age = parseInt(diff / 1000 /60 / 60 / 24 / 365.25)

    return age;

}