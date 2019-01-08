$(function() {
	var url_graph = 'https://graph.facebook.com/?id=';
	$('#search_url').submit(function(e) {
		var url = $('#url').val();
		urlRequest = url_graph+url;
		e.preventDefault();
	 if (!isUrl(url)){
	 	$('.result').show().addClass('error').html("<h1>Essa não é uma url válida .Por favor informe uma url válida</h1>");
	 	$('#url').val('');
	 }else{	 
			var request = $.ajax({
				url: urlRequest,
				type: "GET",
				cache: false
			});
			request.done(function(msg) {
				html  = "<h2>Compartilhamentos:</h2>";
				html += "<p><label>Número de compartilhamentos:</label> "+msg.share.share_count+"</p>";
				html += "<p><label>Número de comentários:</label> "+msg.share.comment_count+"</p>";
				if(msg.og_object){
					html += "<p><label>Título:</label>"+msg.og_object.title+"</p>";
					html += "<p><label>Descrição:</label>"+msg.og_object.description+"</p>";
					html += "<p><label>Tipo:</label>"+msg.og_object.type+"</p>";	
				}			
				html += "<p><label>Url:</label><a href='"+msg.id+"' target='_blank'>"+msg.id+"</a></p>";				
				$('.result').removeClass('error').show().html(html);
			});
			request.fail(function(jqXHR, textStatus) {
				alert( "Request failed: " + textStatus );
			});		
			$('#url').val('');
		}
	});

	function isUrl(s) {
		var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
		return regexp.test(s);
	}
});
