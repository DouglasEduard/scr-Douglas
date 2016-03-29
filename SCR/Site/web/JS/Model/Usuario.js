//Modelo para Cadastro de Usuario
Ext.define('Usuario',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'id_usuario', type: 'int'},
                {name: 'empresa', type: 'string'},
                {name: 'nome', type: 'string'},
                {name: 'email', type: 'string'},
                {name: 'departamento', type: 'string'},
                {name: 'login', type: 'string'},
                {name: 'senha', type: 'string'},                
                {name: 'datacadastro', type: 'date'},
                {name: 'id_empresa', type: 'string'},
                {name: 'cargo', type: 'string'}
        ]
});        

//Modelo - Resultado obtido da solicitação de cadastro de Usuario
Ext.define('AtualizaUsuarioResult',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Code', type: 'int'},
                {name: 'Msg', type: 'string'}
        ]
});     

Ext.define('AtualizarUsuarioStore',{
        extend: 'Ext.data.Store',
        model: 'Usuario',
        proxy: {
                type: 'ajax',
                url: 'SVL_Usuario', 
                
                noCache: false,                                                                              
                                  
                actionMethods : {
                    read : 'POST'
                },

                reader: {
                        type: 'json', 
                        root: 'AtualizaUsuarioResult'
                },

                writer: {
                        type: 'json', 
                        root: 'Usuario',
                        writeAllFields: true,
                        encode: true
                }
        }   ,

        autoLoad: false
});


Ext.define('ConsultaUsuarioStore',{
        extend: 'Ext.data.Store',
        model: 'Usuario',
        proxy: {
                extend: 'Ext.data.Store',
                model: 'Usuario',
                proxy: {
                        type: 'ajax',
                        url: 'SVL_Usuario', 

                        noCache: false,                                                

                        reader: new Ext.data.JsonReader({
                                type: 'json',
                                root: 'Usuario'
                        }),                

                        writer: {
                                type: 'json', 
                                root: 'Usuario',
                                writeAllFields: true,
                                encode: true
                        }
                }   ,

                autoLoad: false
        }   ,

        autoLoad: false
});