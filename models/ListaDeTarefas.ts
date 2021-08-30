import {Tarefa, Prioridades} from "./Tarefa";

export class ListaDeTarefas{

  tarefas:Tarefa[];
  input:HTMLInputElement;
  form:HTMLFormElement;
  tabela:HTMLTableElement;

  constructor(main:HTMLElement) {
    this.input = <HTMLInputElement>main.querySelector("#tf_2do");
    this.form = <HTMLFormElement>main.querySelector("#form");
    this.tabela = <HTMLTableElement>main.querySelector("#table");
    
    // Tentando carregar tarefas no localstorage
    let dados = window.localStorage.getItem("todolist") 
    if (dados == null) {
      window.localStorage.setItem("todolist", "[]");
      this.tarefas = [];
    }else{
      this.tarefas = <Tarefa[]>JSON.parse(dados).map(
      t => {
        let novaTarefa = new Tarefa(t.descricao, t.prioridade);
        novaTarefa.id = t.id;
        return novaTarefa
      })
    }

    this.mostrarTarefas(); 

    this.form.addEventListener('submit', (evento) =>{
      evento.preventDefault();
      this.adicionarTarefa();
  })
}

  removerTarefa(t:Tarefa) {
    this.tarefas.splice(this.tarefas.indexOf(t),1);
    document.getElementById(t.id).remove();
    window.localStorage.setItem("todolist",JSON.stringify(this.tarefas));
  }

  adicionarTarefa() {
    if (this.input.value == "") return;
    let t = new Tarefa (this.input.value, Prioridades.baixa);
    
    this.tarefas.push(t);
    window.localStorage.setItem("todolist",JSON.stringify(this.tarefas));

    let tr = t.toRow()
    tr.querySelector("i").addEventListener("click", () => {
      this.removerTarefa(t);
    })

    this.tabela.appendChild(tr);
    this.input.value = "";  
    console.log(this.tarefas)
}

mostrarTarefas():void {
    this.tabela.innerHTML = "";
    this.tarefas.forEach(
      t => {
        let tr = t.toRow();
        tr.querySelector("i").addEventListener("click", () => {
          this.removerTarefa(t);
        })
        this.tabela.appendChild(tr)
      })
    }

}