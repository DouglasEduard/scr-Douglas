<%-- 
    Document   : index
    Created on : Mar 16, 2013, 10:56:33 PM
    Author     : Douglas
--%>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Supply Me</title>

    <link rel="stylesheet" type="text/css" href="extjs/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="extjs/examples/portal/portal.css" />

    <script type="text/javascript" src="extjs/ext-all.js"></script>
    

    <!-- shared example code -->
    <script type="text/javascript" src="extjs/examples/shared/examples.js"></script>          
    <script type="text/javascript" src="extjs/examples/portal/classes.js"></script>    
    <script type="text/javascript" src="JS/LoginSCR.js"></script>                                    
            
    <script type="text/javascript">
        Ext.Loader.setPath('Ext.app', 'classes');

        Ext.require([
            'Ext.layout.container.*',
            'Ext.resizer.Splitter',
            'Ext.fx.target.Element',
            'Ext.fx.target.Component',
            'Ext.window.Window',
            'Ext.app.Portlet',
            'Ext.app.PortalColumn',
            'Ext.app.PortalPanel',
            'Ext.app.Portlet',
            'Ext.app.PortalDropZone',
            'Ext.app.GridPortlet'
        ]);

        Ext.onReady(function(){
            Ext.create('Ext.app.LoginSCR');
        });
    </script>
</head>
<body>
    <span id="app-msg" style="display:none;"></span>
</body>
</html>
