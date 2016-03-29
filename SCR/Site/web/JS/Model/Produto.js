//Modelo para Cadastro de produto
Ext.define('Produto',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'id_produto', type: 'int'},
                {name: 'nomeempresa', type: 'string'},
                {name: 'codigo', type: 'string'},
                {name: 'descricao', type: 'string'},
                {name: 'marca', type: 'string'},                
                {name: 'quantidade_min', type: 'string'},
                {name: 'valor', type: 'decimal'},
                {name: 'id_empresa', type: 'string'}                                
        ]
});        

//Modelo - Resultado obtido da solicitação de cadastro de produto
Ext.define('AtualizaProdutoResult',{
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

Ext.define('AtualizarProdutoStore',{
        extend: 'Ext.data.Store',
        model: 'Produto',
        proxy: {
                type: 'ajax',
                url: 'SVL_Produto', 
                
                noCache: false,                                                                              
                
                //api:{
                //    create: 'SVL_Produto',
                //    read: 'SVL_Produto',
                //    update: 'SVL_Produto',
                //    destroy: 'SVL_Produto'
                //},                
                
                actionMethods : {
                    read : 'POST'
                },

               //  actionMethods: {
               //     create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'
               // },

                reader: {
                        type: 'json', 
                        root: 'AtualizaProdutoResult'
                },

                writer: {
                        type: 'json', 
                        root: 'Produto',
                        writeAllFields: true,
                        encode: true//,
                        //allowSingle: true
                }
        }   ,

        autoLoad: false
});


Ext.define('ConsultaProdutoStore',{
        extend: 'Ext.data.Store',
        model: 'Produto',
        proxy: {
                extend: 'Ext.data.Store',
                model: 'Produto',
                proxy: {
                        type: 'ajax',
                        url: 'SVL_Produto', 

                        noCache: false,                                                

                        reader: new Ext.data.JsonReader({
                                type: 'json',
                                root: 'Produto'
                        }),                

                        writer: {
                                type: 'json', 
                                root: 'Produto',
                                writeAllFields: true,
                                encode: true
                        }
                }   ,

                autoLoad: false
        }   ,

        autoLoad: false
});