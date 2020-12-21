<template>
	<div class="custom-title">
		<span class="custom-title-left"></span>
		<span class="custom-title-content">{{ title }}</span>
		<span class="custom-title-right"></span>
	</div>
</template>
<script>
export default {
	name: 'title-vue',
	props: {
		title: {
			type: String,
			default: ''
		}
	}
}
</script>
<style scoped>
	.custom-title {
		display: flex;
		width: 100%;
		height: auto;
	}
	.custom-title-content {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
	}
	.custom-title-left {
		min-width: 0;
		flex-grow: 1;
		background: url(./img/title.png) right center no-repeat;
		background-size: 10px 10px;
		position: relative;
	}
	.custom-title-left::before, .custom-title-right::before {
		content: "";
		position: absolute;
		top: 50%;
		right: 0;
		left: 0;
		transform: translateY(-50%);
		height: 1px;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
	}
	.custom-title-right {
		min-width: 0;
		flex-grow: 1;
		background: url(./img/title.png) right center no-repeat;
		background-size: 10px 10px;
		transform: rotate(-180deg);
		position: relative;
	}
</style>