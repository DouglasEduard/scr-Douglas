Ext.require([
            'Ext.form.*',
            'Ext.window.Window'
        ]);
        
Ext.define('DadosLogin',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Login', type: 'string'},
                {name: 'Senha', type: 'string'}
        ]
});        

Ext.define('DadosLoginResult',{
        extend: 'Ext.data.Model',

        fields: [
                {name: 'id', type: 'int'},
                {name: 'Code', type: 'int'},
                {name: 'Msg', type: 'string'}
        ]
});     

Ext.define('LoginStore',{
        extend: 'Ext.data.Store',
        model: 'DadosLogin',
        proxy: {
                type: 'ajax',

                url: 'SVL_Login', //todas op CRUD!!!

                //qqapi:{
                //    create: 'SVL_Login',
                //    read: 'SVL_Login',
                //    update: 'SVL_Login',
                //    destroy: 'SVL_Login'
                //},

                reader: {
                        type: 'json', //json ou xml
                        root: 'DadosLoginResult'

                },

                writer: {
                        type: 'json', //json ou xml
                        root: 'DadosLogin',
                        writeAllFields: true,
                        encode: true,
                        allowSingle: true
                }
        },

        autoLoad: true//,

        //autoSync: true
})        


Ext.onReady(function() {
    var form = Ext.create('Ext.form.Panel', {
        border: false,
        fieldDefaults: {
            labelWidth: 55
        },
        url: 'SVL_Login',
        defaultType: 'textfield',
        action: 'LoginStore',
        bodyPadding: 5,

        items: [{
            fieldLabel: 'Usuário',
            name: 'login',                    
            anchor:'100%'  // anchor width by percentage
        },{
            fieldLabel: 'senha',                    
            name: 'password',
            anchor: '100%'  // anchor width by percentage
        }]
    });

    var win = Ext.create('Ext.window.Window', {
        title: 'SCR System',
        width: 300,
        height:150,
        minWidth: 300,
        minHeight: 130,
        layout: 'fit',
        plain: true,
        items: form,

        buttons: [{
            text: 'Ok',
                handler : function(s) {    

                        var store = Ext.create('LoginStore');

                            store.on('load', function(s){

                            var obj = form.getForm().getValues();                                                                          

                            var DadosLogin = 
                                    Ext.create( 'DadosLogin',
                                                {
                                                    id: 0,
                                                    Login: obj['login'],
                                                    Senha: obj['password']
                                                }
                                        )

                            this.add(DadosLogin);
                            this.insert(0,DadosLogin);                                                                      

                            //var ResultLogin = s.getAt(0);
                            //alert( ResultLogin.get('Msg') );

                            store.sync({
                                success: function(batch, opts){
                                    console.log( store.data );
                                }
                            
                            });             

                            var ResultLogin = s.getAt(0);

                            //console.log( ResultLogin.get( 'Login' ) );

                            alert( "Você se comunicou com o servlet utilizando JSON a partir de uma tela ExtJS " + ResultLogin.get( 'Login' ) );
                        }); 


                }
        },                
        {
            text: 'Cancelar'
        }]
    });

    win.show();                        
}); 