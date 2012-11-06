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
		top: 10, left: 10,
		width: 250, height: 60
	});


self.add(thinker);
self.add(thinkee);
	
	
	var image = Ti.UI.createImageView({
		image:'/images/henrik.jpg'
	});
self.add(image);
	
	image.addEventListener('touchstart', function(e){
		alert(e);
	});
	
	
	return self;
}

module.exports = FirstView;
