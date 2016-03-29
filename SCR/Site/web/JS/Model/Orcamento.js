Ext.define('Orcamento',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'id_orcamento', type: 'int'},                
                {name: 'op', type: 'string'},                
                {name: 'id_usuario_origem', type: 'string'},
                {name: 'usuario_origem_nome', type: 'string'},   
                {name: 'usuario_elaboracao_nome', type: 'string'},                                   
                {name: 'id_usuario_elaboracao', type: 'int'},
                {name: 'id_empresa_origem', type: 'int'},
                {name: 'id_empresa_destino', type: 'int'},
                {name: 'id_produto', type: 'int'},
                {name: 'empresa_origem_descr', type: 'string'},
                {name: 'empresa_destino_descr', type: 'string'},
                {name: 'produto_descr', type: 'string'},
                {name: 'texto_usuario_origem', type: 'string'},
                {name: 'usuario_atual_descr', type: 'string'},
                {name: 'texto_usuario_destino', type: 'string'},                
                {name: 'quantidade_solicitada', type: 'int'},
                {name: 'valorunidade_produto', type: 'number'},
                {name: 'valortotal_produto', type: 'decimal'},
                {name: 'valordesconto_produto', type: 'decimal'},
                {name: 'valordesconto_maoobra', type: 'decimal'},
                {name: 'valorunidade_maoobra', type: 'decimal'},
                {name: 'valortotal_maoobra', type: 'decimal'},                               
                {name: 'valorfrete', type: 'decimal'}
        ]
});        

Ext.define('AtualizaOrcamentoResult',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Code', type: 'int'},
                {name: 'Msg', type: 'string'}
        ]
});     

Ext.define('AtualizarOrcamentoStore',{
        extend: 'Ext.data.Store',
        model: 'Orcamento',
        proxy: {
                type: 'ajax',
                url: 'SVL_Orcamento', 
                
                noCache: false,                                                                              
                                  
                actionMethods : {
                    read : 'POST'
                },

                reader: {
                        type: 'json', 
                        root: 'AtualizaOrcamentoResult'
                },

                writer: {
                        type: 'json', 
                        root: 'Orcamento',
                        writeAllFields: true,
                        encode: true
                }
        }   ,

        autoLoad: false
});


Ext.define('ConsultaOrcamentoStore',{
        extend: 'Ext.data.Store',
        model: 'Orcamento',
        proxy: {
                extend: 'Ext.data.Store',
                model: 'Orcamento',
                proxy: {
                        type: 'ajax',
                        url: 'SVL_Orcamento', 

                        noCache: false,                                                

                        reader: new Ext.data.JsonReader({
                                type: 'json',
                                root: 'Orcamento'
                        }),                

                        writer: {
                                type: 'json', 
                                root: 'Orcamento',
                                writeAllFields: true,
                                encode: true
                        }
                }   ,

                autoLoad: false
        }   ,

        autoLoad: false
});