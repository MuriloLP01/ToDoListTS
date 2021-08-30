import * as uniqid from "uniqid";

export class Tarefa{
  descricao: string;
  feita: boolean;
  prioridade: Prioridades;
  id: string;

  constructor(descricao:string, prioridade: Prioridades) {
    this.descricao = descricao;
    this.feita = false;
    this.prioridade = prioridade;
    this.id = uniqid();
  }

  imprimir():void{
    console.log(`[${this.feita?"X":" "}] ${this.descricao} [${this.prioridade}]`)
  }

  toRow():HTMLTableRowElement{
    let tr:HTMLTableRowElement = <HTMLTableRowElement>document.createElement('tr');
    tr.setAttribute("id", this.id)
    tr.className = this.feita ? "done" : "";
    tr.innerHTML = `<td>
                        <input type="checkbox" />
                      <td>
                        ${this.descricao}
                      </td>
                      <td>
                        <i class="material-icons">delete</i>
                      </td>`

                      
    let checkbox = tr.querySelector("input");
    checkbox.addEventListener("click",()=>{
      this.feita = checkbox.checked;
      tr.className = this.feita? "done": ""
    })
    return tr  
  }
}

export enum Prioridades {
  alta = 1,
  media = 2,
  baixa = 3
}

