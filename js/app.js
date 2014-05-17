Sensor = Backbone.Model.extend({
	defaults: {
		channel: '',
		name: '',
		temperature: 0,
		tempMin: 0,
		tempMax: 0
	}
});

SensorList = Backbone.Collection.extend({
	model: Sensor
});

TemperatureRequest = Backbone.Model.extend({
	urlRoot: '/temperatures',
	defaults: {
		timestamp: '',
		logfile: '',
		sensors: new SensorList()
	}
});

$( document ).ready(function() {
  var temps = new TemperatureRequest();
  temps.fetch();
  console.log(temps);
});