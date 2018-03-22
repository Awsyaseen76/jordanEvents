(function(){
	angular
		.module('jordanEvents')
		.controller('makerRegisterController', makerRegisterController)

		function makerRegisterController(makerService, $location){
			var model = this;

			function init(){
			}
			init();	
			model.registerSubmit = registerSubmit;

			function registerSubmit(maker, password2){
				if (!maker){
					model.error = 'Please fill all the requested fields';
					return;
				}
				if (maker.password === password2){
					model.error = null;
					var newMaker = makerService.addNewMaker(maker)
					if (newMaker === null){
						model.error = 'This email is already registered'
					} else {
						$location.url('/makerProfile/'+newMaker.makerId)
					}
				} else {
					model.error = 'Please double check that the two passwords are matched';
				}
			}
		}
})();