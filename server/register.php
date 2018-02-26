<?php

    ini_set('log_errors', 1);
    ini_set('error_log', 'php-error.log');
    error_reporting(E_ALL);

    require_once(__DIR__.'/vendor/autoload.php');
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
                $errorLogMessage = 'No se pudieron almacenar los datos: '.$conexionSql->error;
                error_log($errorLogMessage);
                //throw new Exception($errorMessage, $conexionSql->errno);
            }

            else {

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
                $mail->Subject = 'Nuevo registro en el formulario - ' . $referenceCode;
                $mail->Body = '<!DOCTYPE html>
                <html>
                    <head>
                        <meta charset="utf-8">
                        <title>Clabki | Nuevo Registro</title>
                    </head>
                    <style media="screen">
                    </style>
                    <body>
                        <section>
                            <p>
                                Se ha realizado un nuevo registro a través del formulario en Clabki:
                            </p>
                            <ul>
                                <li><strong>Nombre:</strong> <span>'.$buyerFullName.'</span></li>
                                <li><strong>Email:</strong> <span>'.$buyerEmail.'</span></li>
                                <li><strong>Teléfono:</strong> <span>'.$telephone.'</span></li>
                                <li><strong>Ciudad:</strong> <span>'.$city.'</span></li>
                                <li><strong>Código de referencia:</strong> <span>'.$referenceCode.'</span></li>
                            </ul>
                        </section>
                    </body>
                </html>';

                if(!$mail->send()) {
                    $mensajeError = 'Mailer Error: ' . $mail->ErrorInfo;
                    error_log($mensajeError);
                }
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
