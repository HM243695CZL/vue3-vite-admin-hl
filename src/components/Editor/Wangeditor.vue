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
			@onChange='onChange'
		/>
	</div>
</template>

<script lang='ts'>
import '@wangeditor/editor/dist/css/style.css';
import { defineComponent, reactive, ref, onBeforeUnmount, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { policy } from '/@/api/oss';
import { StatusEnum } from '/@/common/status.enun';
import axios from 'axios';
import { ElMessage } from 'element-plus';

type InsertFnType = (url: string, alt: string, href: string) => void

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
		const editorRef = shallowRef();
		const toolbarConfig = {
			excludeKeys: ['fullScreen']
		};
		const contentHtml = ref(props.content);
		const mode = 'default';
		const editorConfig = {
			placeholder: '请输入内容...',
			readOnly: props.readonly,
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
		// 组件销毁时，也及时销毁编辑器
		onBeforeUnmount(() => {
			const editor = editorRef.value
			if (editor == null) return
			editor.destroy()
		});
		const handleCreated = (editor: any) => {
			editorRef.value = editor // 记录 editor 实例，重要！
		};
		const onChange = (editor: any) => {
			ctx.emit('editor-blur', editor.getHtml())
		};
		const editorStyle = {
			height:  props.height + 'px',
			overflow: 'hidden'
		};
		return {
			editorRef,
			toolbarConfig,
			mode,
			contentHtml,
			editorConfig,
			handleCreated,
			onChange,
			editorStyle
		}
	}
});
</script>

<style scoped>

</style>
