Ext.define('Ext.app.ConsultaProdutoParceiro', {
    extend: 'Ext.panel.Panel',       

    DetalhesProd: 'Unknown',
    ConsultaProdIdEmpresa: 'Unknown',
    ConsultaProdIdUsuario: 'Unknown',

    constructor: function(idEmp,idUser) {
       this.ConsultaProdIdEmpresa = idEmp;    
       this.ConsultaProdIdUsuario = idUser;
       this.callParent();       
    }, 

    GUISolicitarOrcamento: function() {
                                
        var win = Ext.create('Ext.window.Window', {
              id: 'window',
              title: 'Supply Me',
              width: 700,
              height: 280,
              minWidth: 700,
              minHeight: 280,
              layout: 'fit',
              plain: true,
              items: 
                Ext.create('Ext.app.SolicitarOrcamento', 
                DetalhesProd.getComponent( 'Campos' ).getComponent('Campo_Empresa').getComponent('Emp').value,
                DetalhesProd.getComponent( 'Campos' ).getComponent('Campos_Prod').getComponent('Desc').value,
                DetalhesProd.getComponent( 'Campos' ).getComponent('Campos_Adic').getComponent('Valor').value,
                this.ConsultaProdIdEmpresa,
                this.ConsultaProdIdUsuario,
                DetalhesProd.getComponent( 'Campos' ).getComponent('Campos_Prod').getComponent('id_produto').value)                
          });        

        win.show();      
    },
    
    initComponent: function(){                                                                                       
        
        var store = new Ext.data.Store({
                    extend: 'Ext.data.Store',
                    model: 'Produto',                                              

                    baseParams: { 
                            Op: '',
                            CodigoProd: '',
                            DescProd: ''
                            },                        

                    proxy: {
                            type: 'ajax',
                            url: 'SVL_Produto', 

                            noCache: false,                                                

                            reader: new Ext.data.JsonReader({
                                    totalProperty:'total',
                                    type: 'json',
                                    root: 'Produto'
                            }),                

                            writer: {
                                    type: 'json', 
                                    root: 'Produto',
                                    writeAllFields: true,
                                    encode: true
                            }
                    }   ,

                    autoLoad: false
        });                  
                       
        DetalhesProd = Ext.create('Ext.window.Window', {
                closeAction:'hide',
                items: [
                    {
                        itemId: 'Campos',
                        xtype: 'fieldset',
                        title: 'Detalhes do Produto',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        width: 700,
                        height:130,
                        minHeight: 130,
                        
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                           {     
                            itemId: 'Campo_Empresa',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Empresa',
                            layout: 'hbox',
                            combineErrors: true,
                            defaults: {
                                hideLabel: 'true'
                            },                            
                            items: [{
                                itemId: 'Emp',     
                                labelWidth: 500,
                                fieldLabel: 'Empresa',
                                xtype: 'displayfield'
                            }]
                           },                            
                           {     
                            itemId: 'Campos_Prod',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Produto',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'displayfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                itemId: 'id_produto',                                
                                fieldLabel: 'ID',
                                flex: 1,
                                emptyText: 'ID',
                                hidden: true,
                                allowBlank: false
                            },{
                                itemId: 'Codigo',                                
                                fieldLabel: 'Code',
                                flex: 1,
                                emptyText: 'Código',
                                allowBlank: false
                            }, {
                                itemId: 'Desc',
                                name: 'Desc',
                                fieldLabel: 'Descri&ccedil;&atilde;o',
                                labelWidth: 60,
                                flex: 3,
                                hideLabel: false,
                                emptyText: 'Descrição',
                                allowBlank: false
                            }]
                        }, {
                            itemId: 'Campos_Adic',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',                               
                            items: [{
                                itemId: 'Qtde',
                                name: 'Qtde',
                                xtype: 'displayfield',
                                fieldLabel: 'Qtde M&iacute;nima',                           
                                flex: 3,
                                allowBlank: false,                                
                                maskre: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                regexText: 'deve ser informada no formato numérico.\nUtilize ponto como separador decimal.'
                                
                            },
                            {
                                itemId: 'Valor',
                                fieldLabel: 'Valor',                                  
                                labelWidth: 40,
                                name: 'valor',                                                                
                                flex: 3,
                                xtype: 'displayfield',
                                allowBlank: false,
                                maskre: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.'                                
                            },
                            {
                                itemId: 'Marca',
                                name: 'mailingState',
                                fieldLabel: 'Marca',
                                flex: 2,
                                labelWidth: 40,
                                width: 300,
                                xtype: 'displayfield',
                                allowBlank: true
                            }]
                        }]
                    },
                    {
                        itemId: 'Det_Gerais',
                        xtype: 'fieldset',
                        title: 'Detalhes Gerais',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        width: 700,
                        height:130,
                        minHeight: 130,
                        items: []            
                    }],
                
                buttons: [                    
                    {
                        text: 'Solicitar Or&ccedil;amento',
                        width: 120,
                        listeners: {
                            'Click': Ext.bind(this.GUISolicitarOrcamento, this)
                        }                        
                    },                  
                    {                    
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
                {header: "ID", width: 20, sortable: true, dataIndex: 'id'},
                {header: "Empresa", width: 200, sortable: true, dataIndex: 'nomeempresa'},
                {header: "Descri&ccedil;&atilde;o", width: 300, sortable: true, dataIndex: 'descricao'},
                {header: "Valor", width: 50, sortable: true, dataIndex: 'valor' , xtype: 'numbercolumn',  format:'0.00'},
                {header: "Qtde M&iacute;nima", width: 80, sortable: true, dataIndex: 'quantidade_min'},
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
                                           
                            var Campo_Empresa = DetalhesProd.getComponent( 'Campos' ).getComponent('Campo_Empresa');
                            var Campos_Prod = DetalhesProd.getComponent( 'Campos' ).getComponent('Campos_Prod');
                            var DadosAdic = DetalhesProd.getComponent( 'Campos' ).getComponent('Campos_Adic'); 
                                                                              
                            Campo_Empresa.getComponent('Emp').setValue( rec.get('nomeempresa') );
                            Campos_Prod.getComponent('Codigo').setValue( rec.get('codigo') );
                            Campos_Prod.getComponent('Desc').setValue( rec.get('descricao') );  
                            Campos_Prod.getComponent('id_produto').setValue( rec.get('id') );
                            
                            DadosAdic.getComponent('Marca').setValue( rec.get('marca') );                                                                                    
                            DadosAdic.getComponent('Qtde').setValue( rec.get('quantidade_min') );
                            DadosAdic.getComponent('Valor').setValue( rec.get('valor') );
                                                                                                                
                            
                            DetalhesProd.show();
                            
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
                        title: 'Consulta de Produto',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                           {     
                            itemId: 'Campos_Filtro',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Produto',
                            layout: 'hbox',
                            combineErrors: true,    
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                itemId: 'CodigoProd',                                
                                fieldLabel: 'Código',
                                flex: 2,
                                emptyText: 'Código',
                                allowBlank: true,
                                hidden: true
                            }, {
                                itemId: 'DescProd',
                                name: 'Desc',
                                fieldLabel: 'Descri&ccedil;&atilde;o',
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
                               
                            var Campos_Prod = this.ownerCt.ownerCt.getComponent( 'CamposConsulta' ).getComponent('Campos_Filtro');
                            
                            grid2.show();  
                            
                            store.load(
                                {params:
                                   {                                   
                                   Op: 'CP',
                                   CodigoProd: Campos_Prod.getComponent('CodigoProd').value,
                                   DescProd: Campos_Prod.getComponent('DescProd').value
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
                    
        this.callParent(arguments);      
     }
     
 });    


