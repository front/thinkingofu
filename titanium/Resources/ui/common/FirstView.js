//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	

	
	var thinker = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 10, left: 10,
		width: 250, height: 60
	});
	
		var thinkee = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		color: '#336699',
		top: 70, left: 10,
		width: 250, height: 60
	});


self.add(thinker);
self.add(thinkee);
	
	
	var image = Ti.UI.createImageView({
		image:'/images/henrik.jpg',
		height: 200
	});
self.add(image);
	
	image.addEventListener('touchstart', function(e){
	var url = "http://localhost:3000/api/think";
	var client = Ti.Network.createHTTPClient({
	// function called when the response data is available
		onload : function(e) {
		Ti.API.info("Received text: " + this.responseText);
		//alert('success');
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
		Ti.API.debug(e.error);
		alert('error');
	},
     timeout : 5000  // in milliseconds
 });
 // Prepare the connection.
 client.open("POST", url);
 
 		Ti.API.info(thinker.value);

 
 // Send the request.
 obj = {
 	"thinker": thinker.value,
 	"thinkee": thinkee.value
 }
 obj2 = JSON.stringify(obj);
 client.send(obj); 
		});
	
	
	

	
	
	
	
	
	
	
	
	return self;
}

module.exports = FirstView;
