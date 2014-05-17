<?php

class Sensor  implements JsonSerializable{

	private $channel;
	private $name;
	private $temperature;
	private $tempMax;
	private $tempMin;

	public function setChannel($chan) {
		$this->channel = $chan;
	}

	public function setName($nam) {
		$this->name = $nam;
	}

	public function setTemperature($temp) {
		$this->temperature = $temp;
	}

	public function setTempMax($max){
		$this->tempMax = $max;
	}

	public function setTempMin($min){
		$this->tempMin = $min;
	}

	public function getChannel(){
		return $this->channel;
	}

	public function jsonSerialize() {
		$data = array();

		$data['channel'] = $this->channel;
		$data['name'] = $this->name;
		$data['temperature'] = $this->temperature;
		$data['tempMin'] = $this->tempMin;
		$data['tempMax'] = $this->tempMax;

		return $data;
	}	
}

?>