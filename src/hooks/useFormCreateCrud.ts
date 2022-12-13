/**
 * form-create表单的弹窗
 */
import { nextTick, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { getAction, postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';

interface IInitForm {
	title?: string; // 弹窗的标题
	clearFields?: Array<String>; // 需要清除校验结果的字段
	updatePath: string; // 更新的请求地址
	createPath: string; // 新增的请求地址
	viewPath: string; // 查看的请求地址
	refreshList?: Function; // 更新列表的方法
}
export default function({
	title,
	clearFields,
	createPath,
	updatePath,
	viewPath,
	refreshList
	}: IInitForm) {
	const state = reactive({
		isShowDialog: false,
		title: '',
		ruleForm: {
			id: ''
		},
		formCreateRef: {} as any
	});
	const closeDialog = () => {
		state.isShowDialog = false;
	};
	const openDialog = (id: string, isView: boolean, formCreateRef: any) => {
		state.isShowDialog = true;
		state.ruleForm.id = '';
		nextTick(() => {
			state.formCreateRef = formCreateRef;
			formCreateRef.value.state.fApi.resetFields();
			clearFields?.map(item => {
				formCreateRef.value.state.fApi.clearValidateState(item);
			});

			if (id) {
				state.title = '修改' + title;
				state.ruleForm.id = id;
				getAction(`${viewPath}/${id}`, '').then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						let objValue = {};
						formCreateRef.value.state.fApi.fields().map(item => {
							objValue[item] = res.data[item];
						})
						formCreateRef.value.state.fApi.coverValue(objValue);
					}
				})
			} else {
				state.title = '新增' + title;
			}
		})
	};
	const clickConfirm = () => {
		state.formCreateRef.state.fApi.validate(valid => {
			if (valid === true) {
				postAction(state.ruleForm.id ? updatePath : createPath, {
					...state.formCreateRef.state.fApi.formData(),
					id: state.ruleForm.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success(res.message);
						closeDialog();
						refreshList && refreshList();
					}
				})
			} else {
				ElMessage.error('请完善必填项');
			}
		});
	}
	return {
		...toRefs(state),
		openDialog,
		closeDialog,
		clickConfirm,
	}
}
