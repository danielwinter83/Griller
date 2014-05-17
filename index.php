<?php
require "api/vendor/autoload.php";
require "api/models/TempRequestModel.php";
require "api/models/SensorModel.php";
require_once(__DIR__ . '/api/vendor/php-console/php-console/src/PhpConsole/__autoload.php');

// Call debug from global PC class-helper (most short & easy way)
PhpConsole\Helper::register(); // required to register PC class in global namespace, must be called only once

$app = new \Slim\Slim();

$app->get('/temperatures', function () {

	$csvFile = 'api/data/current_temp';

	//get config
	$ini_array = parse_ini_file("api/conf/WLANThermo.conf", TRUE);

	PC::debug($ini_array);

	//get temp file
	$currenttemp = file_get_contents($csvFile);

	PC::debug($currenttemp);

	//split csv temp file 
	$temp = explode(";",$currenttemp);
	
	//get timestamp and logfile from array
	$time_stamp = $temp[0];
	$logfile = $temp[18];


	//get sections from ini file
	$enabledChannels = $ini_array['ch_show'];
	$channelNames = $ini_array['ch_name'];

	$temperatureResponse = new TempRequest();
	
	$temperatureResponse->setTimestamp($time_stamp);
	$temperatureResponse->setLogfile($logfile);

	$i = 1;

	foreach ($enabledChannels as $key => $value) {
		if($value){
			$sensor = new Sensor();

			$sensor->setChannel($key);
			$sensor->setName('Kanal 0');
			$sensor->setTemperature($temp[$i]);
			$sensor->setTempMax(0);
			$sensor->setTempMin(200);

			$temperatureResponse->add($key, $sensor);
		}
		$i++;
	}

	 PC::debug($temperatureResponse);
	 $json = json_encode( $temperatureResponse );

	header('Content-type: application/json');
    echo "$json";
});

$app->run();

?>