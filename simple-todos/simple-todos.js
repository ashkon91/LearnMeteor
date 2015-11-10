Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
	//This code only runs on the client
	Template.body.helpers({
		tasks: function () {
			return Tasks.find({}, {sort: {createdAt: -1}});
		}	
	});
	
	Template.body.events({
		"submit .new-task": function (event){
			//prevent default browser form submit
			event.preventDefault();

			//Get value from form element
			var text = event.target.text.value;

			//Insert a task into a collection
			Tasks.insert({
				text: text,
				createdAt: new Date()
			});
			event.target.text.value ="";
		}
	});

	Template.task.events({
		"click .toggle-checked": function() {
			//set the checked property to the opposite of its current value
			Tasks.update(this._id, {
				$set: {checked: ! this.checked}
			});
		},
		"click .delete": function (){
			Tasks.remove(this._id);
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
