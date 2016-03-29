Ext.define('Ext.app.NovoCadastro', {
    extend: 'Ext.panel.Panel',
                
    initComponent: function(){
        Ext.apply(this, {

                items: [
                    // Contact info
                    {
                        xtype: 'fieldset',
                        title: 'Dados da Empresa',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                                xtype: 'radiogroup',
                                layout: 'hbox',
                                defaults: {
                                    name: 'ccType',
                                    margins: '0 15 0 0'
                                },
                                items: [{
                                    inputValue: 'fornec',
                                    boxLabel: 'Fornecedor',
                                    checked: true
                                }, {
                                    inputValue: 'cliente',
                                    boxLabel: 'Cliente'
                                }]
                            },                           
                           {                            
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Name',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                name: 'firstName',
                                fieldLabel: 'Nome',
                                flex: 3,
                                emptyText: 'Nome Razão',
                                allowBlank: false
                            }, {
                                name: 'Nome Fantasia',
                                fieldLabel: 'lastname',
                                flex: 2,
                                margins: '0 0 0 6',
                                emptyText: 'Fantasia',
                                allowBlank: false
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',                               
                            items: [{
                                name: 'cnpj',
                                fieldLabel: 'CNPJ',
                                emptyText: 'CNPJ',                                
                                flex: 3,
                                allowBlank: false
                            },
                            {
                                fieldLabel: 'IE',
                                labelWidth: 20,
                                name: 'IE',                                                                
                                emptyText: 'Inscrição Estadual',
                                flex: 2,
                                margins: '0 0 0 6',
                                allowBlank: false
                            },
                            {
                                xtype: 'combobox',
                                name: 'mailingState',
                                billingFieldName: 'billingState',
                                fieldLabel: 'Atividade',
                                flex: 2,
                                labelWidth: 60,
                                width: 300,
                                margins: '0 0 0 6',
                                valueField: 'abbr',
                                displayField: 'abbr',
                                typeAhead: true,
                                queryMode: 'local',
                                allowBlank: false,
                                forceSelection: true
                            }]
                        }]
                    },

                    // Mailing Address
                    {
                        xtype: 'fieldset',
                        title: 'Dados Para Contato',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [                                                                                    
                            {                     
                                xtype: 'container',
                                layout: 'hbox',
                                items: [{
                                xtype: 'textfield',                                        
                                fieldLabel: 'Endereço',
                                flex: 2,  
                                name: 'mailingStreet',                                
                                billingFieldName: 'billingStreet',
                                allowBlank: false
                            },{
                                fieldLabel: '  Numero',
                                xtype: 'textfield',                                
                                flex: 1,
                                labelWidth: 50,
                                width:100,
                                margins: '0 0 0 6',
                                name: 'Numero',                                
                                billingFieldName: 'billingStreet',
                                allowBlank: false
                            }]
                           }, {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [{
                                xtype: 'textfield',
                                fieldLabel: 'Bairro',
                                name: 'bairro',
                                billingFieldName: 'billingCity',
                                flex: 2,
                                allowBlank: false
                            },                            
                            {
                                xtype: 'combobox',
                                name: 'estado',
                                billingFieldName: 'billingState',
                                fieldLabel: 'UF',
                                flex: 1,
                                labelWidth: 20,
                                width: 100,
                                margins: '0 0 0 6',
                                valueField: 'abbr',
                                displayField: 'abbr',
                                typeAhead: true,
                                queryMode: 'local',
                                allowBlank: false,
                                forceSelection: true
                            },
                            {
                                xtype: 'combobox',
                                name: 'mailingState',
                                billingFieldName: 'billingState',
                                fieldLabel: 'Cidade',
                                flex: 2,
                                labelWidth: 50,
                                width: 300,
                                margins: '0 0 0 6',
                                valueField: 'abbr',
                                displayField: 'abbr',
                                typeAhead: true,
                                queryMode: 'local',
                                allowBlank: false,
                                forceSelection: true
                            }]
                        },{
                            xtype: 'container',
                            layout: 'hbox',
                            items:[{
                            xtype: 'textfield',
                                fieldLabel: 'Contato',
                                name: 'contato',                                                            
                                flex: 2,
                                allowBlank: false
                            },{
                            xtype: 'textfield',
                                fieldLabel: 'Departamento',
                                name: 'departamento',                            
                                labelWidth: 80,
                                width: 200,
                                margins: '0 0 0 6',
                                flex: 2,
                                allowBlank: false
                            }]},
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items:[{
                                xtype: 'textfield',
                                    fieldLabel: 'E-Mail',
                                    name: 'contato',                                                            
                                    flex: 2,
                                    allowBlank: false
                                },{
                                xtype: 'textfield',
                                    fieldLabel: 'Telefone',
                                    name: 'telefone',                            
                                    labelWidth: 60,
                                    width: 200,
                                    margins: '0 0 0 6',
                                    flex: 1,
                                    allowBlank: false
                            }]}                    
                        ]  
                    },

                    // Usuário
                    {
                        xtype: 'fieldset',
                        title: 'Cadastro de Usuário',
                        layout: 'anchor',
                        width: 400,
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Login',
                            name: 'login',                                                        
                            allowBlank: false
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Senha',
                            name: 'senha',                                                        
                            allowBlank: false
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'Repita  Senha',
                            name: 'repsenha',                                                        
                            allowBlank: false
                        }                        
                        ]
                    },

                ],

                buttons: [                    
                    {
                        text: 'Gravar',
                        width: 100,
                        handler: function() {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                Ext.MessageBox.alert('Submitted Values', form.getValues(true));
                            }
                        }
                    },                  
                    {                    
                        text: 'Cancelar',
                        width: 100,
                        handler: function() {
                            this.up('form').getForm().reset();
                    }
                }]

                

        });

        this.callParent(arguments);
    }
});

