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
	import axios from 'axios';
	import { StatusEnum } from '/@/common/status.enun';
	import { policy } from '/@/api/oss';
	import { ElMessage } from 'element-plus';

	type InsertFnType = (url: string, alt: string, href: string) => void

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
		dataObj: {
			policy: '',
			signature: '',
			key: '',
			ossAccessKeyId: '',
			dir: '',
			host: ''
		},
		toolbarConfig: {
			excludeKeys: ['fullScreen']
		},
		mode: 'default',
		editorConfig: {
			placeholder: '请输入内容...',
			readOnly: props.readonly,
			MENU_CONF: {
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
