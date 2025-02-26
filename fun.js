/**
 * @typedef {String[]} TableHeaderData
 * @typedef {{ur:String,esem:String,t:String,esem2:String,t2:String}} RowData
 * @typedef {RowData[]} TableData
 * @typedef {id:String,text:String,errorId:String} FormData 
 */


class T_Table{ //class a table generáláshához
    /**
     * @type {HTMLElement}
     */
    #tbody; // tbody deklarálása

    /**
     * @param {TableData} tcd 
     */
    constructor(tcd = []){ // a table osztáj construktora ebbene az esetben példányosításkor felépítí az alap táblázatot
        const table = document.createElement("table"); // csinálunk egy table html elementet
        document.getElementById("tb").appendChild(table); // belerajkuk az előbb említett elemet a tb idjü divbe

        const thead = document.createElement("thead"); // létrehozunk egy theadet
        table.appendChild(thead);   // belerakjuk a thedünket a tableba
        const tr = document.createElement("tr"); // létrehozunk egy trt
        thead.appendChild(tr); // belerakjuk a theadbe

        this.#rowadder(tr,"Uralkodó",false,true,true); // egy header hozzáadása
        this.#rowadder(tr,"Esemény",false,false,true);// egy header hozzáadása
        this.#rowadder(tr,"Évszám",false,true,true);// egy header hozzáadása
        
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

        this.#rowadder(tr, rowData.ur, multiple, true) // hozzáadunk egy cellát a táblázathoz
        this.#rowadder(tr, rowData.esem,)// hozzáadunk egy cellát a táblázathoz
        this.#rowadder(tr, rowData.t, false,true)// hozzáadunk egy cellát a táblázathoz

        if (multiple){ // akkor fut le ha a beadott objektumunknak van az esem2 kulcshoz adata
            const tr = document.createElement("tr");//létrehozunk egy második tr elemet
            this.#tbody.appendChild(tr); // és belerakjuk a tbodynkba

            this.#rowadder(tr, rowData.esem2) //házzáadunk egy sort az új trhez
            this.#rowadder(tr, rowData.t2,false,true)//házzáadunk egy sort az új trhez
        }
    }


      // túl későn vettem ésre hogy nincsenek elnevezett paraméterek
    /**
     * @param {HTMLElement} tr 
     * @param {String} data 
     * @param {Boolean} rs 
     * @param {Boolean} blue 
     * @param {Boolean} th 
     */
    #rowadder(tr,data,rs = false,blue = false,th = false){ // egy privát metódus ami nek 2 paraméter kell a tr amihez hottá lesz rakja a gyártott td, a td szvege és még kellhet egy opcionális bool flag ami megmodja, hogy 2-re kell e növelni a gyártott td-n a rowspan atributumot
        const elemName = th ? "th" : "td"; // flag stingéalakítása 
        const elem = document.createElement(elemName); // létrehozunk egy td elemet és lementjuk egy td változóban
        tr.appendChild(elem);// majd belerajuk a trünkbe
        elem.innerHTML = data; // beleírjuk a cellánkba a szövegét
        if (rs){ //akkor fut le ha beadott paraméter igaz
            elem.rowSpan = 2;// a td kettő sort forg elfoglalni
        }
        if (blue){ // ha be van állíva a kék    
            elem.classList += "blue"; // akkor hozzáadom a az elemhez a blue classt
        }
    }
}

class F_Form{
    /**
     * @type {HTMLElement}
     */
    #form;
    /**
     * @type {{ur:HTMLElement,esem:HTMLElement,t:HTMLElement,esem2:HTMLElement,t2:HTMLElement}}
     */
    #formCells;
    /**
     * @type {{esem2:HTMLElement,t2:HTMLElement}}
     */
    #formCellsPluss;
    /**
     * @type {{ur:HTMLElement,esem:HTMLElement,t:HTMLElement,esem2:HTMLElement,t2:HTMLElement}}
     */
    #errorps;
    /**
     * @type {HTMLElement}
     */
    #table;
    
