Ext.define('Combo', {
        extend: 'Ext.data.Model',
        fields: [
            {type: 'string', name: 'name'}
        ]
});

Ext.define('ComboAtividades', {
        extend: 'Ext.data.Model',
        fields: [

            {type: 'string', name: 'abbr'},
            {type: 'string', name: 'name'}
            
        ]
});

Ext.define('Ext.app.CadastrarEmpresa', {
    extend: 'Ext.panel.Panel',
                 
    initComponent: function(){
        
        var Estados = [{"name":"AC"},{"name":"AL"},{"name":"AP"},
                            {"name":"AM"},{"name":"BA"},{"name":"CE"},
                            {"name":"DF"},{"name":"ES"},{"name":"GO"},
                            {"name":"MA"},{"name":"MT"},{"name":"MS"},
                            {"name":"MG"},{"name":"PA"},{"name":"PB"},
                            {"name":"PR"},{"name":"PE"},{"name":"PI"},
                            {"name":"RJ"},{"name":"RN"},{"name":"RS"},
                            {"name":"RO"},{"name":"RR"},{"name":"SC"},
                            {"name":"SE"},{"name":"SP"},{"name":"TO"}];
                        
//        var Atividades = [{abbr:"Gráfica","name":"Gr&aacute;fica"},{abbr:"","name":"Cal&ccedil;ado"},
//                            {abbr:"","name":"Mobili&aacute;rio"},{abbr:"","name":"Couros"},
//                            {abbr:"","name":"Metalurgia"},{abbr:"","name":"Mec&acirc;nica"},
//                            {abbr:"","name":"Ve&iacute;culos"},{abbr:"","name":"Tecidos"},
//                            {abbr:"","name":"Combust&iacute;veis"},{abbr:"","name":"Ferragens"},
//                            {abbr:"","name":"Alimenta&ccedil;&atilde;o"},{abbr:"","name":"Transporte"},
//                            {abbr:"","name":"Turismo"},{abbr:"","name":"Sa&uacute;de"},
//                            {abbr:"","name":"Educa&ccedil;&atilde;o"},{abbr:"","name":"Lazer"}];

        var Atividades = [{abbr:"Grafica","name":"Grafica"},{abbr:"","name":"Calcado"},
                            {abbr:"","name":"Mobiliario"},{abbr:"","name":"Couros"},
                            {abbr:"","name":"Metalurgia"},{abbr:"","name":"Mecanica"},
                            {abbr:"","name":"Veiculos"},{abbr:"","name":"Tecidos"},
                            {abbr:"","name":"Combustiveis"},{abbr:"","name":"Ferragens"},
                            {abbr:"","name":"Alimentacao"},{abbr:"","name":"Transporte"},
                            {abbr:"","name":"Turismo"},{abbr:"","name":"Saude"},
                            {abbr:"","name":"Educacao"},{abbr:"","name":"Lazer"}];
        
        // The data store holding the states; shared by each of the ComboBox examples below
        var storeEstados = Ext.create('Ext.data.Store', {model: 'Combo', data: Estados});
        var storeAtividades = Ext.create('Ext.data.Store', {model: 'ComboAtividades', data: Atividades});
          
                                
//        // ComboBox with a custom item template
//        var customTplCombo  = Ext.create('Ext.form.field.ComboBox', {
//            itemId: 'Atividade',
//            fieldLabel: 'Atividade',
//            renderTo: 'customTplCombo ',
//            flex: 2,
//            labelWidth: 60,
//            width: 300,
//            margins: '0 0 0 6',
//            typeAhead: true,
//            queryMode: 'local',
//            displayField: 'abbr',
//            store: storeAtividades,
//            //allowBlank: false,
//            forceSelection: true,
//
//            listConfig: {
//                getInnerTpl: function() {
//                    return '<div data-qtip="{name}. {slogan}">{name} ({abbr})</div>';
//                }
//            }
//        });
          
        var AlteraUsuario = Ext.create('Ext.window.Window', {
                closeAction:'hide',
            items: [
                {
                    itemId: 'Campos',
                    xtype: 'fieldset',
                    title: 'Dados do Usu&aacute;rio',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    width: 700,
                    height:210,
                    minHeight: 130,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            itemId: 'Campos_User1',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [
                                {
                                    itemId: 'id',
                                    name: 'id',
                                    fieldLabel: 'ID',
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true,
                                    hidden: true
                                },                                
                                {
                                    itemId: 'usuario',
                                    name: 'UsuarioNome',
                                    fieldLabel: 'Usu&aacute;rio',
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true
                                },
                                {
                                    itemId: 'departamento',
                                    name: 'Usuariodepart',
                                    fieldLabel: 'Departamento',
                                    labelAlign : 'right',
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true
                                }                                
                            ]
                        },                      
                        {
                            itemId: 'Campos_Cargo',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [
                                {
                                    itemId: 'cargo',
                                    name: 'cargo',
                                    fieldLabel: 'Fun&ccedil;&atilde;o',
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true
                                },
                                {
                                    itemId: 'datacadastro',
                                    xtype: 'datefield',
                                    name: 'datacadastro',
                                    fieldLabel: 'Cadastro',
                                    flex: 2,
                                    labelAlign : 'right',
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true,
                                    hidden: true
                                }                                
                            ]
                        },
                        {
                            itemId: 'Campo_EMail',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [
                                {
                                    itemId: 'email',
                                    name: 'email',
                                    fieldLabel: 'E-Mail',
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true
                                }                    
                            ]
                        },
                        {
                            itemId: 'Campo_Login',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [
                                {
                                    itemId: 'login',
                                    name: 'login',
                                    fieldLabel: 'Login',
                                    flex: 2,
                                    maxWidth: 300,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    allowBlank: true
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: '',
                                    defaultType: 'checkboxfield', 
                                    margins: '0 0 0 5',
                                    items: {
                                        boxLabel: 'Desativar Usu&aacute;rio',
                                        name: 'topping',
                                        inputValue: '1',
                                        id: 'checkbox1'
                                    }
                                }                                
                            ]
                        },
                        {
                            itemId: 'Campo_Senha',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [
                                {
                                    itemId: 'senha',
                                    name: 'senha',
                                    fieldLabel: 'Senha',
                                    maxWidth: 300,
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    inputType: 'password',
                                    allowBlank: true
                                }                    
                            ]
                        },
                        {
                            itemId: 'Campo_SenhaRep',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',                            
                            items: [
                                {
                                    itemId: 'SenhaRep',
                                    name: 'SenhaRep',
                                    maxWidth: 300,
                                    fieldLabel: 'Repita Senha',
                                    flex: 2,
                                    margins: '0 0 0 0',
                                    emptyText: '',
                                    inputType: 'password',
                                    allowBlank: true
                                }                    
                            ]
                        }                          
                    ]}                
            ],
            buttons: [
                {
                    text: 'Gravar',
                    width: 100,
                    handler: function() {

                        var UserFields = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campos_User1');
                        var DadosFunc = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campos_Cargo');
                        var DadosEmail = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campo_EMail');
                        var DadosLogin = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campo_Login');
                        var DadosSenha = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campo_Senha');
                                            
                        var store = Ext.create('AtualizarUsuarioStore');
                        
                        var dt = JSON.stringify(DadosFunc.getComponent('datacadastro').value);

                        var Usuario =
                                Ext.create('Usuario',
                                        {
                                            id: 0,
                                            id_usuario: UserFields.getComponent('id').value,
                                            id_empresa: 0,
                                            nome: UserFields.getComponent('usuario').value,
                                            departamento: UserFields.getComponent('departamento').value,
                                            login: DadosLogin.getComponent('login').value,
                                            senha: DadosSenha.getComponent('senha').value,
                                            datacadastro: dt,
                                            email: DadosEmail.getComponent('email').value,
                                            cargo: DadosFunc.getComponent('cargo').value
                                        }
                                );


    
                        store.add(Usuario);
                        store.insert(0, Usuario);

                        var PanelGravaUser = this.ownerCt.ownerCt;

                        PanelGravaUser.setLoading("Gravando dados...");
                        
                        store.on('write', function(aStore, aOperation) {

                            var response = Ext.JSON.decode(aOperation.response.responseText, true);

                            PanelGravaUser.setLoading(false);

                            if (response[0].Code === 1) {

                                Ext.Msg.alert('SCR', 'Dados atualizados com sucesso!');
                                store.reload();
                            }
                            else {
                                if (response[0].Code === 2)
                                    Ext.Msg.alert('SCR', response[0].Msg);
                                else {
                                    Ext.Msg.alert('SCR', 'Erro interno do Servidor!');
                                }
                            }
                        });

                        store.sync();
                    }
                }]
        });
                                                                
        Ext.apply(this, {
                //action: 'AtualizarEmpresaStore',
                //url: 'SVL_Empresa',
                items: [
                    // Dados da empresa
                    {
                    itemId: 'Campos_NomeDadosEmpresa',    
                    xtype: 'fieldset',
                        title: 'Dados da Empresa',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [                          
                           {                            
                            itemId: 'Campos_Nome',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Nome',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                itemId: 'RazaoSocial',
                                name: 'RazaoSocial',
                                fieldLabel: 'Raz&atilde;o Social',
                                flex: 3,
                                emptyText: '',
                                allowBlank: false
                            }, {
                                itemId: 'NomeFantasia',
                                name: 'Nome Fantasia',
                                fieldLabel: 'Nome Fantasia',
                                flex: 2,
                                margins: '0 0 0 6',
                                emptyText: ''
                                //allowBlank: false
                            }]
                        }, {
                            itemId: 'Campos_Dados',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',                               
                            items: [{
                                itemId: 'CNPJ',
                                name: 'CNPJ',
                                fieldLabel: 'CNPJ',
                                emptyText: '',                                
                                flex: 3,
                                allowBlank: false
                            },
                            {
                                itemId: 'IE',
                                fieldLabel: 'IE',
                                labelWidth: 20,
                                name: 'IE',                                                                
                                emptyText: '',
                                flex: 2,
                                margins: '0 0 0 6'
                                //allowBlank: false
                            },
                            //customTplCombo 
                            {
                                itemId: 'Atividade',
                                xtype: 'combobox',
                                name: 'Atividade',
                                billingFieldName: 'billingState',
                                fieldLabel: 'Atividade',
                                flex: 2,
                                labelWidth: 60,
                                width: 300,
                                margins: '0 0 0 6',
                                typeAhead: true,
                                queryMode: 'local',
                                displayField: 'name',
                                store: storeAtividades,
                                //allowBlank: false,
                                forceSelection: true
                            }]
                        }]
                    },

                    // Dados Contato
                    {
                        itemId: 'Campos_DadosEnderecoContato',
                        xtype: 'fieldset',
                        title: 'Dados Para Contato',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [                                                                                    
                            {                     
                                itemId: 'Campos_Endereco',
                                xtype: 'container',
                                layout: 'hbox',
                                items: [{
                                    itemId: 'Endereco',
                                    xtype: 'textfield',                                        
                                    fieldLabel: 'Endere&ccedil;o',
                                    flex: 2,  
                                    name: 'Endereco',                                
                                    billingFieldName: 'Endereco'
                                    //allowBlank: false
                                },{
                                    itemId: 'Numero',
                                    fieldLabel: '  Numero',
                                    xtype: 'textfield',                                
                                    labelWidth: 50,
                                    width: 100,
                                    margins: '0 0 0 6',
                                    name: 'Numero',                                
                                    billingFieldName: 'Numero'
                                    //allowBlank: false
                                },{
                                    itemId: 'Bairro',
                                    xtype: 'textfield',
                                    fieldLabel: 'Bairro',
                                    labelWidth: 40,
                                    Width: 50,
                                    margins: '0 0 0 6',
                                    name: 'Bairro',
                                    billingFieldName: 'Bairro'
                                    //allowBlank: false
                                }]
                            },
                            {
                                itemId: 'Campos_Endereco2',
                                xtype: 'container',
                                layout: 'hbox',
                                items: [{
                                    itemId: 'Cidade',
                                    xtype: 'textfield',
                                    name: 'Cidade',
                                    billingFieldName: 'Cidade',
                                    fieldLabel: 'Cidade',
                                    //flex: 2,
                                    //labelWidth: 50,
                                    width: 300
                                    //allowBlank: false
                                },
                                {
                                    itemId: 'Estado',
                                    xtype: 'combobox',
                                    name: 'Estado',
                                    billingFieldName: 'Estado',
                                    fieldLabel: 'UF',
                                    margins: '0 0 0 6',
                                    //flex: 2,
                                    labelWidth: 20,
                                    width: 70,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    store: storeEstados,
                                    typeAhead: true
                                    //allowBlank: false
                                },
                                {
                                    itemId: 'CEP',
                                    xtype: 'textfield',
                                    name: 'CEP',
                                    billingFieldName: 'CEP',
                                    fieldLabel: 'CEP',
                                    margins: '0 0 0 6',
                                    //flex: 2,
                                    labelWidth: 30,
                                    width: 120
                                    //allowBlank: false
                                },
                                {
                                    itemId: 'Complemento',
                                    xtype: 'textfield',
                                    name: 'Complemento',
                                    billingFieldName: 'Complemento',
                                    fieldLabel: 'Complemento',
                                    margins: '0 0 0 6',
                                    flex: 2,
                                    labelWidth: 80
                                    //width: 120,
                                    //allowBlank: false
                                }]
                            },{
                                itemId: 'Campos_Contato',
                                xtype: 'container',
                                layout: 'hbox',
                                items:[
                                {
                                    itemId: 'Contato',
                                    xtype: 'textfield',
                                    fieldLabel: 'Contato',
                                    name: 'Contato',                                                            
                                    //flex: 2,
                                    width: 300
                                    //allowBlank: false
                                },
                                {
                                    itemId: 'Email',
                                    xtype: 'textfield',
                                    fieldLabel: 'E-Mail',
                                    name: 'Email',                                                            
                                    margins: '0 0 0 6',
                                    //flex: 2,
                                    labelWidth: 38,
                                    width: 220
                                    //allowBlank: false
                                },
                                {
                                    itemId: 'Telefone',
                                    xtype: 'textfield',
                                    fieldLabel: 'Telefone',
                                    name: 'telefone',                            
                                    labelWidth: 60,
                                    width: 200,
                                    margins: '0 0 0 6',
                                    flex: 2
                                    //allowBlank: false
                                }]}                                               
                        ]  
                    },
                   // Dados da empresa
                    {
                        itemId: 'Campos_Institucional',    
                        xtype: 'fieldset',
                        title: 'Institucional',
                        defaultType: 'textareafield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [                          
                           {
//                            itemId: 'Campos_Dados',
//                            xtype: 'fieldcontainer',
//                            layout: 'hbox',
//                            combineErrors: true,
//                            defaultType: 'textfield',                               
//                            items: [{
                                itemId: 'Institucional',
                                name: 'Institucional',
                                //fieldLabel: 'Institucional',
                                emptyText: '',                                
                                flex: 3,
                                height: 100,
                                allowBlank: true
                            //}]
                        }]                             
                    }
                ],

                buttons: [                    
                    {
                        text: 'Gravar',
                        width: 100,
                        handler: function() {                                                                
                                                        
                             var Campos_Nome = this.ownerCt.ownerCt.getComponent('Campos_NomeDadosEmpresa').getComponent('Campos_Nome');
                             var Campos_Dados = this.ownerCt.ownerCt.getComponent('Campos_NomeDadosEmpresa').getComponent('Campos_Dados');
                             var Campos_Endereco = this.ownerCt.ownerCt.getComponent('Campos_DadosEnderecoContato').getComponent('Campos_Endereco');
                             var Campos_Endereco2 = this.ownerCt.ownerCt.getComponent('Campos_DadosEnderecoContato').getComponent('Campos_Endereco2');
                             var Campos_Contato = this.ownerCt.ownerCt.getComponent('Campos_DadosEnderecoContato').getComponent('Campos_Contato');
                             var Campos_Institucional = this.ownerCt.ownerCt.getComponent('Campos_Institucional');
                             
                             var store = Ext.create('AtualizarEmpresaStore');

                                var Empresa = 
                                        Ext.create( 'Empresa',
                                                    {
                                                        id: 0,
                                                        id_empresa: 0,
                                                        codigo: '0',
                                                        tipo: '0',
                                                        nome: Campos_Nome.getComponent('RazaoSocial').value,
                                                        nomeFantasia: Campos_Nome.getComponent('NomeFantasia').value,
                                                        cnpj: Campos_Dados.getComponent('CNPJ').value,
                                                        ie: Campos_Dados.getComponent('IE').value,
                                                        atividade: Campos_Dados.getComponent('Atividade').value,
                                                        
                                                        contato: Campos_Contato.getComponent('Contato').value,
                                                        email: Campos_Contato.getComponent('Email').value,
                                                        telefone: Campos_Contato.getComponent('Telefone').value,
                                                                                                                
                                                        rua: Campos_Endereco.getComponent('Endereco').value,
                                                        numero: Campos_Endereco.getComponent('Numero').value,
                                                        bairro: Campos_Endereco.getComponent('Bairro').value,
                                                        cidade: Campos_Endereco2.getComponent('Cidade').value,
                                                        estado: Campos_Endereco2.getComponent('Estado').value,
                                                        cep: Campos_Endereco2.getComponent('CEP').value,
                                                        pais: 'Brasil',
                                                        complemento: Campos_Endereco2.getComponent('Complemento').value,
                                                        
                                                        institucional: Campos_Institucional.getComponent('Institucional').value
                                
                                                    }
                                        );

                               store.add(Empresa);
                               store.insert(0,Empresa);                                                                                
                                        
                               store.on('write', function( aStore, aOperation ){                                                                                                                                                                                                                         
                                
                                        var response = Ext.JSON.decode( aOperation.response.responseText,true );                                        
                                        
                                        if ( response[0].Code == 1 ){
                                            
                                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('id').setValue(null);
                                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('usuario').setValue(null);
                                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('departamento').setValue(null);
                                            AlteraUsuario.getComponent('Campos').getComponent('Campo_EMail').getComponent('email').setValue(null);
                                            AlteraUsuario.getComponent('Campos').getComponent('Campo_Login').getComponent('login').setValue(null);
                                            AlteraUsuario.getComponent('Campos').getComponent('Campo_Senha').getComponent('senha').setValue(null);
                                            AlteraUsuario.getComponent('Campos').getComponent('Campos_Cargo').getComponent('cargo').setValue(null);      
                                       
                                            Ext.Msg.alert('SupplyMe', response[0].Msg + "\n\nVoc&ecirc deve inserir um usu&aacute;rio administrador.",AlteraUsuario.show());
                                           
                                        }
                                        else if ( response[0].Code == 4 ){
                                                Ext.Msg.alert('SupplyMe', response[0].Msg);
                                        }
                                        else{
                                            if ( response[0].Code == 2 ) 
                                                    Ext.Msg.alert('SupplyMe', response[0].Msg );
                                                else{                                           
                                                    Ext.Msg.alert('SupplyMe', 'Erro interno do Servidor!');

                                            }
                                        }                                       
                            } );      
                              
                           store.sync();   
                        }
                    },                  
                    {                    
                        text: 'Cancelar',
                        width: 100,
                        handler: function() {
                            this.ownerCt.ownerCt.close();
                    }
                }]

                

        });

        this.callParent(arguments);
        
    }
});

