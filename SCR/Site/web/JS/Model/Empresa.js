//Modelo para Cadastro de empresa
Ext.define('Empresa',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'id_empresa', type: 'int'},
                {name: 'codigo', type: 'string'},
                {name: 'tipo', type: 'string'},
                {name: 'nome', type: 'string'},                
                {name: 'nomeFantasia', type: 'string'},
                {name: 'cnpj', type: 'string'},
                {name: 'ie', type: 'string'},
                {name: 'atividade', type: 'string'},
                
                {name: 'contato', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'telefone', type: 'string'},
                                
                {name: 'rua', type: 'string'},
                {name: 'numero', type: 'int'},
                {name: 'bairro', type: 'string'},
                {name: 'cidade', type: 'string'},
                {name: 'estado', type: 'string'},
                {name: 'cep', type: 'string'},
                {name: 'pais', type: 'string'},
                {name: 'complemento', type: 'string'},
                
                {name: 'institucional', type: 'string'}
                
        ]        
});        

//Modelo - Resultado obtido da solicitação de cadastro de empresa
Ext.define('AtualizaEmpresaResult',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Code', type: 'int'},
                {name: 'Msg', type: 'string'}
        ]
});    

Ext.define('rows',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'descr', type: 'string'}
        ]
});

Ext.define('AtualizarEmpresaStore',{
        extend: 'Ext.data.Store',
        model: 'Empresa',
        proxy: {
                type: 'ajax',
                url: 'SVL_Empresa', 
                
                noCache: false,                                                                              
                
                actionMethods : {
                    read : 'POST'
                },

                reader: {
                        type: 'json', 
                        root: 'AtualizaEmpresaResult'
                },

                writer: {
                        type: 'json', 
                        root: 'Empresa',
                        writeAllFields: true,
                        encode: true//,
                        //allowSingle: true
                }
        }   ,

        autoLoad: false
});


Ext.define('ConsultaEmpresaStore',{
        extend: 'Ext.data.Store',
        model: 'Empresa',
        proxy: {
                extend: 'Ext.data.Store',
                model: 'Empresa',
                proxy: {
                        type: 'ajax',
                        url: 'SVL_Empresa', 

                        noCache: false,                                                

                        reader: new Ext.data.JsonReader({
                                type: 'json',
                                root: 'Empresa'
                        }),                

                        writer: {
                                type: 'json', 
                                root: 'Empresa',
                                writeAllFields: true,
                                encode: true
                        }
                }   ,

                autoLoad: false
        }   ,

        autoLoad: false
});


