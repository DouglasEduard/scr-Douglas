Ext.define('SolicitacaoParceria',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'id_parceria', type: 'int'},                
                {name: 'id_empresa_snte', type: 'int'},                
                {name: 'id_empresa_stda', type: 'int'}                
                
        ]
});        

Ext.define('AtualizaSolicitacaoParceriaResult',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Code', type: 'int'},
                {name: 'Msg', type: 'string'}
        ]
});     

Ext.define('AtualizarSolicitacaoParceriaStore',{
        extend: 'Ext.data.Store',
        model: 'SolicitacaoParceria',
        proxy: {
                type: 'ajax',
                url: 'SVL_SolicitacaoParceria', 
                
                noCache: false,                                                                              
                                  
                actionMethods : {
                    read : 'POST'
                },

                reader: {
                        type: 'json', 
                        root: 'AtualizaSolicitacaoParceriaResult'
                },

                writer: {
                        type: 'json', 
                        root: 'SolicitacaoParceria',
                        writeAllFields: true,
                        encode: true
                }
        }   ,

        autoLoad: false
});


Ext.define('ConsultaSolicitacaoParceriaStore',{
        extend: 'Ext.data.Store',
        model: 'SolicitacaoParceria',
        proxy: {
                extend: 'Ext.data.Store',
                model: 'SolicitacaoParceria',
                proxy: {
                        type: 'ajax',
                        url: 'SVL_SolicitacaoParceria', 

                        noCache: false,                                                

                        reader: new Ext.data.JsonReader({
                                type: 'json',
                                root: 'SolicitacaoParceria'
                        }),                

                        writer: {
                                type: 'json', 
                                root: 'SolicitacaoParceria',
                                writeAllFields: true,
                                encode: true
                        }
                }   ,

                autoLoad: false
        }   ,

        autoLoad: false
});