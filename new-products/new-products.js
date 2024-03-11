const date = "2024-01-10T00:00:00.000+00:00";

const date1 = date.split('T');
console.log(date1[0]);

let date2 =  new Date();

function dateFormat(){
    const Y = date2.getFullYear();
    const M = String(date2.getMonth() + 1).padStart(2, '0');
    const D = String(date2.getDate()).padStart(2, '0');

    return `${Y}-${M}-${D}`;
}

const finalDate = dateFormat(date2)

console.log(finalDate);