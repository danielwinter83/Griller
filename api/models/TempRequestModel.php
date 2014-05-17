<?php

class TempRequest implements JsonSerializable {
	private $timestamp;
	private $logfile;
	private $sensors = [];

	public function add($key, $sensor){
		$this->sensors[] = $sensor;
	}

	public function getSensors(){
		return $this->sensors;
	}

	public function setTimestamp($ts) {
		$this->timestamp = $ts;
	}

	public function setLogfile($lf){
		$this->logfile = $lf;
	}

	public function jsonSerialize() {
		$data = array();

		$data['timestamp'] = $this->timestamp;
		$data['logfile'] = $this->logfile;
		$data['sensors'] = $this->sensors;

		return $data;
	}
}

?>