<?php
    
    ini_set('log_errors', 1);
    ini_set('error_log', __DIR__.'/php-error.log');    

    require_once(__DIR__.'/dbconnection.php');
    
    $mySqlConnection = new DatabaseConnection();
    $errorMessage = '';
    
    if(isset($_REQUEST['token'])) {
        
        $token = trim($_GET['token']);
        $query = "UPDATE `tracking` SET `count`=`count` + 1 WHERE `token`='".$token."'";
    
        if($mySqlConnection->query($query)) {
            $query = "INSERT INTO `tracking_access` (`id`,`token`,`doubts_access_count`,`access_date`) VALUES (NULL,'".$token."','0',NOW())";
            if(!$mySqlConnection->query($query)) {
                $errorMessage = 'No se pudieron almacenar los datos: '.$mySqlConnection->error;
                $errorLogMessage = 'No se pudieron almacenar los datos: '.$mySqlConnection->error;
                error_log($errorLogMessage);
            }
        }
    }

    $response = new StdClass();
    if ($errorMessage !== '') $response->error = $errorMessage;
    else $response->error = false;
    header('Content-Type: application/json');
    echo(json_encode($response));

?>