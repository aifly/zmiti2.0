<template>
	<ul>
		<li v-for='row in data'>
			<span>{{row.menuid}}</span>
			<span>{{row.menuname}}</span>
			<div>{{row.linkurl}}</div>
			<ul v-if='row.children'>
				<li :style='{textIndent:"2em"}' v-for="row1 in row.children">
					<span>{{row1.menuid}}</span>
					<span>{{row1.menuname}}</span>
					<div>{{row1.linkurl}}</div>
					<div>
						<ul v-if='row1.children'>
							<li :style='{textIndent:"4em"}' v-for="row2 in row1.children">
								<span>{{row2.menuid}}</span>
								<span>{{row2.menuname}}</span>
								<div>{{row2.linkurl}}</div>	
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</li>
	</ul>
</template>

<script>
	export default {
		name:'table',
		props:{
			data:Array,
			columns:Array
		},
		data(){
			return{
				
			}
		},
		mounted(){
		}
	}
</script>