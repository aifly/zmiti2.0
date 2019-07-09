import ZmitiMask from './index.vue';
import Vue from 'vue';

let ZmitiMaskConstructor = Vue.extend(ZmitiMask);

let instance;
let seed = 1;
const install = ()=>{
	Object.defineProperty(Vue.prototype, 'zmitiMask',{
		get(){
			 let id = 'message_' + seed++
			const zmitiMask = options => {
				instance = new ZmitiMaskConstructor({
					propsData: options
				})
				index++
				instance.id = id
				instance.vm = instance.$mount()
				document.body.appendChild(instance.vm.$el)
				return instance.vm
			}
			return zmitiMask;
		}
	})
}

export default install;