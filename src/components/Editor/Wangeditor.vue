<template>
	<div class='wang-editor-container'>
		<div id="toolbar-container"></div>
		<div id="editor-container" :style='{height: height + "px", overflow: "hidden"}'></div>
	</div>
</template>

<script lang='ts'>
import '@wangeditor/editor/dist/css/style.css';
import { defineComponent, onMounted } from 'vue';
import { createEditor, createToolbar, IEditorConfig, IDomEditor, IToolbarConfig } from '@wangeditor/editor';

export default defineComponent({
	name: 'HlEditor',
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
		const initEditor = () => {
			// 编辑器配置
			const editorConfig: Partial<IEditorConfig> = {};
			editorConfig.placeholder = '请输入...';
			editorConfig.readOnly = props.readonly;
			editorConfig.onBlur = (editor: IDomEditor) => {
				ctx.emit('editor-blur', editor.getHtml())
			};
			editorConfig.MENU_CONF = {
				uploadImage: {
					filedName: 'file',
					base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入base64
				}
			}

			// 工具栏配置
			const toolbarConfig: Partial<IToolbarConfig> = {
				excludeKeys: ['fullScreen'],
			};

			// 创建编辑器
			const editor = createEditor({
				selector: '#editor-container',
				html: props.content,
				config: editorConfig,
				mode: 'default',
			});

			// 创建工具栏
			const toolbar = createToolbar({
				editor,
				selector: '#toolbar-container',
				config: toolbarConfig,
				mode: 'default',
			});
		}
		onMounted(() => {
			initEditor();
		});
	}
});
</script>

<style scoped>

</style>
