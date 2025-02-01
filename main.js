/**
 * @typedef {String[]} TableHeaderData
 * @typedef {{ur:String,esem:String,t:String,esem2:String,t2:String}} RowData
 * @typedef {RowData[]} TableData
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

class T_Table{ //class a table generáláshához
    /**
     * @type {HTMLElement}
     */
    #tbody; // tbody deklarálása

    /**
     * @param {TableHeaderData} thd 
     * @param {TableData} tcd 
     */
    constructor(thd,tcd = []){ // a table osztáj construktora ebbene az esetben példányosításkor felépítí az alap táblázatot
        const table = document.createElement("table"); // csinálunk egy table html elementet
        document.getElementById("tb").appendChild(table); // belerajkuk az előbb említett elemet a tb idjü divbe

        const thead = document.createElement("thead"); // létrehozunk egy theadet
        table.appendChild(thead);   // belerakjuk a thedünket a tableba
        const tr = document.createElement("tr"); // létrehozunk egy trt
        thead.appendChild(tr); // belerakjuk a theadbe

        for (const i of thd){   // végigiterálunk a table head listánkun
            const th = document.createElement("th"); // létrehozunk egy th elemet
            tr.appendChild(th); // belerakjuk egy trbe 
            th.innerHTML = i; // beleírjuk a header szövegét
        }

        this.#tbody = document.createElement("tbody"); // létrehozunk egy tbody elemet és elmentjük egy privát változóba
        table.appendChild(this.#tbody); // appendeljük a tbodynkat a table be

        for (const i of tcd){   //végigiterálunk a kezdő adatainkon 
            this.addRow(i); //és hozzáadjuk őket soronként a táblázathoz
        }
    }

    /**
     * @param {RowData} rowData
     */
    addRow(rowData){ // publikus metódus solok hozzáadásához egy rowdata paraméterrel
        const tr = document.createElement("tr"); // létrehozunk egy tr elementet    
        this.#tbody.appendChild(tr);// és hozzáadjuk a tbodynkhoz

        const multiple = rowData.esem2 ? true : false; // átalakítjuk az undefindot egy boolá

        this.#rowadder(tr, rowData.ur, multiple) // hozzáadunk egy cellát a táblázathoz
        this.#rowadder(tr, rowData.esem)// hozzáadunk egy cellát a táblázathoz
        this.#rowadder(tr, rowData.t)// hozzáadunk egy cellát a táblázathoz

        if (multiple){ // akkor fut le ha a beadott objektumunknak van az esem2 kulcshoz adata
            const tr = document.createElement("tr");//létrehozunk egy második tr elemet
            this.#tbody.appendChild(tr); // és belerakjuk a tbodynkba

            this.#rowadder(tr, rowData.esem2) //házzáadunk egy sort az új trhez
            this.#rowadder(tr, rowData.t2)//házzáadunk egy sort az új trhez
        }
    }

    /**
     * 
     * @param {HTMLElement} tr 
     * @param {String} data 
     * @param {Boolean} rs 
     */
    #rowadder(tr,data,rs = false){ // egy privát metódus ami nek 2 paraméter kell a tr amihez hottá lesz rakja a gyártott td, a td szvege és még kellhet egy opcionális bool flag ami megmodja, hogy 2-re kell e növelni a gyártott td-n a rowspan atributumot
        const td = document.createElement("td"); // létrehozunk egy td elemet és lementjuk egy td változóban
        tr.appendChild(td);// majd belerajuk a trünkbe
        td.innerHTML = data; // beleírjuk a cellánkba a szövegét
        if (rs) { //akkor fut le ha beadott paraméter igaz
            td.rowSpan = 2;// a td kettő sort forg elfoglalni
        }
    }
}

const form = document.getElementById("form"); // elmentek egy pointert a html elementről
const formCells = { // kötelető cellákat tárolom itt
    ur: document.getElementById("uralkodo_nev"),// elmentek egy pointert a html elementről
    esem: document.getElementById("esemeny1"),// elmentek egy pointert a html elementről
    t: document.getElementById("evszam1"),// elmentek egy pointert a html elementről
};
const formCellsPluss = { //nem kötelető cellákat tárolom itt
    esem2: document.getElementById("esemeny2"),// elmentek egy pointert a html elementről
    t2: document.getElementById("evszam2"),// elmentek egy pointert a html elementről
};

const t = new T_Table(thd,tcd); // példányosítom a T_Table clast

const validáció = (e)=>{ //deklarálok egy validávió változót ami tartalmaz egy functiont ami csinálja a validációt
    e.preventDefault(); // megakadájozom az alap történések lefutását
    for (const i of form.querySelectorAll(".error")){ // végigiterálok az error classu elemeken és lenullázom a szövegüket
        i.innerHTML = ""; // szöveg lenullázás
    }
    let jo = true; // egy változó arra, ha üres az egyik kötelező cella a formban
    for (const i in formCells){ // végigmegyek a kötelező cellákon
        if (formCells[i].value == ""){ //és ha valaelyiknek az értéke egy üres string
            jo = false;// akor a jóságot jelző változót átírom 
            document.getElementById(i).innerHTML = "Ezt a ezőt is ki kell tölteni!" // és kiírom elá, hogy ezt is ki kéne tölteni
        }
    }
    if (jo){ // ellenörzöm az hogy jók voltak e az előző értékek
        let data = { // létrehozok egy változót a tála sorának adatainak tárolására
            ur:formCells.ur.value,//hozzárendelem a kulcshoz a form egyik cellájának értékét
            esem:formCells.esem.value,//hozzárendelem a kulcshoz a form egyik cellájának értékét
            t:formCells.t.value//hozzárendelem a kulcshoz a form egyik cellájának értékét
        };
        if (formCellsPluss.esem2.value && formCellsPluss.t2.value){ // ellenörzöm, hogy ki van-e töltve a két opcionális cella és ha igen akkor 
            data.esem2 = formCellsPluss.esem2.value;//ezt is hozzáadom a data objektumhoz
            data.t2 = formCellsPluss.t2.value;//ezt is hozzáadom a data objektumhoz
        }
        t.addRow(data) //és végül odaadom ezt az objektumot a tábláhozadó metódusnak
    }
}
form.addEventListener("submit",validáció); // hozzáadok egy eventlisenert a function submit eventjére  és még megadom a validáció változót ami tartalmazza a validációs functiont

