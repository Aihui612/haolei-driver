<template>
	<view class="agreement">
		<rich-text :nodes="nodes"></rich-text>
	</view>
</template>

<script>
	import login from '../../servers/login.js';
	export default {
		data() {
			return {
				nodes:''
			}
		},
		mounted() {
			this.getdata()
		},
		methods: {
			getdata(){
				login.djxy().then(res=>{
					this.nodes=res.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
