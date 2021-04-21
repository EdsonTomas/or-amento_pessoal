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
    }
function cadastrarDespesas(){
    let ano         = document.getElementById('ano');
    let mes         = document.getElementById('mes');
    let dia         = document.getElementById('dia');
    let tipo        = document.getElementById('tipo');
    let descricao   = document.getElementById('descricao');
    let valor       =     document.getElementById('valor');
    
    let despesa = new Despesa(ano.value, mes.value, dia.value,tipo.value, descricao.value,valor.value);
    let bd = new Bd();
    

    function registroModal(modalHeader, modalTitle,modalBody,btnModal){
        document.getElementById('modal-header').classList.add(modalHeader);
        document.getElementById('modal-title').innerHTML = modalTitle;
        document.getElementById('modal-body').innerHTML =modalBody;
        document.getElementById('btn-modal').classList.add(btnModal); 
    }

    if(despesa.validarDados()){
        registroModal('text-success','Registro inserido com sucesso!','Despesa foi cadastrado com sucesso','btn-success');
        document.getElementById('btn-modal').innerHTML = 'Voltar'
        $('#modalRegistro').modal('show')       
        //bd.gravar(despesa);
    }else{
        registroModal('text-danger','Erro na gravação!','Existem caompos obrigatórios que não foram preenchidos','btn-danger');
        document.getElementById('btn-modal').innerHTML = 'Voltar e corrigir'
        $('#modalRegistro').modal('show');
    }
    
   }