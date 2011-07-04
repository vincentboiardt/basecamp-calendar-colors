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
			Colors.add_colors();
			document.body.addEventListener("DOMNodeInserted", Colors.add_colors);
		},
		add_colors: function(){
			jQuery('.calendar_event.spanned').each(function(){
				var el = jQuery(this);
				var edit = el.data('editPath');
				var pattern = /projects\/(\d+)\//;
				var matches = pattern.exec(edit);
				if ( matches.length >= 2 ) {
					var id = matches[1];
					Colors.projects[id] = id;
					el.addClass( 'owc-project-' + id );
				}
			});
			var i = 1;
			jQuery.each(Colors.projects, function(id){
				var color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
				jQuery('.owc-project-' + id).addClass('owc-project-color-' + i );

				if ( i == 10 )
					i = 0;
	
				i++;
			});
		}
	};
	Colors.init();
}
add_jq(main);