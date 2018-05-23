<?php
    
    /*ini_set('log_errors', 1);
    ini_set('error_log', __DIR__.'/server/php-error.log');    

    require_once(__DIR__.'/server/dbconnection.php');
    
    $mySqlConnection = new DatabaseConnection();
    
    if(isset($_GET['t'])) {
        
        $token = trim($_GET['t']);
        $query = "UPDATE `tracking` SET `count`=`count` + 1 WHERE `token`='".$token."'";
    
        if($mySqlConnection->query($query)) {
            $query = "INSERT INTO `tracking_access` (`id`,`token`,`doubts_access_count`,`access_date`) VALUES (NULL,'".$token."','0',NOW())";
            if(!$mySqlConnection->query($query)) {
                $errorLogMessage = 'No se pudieron almacenar los datos: '.$mySqlConnection->error;
                error_log($errorLogMessage);
            }
        }
    }*/

?>
<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700" rel="stylesheet">
        <link rel="stylesheet" href="./css/master.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">
        <meta charset="utf-8">
        <meta name="description" content="Construye un anuncio geolocalizado con información relevante sobre la pérdida de tu mascota que será visto por miles de personas que viven cerca del lugar de la pérdida.">
        <link rel="icon" href="./img/common/favicon.png" type="image/png">
        <title>Clabki | Te ayudamos a encontrar tu mascota perdida</title>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-90695201-1');
            gtag('config', 'AW-817321095');
        </script>
    </head>
    <body>
        <div id="fb-root"></div>
        <script>
            window.fbAsyncInit = function() {
                FB.init({
                  appId            : '207271499718170',
                  autoLogAppEvents : true,
                  xfbml            : true,
                  version          : 'v2.11'
                });
            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.11&appId=207271499718170';
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
        <header>
            <div id="logo_container">
                <a href="./"></a>
            </div>
            <div id="social_link_container">
				<span>SÍGUENOS</span>
                <a class="facebook_link social_link" target="_blank" href="https://www.facebook.com/clabki/?fref=ts"></a>
            </div>
        </header>
        <section id="value_proposal_section">
            <div class="title_container">
                <h2>¿DE QUÉ SE TRATA?</h2>
                <img src="./img/common/mancha_titulo.png" alt="title_design" />
            </div>
            <div class="proposal_container">
                <div class="proposal_text">
                    <h2 class="proposal_title">ANUNCIOS GEOLOCALIZADOS EN FACEBOOK</h2>
                    <p class="proposal_paragraph">
                        Utilizamos publicidad pagada de facebook para construir un anuncio geolocalizado
                        con información relevante sobre la pérdida de tu mascota que será visto por miles
                        de personas que viven cerca del lugar de la pérdida.
                    </p>
                </div>
                <figure class="proposal_image">
                    <img src="./img/common/facebook_anuncio.png" alt="anuncio geolocalizado para mascotas" />
                </figure>
            </div>
            <div class="proposal_container" id="proposal_advantages">
                <figure class="proposal_image">
                    <img src="./img/common/perrito_feliz.png" alt="reencuentro mascota perdida" />
                </figure>
                <div class="proposal_text">
                    <h2 class="proposal_title">VENTAJAS</h2>
                    <ul class="proposal_list">
                        <li>Miles de personas verán tu anuncio sin necesidad de que sigan páginas de Animales Perdidos.</li>
                        <li>Las probabilidades de encontrar a tu mascota aumentarán ya que la información será vista por personas pŕoximas a donde se perdió.</li>
                        <li>Quienes viven en el lugar de la pérdida compartirán la información haciendo que ésta sea vista por muchas más personas en el sector.</li>
                    </ul>
                </div>
            </div>
            <div id="doubts_container">
                <button class="doubts_button">MÁS INFORMACIÓN AQUÍ</button>
            </div>
        </section>
         <section id="reviews_section">
            <div class="title_container">
                <h2>¿Y QUÉ TAL CLABKI?</h2>
                <img src="./img/common/mancha_titulo.png" alt="title_design" />
            </div>
            <div class="slider">
                <ul id="slider_band">
                </ul>
                <div class="arrows_container">
                    <span id="left_arrow" class="arrow"></span>
                    <span id="right_arrow" class="arrow disabled"></span>
                </div>
                <div id="slider_touch"></div>
            </div>
        </section>
        <section id="form_section">
            <div id="questions_popup">
                <div id="questions_group_container">
                    <button type="button" class="close_button"></button>
                    <div class="question">
                        <h4 class="question_title">¿QUÉ PASA DESPUÉS DE PAGAR?</h4>
                        <p class="question_answer">
                            Te contactaremos lo más pronto posible para que iniciemos el proceso de la creación de la publicación.
                            Si por alguna razón esto no ocurre, en la página puedes encontrar cómo contactarnos.
                        </p>
                    </div>
                    <hr class="question_division">
                    <span class="division_points">. . . . .</span>
                    <div class="question">
                        <h4 class="question_title">¿QUIÉN HACE LA PUBLICACIÓN?</h4>
                        <p class="question_answer">
                            Nosotros nos encargamos de hacer la publicación a través del fanpage de
                            Clabki y posteriormente de promoverla en la zona acordada.
                        </p>
                    </div>
                    <span class="division_points">. . . . .</span>
                    <div class="question">
                        <h4 class="question_title">¿ME GARANTIZAN ENCONTRAR MI MASCOTA?</h4>
                        <p class="question_answer">
                            No. Sin embargo, te aseguramos que las probabilidades de encontrarla van a
                            aumentar porque vamos a ser más personas buscando en la zona donde es más
                            probable que esté.
                        </p>
                    </div>
                    <hr class="question_division">
                    <span class="division_points">. . . . .</span>
                    <div class="question">
                        <h4 class="question_title">¿TODOS MIS VECINOS VEN LA PUBLICACIÓN?</h4>
                        <p class="question_answer">
                            No necesariamente. Facebook usa un algoritmo para determinar un público
                            objetivo en la zona especificada y sólo un porcentaje de estas personas reciben
                            el mensaje.
                        </p>
                    </div>
                    <span class="division_points">. . . . .</span>
                    <div class="question">
                        <h4 class="question_title">¿CÓMO DETERMINA FACEBOOK UNA UBICACIÓN?</h4>
                        <p class="question_answer">
                            Facebook usa información del GPS, redes celulares y redes Wi-fi para
                            determinar en qué ubicación usan las personas la aplicación de la
                            plataforma.
                        </p>
                    </div>
                    <span class="division_points">. . . . .</span>
                    <hr class="question_division">
                    <div class="question">
                        <h4 class="question_title">¿MEJOR UN RADIO DE PUBLICACIÓN MÁS AMPLIO?</h4>
                        <p class="question_answer">
                            No. Si el radio de publicación es muy amplio, ésta llegará más lejos,
                            pero a menos personas en la zona de pérdida. La información queda más
                            dispersa.
                        </p>
                    </div>
                </div>
            </div>
            <div class="title_container">
                <h2>!ENCONTRÉMOSLOS!</h2>
                <img src="./img/common/mancha_titulo.png" alt="title_design" />
            </div>
            <div id="form_container">
                <form id="join_us_form" action="https://gateway.payulatam.com/ppp-web-gateway" method="post">
                    <div id="form_fields_container">
                        <div class="small_field">
                            <label for="name">NOMBRE</label>
                            <input class="required" type="text" name="buyerFullName" id="name" required>
                        </div>
                        <div class="small_field">
                            <label for="telephone">CELULAR</label>
                            <input class="required" type="text" name="telephone" id="phone" maxlength="20" required>
                        </div>
                        <div class="small_field">
                            <label for="country">PAÍS</label>
                            <dl class="dropdown">
                                <dt>
                                    <span class="instruction">Selecciona tu país</span>
                                    <span class="arrow">
                                        <img src="img/common/arrow.png" alt="select arrow" />
                                    </span>
                                </dt>
                                <dd>
                                    <ul>
                                        <li>
                                            <span class="option" id="ARG">Argentina</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Argentina.png" alt="Argentina" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="BOL">Bolivia</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Bolivia.png" alt="Bolivia" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="CHL">Chile</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Chile.png" alt="Chile" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="COL">Colombia</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Colombia.png" alt="Colombia" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="CRI">Costa Rica</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Costa-Rica.png" alt="Costa Rica" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="CUB">Cuba</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Cuba.png" alt="Cuba" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="ECU">Ecuador</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Ecuador.png" alt="Ecuador" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="SLV">El Salvador</span>
                                            <span class="flag">
                                                <img src="img/common/countries/El-Salvador.png" alt="El Salvador" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="ESP">España</span>
                                            <span class="flag">
                                                <img src="img/common/countries/España.png" alt="España" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="GTM">Guatemala</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Guatemala.png" alt="Guatemala" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="GNQ">Guinea Ecuatorial</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Guinea-Ecuatorial.png" alt="Guinea Ecuatorial" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="HND">Honduras</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Honduras.png" alt="Honduras" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="MEX">México</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Mexico.png" alt="México" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="NIC">Nicaragua</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Nicaragua.png" alt="Nicaragua" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="PAN">Panamá</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Panama.png" alt="Panamá" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="PRY">Paraguay</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Paraguay.png" alt="Paraguay" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="PER">Perú</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Peru.png" alt="Perú" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="PRI">Puerto Rico</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Puerto-Rico.png" alt="Puerto Rico" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="DOM">República Dominicana</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Republica-Dominicana.png" alt="República Dominicana" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="URY">Uruguay</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Uruguay.png" alt="Uruguay" />
                                            </span>
                                        </li>
                                        <li>
                                            <span class="option" id="VEN">Venezuela</span>
                                            <span class="flag">
                                                <img src="img/common/countries/Venezuela.png" alt="Venezuela" />
                                            </span>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                            <select class="required" name="country" id="country_selector" required="true">
                                <option value="">Selecciona tu país</option>
                                <option value="ARG">Argentina</option>
                                <option value="BOL">Bolivia</option>
                                <option value="CHL">Chile</option>
                                <option value="COL">Colombia</option>
                                <option value="CRI">Costa Rica</option>
                                <option value="CUB">Cuba</option>
                                <option value="ECU">Ecuador</option>
                                <option value="SLV">El Salvador</option>
                                <option value="ESP">España</option>
                                <option value="GTM">Guatemala</option>
                                <option value="GNQ">Guinea Ecuatorial</option>
                                <option value="HND">Honduras</option>
                                <option value="MEX">México</option>
                                <option value="NIC">Nicaragua</option>
                                <option value="PAN">Panamá</option>
                                <option value="PRY">Paraguay</option>
                                <option value="PER">Perú</option>
                                <option value="PRI">Puerto Rico</option>
                                <option value="DOM">República Dominicana</option>
                                <option value="URY">Uruguay</option>
                                <option value="VEN">Venezuela</option>
                            </select>
                        </div>
                        <div class="small_field">
                            <label for="city">CIUDAD</label>
                            <input class="required" type="text" name="city" id="city" required>
                        </div>
                        <div class="small_field">
                            <label for="buyerEmail">CORREO</label>
                            <input class="required" type="email" name="buyerEmail" id="email" required>
                        </div>
                        <div class="plan_selector">
                            <div class="plan_options_container">
                                <input type="radio" name="plan" value="3D1000P" checked data-days="3" data-people="1000" data-price="9">
                                <input type="radio" name="plan" value="3D2000P" data-days="3" data-people="2000" data-price="15">
                                <input type="radio" name="plan" value="7D1000P" data-days="7" data-people="1000" data-price="17">
                            </div>
                            <div class="options_fake_buttons">
                                <button type="button" class="option_button first selected" data-reference="3D1000P">
                                    PLAN BÁSICO
                                </button>
                                <button type="button" class="option_button" data-reference="3D2000P">
                                    + PERSONAS
                                </button>
                                <button type="button" class="option_button last" data-reference="7D1000P">
                                    + DÍAS
                                </button>
                            </div>
                            <div class="price_explanation">
                                <span id="contribution_word">APORTE</span>
                                <div class="price">
                                    <span class="currency">USD</span>
                                    <span class="value" id="value_display">$9</span>
                                </div>
                                <p class="price_paragraph">
                                    El servicio tiene una duración de <span class="days">3 días</span> durante los cuales
                                    tu publicación puede alcanzar una visualización de por lo menos <span class="people">1000 personas</span>
                                    por día.
                                </p>
                            </div>
                        </div>

                        <!-- Valores de la transacción -->
                        <input name="amount" id="payment_amount" type="hidden"  value="9" >
                        <input name="tax"           type="hidden"  value="0"  >
                        <input name="taxReturnBase" type="hidden"  value="0" >
                        <input name="responseUrl"    type="hidden"  value="https://clabki.com/server/paymentResponse.php" >
                        <input name="confirmationUrl"    type="hidden"  value="https://clabki.com/server/paymentConfirmation.php" >
                        <input name="description"   type="hidden"  value="Servicio de publicación y búsqueda Clabki" >
                        <input name="currency"      type="hidden"  value="USD" >
                        <input name="test"      type="hidden"  value="0" >
                        <input name="signature"     type="hidden"  value="" id="signature">
                        <input name="accountId"     type="hidden"  value="516688" >
                        <input name="merchantId"    type="hidden"  value="515257"   >
                        <input name="referenceCode" type="hidden"  value="" id="referenceCode">

                        <input type="submit" value="COMPRAR" id="send_button">
                    </div>
                </form>
                <div class="price_explanation">
                    <span id="contribution_word">APORTE</span>
                    <div class="price">
                        <span class="currency">USD</span>
                        <span class="value" id="value_display">$9</span>
                    </div>
                    <p class="price_paragraph">
                        El servicio tiene una duración de <span class="days">3 días</span> durante los cuales
                        tu publicación puede alcanzar una visualización de por lo menos <span class="people">1000 personas</span>
                        por día.
                    </p>
                    <br>
                    <p class="price_paragraph">
                        Si quieres llegar a más personas por día o extender la duración del anuncio comunícate
                        con nuestro equipo <span><a href="https://m.me/clabki" target="_blank">aquí</a></span>.
                    </p>
                    <br>
                    <p class="price_paragraph">
                        Buscamos tu mascota en cualquier lugar del mundo
                    </p>
                    <a id="doubt_link">¿tienes alguna duda?</a>
                </div>
            </div>
        </section>
        <section id="social_networks_section">
            <article id="follow_us_box">
                <h2>¡SÍGUENOS!</h2>
                <div class="container">
                    <div id="text_and_counter_count">
                        <div class="button_text_container">
                            <p>Más seguidores significan más ayudantes para encontrar a una mascota</p>
                            <div class="fb-like"
                                data-href="https://www.facebook.com/clabki"
                                data-layout="button" data-action="like"
                                data-size="large"
                                data-show-faces="false"
                                data-share="false">
                            </div>
                        </div>
                        <div id="count_container">
                            <span>A <strong class="pink_bold" id="followers_count"></strong><img src="img/common/lines.png"></span><br>
                            <strong class="bold">PERSONAS</strong><br>
                            <span>LES GUSTA</span><br>
                            <strong class="bold">CLABKI</strong>!
                        </div>
                    </div>
                </div>
            </article>
            <hr>
            <article id="contact_us_box">
                <h2>¡CONTÁCTANOS!</h2>
                <div class="container">
                    <div id="text_and_code">
                        <div class="button_text_container">
                            <p>
                                Puedes hablar con nosotros escaneando el código con la aplicación
                                Facebook Messenger o dando click en el botón
                            </p>
                            <a href="https://m.me/clabki" target="_blank">¿HABLAMOS?</a>
                        </div>
                        <a href="https://m.me/clabki" target="_blank">
                            <img src="img/common/messenger_code.png" alt="código de facebook messenger">
                        </a>
                    </div>
                </div>
            </article>
        </section>
        <footer>
            <div class="contact_container_footer">
                <span class="contact_icon" id="whatsapp_footer"></span>
                <span class="contact_info">+57 310 852 9139</span>
            </div>
            <div class="contact_container_footer">
                <span class="contact_icon" id="email_footer"></span>
                <span class="contact_info">COMUNIDAD.CLABKI@GMAIL.COM</span>
            </div>
            <div class="contact_container_footer">
                <span class="contact_icon" id="facebook_footer"></span>
                <span class="contact_info">FACEBOOK.COM/CLABKI</span>
            </div>
        </footer>
    </body>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.5.1/qs.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.17.0/axios.min.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.0/moment.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.7/hammer.min.js"></script>

        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-90695201-1"></script>
    <script type="text/javascript" src="./js/master.js"></script>
</html>
