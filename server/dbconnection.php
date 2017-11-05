<?php

	class DatabaseConnection extends mysqli {

		const DB_HOSTNAME = "localhost";
		const DB_USERNAME = "id3131148_morion_iot";
		//const DB_USERNAME = "root";
		const DB_PASSWORD = "@Morion2016";
		//const DB_PASSWORD = "@MorionMysql2016";
		const DB_NAME = "id3131148_clabki_promote";

		public function __construct() {

			parent::__construct(self::DB_HOSTNAME, self::DB_USERNAME, self::DB_PASSWORD, self::DB_NAME);

			if($this->connect_errno){
				$message = 'Connection failed: '.$sql->connect_error;
				throw new Exception($message, $sql->connect_errno);
			}

			$this->set_charset("utf8");
		}
	}
?>
