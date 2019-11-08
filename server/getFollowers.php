<?php
    function getPageFollowers() {

        /*$fanPageId = '516607761870650';
        $accessToken = 'access_token=207271499718170|7ede4633f6e471307ce8a678a74922c0';
        $fields = 'fields=fan_count';
        $address = 'https://graph.facebook.com/';
        $url = $address.$fanPageId.'?'.$accessToken.'&'.$fields;
        $response = file_get_contents( $url );*/
        echo '{"fan_count": 10500}';
    }

    getPageFollowers();
?>
