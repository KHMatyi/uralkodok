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
        const table = document.createElement("table"); // 
        document.getElementById("tb").appendChild(table);

        const thead = document.createElement("thead");
        table.appendChild(thead);
        const tr = document.createElement("tr");
        thead.appendChild(tr);

        for (const i of thd){
            const th = document.createElement("th");
            tr.appendChild(th);
            th.innerHTML = i;
        }

        this.#tbody = document.createElement("tbody");
        table.appendChild(this.#tbody);

        for (const i of tcd){
            this.addRow(i);
        }
    }

    /**
     * @param {RowData} rowData
     */
    addRow(rowData){
        const tr = document.createElement("tr");
        this.#tbody.appendChild(tr);

        const multiple = rowData.esem2 ? true : false;

        this.#rowadder(tr, rowData.ur, multiple)
        this.#rowadder(tr, rowData.esem)
        this.#rowadder(tr, rowData.t)

        if (multiple){
            const tr = document.createElement("tr");
            this.#tbody.appendChild(tr);

            this.#rowadder(tr, rowData.esem2)
            this.#rowadder(tr, rowData.t2)
        }
    }

    /**
     * 
     * @param {HTMLElement} tr 
     * @param {String} data 
     * @param {Boolean} rs 
     */
    #rowadder(tr,data,rs = false){
        const td = document.createElement("td");
        tr.appendChild(td);
        td.innerHTML = data;
        if (rs) {
            td.rowSpan = 2;
        }
    }
}

const form = document.getElementById("form");
const formCells = {
    ur: document.getElementById("uralkodo_nev"),
    esem: document.getElementById("esemeny1"),
    t: document.getElementById("evszam1"),
};
const formCellsPluss = {
    esem2: document.getElementById("esemeny2"),
    t2: document.getElementById("evszam2"),
};

const t = new T_Table(thd,tcd);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    for (const i of form.querySelectorAll(".error")){
        i.innerHTML = "";
    }
    let jo = true;
    for (const i in formCells){
        if (formCells[i].value == ""){
            jo = false;
            document.getElementById(i).innerHTML = "Ezt a ezőt is ki kell tölteni!"
        }
    }
    if (jo){
        let data = {
            ur:formCells.ur.value,
            esem:formCells.esem.value,
            t:formCells.t.value
        };
        if (formCellsPluss.esem2.value && formCellsPluss.t2.value){
            data.esem2 = formCellsPluss.esem2.value;
            data.t2 = formCellsPluss.t2.value;
        }
        t.addRow(data)
    }
});

