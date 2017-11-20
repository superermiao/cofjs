export const randomKey=function () {
    let randomkey=(Math.floor(Math.random()*10000) % 8+1).toString();
    for (let i = 0; i < 7; i++) {
        randomkey=randomkey+ (Math.floor(Math.random()*10000) % 10).toString();
    }
    return randomkey;
};