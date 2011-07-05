// ==UserScript== 
// @name Basecamp Color
// @include https://*.basecamphq.com/*
// ==/UserScript==

var add_jq = function(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
};
function main(){
	jQuery.noConflict();
	var Colors = {
		projects: {},
		
		init: function() {
			jQuery('.schedule_wrapper').addClass('clearfix');
			jQuery('.calendar_link').css('float', 'right');
			
			Colors.list = jQuery('<div class="owc-projects clearfix">').insertAfter( jQuery('.calendar_container') );
			Colors.add_colors();
			
			var container = jQuery('.calendar_container');
			container = container[0];
			container.addEventListener("DOMNodeInserted", Colors.add_colors);
		},
		add_colors: function(){
			jQuery('.calendar_event.spanned').each(function(){
				var el = jQuery(this);
				
				if ( el.hasClass('owc-project-modified') )
					return;
					
				var edit = el.data('editPath');
				var pattern = /projects\/(\d+)\//;
				var matches = pattern.exec(edit);
				if ( matches.length >= 2 ) {
					var id = matches[1];
					
					pattern = /Project: (.*)/;
					matches = pattern.exec( el.find('a.entry_title').attr('title') );
					
					var title = '';
					if ( matches.length >= 2 ) {
						title = matches[1];
					}
					
					Colors.projects[id] = {
						id: id,
						title: title
					};
					el.addClass('owc-project-' + id).addClass('owc-project-modified');
				}
			});
			
			var i = 1;
			var html = '<ul>';
			jQuery.each(Colors.projects, function(key, obj){
				var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
				jQuery('.owc-project-' + obj.id).addClass('owc-project-color-' + i);
				html += '<li class="owc-project-color-' + i + '">' + obj.title + '</li>';

				if ( i == 10 )
					i = 0;
	
				i++;
			});
			html += '</ul>';
			Colors.list.html(html);
		}
	};
	Colors.init();
}
add_jq(main);