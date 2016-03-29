Ext.define('Ext.app.CadastrarProduto', {
    extend: 'Ext.panel.Panel',
    initComponent: function() {
        Ext.apply(this, {
            //action: 'AtualizarProdutoStore',
            //url: 'SVL_Produto',
            items: [
                // Contact info
                {
                    itemId: 'Campos',
                    xtype: 'fieldset',
                    title: 'Dados do Produto',
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            itemId: 'Campos_Prod',
                            xtype: 'fieldcontainer',                            
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [{
                                    itemId: 'Codigo',
                                    fieldLabel: 'C&oacute;digo',
                                    flex: 1,
                                    emptyText: '',
                                    margins: '0 0 0 5',
                                    allowBlank: false
                                }, {
                                    itemId: 'Desc',
                                    name: 'Desc',
                                    fieldLabel: 'Descri&ccedil;&atilde;o',
                                    labelAlign: 'right',
                                    flex: 2,
                                    margins: '0 0 0 5',
                                    emptyText: '',
                                    allowBlank: false
                                }]
                        },
                        {
                            itemId: 'Campos_Adic',
                            xtype: 'fieldcontainer',
                            layout: 'hbox',
                            combineErrors: true,
                            defaultType: 'textfield',
                            items: [
                                {
                                    itemId: 'Marca',
                                    name: 'mailingState',
                                    fieldLabel: 'Marca',
                                    flex: 1,
                                    width: 180,
                                    margins: '0 0 0 5',
                                    allowBlank: true
                                },
                                {
                                    itemId: 'Valor',
                                    fieldLabel: 'Valor',
                                    name: 'valor',
                                    labelAlign: 'right',
                                    //emptyText: 'Valor',
                                    flex: 1,
                                    allowBlank: false,
                                    maskre: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                    regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                    regexText: 'deve ser informado no formato numérico.\nUtilize ponto como separador decimal.'
                                },
                                {
                                    itemId: 'Qtde',
                                    name: 'Qtde',
                                    xtype: 'textfield',
                                    fieldLabel: 'Qtde M&iacute;nima',
                                    labelAlign: 'right',
                                    //emptyText: 'Quantidade',                                
                                    flex: 1,
                                    allowBlank: false,
                                    maskre: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                    regex: /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,
                                    regexText: 'deve ser informada no formato numérico.\nUtilize ponto como separador decimal.'

                                }]
                        }]

                },
                {
                    itemId: 'Text_Prod',
                    xtype: 'panel',
                    layout: 'anchor',
                    combineErrors: true,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },                    
                    items: [
                        {
                            xtype: 'textarea',
                            fieldLabel: 'Message text',
                            hideLabel: true,
                            texta: 'right',
                            layout: 'hbox',
                            margins: '0 50 0 0',
                            width: 500,
                            name: 'msg',
                            emptyText: ''
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Gravar',
                    width: 100,
                    handler: function() {

                        var Campos_Prod = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campos_Prod');
                        var DadosAdic = this.ownerCt.ownerCt.getComponent('Campos').getComponent('Campos_Adic');

                        var store = Ext.create('AtualizarProdutoStore');

                        var Produto =
                                Ext.create('Produto',
                                        {
                                            id: 0,
                                            id_produto: 0,
                                            codigo: Campos_Prod.getComponent('Codigo').value,
                                            descricao: Campos_Prod.getComponent('Desc').value,
                                            marca: DadosAdic.getComponent('Marca').value,
                                            quantidade_min: DadosAdic.getComponent('Qtde').value,
                                            valor: DadosAdic.getComponent('Valor').value,
                                            id_empresa: 1
                                        }
                                );

                        store.add(Produto);
                        store.insert(0, Produto);

                        var PanelGravaProd = this.ownerCt.ownerCt;

                        PanelGravaProd.setLoading("Gravando dados...");

                        store.on('write', function(aStore, aOperation) {

                            var response = Ext.JSON.decode(aOperation.response.responseText, true);

                            PanelGravaProd.setLoading(false);

                            if (response[0].Code == 1) {

                                Ext.Msg.alert('SCR', 'Dados atualizados com sucesso!');
                            }
                            else {
                                if (response[0].Code == 2)
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
        this.callParent(arguments);

    }
});

