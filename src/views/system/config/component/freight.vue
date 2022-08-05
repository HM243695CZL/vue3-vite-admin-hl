<template>
	<div class='freight-container'>
		<el-form ref='formRef' :model='ruleForm' size='default' label-width='150px'>
			<el-form-item label='免运费所需消费'>
				<el-input v-model='ruleForm.yyx_express_freight_min'>
					<template #append>元</template>
				</el-input>
			</el-form-item>
			<el-form-item label='所需运费'>
				<el-input v-model='ruleForm.yyx_express_freight_value'>
					<template #append>元</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div class='btn-box'>
			<el-button type="primary" size="default" @click='updateConfig'>确 定</el-button>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import {getFreightInfoApi, updateConfigApi} from '/@/api/system';
import {StatusEnum} from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'freight',
	setup() {
		const formRef = ref();
		const state = reactive({
			ruleForm: {
				yyx_express_freight_min: 0,
				yyx_express_freight_value: 0
			}
		});
		const getFreightInfo = () => {
			getFreightInfoApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.ruleForm = res.data;
				}
			})
		};
		const updateConfig = () => {
			updateConfigApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('配置更新成功');
				}
			})
		}
		onMounted(() => {
			getFreightInfo()
		});
		return {
			...toRefs(state),
			formRef,
			getFreightInfo,
			updateConfig
		}
	}
});
</script>

<style scoped lang='scss'>
	.freight-container{
		.btn-box{
			margin-top: 15px;
			text-align: center;
		}
	}
</style>
