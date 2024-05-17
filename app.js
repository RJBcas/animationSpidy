//?
//!
//todo
// obtener el elemento que vamos a manipular
let banner = document.querySelector('.banner');
// Obtener el canvas que se va a manipular.
let canvas = document.getElementById('dotsCanvas');
// se setean el alto y ancho
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
// crear y obtener el contexto
let ctx = canvas.getContext('2d');

// puntos
let dots = [];

const calculateNumberOfDots = () => {
    if (screen.width <= 320) {
        return 20;
    }
    //movil m
    if (screen.width <= 375) {
        return 25;
    }
    //movil L
    if (screen.width <= 425) {
        return 30;
    }
    // Tablet
    if (screen.width <= 768) {
        return 40;
    }
    // Lapto
    if (screen.width <= 1024) {
        return 50;
    }
    // Lapto XL
    if (screen.width > 1024) {
        return 60;
    }
    return 100;
}
const calculateSizeDots = () => {
    {
        // movil s,m l
        if (screen.width <= 320 || screen.width <= 425) {
            return 5;
        }
        // Tablet
        if (screen.width <= 768) {
            return 6;
        }
        // Lapto
        if (screen.width <= 1024) {
            return 7;
        }
        // Lapto XL
        if (screen.width > 1024) {
            return 8;
        }
        return 8;
    }
}
const calculateColors = () => {
    // TODO Validar que estilo tiene la pagina.
    return ['#008DDA', '#41C9E2', '#ACE2E1', '#F7EEDD']

}
// generamos el array de puntos
const generateArrayOfDots = (numberOfDots, size, colorDots) => {
    let arrayOfDots = [];
    for (let index = 0; index < numberOfDots; index++) {
        arrayOfDots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * size,
            color: colorDots[Math.floor(Math.random() * colorDots.length)]
        })
    }
    return arrayOfDots
}
dots = generateArrayOfDots(calculateNumberOfDots(), calculateSizeDots(), calculateColors());
// pintamos los puntos
const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    })
}
drawDots();
// escuchamos el moviento del raton en la pantalla
banner.addEventListener('mousemove', (event) => {
    clearDots()

    //? Obtenemos la posicion del mouse en el eje x, y 
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    }
    //! Importante Magia
    dots.forEach(dot => {
        //* calculamos la distancia entre los puntos y el raton
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        //* si la distancia es menor a la formula, pintamos las lineas
        if (distance < (dots.length * 3)) {
            //? especifica el color de las lineas
            ctx.strokeStyle = dot.color;
            //? especifica el grosor de las lineas
            ctx.lineWidth = 1;
            //? crea o inicia una linea
            ctx.beginPath();
            //? punto de partida de las lineas
            ctx.moveTo(dot.x, dot.y);
            //? punto de llegada de las lineas
            ctx.lineTo(mouse.x, mouse.y);
            //? cierra la linea
            ctx.stroke();
        }
    })
})


banner.addEventListener('mouseout', () => {
    clearDots()
})

const clearDots = () => {
    // Limpiamos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Pintamos los puntos.
    drawDots();
}