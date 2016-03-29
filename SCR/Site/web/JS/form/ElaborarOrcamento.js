Ext.define('Ext.app.ElaborarOrcamento', {
    extend: 'Ext.panel.Panel',
    ElaborarOrcIdEmpresa: 'Unknown',
    ElaborarOrcIdUsuario: 'Unknown',
    ElaborarOrcIdProduto: 'Unknown',
    sEmpresaDescr: 'Unknown',
    sUsuarioDescr: 'Unknown',
    sProdutoDescr: 'Unknown',
    sValorUN: 'Unknown',
    constructor: function(Emp, Prod, userDescr) {
        this.sEmpresaDescr = Emp;
        this.sProdutoDescr = Prod;
        this.sUsuarioDescr = userDescr;
        this.callParent();
    },
    
    initComponent: function() {


        var FuncValores =
                {
                  CalculaTotal: function(Det) 
                    {
                        var Campo_Qtd_User = Det.getComponent('CamposSolicOrcamento').getComponent('Campos_Qtd_SolicOrc');
                        var Campo_Elab = Det.getComponent('CamposElabOrcamento').getComponent('Campos_Detalhes_ElabOrc').getComponent('Campo_Valores_ElabOrc');
                        var Campo_Elab_Totais = Det.getComponent('CamposElabOrcamento').getComponent('Campos_Detalhes_ElabOrc').getComponent('CamposTotalOrcamento');
                        
                        //Produto
                        var valoresElabProd = 
                            Campo_Elab.getComponent('Campo_ValoresProd_ElabOrc');                                                              
                        var valortotalprod = valoresElabProd.getComponent('ValorProdUN').getValue().replace(',','') * Campo_Qtd_User.getComponent('qtd').getValue(); 
                        valortotalprod = valortotalprod.toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');          
                        
                        valoresElabProd.getComponent('ValorProdTotal').setValue( valortotalprod );
                        
                        //Serviço
                        var valoresElabServico =
                            Campo_Elab.getComponent('Campo_ValoresServico_ElabOrc');
                        var ValorServico = valoresElabServico.getComponent('ValorServ').getValue() * Campo_Qtd_User.getComponent('qtd').getValue();   
                        ValorServico = ValorServico.toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');
                        valoresElabServico.getComponent('ValorServTotal').setValue( ValorServico );
                        
                        //Frete
                        var frete = 
                            Campo_Elab.getComponent('Campo_ValorFrete_ElabOrc').getComponent('ValorFrete').getValue();                                
                                
                        if ( (frete=='') || (frete=='0.00') || (frete==null) )
                            frete = 0;
                        
                        
                        /////////////Total Geral
                        
                        //Produto
                        var totalgeralprod = 0;                        
                        var descontoprod = ( ( valoresElabProd.getComponent('ValorProdDesconto').getValue() * valortotalprod ) / 100 );
                        totalgeralprod = 
                        (valortotalprod - descontoprod).toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');                                         
                        Campo_Elab_Totais.getComponent('TotalProd').setValue( totalgeralprod );

                        //Serviço
                        var totalgeralserv = 0;                        
                        var descontoserv = ( ( valoresElabServico.getComponent('ValorServDesconto').getValue() * ValorServico ) / 100 );
                        totalgeralserv = 
                        (ValorServico - descontoserv).toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');
                        Campo_Elab_Totais.getComponent('TotalServ').setValue( totalgeralserv );
                                                                      
                        //Total Geral
                        var totalgeralorc = (
                                              parseFloat(totalgeralprod) + 
                                              parseFloat(totalgeralserv) +
                                              parseFloat(frete)
                                            );                                                       
                        
                        totalgeralorc = totalgeralorc.toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');
                        Campo_Elab_Totais.getComponent('TotalGeral').setValue( totalgeralorc );
                    }                    
                };
        
        var storegrid = new Ext.data.Store({
            extend: 'Ext.data.Store',
            model: 'Orcamento',
            baseParams: {
                Op: '',
                CodigoProd: '',
                DescProd: ''
            },
            proxy: {
                type: 'ajax',
                url: 'SVL_Orcamento',
                noCache: false,
                reader: new Ext.data.JsonReader({
                    totalProperty: 'total',
                    type: 'json',
                    root: 'Orcamento'
                }),
                writer: {
                    type: 'json',
                    root: 'Orcamento',
                    writeAllFields: true,
                    encode: true
                }
            },
            autoLoad: false
        });
        
        
        var btnConcluirOrcamento = Ext.create("Ext.Button", 
                         {
                             text: 'Enviar Or&ccedil;amento',
                             width: 140,
                             icon   : 'extjs/examples/shared/icons/fam/application_go.png',
                             handler: function() {                                                                
                                 
                                    var Campos_ElabCab_Enviar = DetalhesOrcamento.getComponent('CamposElabOrcamento').getComponent('Campos_Cab_ElabOrc');
                                    var Campo_Elab_Enviar = DetalhesOrcamento.getComponent('CamposElabOrcamento').getComponent('Campos_Detalhes_ElabOrc').getComponent('Campo_Valores_ElabOrc');

                                    var store = Ext.create('AtualizarOrcamentoStore');                

                                    store.getProxy().extraParams.op = 'ElabOrcSave';
                                    store.getProxy().extraParams.id_orcamento = Campos_ElabCab_Enviar.getComponent('idOrc').getValue();


                                    var ValorFrete = "0";
                                    var ValorDescontoProd = "0";
                                    var ValorDescontoServ = "0";
                                    var ValorServUnitario = "0";
                                    var ValorServTotal = "0";
                                    
                                    if ( (Campo_Elab_Enviar.getComponent('Campo_ValorFrete_ElabOrc').getComponent('ValorFrete').getValue()!='') &&
                                         (Campo_Elab_Enviar.getComponent('Campo_ValorFrete_ElabOrc').getComponent('ValorFrete').getValue()!=null )){
                                         ValorFrete = Campo_Elab_Enviar.getComponent('Campo_ValorFrete_ElabOrc').getComponent('ValorFrete').getValue();
                                    }
                                    
                                    if ( (Campo_Elab_Enviar.getComponent('Campo_ValoresProd_ElabOrc').getComponent('ValorProdDesconto').getValue()!='') &&
                                         (Campo_Elab_Enviar.getComponent('Campo_ValoresProd_ElabOrc').getComponent('ValorProdDesconto').getValue()!=null )){
                                         ValorDescontoProd = Campo_Elab_Enviar.getComponent('Campo_ValoresProd_ElabOrc').getComponent('ValorProdDesconto').getValue();
                                    }
                                    
                                    if ( (Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServDesconto').getValue()!="") &&
                                         (Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServDesconto').getValue()!=null )){
                                         ValorDescontoServ = Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServDesconto').getValue();
                                    }   
                                    
                                    if ( (Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServ').getValue()!="") &&
                                         (Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServ').getValue()!=null )){
                                         ValorServUnitario = Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServ').getValue();
                                    }     
                                    
                                    if ( (Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServTotal').getValue()!="") &&
                                         (Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServTotal').getValue()!=null )){
                                         ValorServTotal = Campo_Elab_Enviar.getComponent('Campo_ValoresServico_ElabOrc').getComponent('ValorServTotal').getValue();
                                    }                                        
                                    
                                    
                                    store.getProxy().extraParams.op = 'ElabOrcSave';
                                    
                                    var Orc =
                                            Ext.create('Orcamento',
                                                    {
                                                        id: 0,
                                                        id_orcamento: Campos_ElabCab_Enviar.getComponent('idOrc').getValue(),
                                                        op: 0,
                                                        id_usuario_origem: 0,
                                                        valorunidade_produto: Campo_Elab_Enviar.getComponent('Campo_ValoresProd_ElabOrc').getComponent('ValorProdUN').getValue(),
                                                        valortotal_produto: Campo_Elab_Enviar.getComponent('Campo_ValoresProd_ElabOrc').getComponent('ValorProdTotal').getValue(),
                                                        valordesconto_produto: ValorDescontoProd,
                                                        valorfrete: ValorFrete,
                                                        valorunidade_maoobra: ValorServUnitario,
                                                        valortotal_maoobra: ValorServTotal,
                                                        valordesconto_maoobra: ValorDescontoServ,
                                                        texto_usuario_destino: DetalhesOrcamento.getComponent('ElabResposta').getComponent('msgResposta').getValue()
                                                    }
                                            );

                                    store.add(Orc);
                                    store.insert(0, Orc);

                                    var PanelGravaProd = this.ownerCt.ownerCt;

                                    PanelGravaProd.setLoading("Gravando dados...");

                                    store.on('write', function(aStore, aOperation) {

                                        var response = Ext.JSON.decode(aOperation.response.responseText, true);

                                        PanelGravaProd.setLoading(false);

                                        if (response[0].Code == 1) {
                                            Ext.Msg.alert('SCR', 'Dados atualizados com sucesso!');
                                            DetalhesOrcamento.close();
                                            win.close();
                                        }
                                        else {
                                            if (response[0].Code == 2){
                                                Ext.Msg.alert('SCR', response[0].Msg);                                                
                                            }
                                            else {
                                                Ext.Msg.alert('SCR', 'Erro interno do Servidor!');
                                            }
                                        }
                                    });

                                    store.sync();
                             }                    
                     }            
        );        
        
        var gridOrc = new Ext.grid.GridPanel({
            id: 'gridOrc',
            minHeight: 130,
            disableSelection: true,
            store: storegrid,                                  
            stripeRows: true,
            viewConfig: {
             getRowClass: function(record, rowIndex, rowParams, store) {
              if ( (record.get('id_usuario_elaboracao') == null) || (record.get('id_usuario_elaboracao') == 0) )
                   return 'red-row';
             }
            },            
            
            columns: [
                {header: "ID", width: 20, sortable: true, dataIndex: 'id_orcamento'},
                {header: "id_usuario_elaboracao", width: 20, sortable: true, dataIndex: 'id_usuario_elaboracao', hidden: true},
                {header: "Empresa", width: 200, sortable: true, dataIndex: 'empresa_origem_descr'},
                {header: "Descri&ccedil;&atilde;o", width: 300, sortable: true, dataIndex: 'produto_descr'},
                {header: "Quantidade Solicitada", width: 120, sortable: true, align: "right", dataIndex: 'quantidade_solicitada'},
                {header: "Valor Informado", width: 90, sortable: true,  align: "right", dataIndex: 'valorunidade_produto' , xtype: 'numbercolumn',  format:'0.00' },
                {
                    xtype: 'actioncolumn',
                    width: 40,
                    items: [
                        {
                            icon: 'extjs/examples/shared/icons/fam/cog_edit.png', // Use a URL in the icon config
                            tooltip: 'Sell stock',
                            handler: function(grid, rowIndex, colIndex) {
                                
                                var rec = storegrid.getAt(rowIndex);                                                                                                                                
                                
                                var bConcluido =
                                ( (rec.get('id_usuario_elaboracao') != null) && (rec.get('id_usuario_elaboracao').toString() != '0') );                                
                                
                                var storeDet = new Ext.data.Store({
                                        extend: 'Ext.data.Store',
                                        model: 'Orcamento',
                                        baseParams: {
                                            Op: '',
                                            CodigoProd: '',
                                            DescProd: ''
                                        },
                                        proxy: {
                                            type: 'ajax',
                                            url: 'SVL_Orcamento',
                                            noCache: false,
                                            reader: new Ext.data.JsonReader({
                                                totalProperty: 'total',
                                                type: 'json',
                                                root: 'Orcamento'
                                            }),
                                            writer: {
                                                type: 'json',
                                                root: 'Orcamento',
                                                writeAllFields: true,
                                                encode: true
                                            }
                                        },
                                        autoLoad: false
                                    });
                                    
                                storeDet.load(
                                    {params:
                                       {                                   
                                          Op: 'Elab',
                                          idEmpresaSolic: -1,
                                          DataIni: '',
                                          DataFin: '',
                                          OrcamentoID: rec.get('id_orcamento')
                                       }                                   
                                    }
                                );   

                                storeDet.on('load', function(r) {

                                    var count = storeDet.getCount(); 
                                                                        

                                    if (count===0){
                                        Ext.MessageBox.alert('Message','Ocorreu erro na solicitação!');
                                    }
                                    else
                                    {     
                                        var today = new Date();
                                        var dd = today.getDate();
                                        var mm = today.getMonth()+1; //January is 0!
                                        var yyyy = today.getFullYear();
                                        today = dd+'/'+mm+'/'+yyyy;
                                        
                                        var result = storeDet.getAt(0);
                                        
                                        var Campo_Empresa = DetalhesOrcamento.getComponent('CamposSolicOrcamento').getComponent('Campos_Emp_SolicOrc');                                        
                                        Campo_Empresa.getComponent('empresa').setValue(result.get('empresa_origem_descr'));
                                        
                                        var Campo_Prod = DetalhesOrcamento.getComponent('CamposSolicOrcamento').getComponent('Campos_Prod_SolicOrc');
                                        Campo_Prod.getComponent('produto').setValue(result.get('produto_descr'));
                                        
                                        var valorunitario = result.get('valorunidade_produto').toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');
                                        var valortotalprod = result.get('valortotal_produto').toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');                                        
                                        var valordescontoprod = result.get('valordesconto_produto').toFixed(1).replace(/\d(?=(\d{3})+\,)/g, '$&.');
                                        
                                        Campo_Prod.getComponent('valorun').setValue(valorunitario);                                        
                                        
                                        var Campo_MensagemOrigem = DetalhesOrcamento.getComponent('CamposSolicOrcamento').getComponent('Campos_Mensagem_SolicOrc');
                                        Campo_MensagemOrigem.getComponent('msg').setValue(result.get('texto_usuario_origem'));
                                        
                                        
                                        var Campo_Qtd_User = DetalhesOrcamento.getComponent('CamposSolicOrcamento').getComponent('Campos_Qtd_SolicOrc');                                                                                                                                                                                                                             
                                        Campo_Qtd_User.getComponent('qtd').setValue(result.get('quantidade_solicitada'));
                                        Campo_Qtd_User.getComponent('ususolic').setValue(result.get('usuario_origem_nome'));
                                                                                
                                        var Campos_Elaborac = DetalhesOrcamento.getComponent('CamposElabOrcamento').getComponent('Campos_Cab_ElabOrc');                                        
                                        Campos_Elaborac.getComponent('idOrc').setValue(result.get('id_orcamento'));                                                                            
                                        Campos_Elaborac.getComponent('userElab').setValue(result.get('usuario_elaboracao_nome'));                                                                                                                        
                                        Campos_Elaborac.getComponent('dtOrc').setValue(today);
                                        
                                        var Campo_Elab_Prod = DetalhesOrcamento.getComponent('CamposElabOrcamento')
                                                                                    .getComponent('Campos_Detalhes_ElabOrc')
                                                                                               .getComponent('Campo_Valores_ElabOrc')
                                                                                                      .getComponent('Campo_ValoresProd_ElabOrc'); 
                                                                               
                                        Campo_Elab_Prod.getComponent('ValorProdUN').setValue(valorunitario);                                        
                                        Campo_Elab_Prod.getComponent('ValorProdTotal').setValue(valortotalprod);                                         
                                        Campo_Elab_Prod.getComponent('ValorProdDesconto').setValue(valordescontoprod); 

                                        var Campo_Elab_Servico = DetalhesOrcamento.getComponent('CamposElabOrcamento')
                                                                                    .getComponent('Campos_Detalhes_ElabOrc')
                                                                                               .getComponent('Campo_Valores_ElabOrc')
                                                                                                      .getComponent('Campo_ValoresServico_ElabOrc'); 


                                        var valoruniserv = result.get('valorunidade_maoobra').toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');
                                        var valortotalserv = result.get('valortotal_maoobra').toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');                                        
                                        var valordescontoserv = result.get('valordesconto_maoobra').toFixed(1).replace(/\d(?=(\d{3})+\,)/g, '$&.');                                        

                                        Campo_Elab_Servico.getComponent('ValorServ').setValue(valoruniserv);
                                        Campo_Elab_Servico.getComponent('ValorServTotal').setValue(valortotalserv);                                         
                                        Campo_Elab_Servico.getComponent('ValorServDesconto').setValue(valordescontoserv);                                         

                                        
                                        var Campo_Elab_Frete = DetalhesOrcamento.getComponent('CamposElabOrcamento')
                                                                                    .getComponent('Campos_Detalhes_ElabOrc')
                                                                                               .getComponent('Campo_Valores_ElabOrc')
                                                                                                      .getComponent('Campo_ValorFrete_ElabOrc');                                         
                                         
                                        var valorfrete = result.get('valorfrete').toFixed(2).replace(/\d(?=(\d{3})+\,)/g, '$&.');  
                                        
                                        Campo_Elab_Frete.getComponent('ValorFrete').setValue(valorfrete);
                                                                                
                                        var Campo_Elab_Resposta = DetalhesOrcamento.getComponent('ElabResposta');
                                        Campo_Elab_Resposta.getComponent('msgResposta').setValue(result.get('texto_usuario_destino'));
                                        
                                        FuncValores.CalculaTotal(DetalhesOrcamento);                                                                                  
                                        
                                        if ( bConcluido )
                                        {
                                            Campo_Elab_Prod.getComponent('ValorProdUN').setReadOnly(true);
                                            Campo_Elab_Prod.getComponent('ValorProdTotal').setReadOnly(true);
                                            Campo_Elab_Prod.getComponent('ValorProdDesconto').setReadOnly(true);
                                            
                                            Campo_Elab_Servico.getComponent('ValorServ').setReadOnly(true);                                        
                                            Campo_Elab_Servico.getComponent('ValorServTotal').setReadOnly(true);                                         
                                            Campo_Elab_Servico.getComponent('ValorServDesconto').setReadOnly(true); 
                                            
                                            Campo_Elab_Frete.getComponent('ValorFrete').setReadOnly(true); 
                                            
                                            Campo_Elab_Resposta.getComponent('msgResposta').setReadOnly(true);
                                        }
                                        else
                                        {
                                            Campo_Elab_Prod.getComponent('ValorProdUN').setReadOnly(false);
                                            Campo_Elab_Prod.getComponent('ValorProdTotal').setReadOnly(false);
                                            Campo_Elab_Prod.getComponent('ValorProdDesconto').setReadOnly(false);
                                            
                                            Campo_Elab_Servico.getComponent('ValorServ').setReadOnly(false);                                        
                                            Campo_Elab_Servico.getComponent('ValorServTotal').setReadOnly(false);                                         
                                            Campo_Elab_Servico.getComponent('ValorServDesconto').setReadOnly(false); 
                                            
                                            Campo_Elab_Frete.getComponent('ValorFrete').setReadOnly(false); 
                                            
                                            Campo_Elab_Resposta.getComponent('msgResposta').setReadOnly(false);                                                                                       
                                        }
                                    }
                                });                                                                    

                                if (bConcluido){
                                   btnConcluirOrcamento.setVisible(false);
                                }
                                else {
                                    btnConcluirOrcamento.setVisible(true);
                                }
                                
                                DetalhesOrcamento.show();                                                                
                            }
                        }]
                }

            ],
            title: 'Resultado da Consulta',
            defaults: {
                anchor: '100%'
            },
            closeAction: 'hide',
            frame: true
        });


        var win = Ext.create('Ext.window.Window', {
              closeAction:'hide', 
             //modal:true,
             //closable:false,
             //tbar: [{    
             //      text:'hide',
             //      handler:function(){
             //          this.up('window').hide();
             //      }
             // }],              
              id: 'windoworc',
              title: 'SCR System',
              width: 800,
              height:400,
              minWidth: 300,
              minHeight: 130,
              layout: 'fit',
              plain: true,
              items: gridOrc
          });        

        DetalhesOrcamento = Ext.create('Ext.window.Window', {
            title: 'SupplyMe - Elabora&ccedil;&atilde;o de Or&ccedil;amento',
            closeAction: 'hide',
            width: 750,
            height: 600,
            items: [
                      {
                    itemId: 'CamposSolicOrcamento',
                    xtype: 'fieldset',
                    margins: '5 5 5 5',
                    title: 'Solicita&ccedil;&atilde;o',
                    defaultType: 'textfield',                    
                    items: [
                        {
                            itemId: 'Campos_Emp_SolicOrc',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'displayfield',
                            items: [{
                                    itemId: 'empresa',
                                    fieldLabel: 'Empresa',
                                    value: '',
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
                            items: [{
                                    xtype: 'displayfield',
                                    itemId: 'produto',
                                    fieldLabel: 'Produto',
                                    labelWidth: 50,
                                    flex: 4,
                                    readOnly: true,
                                    value: '',
                                    emptyText: '',
                                    allowBlank: true
                                }, {
                                    xtype: 'displayfield',
                                    itemId: 'valorun',
                                    name: 'Valor',
                                    fieldLabel: 'Valor Unit&aacute;rio',
                                    flex: 2,
                                    labelAlign: 'right', 
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
                                    fieldLabel: 'Mensagem do Solicitante',
                                    labelAlign: 'top',
                                    height: 110,
                                    readOnly: true,
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
                            items: [{
                                    itemId: 'qtd',
                                    xtype: 'displayfield',
                                    name: 'qtdsolic',
                                    labelWidth: 125,                                    
                                    hideTrigger: true,
                                    readOnly: true,
                                    fieldLabel: 'Quantidade Solicitada',
                                    fieldStyle: 'text-align: right',
                                    minValue: 1
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'ususolic',                                    
                                    labelWidth: 170,
                                    hideTrigger: true,
                                    fieldLabel: 'Usu&aacute;rio Solicitante',
                                    labelAlign : 'right',                                    
                                    minValue: 1
                                }                            
                            ]
                        }
                    ]
                },
                      {
                        itemId: 'CamposElabOrcamento',
                        xtype: 'fieldset',
                        title: 'Elabora&ccedil;&atilde;o',
                        margins: '5 5 5 5',
                        defaultType: 'textfield',                    
                        items: [
                                {
                                    itemId: 'Campos_Cab_ElabOrc',
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    combineErrors: true,                                    
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'idOrc',
                                            margins: '10 0 0 0',
                                            hideTrigger: true,
                                            readOnly: true,
                                            labelWidth: 20,
                                            Width: 50,
                                            flex: 1,
                                            fieldLabel: 'ID',
                                            emptyText: ''
                                        },
                                        {
                                            xtype: 'displayfield',
                                            itemId: 'userElab',
                                            fieldLabel: 'Usu&aacute;rio Or&ccedil;amento',
                                            margins: '10 0 0 0',
                                            value: '',
                                            labelWidth: 110,
                                            readOnly: true,
                                            flex: 1,
                                            emptyText: '',
                                            labelAlign: 'right',
                                            allowBlank: true
                                        },
                                        {
                                            xtype: 'displayfield',
                                            margins: '10 0 0 0',
                                            flex: 1,
                                            labelAlign: 'right',
                                            fieldLabel: 'Data Or&ccedil;amento',
                                            name: 'dtOrc',
                                            itemId: 'dtOrc'
                                        }]    
                                },
                                {
                                    itemId: 'Campo_Descricao_ElabOrc',
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    hidden: true,
                                    combineErrors: true,                                    
                                    defaultType: 'textfield',  
                                    items:
                                    [
                                        {
                                           itemId: 'DescrProdServ',
                                           fieldLabel: 'Produto/Servi&ccedil;o',
                                           value: '',
                                           flex: 2,
                                           readOnly: true,
                                           emptyText: '',
                                           allowBlank: true
                                        }                                        
                                    ]
                                },
                                {
                                    itemId: 'Campos_Detalhes_ElabOrc',
                                    xtype: 'fieldcontainer',
                                    layout: 'hbox',
                                    combineErrors: true,
                                    
                                    defaultType: 'textfield',                        
                                    items: [
                                        {                                            
                                            itemId: 'Campo_Valores_ElabOrc',
                                            xtype: 'fieldcontainer',
                                            layout: 'anchor',
                                            flex: 2,
                                            margins: '10 0 0 0',                                            
                                            combineErrors: true,
                                            defaultType: 'textfield',
                                            defaults: {
                                                anchor: '100%'
                                            },                                            
                                            items: [
                                                     {
                                                        itemId: 'Campo_ValoresProd_ElabOrc',
                                                        xtype: 'fieldcontainer',
                                                        layout: 'hbox',
                                                        combineErrors: true,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                itemId: 'ValorProdUN',
                                                                fieldLabel: 'Valor (UN)',
                                                                value: '',
                                                                labelWidth: 90,    
                                                                readOnly: false,
                                                                flex: 2,
                                                                emptyText: '0.00',
                                                                allowBlank: false,
                                                                maskre: /^\d+(.\d+){0,1}$/,
                                                                regex: /^\d+(.\d+){0,1}$/,
                                                                regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.',
                                                                listeners: {
                                                                    blur: function(d) {                                                                        
                                                                        FuncValores.CalculaTotal(DetalhesOrcamento);
                                                                    }                                                                
                                                                }
                                                            },
                                                            {
                                                                xtype: 'displayfield',
                                                                itemId: 'ValorProdTotal',
                                                                fieldLabel: 'Valor Total',
                                                                value: '',
                                                                labelWidth: 90,    
                                                                flex: 2,
                                                                labelAlign: 'right',
                                                                readOnly: true,
                                                                emptyText: '0.00',
                                                                regex: /^\d+(.\d+){0,1}$/,
                                                                allowBlank: true                                                                
                                                            },
                                                            {
                                                                itemId: 'ValorProdDesconto',
                                                                fieldLabel: 'Desconto (%)',
                                                                value: '',
                                                                labelWidth: 90,   
                                                                labelAlign: 'right',
                                                                flex: 2,
                                                                readOnly: false,
                                                                emptyText: '0.0',
                                                                allowBlank: true ,
                                                                maskre: /^\d+(.\d+){0,1}$/,
                                                                regex: /^\d+(.\d+){0,1}$/,
                                                                regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.',
                                                                listeners: {
                                                                    blur: function(d) {                                                                        
                                                                        FuncValores.CalculaTotal(DetalhesOrcamento);
                                                                    }                                                                
                                                                }                                                                
                                                            }                                                                                                                                                                                    
                                                        ]
                                                     },
                                                     {
                                                        itemId: 'Campo_ValoresServico_ElabOrc',
                                                        xtype: 'fieldcontainer',
                                                        layout: 'hbox',
                                                        combineErrors: true,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                itemId: 'ValorServ',
                                                                fieldLabel: 'Servi&ccedil;o (UN)',
                                                                value: '',
                                                                labelWidth: 90,    
                                                                readOnly: false,
                                                                flex: 2,
                                                                emptyText: '',
                                                                allowBlank: true,
                                                                maskre: /^\d+(.\d+){0,1}$/,
                                                                regex: /^\d+(.\d+){0,1}$/,
                                                                regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.',
                                                                listeners: {
                                                                    blur: function(d) {                                                                        
                                                                        FuncValores.CalculaTotal(DetalhesOrcamento);
                                                                    }                                                                
                                                                }                                                                
                                                            },
                                                            {
                                                                xtype: 'displayfield',
                                                                itemId: 'ValorServTotal',
                                                                fieldLabel: 'Total Servi&ccedil;o',
                                                                value: '',
                                                                labelWidth: 100,    
                                                                flex: 2,
                                                                labelAlign: 'right',
                                                                readOnly: true,
                                                                emptyText: '',
                                                                allowBlank: true                                                                
                                                            },
                                                            {
                                                                itemId: 'ValorServDesconto',
                                                                fieldLabel: 'Desconto (%)',
                                                                value: '',
                                                                labelWidth: 90, 
                                                                emptyText: '0.0',
                                                                labelAlign: 'right',
                                                                flex: 2,
                                                                readOnly: false,
                                                                allowBlank: true,
                                                                maskre: /^\d+(.\d+){0,1}$/,
                                                                regex: /^\d+(.\d+){0,1}$/,
                                                                regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.',
                                                                listeners: {
                                                                    blur: function(d) {                                                                        
                                                                        FuncValores.CalculaTotal(DetalhesOrcamento);
                                                                    }                                                                
                                                                }                                                                   
                                                            }                                                                                                                                                                                    
                                                        ]
                                                     },
                                                     {
                                                        itemId: 'Campo_ValorFrete_ElabOrc',
                                                        xtype: 'fieldcontainer',
                                                        layout: 'hbox',
                                                        combineErrors: true,
                                                        defaultType: 'textfield',
                                                        items: [
                                                            {
                                                                itemId: 'ValorFrete',
                                                                fieldLabel: 'Frete',
                                                                value: '',
                                                                labelWidth: 403,    
                                                                readOnly: false,
                                                                flex: 2,
                                                                emptyText: '0.00',
                                                                labelAlign: 'right',
                                                                allowBlank: true,
                                                                maskre: /^\d+(.\d+){0,1}$/,
                                                                regex: /^\d+(.\d+){0,1}$/,
                                                                regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.',
                                                                listeners: {
                                                                    blur: function(d) {                                                                        
                                                                        FuncValores.CalculaTotal(DetalhesOrcamento);
                                                                    }
                                                                }
                                                            }                                                                                                                                                                                  
                                                        ]
                                                     }                                                     
                                                  ]
                                        },
                                        {
                                            itemId: 'CamposTotalOrcamento',
                                            xtype: 'fieldset',
                                            title: 'Totais',
                                            flex: 1,
                                            layout: 'anchor',
                                            margins: '6 0 0 10',
                                            defaults: {
                                                anchor: '100%'
                                            },                                                               
                                            items: [
                                                {         
                                                        xtype: 'displayfield',
                                                        itemId: 'TotalProd',                                                        
                                                        fieldLabel: 'Produto',
                                                        labelWidth: 80,
                                                        readOnly: true,
                                                        flex: 2,
                                                        emptyText: '',
                                                        labelAlign: 'right',                                                        
                                                        allowBlank: true                                                      
                                                 },
                                                {                           
                                                        xtype: 'displayfield',
                                                        itemId: 'TotalServ',                                                        
                                                        fieldLabel: 'Servi&ccedil;o',
                                                        labelWidth: 80,
                                                        readOnly: true,
                                                        flex: 2,
                                                        emptyText: '',
                                                        labelAlign: 'right',                                                        
                                                        allowBlank: true                                                      
                                                 },
                                                {  
                                                        xtype: 'displayfield',
                                                        itemId: 'TotalGeral',                                                        
                                                        fieldLabel: 'Geral',
                                                        labelWidth: 80,
                                                        readOnly: true,
                                                        flex: 2,
                                                        emptyText: '',
                                                        labelAlign: 'right',                                                        
                                                        allowBlank: true                                                      
                                                 }                                                 
                                            ]                                            
                                        }                                                                                               
                                    ]
                                }
                                                
                         ]  
                    },
                      {
                        itemId: 'ElabResposta',
                        xtype: 'fieldset',
                        title: 'Mensagem de Resposta',
                        layout: 'hbox',                    
                        margins: '5 5 5 5',                        
                        defaultType: 'textfield', 
                        items:[
                        {
                            itemId: 'msgResposta',
                            height: 110,
                            xtype: 'textareafield',
                            labelAlign: 'top',
                            flex: 1,
                            allowBlank: true
                        }]  
                    }
                  ],
                  
                  buttons: [
                        btnConcluirOrcamento
                    ]                        
                  
                }                                
            );


        var store2 = new Ext.data.Store({
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

        Ext.apply(this, {
                   
            itemId: 'CamposFiltroElaboracao',
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
                    title: 'Periodo de solicita&ccedil;&atilde;o',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    margins: '8 8 8 8',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            itemId: 'Campos_Filtro',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'datefield',
                            items: [{
                                    vtype: 'datefield',
                                    format: 'd/m/Y',
                                    flex: 1,
                                    margins: '8 8 8 8',
                                    fieldLabel: 'Solicita&ccedil;&atilde;o Inicial',
                                    name: 'startdt',
                                    itemId: 'startdt',
                                    labelAlign: 'top'
                                }, {
                                    vtype: 'datefield',
                                    format: 'd/m/Y',
                                    itemId: 'enddt',
                                    flex: 1,
                                    margins: '8 8 8 8',
                                    fieldLabel: 'Solicita&ccedil;&atilde;o Final',
                                    name: 'enddt',
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
                            itemId: 'Campos_Filtro2',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            items: [
                                {
                                    xtype: 'numberfield',
                                    itemId: 'idOrc',
                                    hideTrigger: true,
                                    labelWidth: 60,
                                    Width: 50,
                                    flex: 1,
                                    margins: '8 8 8 8',
                                    fieldLabel: 'ID',
                                    emptyText: '',
                                    labelAlign: 'top'
                                },
                                {
                                    xtype: 'combo',
                                    itemId: 'cmbEmpresa',
                                    triggerAction: 'all',
                                    forceSelection: true,
                                    flex: 3,
                                    editable: false,
                                    margins: '8 8 8 8',
                                    fieldLabel: 'Empresa',
                                    labelAlign: 'top',
                                    mode: 'remote',
                                    displayField: 'nome',
                                    valueField: 'id',
                                    store: store2
                                }
                            ]
                        }
                    ]}                        
            ],
               buttons: [                    
                    {
                        text: 'Pesquisar',
                        width: 100,
                        icon   : 'extjs/examples/shared/icons/fam/application_go.png',
                        handler: function() {                                                                
                                                       
                            storegrid.loadData([],false);                    
                               
                            var CamposData = 
                            this.ownerCt.ownerCt.getComponent('CamposData').getComponent('Campos_Filtro');                                 
                            
                            var FiltrosAdic = 
                            this.ownerCt.ownerCt.getComponent('CamposConsulta2').getComponent('Campos_Filtro2');                             
                            
                            var DataIni = CamposData.getComponent('startdt').value;
                            var DataFin = CamposData.getComponent('enddt').value;
                            
                            var idOrc = FiltrosAdic.getComponent('idOrc').value;
                            var idSolicitante = FiltrosAdic.getComponent('cmbEmpresa').value;                            
                            
                            storegrid.load(
                                {params:
                                   {                                   
                                      Op: 'Elab',
                                      idEmpresaSolic: idSolicitante,
                                      DataIni: DataIni,
                                      DataFin: DataFin,
                                      OrcamentoID: idOrc
                                   }                                   
                                }
                            );   
                                
                            storegrid.on('load', function(s) {
                                
                                var count = storegrid.getCount();                                                                 
                                
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
                }]                        
        });

        this.callParent(arguments);
    }
});