    /**
     * @param {FormData} formData
     * @param {T_Table} table
     */
    constructor(formData, table){ //deklarálom a form generáló functiont 
        this.#form = document.createElement("form"); // megszertem a formot
        document.getElementById("form").appendChild(this.#form); //belerakom az új formot a divjébe
        this.#formCells = {}; // inicializálom ezt a privát változót
        this.#formCellsPluss = {};// inicializálom ezt a privát változót
        this.#errorps = {};// inicializálom ezt a privát változót
        this.#table = table;// inicializálom ezt a privát változót

        for (const i of formData){ // végigiterálok a fomDatán és minden iterációban léterhozok hozzá egy uj bevizeli mezőt meg amik kellenek hozzá
            const label = document.createElement("label");//létrehozok egy lable-t 
            this.#form.appendChild(label); //belerakom a formba
            label.innerHTML = i.text; //megadom a lable szvegét
            label.for = i.id; // megadom, hogy mihez tartozik
            this.#brMaker() // és utána linebrakelek

            const input = document.createElement("input"); // létrehozok egy inputot
            this.#form.appendChild(input); //hozzáadom a fomhoz
            input.type = "text"; //megadom a tupusát
            input.id = i.id; // megadom az idjét
            this.#formCells[i.errorId] = input;

            const p = document.createElement("p"); // létrehozok egy p html elementet
            this.#form.appendChild(p);// hozzáadom a formhoz
            p.id = i.errorId; // megadom az idét
            p.classList += "error"; //megadom a classát
            this.#errorps[i.errorId] = p; // eltárolom a errorkiírohelyet az idje alapján

            this.#brMaker() //rakok egy brt 
            this.#brMaker() //rakok egy brt 
        }
        const button = document.createElement("button"); // létrehozok egy buttont
        this.#form.appendChild(button); // belerakom a formba 
        button.innerHTML = "Hozzáadás"; // és megadom a szöveget ami megjelenik rajta

        this.#formCellsPluss["esem2"] = this.#formCells.esem2; //elmentem a cells plusszban a esem2-t a fomcellsből
        delete this.#formCells.esem2; //utána kitörlöm az eredeti helyéről
        this.#formCellsPluss["t2"] = this.#formCells.t2; //elmentem a cells plusszban a t2-t a fomcellsből
        delete this.#formCells.t2;//utána kitörlöm az eredeti helyéről

        this.#form.addEventListener("submit",this.#validacio.bind(this)) // hozzáadok egy eventet a formhoz
    }
    /**
     * @param {void}
     */
    #brMaker(){ // egy function az egyszerűgg brgyártáshoz
        const br = document.createElement("br") //létrehozok egy br-t
        this.#form.appendChild(br); // és belerakom a formba
    }
    
    /**
     * @param {Event} e
     */
    #validacio(e){ //deklarálok egy validávió változót ami tartalmaz egy functiont ami csinálja a validációt
        e.preventDefault(); // megakadájozom az alap történések lefutását
        
        for (const i in this.#errorps){ // végigiterálok az error classu elemeken és kitörlöm a szöveget
            this.#errorps[i].innerHTML = ""; // errorok kitörlése
        }

        let jo = true; // egy változó arra, ha üres az egyik kötelező cella a formban
        for (const i in this.#formCells){ // végigmegyek a kötelező cellákon
            if (this.#formCells[i].value == ""){ //és ha valaelyiknek az értéke egy üres string
                jo = false;// akor a jóságot jelző változót átírom 
                this.#errorps[i].innerHTML = "Ezt a ezőt is ki kell tölteni!" // és kiírom elá, hogy ezt is ki kéne tölteni
            }
        }
        if (this.#formCellsPluss.esem2.value && !this.#formCellsPluss.t2.value){ // ha az esem2 megvan 
            jo = false // ha igen akkor ez már nem jó mert vagy mind a kettő kell vagy semeik
            this.#errorps["t2"].innerHTML = "Ezt a ezőt is ki kell tölteni!"; // akkor a t2 nincs vagyis hiba üzenet kell
        }
        if (this.#formCellsPluss.t2.value && !this.#formCellsPluss.esem2.value){// ha az t2 megvan 
            jo = false // ha igen akkor ez már nem jó mert vagy mind a kettő kell vagy semeik
            this.#errorps["esem2"].innerHTML = "Ezt a ezőt is ki kell tölteni!"; // akkor a esem2 nincs vagyis hiba üzenet kell
        }
    
        if (jo){ // ellenörzöm az hogy jók voltak e az előző értékek
            let data = { // létrehozok egy változót ami tárolja a tábla adatainak a tárolóit
                ur:this.#formCells.ur,//hozzárendelem a kulcshoz a form egyik celláját
                esem:this.#formCells.esem,//hozzárendelem a kulcshoz a form egyik celláját
                t:this.#formCells.t//hozzárendelem a kulcshoz a form egyik celláját
            };
            if (this.#formCellsPluss.esem2.value && this.#formCellsPluss.t2.value){ // ellenörzöm, hogy ki van-e töltve a két opcionális cella és ha igen akkor 
                data.esem2 = this.#formCellsPluss.esem2;//ezt is hozzáadom a data objektumhoz
                data.t2 = this.#formCellsPluss.t2;//ezt is hozzáadom a data objektumhoz
            }
            this.#table.addRow(this.#valuemaker(data)) //végül kiszedem az adatokat a form celláiból kirörlöm a szövegüket, és odaadom az adatokat a sorkészítőnek
        }
    }
    /**
     * @param {{ur:HTMLElement,esem:HTMLElement,t:HTMLElement,esem2:HTMLElement,t2:HTMLElement}} obj 
     * @returns {{ur:HTMLElement,esem:HTMLElement,t:HTMLElement,esem2:HTMLElement,t2:HTMLElement}}
     */
    #valuemaker(obj){ //bevesz egy objektumot, végigmegy az objektumon és elmenti a tagjainak a value atributumát és lenullázza őket.
        let objout = {} // létrehozok egy üres objektumot
        for(const i in obj){ // végigmegyek az objektumon
            objout[i] = obj[i].value; // elmentem az adatokat
            obj[i].value = ""; //  majd kicsereélem őket együres stringre
        }
        return objout; //visszaadom az adatokat
    }
}

