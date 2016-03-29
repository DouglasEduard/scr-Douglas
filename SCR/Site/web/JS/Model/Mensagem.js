Ext.define('Mensagem',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'id_mensagem', type: 'int'},                              
                {name: 'id_usuario_origem', type: 'string'},
                {name: 'usuario_origem_nome', type: 'string'},   
                {name: 'empresa_origem_descr', type: 'string'},                                   
                {name: 'id_usuario_destino', type: 'string'},
                {name: 'usuario_destino_nome', type: 'string'},
                {name: 'id_produto', type: 'int'},
                {name: 'dataenvio', type: 'string'},
                {name: 'dataleitura', type: 'string'},
                {name: 'id_assunto', type: 'int'},
                {name: 'assunto', type: 'string'},
                {name: 'id_assunto_descr', type: 'string'},
                {name: 'mensagem', type: 'string'},
                {name: 'id_orcamento', type: 'int'},
                {name: 'aceitarparceria', type: 'string'},
                {name: 'id_empresa_origem', type: 'int'},
                {name: 'id_empresa_destino', type: 'int'}                
        ]                
});        

Ext.define('AtualizaMensagemResult',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Code', type: 'int'},
                {name: 'Msg', type: 'string'}
        ]
});     

Ext.define('AtualizarMensagemStore',{
        extend: 'Ext.data.Store',
        model: 'Mensagem',
        proxy: {
                type: 'ajax',
                url: 'SVL_Mensagem', 
                
                noCache: false,                                                                              
                                  
                actionMethods : {
                    read : 'POST'
                },

                reader: {
                        type: 'json', 
                        root: 'AtualizaMensagemResult'
                },

                writer: {
                        type: 'json', 
                        root: 'Mensagem',
                        writeAllFields: true,
                        encode: true
                }
        }   ,

        autoLoad: false
});


Ext.define('ConsultaMensagemStore',{
        extend: 'Ext.data.Store',
        model: 'Mensagem',
        proxy: {
                extend: 'Ext.data.Store',
                model: 'Mensagem',
                proxy: {
                        type: 'ajax',
                        url: 'SVL_Mensagem', 

                        noCache: false,                                                

                        reader: new Ext.data.JsonReader({
                                type: 'json',
                                root: 'Mensagem'
                        }),                

                        writer: {
                                type: 'json', 
                                root: 'Mensagem',
                                writeAllFields: true,
                                encode: true
                        }
                }   ,

                autoLoad: false
        }   ,

        autoLoad: false
});