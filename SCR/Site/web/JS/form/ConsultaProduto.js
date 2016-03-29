Ext.define('Ext.app.ConsultaProduto', {
    extend: 'Ext.panel.Panel',       

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
                        
      var AlteraProd = Ext.create('Ext.window.Window', {
                closeAction:'hide',
                items: [
                    // Contact info
                    {
                        itemId: 'Campos',
                        xtype: 'fieldset',
                        title: 'Cadastro de Produto',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        width: 700,
                        height:80,
                        
                        defaults: {
                            anchor: '100%'
                        },
                        items: [
                           {     
                            itemId: 'Campos_Prod',
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Produto',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            defaults: {
                                hideLabel: 'true'
                            },
                            items: [{
                                itemId: 'Codigo',                                
                                fieldLabel: 'Code',
                                flex: 2,
                                emptyText: 'C&oacute;digo',
                                allowBlank: false
                            }, {
                                itemId: 'Desc',
                                name: 'Desc',
                                fieldLabel: 'Descri&ccedil;&atilde;o',
                                flex: 3,
                                margins: '0 0 0 6',
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
                                xtype: 'textfield',
                                fieldLabel: 'Quantidade',
                                //emptyText: 'Quantidade',                                
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
                                //emptyText: 'Valor',
                                flex: 2,
                                margins: '0 0 0 6',
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
                                margins: '0 0 0 6',
                                allowBlank: true
                            }]
                        }]
                    }],
                
                buttons: [                    
                    {
                        text: 'Gravar',
                        width: 100,
                        handler: function() {                                                                
                             
                             var Campos_Prod = this.ownerCt.ownerCt.getComponent( 'Campos' ).getComponent('Campos_Prod');
                             var DadosAdic = this.ownerCt.ownerCt.getComponent( 'Campos' ).getComponent('Campos_Adic');  

                             var storegravar = Ext.create('AtualizarProdutoStore'); 

                                var Produto = 
                                        Ext.create( 'Produto',
                                                    {
                                                        id: 0,
                                                        id_produto: 0,
                                                        codigo: Campos_Prod.getComponent('Codigo').value,
                                                        descricao: Campos_Prod.getComponent('Desc').value,
                                                        marca: DadosAdic.getComponent('Marca').value,
                                                        quantidade: DadosAdic.getComponent('Qtde').value,
                                                        valor: DadosAdic.getComponent('Valor').value,
                                                        id_empresa: 1
                                                    }
                                        );

                               storegravar.add(Produto);
                               storegravar.insert(0,Produto);                                                                                
                                
                               var PanelGravaProd = this.ownerCt.ownerCt 
                                
                               PanelGravaProd.setLoading("Gravando dados...");      
                                     
                               storegravar.on('write', function( aStore, aOperation ){                                                                                                                                                                                                                         
                                
                                        var response = Ext.JSON.decode( aOperation.response.responseText,true );                                        
                                        
                                        PanelGravaProd.setLoading(false);                                        
                                        
                                        if ( response[0].Code == 1 ){
                                                Ext.Msg.alert('SCR', 'Dados atualizados com sucesso!');                                                                                                                                                                                                                                                      
                                        }
                                        else{
                                            if ( response[0].Code == 2 ) 
                                                    Ext.Msg.alert('SCR', response[0].Msg );
                                                else{                                           
                                                    Ext.Msg.alert('SCR', 'Erro interno do Servidor!');

                                            }
                                        }                                       
                            } );                                                                                       
                           
                            storegravar.sync();   
                           
                            this.ownerCt.ownerCt.hide();                                            

                            store.load(
                                {params:
                                   {                                   
                                   Op: 'G',
                                   CodigoProd: Campos_Prod.getComponent('Codigo').value,
                                   DescProd: Campos_Prod.getComponent('Desc').value
                                   }                                   
                                }
                            );                                                              
                                 
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
                               
      var grid2 = new Ext.grid.GridPanel({
            store: store,
            columns: [
                {header: "id", width: 50, sortable: true, dataIndex: 'id'},
                {header: "Codigo", width: 70, sortable: true, dataIndex: 'codigo'},
                {header: "Marca", width: 100, sortable: true, dataIndex: 'marca'},
                {header: "Descrição", width: 400, sortable: true, dataIndex: 'descricao'},
                {header: "Valor", width: 50, sortable: true, dataIndex: 'valor'},
                {header: "Qtde", width: 50, sortable: true, dataIndex: 'quantidade'},
                {
                    xtype: 'actioncolumn',
                    width: 50,
                    items: [{
                        icon   : 'extjs/examples/shared/icons/fam/delete.gif',
                        tooltip: 'Sell stock',
                        handler: function(grid2, rowIndex, colIndex) {
                            
                            var rec = store.getAt(rowIndex);                            
                            
                            var storedelete = Ext.create('AtualizarProdutoStore'); 
                            
                            var PanelGravaProd = this.ownerCt.ownerCt.ownerCt;
                          
                            var Produto = 
                                    Ext.create( 'Produto',
                                                {
                                                    id: 0,
                                                    id_produto: rec.get('id'),
                                                    codigo: rec.get('codigo'),
                                                    descricao: rec.get('descricao'),
                                                    marca: '',
                                                    quantidade: '-1',
                                                    valor: '',
                                                    id_empresa: 1
                                                }
                                    )

                            storedelete.add(Produto);
                            storedelete.insert(0,Produto);                             
                            
                            storedelete.on('write', function( aStore, aOperation ){                                                                                                                                                                                                                         

                                        var response = Ext.JSON.decode( aOperation.response.responseText,true );                                        
                                                                                                                        
                                        
                                        if ( response[0].Code == 1 ){

                                                Ext.Msg.alert('SCR', 'Produto excluído com sucesso!');
                                                PanelGravaProd.hide();
                                        }
                                        else{
                                            if ( response[0].Code == 2 ) 
                                                    Ext.Msg.alert('SCR', response[0].Msg );
                                                else{                                           
                                                    Ext.Msg.alert('SCR', 'Erro interno do Servidor!');

                                            }
                                        }                                        
                            } );                                                                                       

                            
                            Ext.Msg.confirm('Confirmar exclusão', 'Deseja realmente excluir o produto ' + rec.get('descricao') + '?', function(e){
                                if(e == 'yes')
                                    {                                                                                                                                                                                                                                                                                                                                                               
                                      PanelGravaProd.setLoading("Excluindo Produto..."); 
                                      
                                      storedelete.sync();                                                                              
                                      
                                      PanelGravaProd.setLoading(false);
                                    }
                                }
                            );                            
                        }
                    },
                    {
                        icon   : 'extjs/examples/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
                        tooltip: 'Sell stock',
                        handler: function(grid2, rowIndex, colIndex) {
                            var rec = store.getAt(rowIndex);
                            //alert("Sell " + rec.get('descricao'));
                                                        
                            var Campos_Prod = AlteraProd.getComponent( 'Campos' ).getComponent('Campos_Prod');
                            var DadosAdic = AlteraProd.getComponent( 'Campos' ).getComponent('Campos_Adic'); 
                            
                            Campos_Prod.getComponent('Codigo').setValue( rec.get('codigo') );
                            Campos_Prod.getComponent('Desc').setValue( rec.get('descricao') );                            
                            
                            DadosAdic.getComponent('Marca').setValue( rec.get('marca') );                                                                                    
                            DadosAdic.getComponent('Qtde').setValue( rec.get('quantidade') );
                            DadosAdic.getComponent('Valor').setValue( rec.get('valor') );
                                                                                                                
                            
                            AlteraProd.show();
                            
                        }
                    }]
                }                
                   
            ],
            title: 'Consulta de Produtos',
            //height:230,
            //width:590,
            
            defaults: {
                anchor: '100%'
            },            
           //closeAction:'hide', 
           //renderTo: document.body,
           frame:true
        });        
                                   
      var win = Ext.create('Ext.window.Window', {
            id: 'window',
            title: 'SCR System',
            width: 800,
            height:400,
            minWidth: 300,
            minHeight: 130,
            layout: 'fit',
            plain: true,
            closeAction:'hide',
            items: grid2
        });
        
      Ext.apply(this, {                        
                //action: 'AtualizarProdutoStore',
                //url: 'SVL_Produto',
                                 
                
                items: [
                    // Contact info
                    {
                        itemId: 'CamposConsulta',
                        xtype: 'fieldset',
                        title: 'Consulta de Produto',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        
                        defaults: {
                            anchor: '95%'
                        },
                        items: [
                           {     
                            itemId: 'Campos_Filtro',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [{
                                itemId: 'CodigoProd',                                
                                fieldLabel: 'Codigo',
                                labelWidth: 50,
                                margins: '6 6 6 6',
                                flex: 1,
                                allowBlank: true
                            }, {
                                itemId: 'DescProd',
                                name: 'Desc',
                                fieldLabel: 'Descri&ccedil;&atilde;o',
                                flex: 3,
                                labelWidth: 70,
                                labelAlign: 'right',
                                margins: '6 6 6 6',
                                allowBlank: true
                            }]
                        }]
                    }],
                
                buttons: [                    
                    {
                        text: 'Pesquisar',
                        width: 100,
                        handler: function() {                                                                
                               
                            store.loadData([],false);                    
                               
                            var Campos_Prod = this.ownerCt.ownerCt.getComponent( 'CamposConsulta' ).getComponent('Campos_Filtro');
                            
                            win.show();
                            
                            store.load(
                                {params:
                                   {                                   
                                   Op: 'G',
                                   CodigoProd: Campos_Prod.getComponent('CodigoProd').value,
                                   DescProd: Campos_Prod.getComponent('DescProd').value
                                   }                                   
                                }
                            );   
                                
                            store.on('load', function(s) {
                                var count = store.getCount(); 
                                                                
                                
                                if (count===0){
                                    Ext.MessageBox.alert('Message','Nenhum resultado encontrado!');
                                    win.hide();
                                }
                            });
                        }                    
                }]                                
        });
                    
      this.callParent(arguments);        
        
     }
     
 });    


