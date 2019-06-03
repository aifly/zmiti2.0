
export default class Tap{
	constructor(){

	}

	static install(_vue){
		console.log(arguments,1111);

		_vue.mixin({
			beforeCreate(){
				console.log('mounted');
			},
			mounted(){
				
			}
		})

	}
}
