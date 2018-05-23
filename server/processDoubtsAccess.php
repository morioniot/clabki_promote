<?php
	
	ini_set('log_errors', 1);
    ini_set('error_log', 'php-error.log');
    error_reporting(E_ALL);

    require_once(__DIR__.'/dbconnection.php');

    $mySqlConnection = new DatabaseConnection();
    $token = $_POST['token'];

    if($token != '') {
    	$query = "UPDATE `tracking_access` SET `doubts_access_count`=`doubts_access_count` + 1 WHERE `token`='".$token."' ORDER BY `access_date` DESC LIMIT 1";
    	if(!$mySqlConnection->query($query)) {
                $errorMessage = "Lo sentimos, no pudimos almacenar tus datos";
                $errorLogMessage = 'No se pudieron almacenar los datos: '.$conexionSql->error;
                error_log($errorLogMessage);
                //throw new Exception($errorMessage, $conexionSql->errno);
        }
    }

    $response = new StdClass();
    if ($errorMessage !== '') $response->error = $errorMessage;
    else $response->error = false;
    header('Content-Type: application/json');
    echo(json_encode($response));
?>