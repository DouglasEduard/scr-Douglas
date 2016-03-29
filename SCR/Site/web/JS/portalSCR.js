Ext.define('Ext.app.PortalSCR', {
    extend: 'Ext.container.Viewport',
    uses: ['Ext.app.PortalPanel', 
           'Ext.app.NovoCadastro', 
           'Ext.app.CadastrarEmpresa',
           'Ext.app.ConsultaEmpresa',
           'Ext.app.CadastrarProduto', 
           'Ext.app.ConsultaProduto', 
           'Ext.app.ConsultaProdutoParceiro',   
           'Ext.app.ManterUsuario',
           'Ext.app.SolicitarOrcamento',
           'Ext.app.ManterMensagem'],
       
    name: 'Unknown',
    PortalSCRIdUser: 'Unknown',
    PortalSCRIdEmp: 'Unknown',   
    PortalSCRNomeEmp: 'Unknown',
    
    constructor: function(name,user,emp,nomeemp) {
       this.name = name;
       this.PortalSCRIdUser = user;
       this.PortalSCRIdEmp = emp;
       this.PortalSCRNomeEmp = nomeemp;
       this.callParent();
    },      
    
    initComponent: function() {
        
        var htmlLogin =  
        
        "<div align='right'>" +        
        "<form style='padding: 5px 5px;' name='form_login' id='form_login' method='POST' action='SVL_Login'>" +       
           "<ul id='subform'>" +  
           //"<label style='margin: 0px 400px; height: 20px; text-  align: center;'>SupplyMe</label>" +
           "<label style='width: 140px; height: 20px; text-align: right;'>Bem vindo " + this.name + " - " + this.PortalSCRNomeEmp + "</label>" +         
           "<input " +
           "style=" +
           "' margin: 10px 10px; width: 70px; height: 35px; font-size: 14pt; color: #eaeaea; background-color: #528ecc; " +            
           "id='form_submit' type='submit' value='Sair'/>" +
        "</ul>" +
        "</form>" +
        "</div>";                
        
        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0 0 0 0'
            },
            items: [{
                    id: 'app-header',
                    xtype: 'box',
                    region: 'north',
                    autoHeight: true,
                    html: htmlLogin
                },
                {
                    id: 'SCRBody',
                    xtype: 'container',
                    region: 'center',
                    layout: 'border',
                    items: [{
                            id: 'app-options',
                            title: 'Menu',
                            region: 'west',
                            animCollapse: true,
                            //disabled: true,
                            hidden: false,
                            width: 200,
                            minWidth: 2,
                            maxWidth: 200,
                            split: true,
                            collapsible: true,
                            layout: 'accordion',
                            layoutConfig: {
                                animate: true
                            },
                            items: [{
                                    id: 'SCRMenuOp',
                                    title: 'Neg&oacute;cios',
                                    autoScroll: false,
                                    border: false,
                                    iconCls: 'nav',
                                    items: [
                                        Ext.create('Ext.menu.Menu', {
                                            id: 'SCRMenu_Items01',
                                            width: 200,
                                            height: 138,
                                            plain: false,
                                            floating: false,
                                            items: [{
                                                    id: 'SCRMenu_ConsultaEmpresa',
                                                    width: 200,
                                                    text: 'Localizar Empresas',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIConsultaEmpresaCreate,this)
                                                    }
                                                },{
                                                    id: 'SCRMenu_ConsultaProdParceiro',
                                                    width: 200,
                                                    text: 'Localizar Produtos',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIConsultaProdutoParceiroCreate,this)                                                                           
                                                    }
                                                },
                                                {
                                                    id: 'SCRMenu_ConsultaOrcamentos',
                                                    width: 200,
                                                    text: 'Or&ccedil;amentos',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIOrcamentoCreate,this)                                                                           
                                                    }
                                                },
                                                {
                                                    id: 'SCRMenu_ConsultaOrcamentosSolicitados',
                                                    width: 200,
                                                    hidden: true,
                                                    text: 'Or&ccedil;amentos',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIOrcamentoCreate,this)                                                                           
                                                    }
                                                },                                                
                                                {
                                                    id: 'SCRMenu_ManterMensagens',
                                                    width: 200,
                                                    text: 'Mensagens',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIMensagemCreate,this)                                                                           
                                                    }
                                                }                                                
                                            ]
                                        })
                                    ]
                                }, {
                                    title: 'Cadastro',
                                    id: 'SCRMenuConfig',
                                    items: [
                                        Ext.create('Ext.menu.Menu', {
                                            id: 'SCRMenu_Items02',
                                            width: 200,
                                            height: 160,
                                            plain: false,
                                            floating: false,
                                            items: [{
                                                    id: 'SCRMenu_CadastrarEmpresa',
                                                    width: 200,
                                                    text: 'Perfil da Empresa',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUICadastrarEmpresaCreate, this)
                                                    }
                                                },{
                                                    id: 'SCRMenu_ConsultaEmpresaParceira',
                                                    width: 200,
                                                    text: 'Empresas Parceiras',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIConsultaEmpresaParceiraCreate,this)                                                                           
                                                    }
                                                },{
                                                    id: 'SCRMenu_CadProd',
                                                    width: 200,
                                                    text: 'Cadastrar Produtos',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUICadastrarProdutoCreate, this)
                                                    }
                                                }, {
                                                    id: 'SCRMenu_ConsultaProd',
                                                    width: 200,
                                                    text: 'Consultar Meus Produtos',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIConsultaProdutoCreate, this)
                                                    }
                                                }, {                                                    
                                                    id: 'SCRMenu_ManterUsuario',
                                                    width: 200,
                                                    text: 'Usu&aacute;rios',
                                                    listeners: {
                                                        'Click': Ext.bind(this.GUIConsultaUsuarioCreate, this)
                                                    }
                                                }
                                            ]
                                        })
                                    ],
                                    border: false,
                                    autoScroll: true,
                                    iconCls: 'settings'
                                }]
                        },
                        {
                            id: 'portalSRC_Body',
                            xtype: 'portalpanel',
                            //bodyStyle: 'background-image:url(Imagens/icone_JPG.jpg);background-repeat:no-repeat;background-position:center;',
                            region: 'center',
                            items: [
                                {
                                   id: 'windowportletSCR',
                                    items: [
                                    ]
                                }]
                        }]
                }]
        });

        this.callParent(arguments);
    },
    
    GUICadastrarProdutoCreate: function() {
        var CadastrarProduto =
                {
                    id: 'portletPrduto',
                    title: 'Cadastro de Produto',
                    region: 'center',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUICadastrarProdutoClose, this)
                    },
                    items:
                            Ext.create('Ext.app.CadastrarProduto')
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');

        SCRWindows.add(CadastrarProduto);

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_CadProd').disable();
    },
    
    GUICadastrarProdutoClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_CadProd').enable();
    },
    
    GUIConsultaProdutoCreate: function() {
        var ConsultaProdProduto =
                {
                    id: 'portletConsulta',
                    title: 'Consulta de Produto',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUIConsultaProdutoClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ConsultaProduto')
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRWindows.add(ConsultaProdProduto);

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_ConsultaProd').disable();
    },
    
    GUIConsultaProdutoClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_ConsultaProd').enable();
    },
    
    GUIConsultaUsuarioCreate: function() {
        var ConsultaUsuario =
                {
                    id: 'portletManterUsuario',
                    title: 'Consulta de Usu&aacute;rios',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUIConsultaUsuarioClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ManterUsuario')
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');

        SCRWindows.add(ConsultaUsuario);

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_ManterUsuario').disable();
    },    
    
    GUIConsultaUsuarioClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_ManterUsuario').enable();
    },    
    
    GUICadastrarEmpresaCreate: function() {
        var CadastraEmp =
                {
                    id: 'portletEmpresa',
                    title: 'Cadastro de Empresa',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUICadastrarEmpresaClose, this)
                    },
                    items:
                            Ext.create('Ext.app.CadastrarEmpresa')
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');


        SCRWindows.add(CadastraEmp);

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_CadastrarEmpresa').disable();
    },
    GUICadastrarEmpresaClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_CadastrarEmpresa').enable();
    },
    
    GUIConsultaEmpresaCreate: function() {

        var ConsultaEmpresa =
                {
                    id: 'portletConsultaEmpresa',
                    title: 'SupplyMe - Localiza&ccedil;&atilde;o de Empresas',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUIConsultaEmpresaClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ConsultaEmpresa',
                                                      this.PortalSCRIdEmp,
                                                      this.PortalSCRIdUser,0)
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');
            
        SCRWindows.add(ConsultaEmpresa);
        
        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ConsultaEmpresa').disable();
        
    },
    
    GUIConsultaEmpresaParceiraCreate: function() {
              
        var ConsultaEmpresa =
                {
                    id: 'portletConsultaEmpresa',
                    title: 'SupplyMe - Empresas Parceiras',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUIConsultaEmpresaParceiraClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ConsultaEmpresa',
                                                      this.PortalSCRIdEmp,
                                                      this.PortalSCRIdUser,1)
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');
        
        SCRWindows.add(ConsultaEmpresa);
        
        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_ConsultaEmpresaParceira').disable();
        
    },
    
    GUIConsultaEmpresaClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ConsultaEmpresa').enable();
    },
    
    GUIConsultaEmpresaParceiraClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuConfig');

        SCRMenu.getComponent('SCRMenu_Items02').getComponent('SCRMenu_ConsultaEmpresaParceira').enable();
    },
    
    GUIConsultaProdutoParceiroCreate: function() {
        var ConsultaProdutoParceiro =
                {
                    id: 'portletConsultaProdParceiro',
                    title: 'SupplyMe - Localiza&ccedil;&atilde;o de Produtos',
                    minWidth: 400,
                    maxWidth: 800,
                    listeners: {
                        'close': Ext.bind(this.GUIConsultaProdutoParceiroClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ConsultaProdutoParceiro',
                                                      this.PortalSCRIdEmp,
                                                      this.PortalSCRIdUser)
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRWindows.add(ConsultaProdutoParceiro);

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ConsultaProdParceiro').disable();
    },
    
    GUIConsultaProdutoParceiroClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ConsultaProdParceiro').enable();
    },
        
    GUIOrcamentoCreate: function() {
        var ConsultaOrcamento =
                {
                    id: 'portletConsultaOrcamento',
                    title: 'SupplyMe - Consulta de Or&ccedil;amentos',
                    minWidth: 400,
                    maxWidth: 650,
                    listeners: {
                        'close': Ext.bind(this.GUIOrcamentoClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ElaborarOrcamento',
                                                      this.PortalSCRIdEmp,
                                                      this.PortalSCRIdUser,
                                                      this.name)
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRWindows.add(ConsultaOrcamento);

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ConsultaOrcamentos').disable();
    },    
    
    GUIOrcamentoClose: function() {                
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ConsultaOrcamentos').enable();
    },    
    
    GUIMensagemCreate: function() {
        var ConsultaMensagens =
                {
                    id: 'portletConsultaMensagens',
                    title: 'SupplyMe - Consulta de Mensagens',
                    minWidth: 400,
                    maxWidth: 650,
                    listeners: {
                        'close': Ext.bind(this.GUIMensagensClose, this)
                    },
                    items:
                            Ext.create('Ext.app.ManterMensagem',
                                                      this.PortalSCRIdEmp,
                                                      this.PortalSCRIdUser)
                };

        var SCRWindows = this.getComponent('SCRBody').getComponent('portalSRC_Body').getComponent('windowportletSCR');
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRWindows.add(ConsultaMensagens);

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ManterMensagens').disable();
    },    
    
    GUIMensagensClose: function() {
        var SCRMenu = this.getComponent('SCRBody').getComponent('app-options').getComponent('SCRMenuOp');

        SCRMenu.getComponent('SCRMenu_Items01').getComponent('SCRMenu_ManterMensagens').enable();
    },          
    
    
    showMsg: function(msg) {
        var el = Ext.get('app-msg'),
                msgId = Ext.id();

        this.msgId = msgId;
        el.update(msg).show();

        Ext.defer(this.clearMsg, 3000, this, [msgId]);
    },
    clearMsg: function(msgId) {
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
});

