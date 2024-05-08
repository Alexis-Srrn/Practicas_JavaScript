const inputCard = document.querySelector('#inputCard');
const inputDate = document.querySelector('#inputDate');
const inputCVV = document.querySelector('#inputCVV');

//Las máscaras
/* En este caso sabemos que un número de tarjeta puede tener 16 digitos,
 de 4 en 4 separados por un guión.
 La máscara de fecha son dos digitos y dos, separados por un guión.
 Por ultimo el CVV son solo tres digitos.
 En el ejemplo usamos el # pero puede ser cualquier otro simbolo.
*/
const maskNumber = '####-####-####-####';
const maskDate = '##/##';
const maskCVV = '###';


/*
Para que input creamos un arreglo donde vamos almacenar esos valores
Despues esos valores los vamos a transformar antes de mostrarlos
*/
let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];


/*El evento keydown escucha cuando presionamos una tecla.
Lo guardamos en e*/
inputCard.addEventListener("keydown", (e) =>{
    /**Validamos si la tecla presionada es un Tab, si es tab nos salimos de aquí*/
   
    if(e.key == 'Tab'){
        return;
    }
    /**Eliminamos la función nativa de lo que pasaria si presionamos la tecla 
     * Es decir, que no haga nada raro a menos que lo programemos.
    */
    e.preventDefault();
    handleInput(maskNumber, e.key, cardNumber);
    inputCard.value = cardNumber.join("");
});



/**
 * Ahora el inputDate
 */
inputDate.addEventListener("keydown", (e) =>{
    if(e.key == 'Tab'){
        return;
    }
    e.preventDefault();
    handleInput(maskDate, e.key, dateNumber);
    inputDate.value = dateNumber.join("");

});

/**
 * Ahora el CVV
 */
inputCVV.addEventListener("keydown", (e) =>{
    if(e.key == 'Tab'){
        return;
    }
    e.preventDefault();
    handleInput(maskCVV, e.key, cvvNumber);
    inputCVV.value = cvvNumber.join("");

});











function handleInput(mask, key, arr){
    /*Creamos un arreglo con los números.
    Lo usaremos para validar que el usuario pueda agregar solo números
    Si quisieramos que el usuario añada algo más debemos ingresarlo en el arreglo*/
    let numbers = ["0","1","2","3","4","5","6","7","8","9"];

    /*En este if asumimos que el usuario está borrando caracteres del input*/
    if (key == "Backspace" && arr.length > 0){
        arr.pop();
        return;
    }

    /**Verificamos dos cosas
     * Que el key esté incluido dentro del arreglo numbers.
     * Que al sumar una más al arreglo actual siga siendo menor o igual a
     * la longitud de mi maskara prestablecida.
     */
    if(numbers.includes(key) && (arr.length + 1 <= mask.length)){
        /**Comprobamos si el caracter actual de la mascara es igual a un guion o la diagonal */
        if(mask[arr.length] == "-" || mask[arr.length] == "/"){
            /**Agregamos primero lo que hay en la mascara y luego lo que tenemos por teclado */
            arr.push(mask[arr.length], key);
        }else{
            arr.push(key);
        }
    }

}
