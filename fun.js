/**
 * @typedef {String[]} TableHeaderData
 * @typedef {{ur:String,esem:String,t:String,esem2:String,t2:String}} RowData
 * @typedef {RowData[]} TableData
 * @typedef {id:String,text:String,errorId:String} FormData
 */

function validacio(e){ //deklarálok egy validávió változót ami tartalmaz egy functiont ami csinálja a validációt
    e.preventDefault(); // megakadájozom az alap történések lefutását

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

    const valuesítóÉsTörlő = (obj)=> { //bevesz egy objektumot, végigmegy az objektumon és elmenti a tagjainak a value atributumát és lenullázza őket.
        objout = {} // létrehozok egy üres objektumot
        for(const i in obj){ // végigmegyek az objektumon
            objout[i] = obj[i].value; // elmentem az adatokat
            obj[i].value = ""; // lenullázom
        }
        return objout; //visszaadom az adatokat
    }


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
    if ((formCellsPluss.esem2.value && !formCellsPluss.t2.value) || (!formCellsPluss.esem2.value && formCellsPluss.t2.value)){ // ellenörzöm, hogy csak egy opcionális mező ki van e töltve
        jo = false // ha igen akkor ez már nem jó mert vagy mind a kettő kell vagy semeik
        if (formCellsPluss.esem2.value){ // ha az esem2 megvan 
            document.getElementById("t2").innerHTML = "Ezt a ezőt is ki kell tölteni!"; // akkor a t2 nincs vagyis hiba üzenet kell
        }
        if (formCellsPluss.t2.value){// ha az t2 megvan 
            document.getElementById("esem2").innerHTML = "Ezt a ezőt is ki kell tölteni!"; // akkor a esem2 nincs vagyis hiba üzenet kell
        }
    }

    if (jo){ // ellenörzöm az hogy jók voltak e az előző értékek
        let data = { // létrehozok egy változót ami tárolja a tábla adatainak a tárolóit
            ur:formCells.ur,//hozzárendelem a kulcshoz a form egyik celláját
            esem:formCells.esem,//hozzárendelem a kulcshoz a form egyik celláját
            t:formCells.t//hozzárendelem a kulcshoz a form egyik celláját
        };
        if (formCellsPluss.esem2.value && formCellsPluss.t2.value){ // ellenörzöm, hogy ki van-e töltve a két opcionális cella és ha igen akkor 
            data.esem2 = formCellsPluss.esem2;//ezt is hozzáadom a data objektumhoz
            data.t2 = formCellsPluss.t2;//ezt is hozzáadom a data objektumhoz
        }

        t.addRow(valuesítóÉsTörlő(data)) //végül kiszedem az adatokat a form celláiból lenullázom őket, és odaadom az adatokat a sorkészítőnek
    }
}


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


/**
 * @param {FormData[]} formData 
 */
function formGen(formData){ //deklarálom a form generáló functiont 
    const form = document.getElementById("form") // megszertem a formot

    const brMaker = ()=>{ // egy function az egyszerűgg brgyártáshoz
        const br = document.createElement("br")
        form.appendChild(br);
    }

    for (const i of formData){ // végigiterálok a fomDatán és minden iterációban léterhozok hozzá egy uj bevizeli mezőt meg amik kellenek hozzá
        const label = document.createElement("label");//létrehozok egy lable-t 
        form.appendChild(label); //belerakom a formba
        label.innerHTML = i.text; //megadom a lable szvegét
        label.for = i.id; // megadom, hogy mihez tartozik
        brMaker() // és utána linebrakelek

        const input = document.createElement("input"); // létrehozok egy inputot
        form.appendChild(input); //hozzáadom a fomhoz
        input.type = "text"; //megadom a tupusát
        input.id = i.id; // megadom az idjét

        const p = document.createElement("p"); // létrehozok egy p html elementet
        form.appendChild(p);// hozzáadom a formhoz
        p.id = i.errorId; // megadom az idét
        p.classList += "error"; //megadom a classát

        brMaker() //rakok egy brt 
        brMaker() //rakok egy brt 
    }
    const button = document.createElement("button"); // létrehozok egy buttont
    form.appendChild(button); // belerakom a formba 
    button.innerHTML = "Hozzáadás"; // és megadom a szöveget ami megjelenik rajta
}

