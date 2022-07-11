<template>
	<div class='wang-editor-container'>
		<div id="toolbar-container"></div>
		<div id="editor-container" :style='{height: height + "px", overflow: "hidden"}'></div>
	</div>
</template>

<script lang='ts'>
import '@wangeditor/editor/dist/css/style.css';
import { defineComponent, onMounted, reactive, onBeforeUnmount, shallowRef } from 'vue';
import { createEditor, createToolbar, IEditorConfig, IDomEditor, IToolbarConfig } from '@wangeditor/editor';
import { policy } from '/@/api/oss';
import { StatusEnum } from '/@/common/status.enun';
import axios from 'axios';
import { ElMessage } from 'element-plus';

type InsertFnType = (url: string, alt: string, href: string) => void

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
		const state = reactive({
			dataObj: {
				policy: '',
				signature: '',
				key: '',
				ossAccessKeyId: '',
				dir: '',
				host: ''
			}
		})
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
					server: '/admin/aliyun/oss/policy',
					filedName: 'file',
					// base64LimitSize: 10 * 1024 * 1024 // 10M 以下插入base64
					customUpload(file: File, insertFn: InsertFnType) {
						policy().then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								const {accessKeyId, dir, host, policy, signature} = res.data;
								state.dataObj.policy = policy;
								state.dataObj.signature = signature;
								state.dataObj.key = dir + '/${filename}';
								state.dataObj.ossAccessKeyId = accessKeyId;
								state.dataObj.dir = dir;
								state.dataObj.host = host;
								const formData = new FormData();
								formData.append('policy', state.dataObj.policy);
								formData.append('signature', state.dataObj.signature);
								formData.append('key', state.dataObj.key);
								formData.append('ossAccessKeyId', state.dataObj.ossAccessKeyId);
								formData.append('dir', state.dataObj.dir);
								formData.append('host', state.dataObj.host);
								formData.append('file', file);
								const config = {
									headers: {
										'Content-type': 'multipart/form-data'
									}
								};
								axios.post(state.dataObj.host, formData, config).then(result => {
									if (result.data === '') {
										insertFn(state.dataObj.host + '/' + state.dataObj.dir + '/' + file.name, '', '');
									} else {
										ElMessage.error('上传图片失败');
									}
								})
							}
						})
					}
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
