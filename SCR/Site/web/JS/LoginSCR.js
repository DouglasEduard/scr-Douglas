Ext.define('Ext.app.LoginSCR', {
    extend: 'Ext.container.Viewport',
    
    uses: ['Ext.app.PortalPanel'],    
    
    initComponent: function() {

        var htmlLogin =                 
        "<div align='right'>" +
        "<form style='padding: 5px 5px;' name='form_login' id='form_login' method='POST' action='SVL_Login'>" +
           "<ul id='subform'>" +
           //"<label style='margin: 0px 300px; height: 20px; text-align: center;'>SupplyMe</label>" +
           "<label style='width: 60px; height: 20px; text-align: right;' for='login'>Login:</label>" +
           "<input style='margin: 10px 10px; width: 170px; height: 30px;' type='text' name='login' id='login' value='' />" +
           "<label  for='senha'>Senha:</label>" +
           "<input style='margin: 10px 10px; width: 170px; height: 30px;' type='password' name='senha' id='senha' value='' />" +
           "<input " +
           "style=" +
           "' width: 70px; height: 35px; font-size: 14pt; color: #eaeaea; background-color: #528ecc; " +          
           "id='form_submit' type='submit' value='Entrar' />" +
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
                    id: 'LoginBody',
                    xtype: 'container',
                    region: 'center',
                    layout: 'border',
                    items: [
                        {
                            id: 'loginSRC_Body',
                            xtype: 'portalpanel',
                            bodyStyle: 'background-image:url(Imagens/logo_2.jpg);background-repeat:no-repeat;background-position:center;',
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
    }
});

