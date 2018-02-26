<?php
    $ApiKey = "4Vj8eK4rloUd272L48hsrarnUA";
    $merchant_id = $_REQUEST['merchantId'];
    $referenceCode = $_REQUEST['referenceCode'];
    $TX_VALUE = $_REQUEST['TX_VALUE'];
    $New_value = number_format($TX_VALUE, 1, '.', '');
    $currency = $_REQUEST['currency'];
    $transactionState = $_REQUEST['transactionState'];
    $firma_cadena = "$ApiKey~$merchant_id~$referenceCode~$New_value~$currency~$transactionState";
    $firmacreada = md5($firma_cadena);
    $firma = $_REQUEST['signature'];
    $reference_pol = $_REQUEST['reference_pol'];
    $cus = $_REQUEST['cus'];
    $extra1 = $_REQUEST['description'];
    $pseBank = $_REQUEST['pseBank'];
    $lapPaymentMethod = $_REQUEST['lapPaymentMethod'];
    $transactionId = $_REQUEST['transactionId'];

    if ($_REQUEST['transactionState'] == 4 ) {
        $estadoTx = "Aprobada";
    }

    else if ($_REQUEST['transactionState'] == 6 ) {
        $estadoTx = "Rechazada";
    }

    else if ($_REQUEST['transactionState'] == 104 ) {
        $estadoTx = "Error";
    }

    else if ($_REQUEST['transactionState'] == 7 ) {
        $estadoTx = "Pendiente";
    }

    else {
        $estadoTx=$_REQUEST['mensaje'];
    }

    if (strtoupper($firma) == strtoupper($firmacreada)) {
        $firmaValidada = true;
    }
    else {
        $firmaValidada = false;
    }
?>


<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700" rel="stylesheet">
        <link rel="stylesheet" href="../css/payment_response.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
        <meta charset="utf-8">
        <link rel="icon" href="../img/common/favicon.png" type="image/png">
        <title>Clabki | Te ayudamos a encontrar a tu mascota perdida</title>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90695201-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-90695201-1');
        </script>
    </head>
    <body>
        <header>
            <div id="logo_container">
                <a href="./"></a>
            </div>
            <div id="social_link_container">
				<span>SÍGUENOS</span>
                <a class="facebook_link social_link" target="_blank" href="https://www.facebook.com/clabki/?fref=ts"></a>
            </div>
        </header>
    </body>
    <section id="transaction_data_section">
        <h1>
            <?php
                if($firmaValidada)
                    echo("DATOS DE TU TRANSACCIÓN");
                else
                    echo("ERROR AL VALIDAR FIRMA DIGITAL");
            ?>
        </h1>
        <?php
            if($firmaValidada) {
        ?>
        <ul>
            <li>
                <span class="data_key">ESTADO:</span>
                <span class="data_value"><?php echo $estadoTx;?></span></li>
            <li>
                <span class="data_key">ID DE LA TRANSACCIÓN:</span>
                <span class="data_value"><?php echo $transactionId;?></span></li>
            <li>
                <span class="data_key">REFERENCIA DE VENTA:</span>
                <span class="data_value"><?php echo $reference_pol;?></span></li>
            <li>
                <span class="data_key">REFERENCIA DE TRANSACCIÓN:</span>
                <span class="data_value"></span><?php echo $referenceCode;?></li>
            <li>
                <span class="data_key">VALOR TOTAL:</span>
                <span class="data_value"></span>$<?php echo number_format($TX_VALUE);?></li>
            <li>
                <span class="data_key">MONEDA:</span>
                <span class="data_value"><?php echo $currency;?></span>
            </li>
            <li>
                <span class="data_key">DESCRIPCIÓN:</span>
                <span class="data_value"><?php echo ($extra1);?></span>
            </li>
            <li>
                <span class="data_key">ENTIDAD:</span>
                <span class="data_value"><?php echo ($lapPaymentMethod);?></span>
            </li>
        </ul>
        <?php
            }
        ?>
    </section>
</html>
