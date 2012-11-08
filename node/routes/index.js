

exports.index = function(req, res){
	var ThoughtModel = mongoose.model('ThoughtModel', ThoughtModel);  

	var res = ThoughtModel.find(function(err, thoughts){

	});


	res.render('index.jade', { title: 'WhosThinkingAboutWho', thoughts: ["one", "two"], errors: [] });
};


exports.api = function(req, res){
	res.send('Thinking of you API is running');
};

exports.api_thoughts = function (req, res){
	return ThoughtModel.find(function (err, thoughts) {
		if (!err) {
			return res.send(thoughts);
		} else {
			return console.log(err);
		}
	});
};