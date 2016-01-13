define(function(require, exports, module) {

	var Validator = require('bootstrap.validator');
    require('common/validator-rules').inject(Validator);
    var Messenger = require('../player/messenger');
    exports.run = function() {

        var videoHtml = $('#lesson-dashboard');
        var courseId = videoHtml.data("course-id");
        var lessonId = videoHtml.data("lesson-id");
        var mediaId = videoHtml.data("lesson-mediaid");

        var playerUrl = '/course/'+courseId+'/lesson/'+lessonId+'/player?';
        var html = '<iframe src=\''+playerUrl+'\' name=\'viewerIframe\' id=\'viewerIframe\' width=\'100%\'allowfullscreen webkitallowfullscreen height=\'100%\' style=\'border:0px\'></iframe>';
        $("#lesson-video-content").html(html);
        var messenger = new Messenger({
            name: 'parent',
            project: 'PlayerProject',
            children: [ document.getElementById('viewerIframe') ],
            type: 'parent'
        });

        messenger.on("ready", function(){
            var player = window.frames["viewerIframe"].window.BalloonPlayer;
            var markersUrl =  '/course/lesson/'+lessonId+'/marker/show';
            player.setMarkerEscepe(false);
            player.setControlBarLock(true);
             $.ajax({
                type: "post",
                url: markersUrl,
                dataType: "json",
                success:function(data){
                    var markers = new Array();
                    for(var index in data) {
                      var marker={
                        "id":data[index].id,
                        "time":data[index].second,
                        "text":"ads",
                        "finished":data[index].finish
                        };
                        markers.push(marker);
                    }
                    if(data.length != 0) {
                        player.setMarkers(markers);
                    }
                    console.log(markers);
                }
            });
        });
        $.get($('.question').data('url'),function(response){
        	$('.question').html(response);
        })
    }
});