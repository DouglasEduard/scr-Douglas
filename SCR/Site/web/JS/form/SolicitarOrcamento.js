Ext.define('Ext.app.SolicitarOrcamento', {
    extend: 'Ext.panel.Panel',       

    SolicitarOrcIdEmpresa: 'Unknown',
    SolicitarOrcIdUsuario: 'Unknown',
    SolicitarOrcIdProduto: 'Unknown',
    sEmpresaDescr: 'Unknown',
    sProdutoDescr: 'Unknown',
    sValorUN: 'Unknown',
    
    constructor: function(Emp,Prod,value,idemp,iduser, idProd) {
       this.sEmpresaDescr = Emp;    
       this.sProdutoDescr = Prod;
       this.sValorUN = value;
       this.SolicitarOrcIdEmpresa = idemp;         
       this.SolicitarOrcIdUsuario = iduser;     
       this.SolicitarOrcIdProduto = idProd;
       this.callParent();
    },             
    
    initComponent: function(){        
       
      var Campos =   
                    {
                        itemId: 'CamposSolicOrcamento',
                        xtype: 'fieldset',
                        title: 'Solicita&ccedil;&atilde;o de Or&ccedil;amento',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        margins: '10 10 10 10',
                        items: [
                           {     
                                itemId: 'Campos_Emp_SolicOrc',
                                xtype: 'fieldcontainer',                                
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'textfield',
                                items: [{
                                    itemId: 'empresa',                                
                                    fieldLabel: 'Empresa',
                                    value: this.sEmpresaDescr,
                                    labelWidth: 50,
                                    readOnly: true,
                                    flex: 2,
                                    emptyText: '',
                                    allowBlank: true
                                }]
                            },
                            {     
                                itemId: 'Campos_Prod_SolicOrc',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'textfield',
                                items: [{
                                    itemId: 'produto',                                
                                    fieldLabel: 'Produto',
                                    labelWidth: 50,
                                    flex: 4,
                                    readOnly: true,
                                    value: this.sProdutoDescr,
                                    emptyText: '',
                                    allowBlank: true
                                }, {
                                    itemId: 'valorun',
                                    name: 'Valor',
                                    fieldLabel: 'Valor Unit&aacute;rio',
                                    flex: 2,
                                    labelAlign : 'right',
                                    value: this.sValorUN,
                                    readOnly: true,
                                    emptyText: '',
                                    allowBlank: true
                                }]
                            },
                            {
                                itemId: 'Campos_Mensagem_SolicOrc',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'textfield',
                                items: [{
                                    itemId: 'msg',
                                    xtype: 'textareafield',
                                    fieldLabel: 'Mensagem',
                                    labelAlign: 'top',
                                    flex: 1,
                                    margins: '0',
                                    allowBlank: true                                        
                                }]                                                                
                            },
                            {
                                itemId: 'Campos_Qtd_SolicOrc',
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                combineErrors: true,
                                defaultType: 'textfield',
                                items: [{
                                    itemId: 'qtd',
                                    xtype: 'numberfield',
                                    name: 'numberfield1',
                                    labelWidth: 70,
                                    fieldLabel: 'Quantidade',
                                    hideTrigger: true,
                                    value: 1,
                                    fieldStyle: 'text-align: right',
                                    minValue: 1                                      
                                }]                                                                
                            }                                                        
                        ]
                    };                
        
      Ext.apply(this, 
             {                
                closeAction:'hide',
                items: [
                    Campos
                ],                
                buttons: [                    
                    {
                        itemId: 'btnSolic',
                        text: 'Enviar',
                        width: 100,
                        icon: 'extjs/examples/shared/icons/fam/accept.png',
                        handler: function() {      
                            
                            var CompoMsg = 
                            this.ownerCt.ownerCt.getComponent( 'CamposSolicOrcamento' ).getComponent('Campos_Mensagem_SolicOrc');                            
                            
                            var CampoQuantidade = 
                            this.ownerCt.ownerCt.getComponent( 'CamposSolicOrcamento' ).getComponent('Campos_Qtd_SolicOrc');
                            
                            var msg = CompoMsg.getComponent('msg').value;
                            var qtde = CampoQuantidade.getComponent('qtd').value;                          

                            var store = Ext.create('AtualizarOrcamentoStore');                                                                                 
                            
                            var Orcamento =
                                    Ext.create('Orcamento',
                                            {
                                                id: 0,
                                                id_orcamento: 0,
                                                op: '0',       
                                                    id_usuario_origem: this.ownerCt.ownerCt.SolicitarOrcIdUsuario,
                                                id_empresa_origem: this.ownerCt.ownerCt.SolicitarOrcIdEmpresa,
                                                id_produto: this.ownerCt.ownerCt.SolicitarOrcIdProduto,
                                                texto_usuario_origem: msg,           
                                                quantidade_solicitada: qtde
                                            }
                                    );

                            store.add(Orcamento);
                            store.insert(0, Orcamento);

                            var PanelEnviaOrc = this.ownerCt;
                            
                            var btn = this;

                            PanelEnviaOrc.setLoading("Gravando dados...");

                            store.on('write', function(aStore, aOperation) {

                                var response = Ext.JSON.decode(aOperation.response.responseText, true);

                                PanelEnviaOrc.setLoading(false);

                                if ( (response[0].Code == 1) || (response[0].Code == 2) ) {

                                    Ext.Msg.alert('SCR', response[0].Msg);
                                    
                                    if (response[0].Code == 1)
                                    {
                                       btn.setDisabled(true);
                                    }
                                }
                                else {
                                    Ext.Msg.alert('SCR', 'Erro interno do Servidor!');                                    
                                }
                            });

                            store.sync();
                        }
                    }                     
                 
            ]                                
        });
                              
      this.callParent(arguments);                              
     }     
 });    


