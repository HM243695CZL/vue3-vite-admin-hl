<template>
	<div class='common-modal-form-create-container'>
		<el-dialog :append-to-body='false'
							 :close-on-click-modal='false'
							 :title='title'
							 v-model='isShowDialog' :width='props.modalWidth'>
			<slot></slot>
			<template #footer>
				<div class='dialog-footer'>
					<el-button @click='closeDialog'>取 消</el-button>
					<el-button type='primary' @click='clickConfirm'>确 定</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts' setup>
	import useFormCreateCrud from '/@/hooks/useFormCreateCrud';

	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		createPath: {
			type: String,
			required: true
		},
		updatePath: {
			type: String,
			required: true
		},
		viewPath: {
			type: String,
			required: true
		},
		modalWidth: {
			type: String,
			default: '600px'
		}
	});
	const emits = defineEmits([
		'refreshList'
	]);
	const refreshList = () => {
		emits('refreshList');
	};
	const {
		title,
		isShowDialog,
		closeDialog,
		openDialog,
		clickConfirm
	} = useFormCreateCrud({
		title: '分类',
		createPath: props.createPath,
		updatePath: props.updatePath,
		viewPath: props.viewPath,
		clearFields: ['name'],
		refreshList
	});
	defineExpose({
		openDialog
	});
</script>

