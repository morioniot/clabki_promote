<?php

    ini_set('log_errors', 1);
    ini_set('error_log', 'php-error.log');
    error_reporting(E_ALL);

    require_once(__DIR__.'/dbconnection.php');

    $paymentMethodTypeAssociation = array(
        "2" => "CREDIT_CARD",
        "4" => "PSE",
        "5" => "ACH",
        "6" => "DEBIT_CARD",
        "7" => "CASH",
        "8" => "REFERENCED",
        "10" => "BANK_REFERENCED"
    );

    //Recovering data from post request
    $transactionStateMessage = $_POST['response_message_pol'];
    $referencePol = $_POST['reference_pol'];
    $sign = $_POST['sign'];
    $paymentMethodType = $paymentMethodTypeAssociation[$_POST['payment_method_type']];

    //Changes with each transaction try
    $transactionId = $_POST['tnameransaction_id'];

    //Data to validate signature
    $merchantId = $_POST['merchant_id'];
    $referenceSale = $_POST['reference_sale'];
    $value = $_POST['value'];
    $newValue = number_format($value, 1, '.', '');
    $currency = $_POST['currency'];
    $transactionState = $_POST['state_pol'];

    //Validating signature to check data validity
    $apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
    $rawSignature = "$apiKey~$merchantId~$referenceSale~$newValue~$currency~$transactionState";
    $generatedSign = md5($rawSignature);

    if(strtoupper($generatedSign) == strtoupper($sign)) {

        $sqlConnection = new DatabaseConnection();
        $errorMessage = "";

        $query = "UPDATE `registry`
        SET `transaction_id` = '".$transactionId."',
        `reference_pol` = '".$referencePol."',
        `value` = '".$newValue."',
        `transaction_state` = '".$transactionStateMessage."',
        `currency` = '".$currency."',
        `payment_method` = '".$paymentMethodType."',
        `confirmation_date` = NOW()
        WHERE `reference_code` = '".$referenceSale."'";

        if(!$sqlConnection->query($query)) {
            $errorMessage = "Lo sentimos, no pudimos almacenar tus datos";
            http_response_code(404);
            error_log($errorMessage);
            echo($errorMessage);
        }

        else {    
            //Desde que se haya hecho la actualización se envía mensaje de éxito
            echo("success operation");
        }
    }
    else {
        http_response_code(404);
        $errorMessage = "Digital signature does not match";
        error_log($errorMessage);
        echo($errorMessage);
    }
?>
