<template>
	<div class='wang-editor-container'>
		<Toolbar
			style="border-bottom: 1px solid #ccc"
			:editor="editorRef"
			:defaultConfig="toolbarConfig"
			:mode="mode"
		/>
		<Editor
			:style="editorStyle"
			v-model="contentHtml"
			:defaultConfig="editorConfig"
			:mode="mode"
			@onCreated="handleCreated"
			@onBlur='onBlur'
		/>
	</div>
</template>

<script lang='ts'>
import '@wangeditor/editor/dist/css/style.css';
import { defineComponent, shallowRef, ref, onBeforeUnmount } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

export default defineComponent({
	name: 'HlEditor',
	components: {
		Editor,Toolbar
	},
	props: {
		content: {
			type: String
		},
		height: {
			type: Number,
			default: 500
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	setup (props, ctx) {
		const editorRef = shallowRef();
		const toolbarConfig = {

		};
		const contentHtml = ref(props.content);
		const mode = 'default';
		const editorConfig = {
			placeholder: '请输入内容...',
			readOnly: props.readonly,
			isFullScreen: false
		};
		// 组件销毁时，也及时销毁编辑器
		onBeforeUnmount(() => {
			const editor = editorRef.value
			if (editor == null) return
			editor.destroy()
		});
		const handleCreated = (editor: any) => {
			editorRef.value = editor // 记录 editor 实例，重要！
		};
		const onBlur = (editor: any) => {
			ctx.emit('editor-blur', editor.getHtml())
		};
		const editorStyle = {
			height:  props.height + 'px',
			overflow: 'hidden'
		}
		return {
			editorRef,
			toolbarConfig,
			mode,
			contentHtml,
			editorConfig,
			handleCreated,
			onBlur,
			editorStyle
		}
	}
});
</script>

<style scoped>

</style>
