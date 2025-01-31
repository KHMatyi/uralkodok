/**
 * @typedef {String[]} TableHeaderData
 * @typedef {{ur:String,esem:String,t:String,esem2:String,t2:String}} RowData
 * @typedef {RowData[]} TableData
 */

const thd = ["Uralkodó","Esemény","Évszám"];
const tcd = [
    {
        ur:"I. István",
        esem:"Koronázás",
        t:"1000",
        esem2:"Pannonhalmi apátság megalapítása ",
        t2:"1001"
    },
    {
        ur:"IV. Béla",
        esem:"tatárjárás",
        t:"1241-1242"
    },
    {
        ur:"Mátyás király",
        esem:"Bécs elfoglalása",
        t:"1485",
        esem2:"Kenyérmezei csata",
        t2:"1479"
    },
    {
        ur:"II. Rákóczi Ferenc",
        esem:"A szabadságharc kezdete",
        t:"1703",
        esem2:"A szabadságharc vége",
        t2:"1711"
    },
];

class T_Table{
    #tbody;

    /**
     * @param {TableHeaderData} thd 
     * @param {TableData} tcd 
     */
    constructor(thd,tcd = []){
        const table = document.createElement("table");
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

const t = new T_Table(thd,tcd);
