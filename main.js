//inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false; 
let timer =120;
let timerInicial =120;
let tiempoRegresivoId = null ;

let clickAudio = new Audio('./sounds/click.mp3');
let loseAudio = new Audio('./sounds/lose.mp3');
let popAudio = new Audio('./sounds/pop.mp3');
let winAudio = new Audio('./sounds/win.mp3');

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo-restante');

// generar arreglo de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//functions
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer==0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000);
}

//funcion que recorre las 16 tarjetas, bloquearlas y mostrar su numero
function bloquearTarjetas(){
    for(let i = 0; i<=29; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./images/card_images/${numeros[i]}.png" alt="" >` ;
        tarjetaBloqueada.disabled = true;
    }
} 

// funcion principal destapar 
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas)

    if(tarjetasDestapadas ==1){
        //Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./images/card_images/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //Deshabilitar primer boton
        tarjeta1.disabled = true;
    }else if(tarjetasDestapadas ==2){
        //mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./images/card_images/${segundoResultado}.png" alt="">`;
        clickAudio.play();

        //Deshabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado){
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            popAudio.play();

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 15){
                clearInterval(tiempoRegresivoId);
                winAudio.play();
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`
                mostrarTiempo.innerHTML = `¡Fantastico 🎉 Sólo demoraste ${timerInicial - timer} segundos!`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😲👍`
            }
        }else{
            //Mostrar momentaneamente valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
        },500);
        }
    }
}

