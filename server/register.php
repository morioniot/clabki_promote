<?php

    ini_set('log_errors', 1);
    ini_set('error_log', 'php-error.log');
    error_reporting(E_ALL);
    require_once(__DIR__.'/dbconnection.php');

    $conexionSql = new DatabaseConnection();
    $errorMessage = '';

    $buyerFullName = $_POST['buyerFullName'];
    $buyerEmail = $_POST['buyerEmail'];
    $telephone = $_POST['telephone'];
    $city = $_POST['city'];
    $referenceCode = $_POST['referenceCode'];

    if($buyerFullName != '' && $buyerEmail != '' && $telephone != ''
    && $city != '' && $referenceCode != '') {

            //Guardando en la base de datos
            $query = "INSERT INTO `registry`
            (`id`,`name`,`email`,`telephone`,`city`,`reference_code`
            ,`transaction_id`,`reference_pol`,`value`,`transaction_state`,`currency`,`payment_method`
            ,`confirmation_date`,`registry_date`)
            VALUES
            (NULL,'".$buyerFullName."','".$buyerEmail."','".$telephone."','".$city."',
            '".$referenceCode."',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NOW())";

            if(!$conexionSql->query($query)) {
                $errorMessage = "Lo sentimos, no pudimos almacenar tus datos";
                //$errorMessage = 'No se pudieron almacenar los datos: '.$conexionSql->error;
                //throw new Exception($errorMessage, $conexionSql->errno);
            }
    }
    else {
        $errorMessage = "Lo sentimos, no recibimos todos los datos requeridos para hacer el registro";
    }

    //Creando el objeto de respuesta
    $response = new StdClass();
    if ($errorMessage !== '') $response->error = $errorMessage;
    else $response->error =  false;
    header('Content-Type: application/json');
    echo(json_encode($response));
?>
