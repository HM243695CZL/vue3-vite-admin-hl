<template>
	<div class='md-editor-container w100'>
		<v-md-editor @change='editorChange'
								 @blur='editorBlur'
								 v-model='text'
								 :height='props.height'
								 placeholder='请输入'
								 :mode='props.mode'></v-md-editor>
	</div>
</template>

<script lang='ts' setup>
import { computed, reactive } from 'vue';

	const props = defineProps({
		content: {
			type: String
		},
		height: {
			type: String,
			default: '400px'
		},
		mode: {
			type: String,
			default: 'editable' // edit editable preview
		}
	});

	const emits = defineEmits([
		'editorBlur'
	]);

	const state = reactive({
		mdText: '',
		editorText: ''
	});

	const text = computed({
		get: () => {
			return props.content;
		},
		set: (value: any) => {
			state.mdText = value;
		}
	});
	const editorChange = text => {
		state.editorText = text;
	};
	const editorBlur = () => {
		emits('editorBlur', state.editorText);
	}
</script>
