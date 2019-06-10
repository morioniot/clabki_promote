<?php

	function generateToken( $size ) {
		$token = "";
		$charactersSource = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		for($i = 0; $i < $size; $i++) {
			$token .= $charactersSource[mt_rand(0, strlen($charactersSource) - 1)];
		}
		return $token;
	}

	if(!empty($_GET['value']) && !empty($_GET['country']) && !empty($_GET['currency'])) {
		$value = $_GET['value'];
		$country = $_GET['country'];
		$currency = $_GET['currency'];
	}

	$time = new DateTime();
	$api_key = "4Vj8eK4rloUd272L48hsrarnUA";
	$merchant_id = "508029";
	$reference_code = $time->getTimestamp() . generateToken(6);

	//Generating signature depending on country (updates payment methods)
	if($country === "CO" || $country === "MX")
		$signature = "$api_key~$merchant_id~$reference_code~$value~$currency";
	else
		$signature = "$api_key~$merchant_id~$reference_code~$value~$currency~VISA,MASTERCARD,DINERS,AMEX";

	$encoded_signature = md5($signature);
	$response = new stdClass();
	$response->reference_code = $reference_code;
	$response->signature = $encoded_signature;
	$responseJSON = json_encode($response);
	echo  $responseJSON;
?>
