Ext.define('Ext.app.ManterMensagem', {
    extend: 'Ext.panel.Panel',
    ManterMensagemIdEmpresa: 'Unknown',
    ManterMensagemIdUsuario: 'Unknown',
    ManterMensagemTipo: 'Unknown',
    ManterMensagemId: 'Unknown',
    ManterMensagemid_assunto: 'Unknown',
    
    constructor: function(idemp, iduser, tipo, Id, idAssunto) {
        this.ManterMensagemIdEmpresa = idemp;
        this.ElaborarOrcIdUsuario = iduser;
        this.ManterMensagemTipo = tipo;
        this.ManterMensagemId = Id;
        this.ManterMensagemid_assunto = idAssunto;
        this.callParent();
    },
    initComponent: function() {

        var msgSelecionada = null;
        
        var Func =
                {
                    ExibeMensagem: function(txt) {
                        var pnlLeitura = Ext.getCmp('windowmsg').getComponent('txtLeituraMsg').getComponent('msgread');

                        pnlLeitura.setValue(txt);
                    },                    
                    
                    EnviaMsgResp:  function(tipo,PanelEnviaMsg) {
                                    var CamposMensagem = 
                                    GUIMensagem.getComponent( 'Campos_Mensagem' );                            
                                    var store = Ext.create('AtualizarMensagemStore');                                     

                                    var Msg =
                                            Ext.create('Mensagem',
                                                    {
                                                        id: 0,
                                                        id_mensagem: 0, //this.ManterMensagemId,    
                                                        id_assunto: 0,//this.ManterMensagemid_assunto,
                                                        id_usuario_origem: 0,
                                                        id_usuario_destino: 0,
                                                        assunto: CamposMensagem.getComponent('Campos_Mensagem_txtAssunto').getValue(),
                                                        mensagem: CamposMensagem.getComponent('Campos_Mensagem_txtMsg').getValue(),           
                                                        id_empresa_destino: CamposMensagem.getComponent('Campos_Mensagem_cmbEmpresa').value,
                                                        id_orcamento: 0,
                                                        id_produto: 0,
                                                        aceitarparceria: tipo 
                                                    }
                                            );

                                    store.add(Msg);
                                    store.insert(0, Msg);

                                    PanelEnviaMsg.setLoading("Gravando dados...");

                                    store.on('write', function(aStore, aOperation) {

                                        var response = Ext.JSON.decode(aOperation.response.responseText, true);

                                        PanelEnviaMsg.setLoading(false);

                                        if ( (response[0].Code == 1) || (response[0].Code == 2) ) {

                                            Ext.Msg.alert('SCR', response[0].Msg);

                                            if (response[0].Code == 1)
                                            {
                                               GUIMensagem.close();
                                            }
                                        }
                                        else {
                                            Ext.Msg.alert('SCR', 'Erro interno do Servidor!');                                    
                                        }
                                    });

                                    store.sync();                         
                    }                                        
                };


        var storeParc = new Ext.data.Store({
            extend: 'Ext.data.Store',
            model: 'Empresa',          
            proxy: {
                type: 'ajax',
                url: 'SVL_Empresa',
                noCache: false,
                reader: new Ext.data.JsonReader({
                    totalProperty: 'total',
                    type: 'json',
                    root: 'Empresa'
                }),
                writer: {
                    type: 'json',
                    root: 'Empresa',
                    writeAllFields: true,
                    encode: true                     
                },
                extraParams: {
                    Op: 'LP'
                }                
            },                     
            autoLoad: false
        });        
            
        var GUIMensagem = Ext.create('Ext.window.Window', {
            title: 'SupplyMe - Mensagem',
            closeAction: 'hide',
            width: 690,
            height: 530,
            items: [
                {
                   itemId: 'Campos_Mensagem',
                   plain: true,
                   border: 0,
                   bodyPadding: 5,            

                   fieldDefaults: {
                       anchor: '100%'
                   },

                   items: [{
                       xtype: 'combo',
                       itemId: 'Campos_Mensagem_cmbEmpresa',
                       store: storeParc,
                       fieldLabel: 'Empresa',
                       width: 670,
                       mode: 'remote',
                       displayField: 'nome',
                       valueField: 'id',                       
                       name: 'Empresa',
                       triggerAction: 'all',
                       forceSelection: true,
                       editable: false
                   }, {
                       itemId: 'Campos_Mensagem_txtAssunto',
                       xtype: 'textfield',
                       fieldLabel: 'Assunto',
                       width: 670,
                       name: 'subject'
                   }, 
                    {
                        itemId: 'Campos_Mensagem_tipo',
                        xtype: 'combo',
                        store: Ext.create('Ext.data.ArrayStore', {
                            fields: [ 'id','tipo' ],
                            data: [
                                [ '0', 'Comum'],
                                [ '1', 'Or&ccedil;amento'],
                                [ '2', 'Parceria']
                            ]
                        }),
                        allowBlank: false,
                        displayField: 'tipo',                                    
                        fieldLabel: 'Tipo',
                        flex: 3,   
                        valueField: 'id',
                        value: '0',
                        queryMode: 'local',
                        selectOnTab: true,
                        name: 'cmbtipo1'                                               
                    },                        
                   {
                       itemId: 'Campos_Mensagem_txtMsg',
                       xtype: 'textarea',
                       fieldLabel: 'Message text',
                       hideLabel: true,
                       width: 670,
                       height: 380,
                       hasfocus:true,
                       name: 'msg',
                       style: 'margin:0', // Remove default margin
                       flex: 1  // Take up all *remaining* vertical space
                   }]               
                }
            ],
            buttons: [    
                        {
                            text: 'Enviar',
                            width: 110,
                            icon   : 'extjs/examples/shared/icons/fam/accept.png',
                            handler: function() {                                                                                                               
                               Func.EnviaMsgResp(1,this.ownerCt);
                            }                    
                        },
                        {
                            text: 'Cancelar',
                            width: 110,
                            icon   : 'extjs/examples/shared/icons/fam/delete.gif',
                            
                            handler: function() {                                       
                                    if (msgSelecionada.get('id_assunto')==2)
                                        Func.EnviaMsgResp(0,this.ownerCt);
                                    
                                    GUIMensagem.close();
                            }                    
                        }                                           
             ]            
        });

        var store = new Ext.data.Store({
            extend: 'Ext.data.Store',
            model: 'Mensagem',
            proxy: {
                type: 'ajax',
                url: 'SVL_Mensagem',
                noCache: false,
                reader: new Ext.data.JsonReader({
                    totalProperty: 'total',
                    type: 'json',
                    root: 'Mensagem'
                }),
                writer: {
                    type: 'json',
                    root: 'Mensagem',
                    writeAllFields: true,
                    encode: true
                }
            },
            autoLoad: true
        });

        var grid = new Ext.grid.GridPanel({
            minHeight: 130,
            maxHeight: 300,
            closeAction:'hide',
            store: store,
            columns: [
                {header: "Data", width: 140, sortable: true, dataIndex: 'dataenvio'},
                {header: "De", width: 160, sortable: true, dataIndex: 'usuario_origem_nome'},
                {header: "Empresa", width: 200, sortable: true, dataIndex: 'empresa_origem_descr'},
                {header: "Assunto", width: 200, sortable: true, dataIndex: 'assunto'},
                {header: "Tipo", width: 200, sortable: true, dataIndex: 'id_assunto_descr'},
                {header: "mensagem", width: 200, sortable: true, dataIndex: 'mensagem', hidden: true},
                {header: "id_empresa_origem", width: 200, sortable: true, dataIndex: 'id_empresa_origem', hidden: true} ,
                {header: "id_assunto", width: 200, sortable: true, dataIndex: 'id_assunto', hidden: true}                 
            ],
            listeners: {
                select: function(selModel, record, index, options){                    
                    Func.ExibeMensagem(record.get('mensagem'));
                    msgSelecionada = record;
                }
            },            
            title: 'Resultado da Consulta',
            defaults: {
                anchor: '100%'
            },
            frame: true
        });

        var btnResponder = Ext.create("Ext.Button", {
                text: 'Responder',
                width: 120,
                handler: function() {                      
                    
                    var CamposMensagemNova = 
                    GUIMensagem.getComponent( 'Campos_Mensagem' );                                  

                    CamposMensagemNova.getComponent('Campos_Mensagem_txtAssunto').setValue(msgSelecionada.get('assunto')); 
                    CamposMensagemNova.getComponent('Campos_Mensagem_tipo').setValue(msgSelecionada.get('id_assunto')); 
                    
                    var sMsg = "\n\n";
                    
                    sMsg += "--------------------------------------------------------------------------";
                    
                    sMsg += "\nData: " + msgSelecionada.get('dataenvio');
                    sMsg += "\nDe: " + msgSelecionada.get('usuario_origem_nome');
                    sMsg += "\nEmpresa: " + msgSelecionada.get('empresa_origem_descr');
                    
                    sMsg += "\n\n" + msgSelecionada.get('mensagem');
                    
                    CamposMensagemNova.getComponent('Campos_Mensagem_txtMsg').setValue(sMsg);
                    
                    CamposMensagemNova.getComponent('Campos_Mensagem_txtMsg').focus();
                   
                    storeParc.load();
                    CamposMensagemNova.getComponent('Campos_Mensagem_cmbEmpresa').setValue(msgSelecionada.get('id_empresa_origem'));                    

                    CamposMensagemNova.getComponent('Campos_Mensagem_tipo').setReadOnly(true);
                    CamposMensagemNova.getComponent('Campos_Mensagem_cmbEmpresa').setReadOnly(true);

                    GUIMensagem.show();
                   
                }                              
        });  

        var win = Ext.create('Ext.window.Window', {
              closeAction:'hide', 
              id: 'windowmsg',
              title: 'SCR System',
              width: 800,
              height:600,
              minWidth: 300,
              minHeight: 130,
              layout: 'fit',
              plain: true,
              items:
                   [grid,
                      {
                        itemId: 'txtLeituraMsg',
                        xtype: 'fieldset',
                        title: 'Mensagem',
                        layout: 'hbox',                    
                        margins: '5 5 5 5', 
                        height: 295,
                        defaultType: 'textfield', 
                        items:[{
                                height: 210,
                                margins: '5 5 5 5', 
                                itemId: 'msgread',                            
                                xtype: 'textareafield',
                                labelAlign: 'top',
                                flex: 1,
                                allowBlank: true
                            }]  
                    }             
                   ],
                buttons: [                    
                    btnResponder
                ]                    
                     
          });

        Ext.apply(this, {                  
            itemId: 'CamposFiltroMensagem',
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Date Range',
            combineErrors: true,
            msgTarget: 'side',
            defaults: {
                flex: 1,
                hideLabel: false
            },
            items: [
                {
                    itemId: 'CamposData',
                    xtype: 'fieldset',
                    title: 'Periodo',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    margins: '8 8 8 8',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            itemId: 'Campos_Filtro_Datas',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'datefield',
                            items: [{
                                    vtype: 'datefield',
                                    format: 'd/m/Y',
                                    flex: 1,
                                    margins: '8 8 8 8',
                                    fieldLabel: 'Data Inicial',
                                    name: 'startdt',
                                    itemId: 'startdtmsg',
                                    labelAlign: 'top'
                                }, {
                                    vtype: 'datefield',
                                    format: 'd/m/Y',
                                    itemId: 'enddt',
                                    flex: 1,
                                    margins: '8 8 8 8',
                                    fieldLabel: 'Data Final',
                                    name: 'enddtmsg',
                                    labelAlign: 'top'
                                }]
                        }
                    ]},
                {
                    itemId: 'CamposConsulta2',
                    xtype: 'fieldset',
                    title: 'Filtros Adicionais',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    margins: '8 8 8 8',
                    items: [
                        {
                            itemId: 'Campos_Filtro2_Msg',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            items: [
                                {
                                    xtype: 'combo',
                                    store: Ext.create('Ext.data.ArrayStore', {
                                        fields: [ 'id','tipo' ],
                                        data: [
                                            [ '0', 'Comum'],
                                            [ '1', 'Or&ccedil;amento'],
                                            [ '2', 'Parceria']
                                        ]
                                    }),
                                    allowBlank: false,
                                    itemId: 'cmbtipomsg',
                                    displayField: 'tipo',                                    
                                    fieldLabel: 'Tipo',
                                    flex: 3,   
                                    valueField: 'id',
                                    value: '0',
                                    queryMode: 'local',
                                    selectOnTab: true,
                                    name: 'cmbtipo',
                                    margins: '8 8 8 8',
                                    labelAlign: 'top'
                                },
                                {
                                    xtype: 'combo',
                                    store: Ext.create('Ext.data.ArrayStore', {
                                        fields: [ 'idmsg','status' ],
                                        data: [
                                            [ '1', 'Enviadas'],
                                            [ '2', 'Recebidas']
                                        ]
                                    }),
                                    displayField: 'status',                                    
                                    fieldLabel: 'Status',
                                    queryMode: 'local',
                                    itemId: 'cmbstatusmsg',
                                    valueField: 'idmsg',                                    
                                    value: '2',                                    
                                    flex: 3,                                    
                                    selectOnTab: false,
                                    name: 'cmbstatus',
                                    margins: '8 8 8 8',
                                    labelAlign: 'top'
                                }
                            ]
                        },
                        {
                            itemId: 'Campos_Filtro3_Msg',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            items: [                        
                                        {
                                            xtype: 'combo',
                                            itemId: 'cmbEmpresamsg',
                                            triggerAction: 'all',
                                            forceSelection: true,
                                            editable: false,                            
                                            fieldLabel: 'Empresa',
                                            labelWidth: 50,
                                            width: 275,
                                            flex: 1,
                                            mode: 'remote',
                                            displayField: 'nome',
                                            valueField: 'id',
                                            store: storeParc                            
                                        }
                            ]
                       }
                    ]}
            ],                               
           buttons: [    
                        //{
                        //    text: 'Painel de Leitura',
                        //    width: 110,
                        //    icon   : 'extjs/examples/shared/icons/fam/table_refresh.png',
                        //    handler: function() {                                                                

                        //    }                    
                        //},
                        {
                            text: 'Nova',
                            width: 110,
                            icon   : 'extjs/examples/shared/icons/fam/add.png',
                            handler: function() {   
                                
                                var CamposMensagemNova = 
                                GUIMensagem.getComponent( 'Campos_Mensagem' );                                  
                                
                                CamposMensagemNova.getComponent('Campos_Mensagem_txtAssunto').setValue(null);
                                CamposMensagemNova.getComponent('Campos_Mensagem_txtMsg').setValue(null);
                                CamposMensagemNova.getComponent('Campos_Mensagem_cmbEmpresa').setValue(null);
                                
                                CamposMensagemNova.getComponent('Campos_Mensagem_tipo').setReadOnly(true);
                                
                                GUIMensagem.show();
                            }                    
                        },                                                
                        {
                            text: 'Pesquisar',
                            width: 110,
                            icon   : 'extjs/examples/shared/icons/fam/application_go.png',
                            handler: function() {                                                                
                                store.loadData([],false);                                                    

                                var CamposData = 
                                this.ownerCt.ownerCt.getComponent('CamposData').getComponent('Campos_Filtro_Datas'); 

                                var FiltrosAdic2 = 
                                this.ownerCt.ownerCt.getComponent('CamposConsulta2').getComponent('Campos_Filtro2_Msg');

                                var DataIni = CamposData.getComponent('startdtmsg').value;
                                var DataFin = CamposData.getComponent('enddt').value;   
                                
                                var TipoMsg = FiltrosAdic2.getComponent('cmbtipomsg').value;  
                                var StatusMsg = FiltrosAdic2.getComponent('cmbstatusmsg').value;

                                var FiltrosAdic3 = 
                                this.ownerCt.ownerCt.getComponent('CamposConsulta2').getComponent('Campos_Filtro3_Msg');

                                var idEmpresaParc = FiltrosAdic3.getComponent('cmbEmpresamsg').value;

                                store.load(
                                    {params:
                                       {                                   
                                          DataIni: DataIni,
                                          DataFin: DataFin,
                                          tipo: TipoMsg,
                                          status: StatusMsg,
                                          idEmpresaParceira: idEmpresaParc
                                       }                                   
                                    }
                                );   

                                store.on('load', function(s) {

                                    var count = store.getCount();                                                                 

                                    if (count===0){
                                        Ext.MessageBox.alert('Message','Nenhum resultado encontrado!');
                                        grid.hide();
                                    }
                                    else
                                    {                                    
                                        win.show();
                                        grid.show();
                                    }

                                });
                            }                    
                        }                                             
            ] 
        });

        this.callParent(arguments);
    }   
});


