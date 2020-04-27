<?php

    ini_set('log_errors', 1);
    ini_set('error_log', 'php-error.log');
    error_reporting(E_ALL);

    require_once(__DIR__.'/vendor/autoload.php');
    require_once(__DIR__.'/dbconnection.php');

    $paymentMethodTypeAssociation = array(
        "2" => "CREDIT_CARD",
        "4" => "PSE",
        "5" => "ACH",
        "6" => "DEBIT_CARD",
        "7" => "CASH",
        "8" => "REFERENCED",
        "10" => "BANK_REFERENCED",
        "14" => "SPEI"
    );

    //Recovering data from post request
    $transactionStateMessage = $_POST['response_message_pol'];
    $referencePol = $_POST['reference_pol'];
    $sign = $_POST['sign'];
    $paymentMethodType = $paymentMethodTypeAssociation[$_POST['payment_method_type']];
    $billingCountry = $_POST['billing_country'];

    //Changes with each transaction try
    $transactionId = $_POST['transaction_id'];

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

            //Trayendo datos del comprador
            $query = "SELECT * FROM `registry` WHERE `reference_code`='".$referenceSale."'";
            $result = $sqlConnection->query($query);
            if($result->num_rows) {

                $result->data_seek(0);
                $object = $result->fetch_object();
                $name = $object->name;
                $email = $object->email;
                $telephone = $object->telephone;
                $city = $object->city;
                $plan = $object->plan;

                //Enviando Email

                $mail = new PHPMailerOAuth;

                $mail->isSMTP();
                $mail->SMTPDebug = 0;
                $mail->Debugoutput = 'html';
                $mail->Host = 'smtp.gmail.com';
                $mail->Port = 587;
                $mail->SMTPSecure = 'tls';
                $mail->SMTPAuth = true;
                $mail->AuthType = 'XOAUTH2';
                $mail->oauthUserEmail = 'comunidad.clabki@gmail.com';
                $mail->oauthClientId = '406616329011-nlr71cg1il8uskgiasc2cvmg7ddgep5k.apps.googleusercontent.com';
                $mail->oauthClientSecret = '1KF8P9KBLyvfaLZCiEDbTwKk';
                $mail->oauthRefreshToken = '1/LOG8Ox0nYB1EyLyl_VBlfnwp_jCiahdWjeusIKuEXM8';

                $mail->setFrom('comunidad.clabki@gmail.com', 'Clabki');
                $mail->addAddress('comunidad.clabki@gmail.com');

                $mail->isHTML( true );
                $mail->CharSet = 'UTF-8';
                $mail->Subject = 'Adquisición de nuevo servicio - ' . $referenceSale;
                $mail->Body = '<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Clabki | Nuevo Servicio</title>
                    </head>
                    <style media="screen">
                    </style>
                    <body>
                        <section>
                            <p>
                                Se ha confirmado el pago de un nuevo servicio Clabki:
                            </p>
                            <ul>
                                <li><strong>Nombre:</strong> <span>'.$name.'</span></li>
                                <li><strong>Plan:</strong> <span>'.$plan.'</span></li>
                                <li><strong>Email:</strong> <span>'.$email.'</span></li>
                                <li><strong>Contacto:</strong> <span>'.$telephone.'</span></li>
                                <li><strong>Empresa:</strong> <span>'.$city.'</span></li>
                                <li><strong>País:</strong> <span>'.$billingCountry.'</span></li>
                                <li><strong>Estado transacción:</strong> <span>'.$transactionStateMessage.'</span></li>
                            </ul>
                        </section>
                    </body>
                </html>';

                if(!$mail->send()) {
                    $mensajeError = 'Mailer Error: ' . $mail->ErrorInfo;
                    error_log($mensajeError);
                }
            }

            else {
                $mensajeError = "Se generó error al traer los datos del comprador";
                error_log($mensajeError);
            }

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
