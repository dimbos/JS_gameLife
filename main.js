let canvas = document.querySelector('#c1');

let ctx = canvas.getContext('2d');
let mas = [];
let count = 0;
let timer;

canvas.onclick = (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x);
    console.log(y);

    x = Math.floor(x / 10);  //300 / 10 = 30
    y = Math.floor(y / 10); // 300 / 10 = 30
    mas [y] [x] = 1;
    console.log(mas);

    drawFild();   
}

function goLife() {
    let n = 30;
    let m = 30;

    for (let i = 0; i < m; i++){
        mas[i] = [];
        for(let j = 0; j < n; j++){
            mas[i][j] = 0;
        }
    }
}

goLife();

function drawFild() {
    ctx.clearRect(0, 0, 300, 300); //чистка поля

    for (let i = 0; i < 30; i++){
        for(let j = 0; j < 30; j++){
            if(mas[i][j] == 1){
                ctx.fillRect(j * 10, i * 10, 10, 10);
            }
        }
    }
}

function startLife() {
    //моделирование жизни
    let mas2 = [];
    for (let i = 0; i < 30; i++){
        mas2[i] = [];
        for(let j = 0; j < 30; j++){
            let neighbors = 0;
            if(mas[fpm(i) - 1][j] == 1) //проверка ввверх
                neighbors++;
            if(mas[i][fpp(j) + 1]== 1) //проверка справа
                neighbors++;
            if(mas[fpp(i) + 1][j]== 1) //проверка низ
                neighbors++;
            if(mas[i][fpm(j) - 1]== 1)  //проверка слева
                neighbors++;
                    //проверки по диагонали
            if(mas[fpm(i) - 1][fpp(j) + 1] == 1)
                neighbors++;
            if(mas[fpp(i) + 1][fpp(j) + 1] == 1)
                neighbors++;
            if(mas[fpp(i) + 1][fpm(j) - 1] == 1)
                neighbors++;
            if(mas[fpm(i) - 1][fpm(j) - 1] == 1)
                neighbors++;

            (neighbors == 2 || neighbors == 3) ? mas2[i][j] =1 : mas2[i][j] == 0;

            }
        }
        mas = mas2;
        drawFild();
        count++;
        document.querySelector('#count').innerHTML = count;
        timer = setTimeout(startLife, 300);
    }



function fpm(i){
    if(i == 0){
        return 30;
    } else{
        return i;
    }
}


function fpp(i){
    if(i == 29){
        return -1;
    } else{
        return i;
    }
}

document.querySelector('#start').onclick = startLife;