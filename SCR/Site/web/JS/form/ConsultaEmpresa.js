Ext.define('Ext.app.ConsultaEmpresa', {
    extend: 'Ext.panel.Panel',

    ConsultaProdIdEmpresa: 'Unknown',
    ConsultaProdIdUsuario: 'Unknown',
    Op: 0,
       
    constructor: function(idEmp,idUser,op) {
       this.ConsultaProdIdEmpresa = idEmp;
       this.ConsultaProdIdUsuario = idUser;
       this.Op = op;
       this.callParent();
    },

    initComponent: function(){

        var ConsultaProdIdEmpresaStda;
        var ConsultaProdIdEmpresa;
                
        var store = new Ext.data.Store({
                    extend: 'Ext.data.Store',
                    model: 'Empresa',

                    baseParams: {
                            Op: '',
                            CodigoEmp: '',
                            DescEmp: ''
                            },

                    proxy: {
                            type: 'ajax',
                            url: 'SVL_Empresa',

                            noCache: false,

                            reader: new Ext.data.JsonReader({
                                    totalProperty:'total',
                                    type: 'json',
                                    root: 'Empresa'
                            }),

                            writer: {
                                    type: 'json',
                                    root: 'Empresa',
                                    writeAllFields: true,
                                    encode: true
                            }
                    }   ,

                    autoLoad: false
        
        });
        
        var btnSolicitarParceria = Ext.create("Ext.Button", {
                text: 'Solicitar Parceria',
                width: 120,
//                listeners: {
//                    'Click': Ext.bind(this.GUISolicitarParceria(), this)
//                }
                handler: function() {
                                              
                    Ext.MessageBox.confirm('Confirm', 'Deseja solicitar uma parceria com a empresa?', showResult);
                    
                    function showResult(btn){
                                                
                        if (btn === 'yes') {
                    
                            var store = Ext.create('AtualizarSolicitacaoParceriaStore');

                            var SolicitacaoParceria =
                                    Ext.create('SolicitacaoParceria',
                                            {
                                                id: 0,
                                                id_parceria: 0,
                                                id_empresa_snte: ConsultaProdIdEmpresa,
                                                id_empresa_stda: ConsultaProdIdEmpresaStda
                                            }
                                    );

                            store.add(SolicitacaoParceria);
                            store.insert(0, SolicitacaoParceria);

                            var PanelGravaProd = btnSolicitarParceria.ownerCt.ownerCt;

                            PanelGravaProd.setLoading("Gravando dados...");

                            store.on('write', function(aStore, aOperation) {

                                var response = Ext.JSON.decode(aOperation.response.responseText, true);

                                PanelGravaProd.setLoading(false);

                                if (response[0].Code == 1) {

                                    Ext.Msg.alert('SupplyMe', 'Solicitacao enviada com sucesso!');
                                }
                                else {
                                    if (response[0].Code == 2)
                                        Ext.Msg.alert('SupplyMe', response[0].Msg);
                                    else {
                                        Ext.Msg.alert('SupplyMe', 'Erro interno do Servidor!');
                                    }
                                }
                            });

                            store.sync();

                        }
                    };
                    
                }
        });

        var storeSolicParc = new Ext.data.Store({
                    extend: 'Ext.data.Store',
                    model: 'SolicitacaoParceria',

                    baseParams: {
                            Op: '',
                            idEmpSte: '',
                            idEmpSta: ''
                            },

                    proxy: {
                            type: 'ajax',
                            url: 'SVL_SolicitacaoParceria',

                            noCache: false,

                            reader: new Ext.data.JsonReader({
                                    totalProperty:'total',
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
        });

        var DetalhesEmp = Ext.create('Ext.window.Window', {
                title: 'Perfil da Empresa',
                closeAction:'hide',
                items: [
                    {
                        itemId: 'Campos',
                        xtype: 'fieldset',
                        title: 'Dados da Empresa',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        width: 700,
                        height:100,
                        minHeight: 100,

                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                            {
                                itemId: 'Campos_Empresa',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                defaultType: 'displayfield',
                                combineErrors: true,
                                items: [
                                        {
                                        itemId: 'nomeFantasia',
                                        fieldLabel: 'Nome',
                                        labelWidth: 60,
                                        flex: 3
                                    },{
                                        itemId: 'atividade',
                                        fieldLabel: 'Atividade',
                                        flex: 2,
                                        labelWidth: 60,
                                        allowBlank: false
                                    },{
                                        itemId: 'id_empresa',
                                        fieldLabel: '',
                                        flex: 2,
                                        labelWidth: 60,
                                        hidden: true,
                                        allowBlank: false
                                    }
                                ]
                            }
                            ,
                            {
                                itemId: 'Campos_Contato',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'displayfield',
                                items: [
                                    {
                                        itemId: 'contato',
                                        fieldLabel: 'Contato',
                                        labelWidth: 60,
                                        flex: 3,
                                        emptyText: '',
                                        allowBlank: false
                                    }
                                    ,{
                                        itemId: 'email',
                                        name: 'Email',
                                        fieldLabel: 'E-mail',
                                        labelWidth: 60,
                                        flex: 3,
                                        allowBlank: false
                                    }
                                    ,{
                                        itemId: 'telefone',
                                        name: 'Telefone',
                                        fieldLabel: 'Telefone',
                                        labelWidth: 60,
                                        flex: 2,
                                        allowBlank: false
                                    }
                                ]
                            }
                            ,{
                                itemId: 'Campos_Local',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'displayfield',
                                items: [
                                    {
                                        itemId: 'cidade',
                                        fieldLabel: 'Cidade',
                                        labelWidth: 60,
                                        flex: 3,
                                        emptyText: '',
                                        allowBlank: false
                                    }
                                    ,{
                                        itemId: 'estado',
                                        name: 'Estado',
                                        fieldLabel: 'Estado',
                                        labelWidth: 60,
                                        flex: 1,
                                        allowBlank: false
                                    }
                                    ,{
                                        itemId: 'pais',
                                        name: 'País',
                                        fieldLabel: 'Pa&iacute;s',
                                        labelWidth: 60,
                                        flex: 2,
                                        allowBlank: false
                                    }
                                ]
                            }
                        ]
                    }
                    ,{
                        itemId: 'Campos_Adic',
                        xtype: 'fieldset',
                        title: 'Institucional',
                        defaultType: 'displayField',
                        layout: 'anchor',
                        width: 700,
                        height:130,
                        minHeight: 130,
                        items: [
                            {
                                itemId: 'Campos_Inst',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'displayfield',
                                defaults: {
                                    hideLabel: 'true'
                                },
                                items: [
                                    {
                                        itemId: 'institucional',
                                        name: 'Institucional',
                                        labelWidth: 60,
                                        hideLabel: true,
                                        emptyText: '',
                                        allowBlank: false
                                    }
                                ]
                            }
                        ]
                    }
                ],

                buttons: [

                    btnSolicitarParceria,
                    {
                        itemId: 'btnCancelar',
                        text: 'Cancelar',
                        width: 120,
                        handler: function() {
                            this.ownerCt.ownerCt.hide();
                    }
                }]
        });

        var grid2 = new Ext.grid.GridPanel({
            minHeight: 130,
            hidden: true,
            store: store,
            columns: [
                {header: "Nome", width: 200, sortable: true, dataIndex: 'nomeFantasia'},
                {header: "Atividade", width: 150, sortable: true, dataIndex: 'atividade'},
                {header: "Cidade", width: 200, sortable: true, dataIndex: 'cidade'},
                {header: "Estado", width: 80, sortable: true, dataIndex: 'estado'},
                {header: "Pa&iacute;s", width: 80, sortable: true, dataIndex: 'pais'},
                {header: "Institucional", width: 0, hidden: true, sortable: true, dataIndex: 'institucional'},
                {header: "Contato", width: 0, hidden: true, sortable: true, dataIndex: 'contato'},
                {header: "E-mail", width: 0, hidden: true, sortable: true, dataIndex: 'email'},
                {header: "Telefone", width: 0, hidden: true, sortable: true, dataIndex: 'telefone'},
                {header: "ID", width: 0, hidden: true, sortable: true, dataIndex: 'id_empresa'},
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [
                    {
                        icon   : 'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                        tooltip: 'Sell stock',
                        handler: function(grid2, rowIndex, colIndex) {

                            var rec = store.getAt(rowIndex);

                            var Campos_Empresa = DetalhesEmp.getComponent( 'Campos' ).getComponent('Campos_Empresa');
                            var Campos_Contato = DetalhesEmp.getComponent( 'Campos' ).getComponent('Campos_Contato');
                            var Campos_Local = DetalhesEmp.getComponent( 'Campos' ).getComponent('Campos_Local');
                            var Campos_Inst = DetalhesEmp.getComponent( 'Campos_Adic' ).getComponent('Campos_Inst');

                            Campos_Empresa.getComponent('nomeFantasia').setValue( rec.get('nomeFantasia') );
                            Campos_Empresa.getComponent('atividade').setValue( rec.get('atividade') );
                            Campos_Empresa.getComponent('id_empresa').setValue( rec.get('id_empresa') );

                            Campos_Contato.getComponent('contato').setValue( rec.get('contato') );
                            Campos_Contato.getComponent('email').setValue( rec.get('email') );
                            Campos_Contato.getComponent('telefone').setValue( rec.get('telefone') );

                            Campos_Local.getComponent('estado').setValue( rec.get('estado') );
                            Campos_Local.getComponent('pais').setValue( rec.get('pais') );
                            Campos_Local.getComponent('cidade').setValue( rec.get('cidade') );

                            Campos_Inst.getComponent('institucional').setValue( rec.get('institucional') );
                            
                            ConsultaProdIdEmpresa = this.ownerCt.ownerCt.ownerCt.ConsultaProdIdEmpresa;
                            ConsultaProdIdEmpresaStda = rec.get('id_empresa');
                                                                                    
                            DetalhesEmp.show();
                            
                            storeSolicParc.load(
                                {params:
                                   {
                                   Op: '',
                                   idEmpSte: ConsultaProdIdEmpresa,
                                   idEmpSta: ConsultaProdIdEmpresaStda,
                                   }
                                }
                            );

                            storeSolicParc.on('load', function(s) {
                            var count = storeSolicParc.getCount();
                                
                                if (count>0){
                                    
                                    //Desativa o Botão 
                                    btnSolicitarParceria.setDisabled(true);
                                
                                }
                                else {
                                    
                                    btnSolicitarParceria.setDisabled(false);
                                    
                                }
                            });
                            
                        }
                    }]
                }

            ],
            title: 'Resultado da Consulta',

            defaults: {
                anchor: '100%'
            },
           closeAction:'hide',
           frame:true
        });

        Ext.apply(this, {
                items: [
                    {
                        itemId: 'CamposConsulta',
                        xtype: 'fieldset',
                        title: 'Consulta de Empresa',
                        defaultType: 'textfield',
                        layout: 'anchor',

                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                           {
                            itemId: 'Campos_Filtro',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Empresa',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                itemId: 'CodigoEmp',
                                fieldLabel: 'Código',
                                flex: 2,
                                emptyText: 'Código',
                                allowBlank: true,
                                hidden: true
                            }, {
                                itemId: 'NomeEmp',
                                name: 'NomeEmp',
                                fieldLabel: 'Nome Empresa',
                                flex: 3,
                                margins: '0 0 0 6',
                                emptyText: '',
                                allowBlank: true
                            }]
                        }]
                    }, grid2],

                buttons: [
                    {
                        text: 'Pesquisar',
                        width: 100,
                        icon   : 'extjs/examples/shared/icons/fam/application_go.png',
                        handler: function() {

                            store.loadData([],false);

                            var Campos_Emp = this.ownerCt.ownerCt.getComponent( 'CamposConsulta' ).getComponent('Campos_Filtro');

                            grid2.show();
                            
                            var opcao;
        
                            if (this.ownerCt.ownerCt.Op === 1)
                                opcao = 'LP';
                            else
                                opcao = 'CP';

                            store.load(
                                {params:
                                   {
                                   Op: opcao,
                                   CodigoEmp: Campos_Emp.getComponent('CodigoEmp').value,
                                   DescEmp: Campos_Emp.getComponent('NomeEmp').value
                                   }
                                }
                            );

                            store.on('load', function(s) {
                                var count = store.getCount();


                                if (count===0){
                                    Ext.MessageBox.alert('Message','Nenhum resultado encontrado!');
                                    grid2.hide();
                                }
                            });
                        }
                }]
        });
        
        grid2.show();

        var opcao;
        
        if (this.Op === 1)
            opcao = 'LP';
        else
            opcao = 'CP';

        store.load(
            {params:
               {
               Op: opcao,
               CodigoEmp: '',
               DescEmp: ''
               }
            }
        );

        store.on('load', function(s) {
            var count = store.getCount();

            if (count===0){
                Ext.MessageBox.alert('Message','Nenhum resultado encontrado!');
                grid2.hide();
            }
        });
        
        this.callParent(arguments);
     }
 });


