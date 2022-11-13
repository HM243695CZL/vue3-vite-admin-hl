<template>
	<div class='common-top-container mb15'>
		<div class='search-top-title'>
			<div class='search-top-title-left'>
				<el-button size='default' type='primary' @click='clickAdd' v-if='props.buttonAuth.includes("addBtn")'>
					<el-icon>
						<ele-Plus />
					</el-icon>
					新增
				</el-button>
				<el-popconfirm title='确定删除所选数据吗？' @confirm='clickBatchDelete' v-if='props.buttonAuth.includes("deleteBtn")'>
					<template #reference>
						<el-button size='default' type='default' class='ml10'>
							<el-icon>
								<ele-Delete />
							</el-icon>
							删除
						</el-button>
					</template>
				</el-popconfirm>
				<slot name='left'></slot>
			</div>
			<div class='search-top-title-right'>
				<slot name='right'></slot>
				<el-button size='default' type='primary' @click='clickSearch' v-if='props.buttonAuth.includes("searchBtn")'>
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size='default' type='default' class='ml10' @click='clickReset' v-if='props.buttonAuth.includes("resetBtn")'>
					<el-icon>
						<ele-Setting />
					</el-icon>
					重置
				</el-button>
			</div>
		</div>
	</div>
</template>

<script lang='ts' setup>
	const props = defineProps({
		buttonAuth: {
			type: Array,
			default: () => [
				'addBtn', 'deleteBtn', 'searchBtn', 'resetBtn'
			]
		}
	});

	const emits = defineEmits([
		'clickAdd', 'clickBatchDelete', 'clickSearch', 'clickReset'
	]);

	const clickSearch = () => {
		emits('clickSearch');
	};
	const clickReset = () => {
		emits('clickReset');
	};
	const clickBatchDelete = () => {
		emits('clickBatchDelete');
	};
	const clickAdd = () => {
		emits('clickAdd');
	}
</script>

<style scoped lang='scss'>
	.common-top-container{
		.search-top-title{
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			&-left{
				display: flex;
				justify-content: flex-start;
			}
			&-right{
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>
