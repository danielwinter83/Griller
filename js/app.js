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

TemperatureView = Backbone.View.extend({

    initialize: function() {
        console.log(this.collection);
        // this.collection.bind("reset", this.render, this);
    },

    render: function(eventName) {
        var source = $('#sensor-list-template').html();
        var template = Handlebars.compile(source);
        var html = this.template(this.collection.toJSON());

        this.$el.html(html);
    } 
});


$(document).ready(function() {
    var temps = new TemperatureRequest();
    temps.fetch({
        success: function() {
            var sensorsCollection = temps.get("sensors");

            var tempView = new TemperatureView({
                collection: sensorsCollection
            });
        }
    });
});