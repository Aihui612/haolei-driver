<template>
	<view  class="bg" v-html='text'>
		
	</view>
</template>

<script>
	
	import my from '../../servers/my.js';
	export default {
		data() {
			return {
				text:''
			};
		},
		mounted() {
			
			this.getText();
			
		},
		methods:{
			getText() {
						
				my.aboutUs({code:'aboutUs'}).then(res => {
					console.log(res.data);
					this.text = res.data.content;
				});
			},
		}
	}
</script>

<style lang="less">
	.bg{
		background-color: white;
	}

</style>
