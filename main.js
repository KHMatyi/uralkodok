/**
 * @typedef {String[]} TableHeaderData
 * @typedef {{ur:String,esem:String,t:String,esem2:String,t2:String}} RowData
 * @typedef {RowData[]} TableData
 * @typedef {id:String,text:String,errorId:String} FormData
 */

const thd = ["Uralkodó","Esemény","Évszám"]; //A táblázat headerjel elmentve egy listába
const tcd = [   // objektum a listában lévő kezdő adatok tárolására
    {
        ur:"I. István", //egy string hozzákötve egy kulcshoz 
        esem:"Koronázás",//egy string hozzákötve egy kulcshoz 
        t:"1000",//egy string hozzákötve egy kulcshoz 
        esem2:"Pannonhalmi apátság megalapítása ",//egy string hozzákötve egy kulcshoz 
        t2:"1001"//egy string hozzákötve egy kulcshoz 
    },
    {
        ur:"IV. Béla",//egy string hozzákötve egy kulcshoz 
        esem:"tatárjárás",//egy string hozzákötve egy kulcshoz 
        t:"1241-1242"//egy string hozzákötve egy kulcshoz 
    },
    {
        ur:"Mátyás király",//egy string hozzákötve egy kulcshoz 
        esem:"Bécs elfoglalása",//egy string hozzákötve egy kulcshoz 
        t:"1485",//egy string hozzákötve egy kulcshoz 
        esem2:"Kenyérmezei csata",//egy string hozzákötve egy kulcshoz 
        t2:"1479"//egy string hozzákötve egy kulcshoz 
    },
    {
        ur:"II. Rákóczi Ferenc",//egy string hozzákötve egy kulcshoz 
        esem:"A szabadságharc kezdete",//egy string hozzákötve egy kulcshoz 
        t:"1703",//egy string hozzákötve egy kulcshoz 
        esem2:"A szabadságharc vége",//egy string hozzákötve egy kulcshoz 
        t2:"1711"//egy string hozzákötve egy kulcshoz 
    },
];

const formData = [ // tárolja az adatokat a form programatikus létrehozásához
    {
        id:"uralkodo_nev", // házzákötök egy sztinget egy kulcshoz
        text:"Uralkodó neve:",// házzákötök egy sztinget egy kulcshoz
        errorId:"ur"// házzákötök egy sztinget egy kulcshoz
    },
    {
        id:"esemeny1",// házzákötök egy sztinget egy kulcshoz
        text:"Első esemény:",// házzákötök egy sztinget egy kulcshoz
        errorId:"esem"// házzákötök egy sztinget egy kulcshoz
    },
    {
        id:"evszam1",// házzákötök egy sztinget egy kulcshoz
        text:"Első esemény évszáma:",// házzákötök egy sztinget egy kulcshoz
        errorId:"t"// házzákötök egy sztinget egy kulcshoz
    },
    {
        id:"esemeny2",// házzákötök egy sztinget egy kulcshoz
        text:"Második esemény:",// házzákötök egy sztinget egy kulcshoz
        errorId:"esem2"// házzákötök egy sztinget egy kulcshoz
    },
    {
        id:"evszam2",// házzákötök egy sztinget egy kulcshoz
        text:"Második esemény évszáma:",// házzákötök egy sztinget egy kulcshoz
        errorId:"t2"// házzákötök egy sztinget egy kulcshoz
    },
]

formGen(formData); //lefuttatom a formgeneráló functiont 

const t = new T_Table(thd,tcd); // példányosítom a T_Table clast

form.addEventListener("submit",validacio); // hozzáadok egy eventlisenert a function submit eventjére  és még megadom a validáció változót ami tartalmazza a validációs functiont

