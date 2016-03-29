Ext.define('Ext.app.ManterUsuario', {
    extend: 'Ext.panel.Panel',       

    initComponent: function(){                                                                                       
                      
      //#region Store Config
      var store = new Ext.data.Store({
                    extend: 'Ext.data.Store',
                    model: 'Usuario',                                              

                    baseParams: { 
                            Op: '',
                            CodigoUsuario: ''
                            },                        

                    proxy: {
                            type: 'ajax',
                            url: 'SVL_Usuario', 

                            noCache: false,                                                

                            reader: new Ext.data.JsonReader({
                                    totalProperty:'total',
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
        });                  
      //#endregion Store Config                  
         
      //#region window alterar usuário 
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
                },
                {
                    text: 'Cancelar',
                    width: 100,
                    handler: function() {
                        this.ownerCt.ownerCt.hide();
                    }
                }]
        });                                                             
      //#endregion window alterar usuário
       
      //#region grid Resultado consulta
      var grid2 = new Ext.grid.GridPanel({
            store: store,
            columns: [
                {header: "id", width: 50, sortable: true, dataIndex: 'id'},
                //{header: "Codigo", width: 70, sortable: true, dataIndex: 'id_usuario'},
                //{header: "Empresa", width: 160, sortable: true, dataIndex: 'empresa'},
                {header: "Nome", width: 200, sortable: true, dataIndex: 'nome'},
                {header: "E-Mail", width: 120, sortable: true, dataIndex: 'email'},
                {header: "Departamento", width: 120, sortable: true, dataIndex: 'departamento'},
                {header: "cargo", width: 120, sortable: true, dataIndex: 'cargo', hidden: true},
                {header: "login", width: 120, sortable: true, dataIndex: 'login', hidden: true},
                                
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [
                    {
                        icon   : 'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                        tooltip: 'Sell stock',
                        handler: function(grid2, rowIndex, colIndex) {
                            var rec = store.getAt(rowIndex);
                            //alert("Sell " + rec.get('descricao'));                                                                                                  
                            
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('id').setValue(rec.get('id'));
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('usuario').setValue(rec.get('nome'));
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('departamento').setValue(rec.get('departamento'));
                            AlteraUsuario.getComponent('Campos').getComponent('Campo_EMail').getComponent('email').setValue(rec.get('email'));
                            AlteraUsuario.getComponent('Campos').getComponent('Campo_Login').getComponent('login').setValue(rec.get('login'));
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_Cargo').getComponent('cargo').setValue(rec.get('cargo'));                             
                                                                                              
                            AlteraUsuario.show();                                                                                                                                                               
                        }
                    }]
                }                   
                                               
            ],
            title: 'Consulta',
            //height:230,
            //width:590,
            
            defaults: {
                anchor: '100%'
            },            
           closeAction:'hide', 
           //renderTo: document.body,
           frame:true
        });        
                                 
      var win = Ext.create('Ext.window.Window', {
            closeAction:'hide', 
            id: 'window',
            title: 'SCR System',
            width: 800,
            height:400,
            minWidth: 300,
            minHeight: 130,
            layout: 'fit',
            plain: true,
            items: grid2
        });
      //#endregion grid Resultado consulta  
       
      Ext.apply(this, {                        
                //action: 'AtualizarProdutoStore',
                //url: 'SVL_Produto',
                                 
                
                items: [
                    // Contact info
                    {
                        itemId: 'CamposConsulta',
                        xtype: 'fieldset',
                        title: 'Consulta',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                           {     
                            itemId: 'Campos_Filtro',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Usuario',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                itemId: 'nome',                                
                                fieldLabel: 'Usu&aacute;rio',
                                flex: 2,
                                emptyText: 'Nome',
                                allowBlank: true
                            }, {
                                itemId: 'departamento',
                                name: 'Departamento',
                                fieldLabel: 'Departamento',
                                flex: 3,
                                margins: '0 0 0 6',
                                emptyText: 'Departamento / Setor',
                                allowBlank: true
                            }]
                        }]
                    }],
                
                buttons: [
                    
                    {
                        text: 'Novo',
                        width: 100,
                        icon: 'extjs/examples/shared/icons/fam/user_add.png',
                        handler: function() {                            
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('id').setValue(null);
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('usuario').setValue(null);
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_User1').getComponent('departamento').setValue(null);
                            AlteraUsuario.getComponent('Campos').getComponent('Campo_EMail').getComponent('email').setValue(null);
                            AlteraUsuario.getComponent('Campos').getComponent('Campo_Login').getComponent('login').setValue(null);
                            AlteraUsuario.getComponent('Campos').getComponent('Campo_Senha').getComponent('senha').setValue(null);
                            AlteraUsuario.getComponent('Campos').getComponent('Campos_Cargo').getComponent('cargo').setValue(null); 

                            AlteraUsuario.show();
                                                                                    
                        }
                    },                   
                    
                    {
                        text: 'Pesquisar',
                        width: 100,
                        icon: 'extjs/examples/shared/icons/fam/application_view_list.png',
                        handler: function() {                                                                
                               
                                                                               
                            var Campos_User = this.ownerCt.ownerCt.getComponent( 'CamposConsulta' ).getComponent('Campos_Filtro');
                                                        
                            
                            store.load(
                                {params:
                                   {  
                                     id: 0,  
                                     nome: Campos_User.getComponent('nome').value,
                                     departamento: Campos_User.getComponent('departamento').value
                                   }                                   
                                }
                            );   
                                
                            store.on('load', function(s) {
                                var count = store.getCount();                                                                
                                
                                if (count===0){
                                    Ext.MessageBox.alert('Message','Nenhum resultado encontrado!');
                                    win.hide();
                                }
                                else
                                {                                 
                                    win.show();                                    
                                }
                            });
                        }                    
                    }                           
                 
            ]                                
        });
                    
      this.callParent(arguments);        
              
        
     }     
 });    


