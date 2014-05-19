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
        sensorList: new SensorList()
    },
    parse: function(response) {
        response.sensorList = new SensorList(response.sensors);

        return response;
    },

    success: function(response) {
        console.log('success');

    }
});

TemperatureView = Backbone.View.extend({

    el: '#temperatures',

    initialize: function() {
        this.listenTo(this.model, 'reset', this.render);
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'add', this.render);
        this.model.fetch;
    },

    render: function(eventName) {
        var list = this.model.get('sensorList');
        console.log(list.toJSON());
        var source = $('#sensor-list-template').html();
        var template = Handlebars.compile(source);
        var html = template(list.toJSON());

        this.$el.html(html);
        this.renderTimestamp();
    },
    renderTimestamp: function() {
        var tsText = $("<p></p>").addClass("text-right");
        var timestamp = $("<div></div>").addClass("col-sm-4 col-sm-offset-8").append(tsText);
        tsText.text(this.model.get('timestamp'));
        $('#timestamp').append(timestamp);
    }
});


$(document).ready(function() {
    var temps = new TemperatureRequest();
    var tempsView = new TemperatureView({
        model: temps
    });

    temps.fetch();
    // setInterval(function() {
    //     temps.fetch();
    // }, 30000);

    // temps.fetch({
    //     success: function() {
    //         console.log('success');
    //         var tsText = $("<p></p>").addClass("text-right");
    //         var timestamp = $("<div></div>").addClass("col-sm-4 col-sm-offset-8").append(tsText);
    //         tsText.text(temps.get('timestamp'));
    //         $('#timestamp').append(timestamp);
    //     }
    // });
});