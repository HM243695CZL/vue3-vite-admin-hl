<template>
	<div class='wang-editor-container'>
		<Toolbar
			style='border-bottom: 1px solid #ccc;'
			:editor='editorRef'
			:defaultConfig='state.toolbarConfig'
			:mode='state.mode'
		/>
		<Editor
			:style='state.editorStyle'
			v-model='contentHtml'
			:defaultConfig='state.editorConfig'
			:mode='state.mode'
			@onCreated='handleCreate'
			@onChange='onChange'
		/>
	</div>
</template>

<script lang='ts' setup>
	import '@wangeditor/editor/dist/css/style.css';
	import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
	import { onBeforeUnmount, reactive, ref, shallowRef } from 'vue';

	const props = defineProps({
		content: {
			type: String,
			required: true
		},
		height: {
			type: Number,
			default: 500
		},
		readonly: {
			type: Boolean,
			default: false
		}
	});
	const emits = defineEmits([
		'editorBlur'
	]);
	const editorRef = shallowRef();
	const contentHtml = ref(props.content);
	const state = reactive({
		toolbarConfig: {
			excludeKeys: ['fullScreen']
		},
		mode: 'default',
		editorConfig: {
			placeholder: '请输入内容...',
			readOnly: props.readonly
		},
		editorStyle: {
			height: props.height + 'px',
			overflow: 'hidden'
		}
	});
	const handleCreate = (editor: any) => {
		editorRef.value = editor; // 记录 editor 实例，重要！
	};
	const onChange = (editor: any) => {
		emits('editorBlur', editor.getHtml());
	};
	// 组件销毁时，也及时销毁编辑器
	onBeforeUnmount(() => {
		const editor = editorRef.value;
		if (editor === null) return;
		editor.destroy();
	});
	defineExpose({
		editorRef
	});
</script>

<style scoped lang='scss'>

</style>
