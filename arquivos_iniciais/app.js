class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor
    }
    validarDados(){
        for (let i in this) {
           if(this[i] == '' || this[i] == undefined || this[i] == null ){
               return false;
           }
        }
        return true;
    }
}
class Bd{
       constructor(){
           let id = localStorage.getItem('id');
           if(id === null){
               localStorage.setItem('id',0);
           }
       }
       getProximoId(){
           let proximoId = localStorage.getItem('id');
           return parseInt(proximoId) + 1 
       }
       gravar(d){
           let id = this.getProximoId();
           localStorage.setItem(id, JSON.stringify(d))
           localStorage.setItem('id',id);
       }
       recuperarTodosRegistros(){
           let id = localStorage.getItem('id');
           let despesas = Array();
            for(let i = 1; i<=id;i++){
                if(localStorage.getItem(i) === null){
                    continue;
                }
                despesas.push(JSON.parse(localStorage.getItem(i)));
            }
            return despesas;
       }
    }
    let bd = new Bd();
    function registroModal(modalHeader, modalTitle,modalBody,btnModal){
        document.getElementById('modal-header').classList.add(modalHeader);
        document.getElementById('modal-title').innerHTML = modalTitle;
        document.getElementById('modal-body').innerHTML =modalBody;
        document.getElementById('btn-modal').classList.add(btnModal); 
    }
    function limparCampo(){
        document.getElementById('ano').value = '';
        document.getElementById('mes').value = '';
        document.getElementById('dia').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('valor').value = '';
    }
    function cadastrarDespesas(){
    let ano         = document.getElementById('ano');
    let mes         = document.getElementById('mes');
    let dia         = document.getElementById('dia');
    let tipo        = document.getElementById('tipo');
    let descricao   = document.getElementById('descricao');
    let valor       = document.getElementById('valor');
    
    let despesa = new Despesa(ano.value, mes.value, dia.value,tipo.value, descricao.value,valor.value);


    if(despesa.validarDados()){
        if(document.getElementById('modal-header').classList.contains('text-danger') || document.getElementById('btn-modal').classList.contains('btn-danger')){
            document.getElementById('modal-header').classList.remove('text-danger');
            document.getElementById('btn-modal').classList.remove('btn-danger');
        }
        registroModal('text-success','Registro inserido com sucesso!','Despesa foi cadastrado com sucesso','btn-success');
        document.getElementById('btn-modal').innerHTML = 'Voltar'
        $('#modalRegistro').modal('show')       
        bd.gravar(despesa);
        limparCampo();
    }else{
        registroModal('text-danger','Erro na gravação!','Existem campos obrigatórios que não foram preenchidos','btn-danger');
        document.getElementById('btn-modal').innerHTML = 'Voltar e corrigir'
        $('#modalRegistro').modal('show');
    }
    
   }

   function carregarListaDespesas(){
        let despesas = Array();
            despesas = bd.recuperarTodosRegistros();
        let tbody = document.getElementById('listaDespesas');
       
        despesas.forEach(despesa=>{
            let row = tbody.insertRow(0)
            row.insertCell(0).innerHTML = `${despesa.dia}-${despesa.mes}-${despesa.ano}`;
            switch(despesa.tipo){
                case '1':
                    despesa.tipo = 'Alimentação';
                    break;
                case '2':
                    despesa.tipo = 'Educação';
                    break;
                case '3':
                    despesa.tipo = 'Lazer';
                    break;
                case '4':
                    despesa.tipo = 'Saúde';
                    break;
                case '5':
                    despesa.tipo = 'Transporte';                
            }
            row.insertCell(1).innerHTML = despesa.tipo;
            row.insertCell(2).innerHTML = despesa.descricao;
            row.insertCell(3).innerHTML = despesa.valor;
            console.log(despesa);
    
        })
   }