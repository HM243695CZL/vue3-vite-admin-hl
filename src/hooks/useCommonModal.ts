/**
 * 手写表单的弹窗hooks
 */
import { nextTick, reactive, toRefs } from 'vue';
import { getAction, postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';
import { ElMessage } from 'element-plus';

interface IOpenModal {
	dataId: string,
	isView: boolean,
	childRef: any
}

interface IInitModal {
	createPath: string, // 新增的请求地址
	updatePath: string, // 修改的请求地址
	viewPath: string, // 查看的请求地址
	title?: string, // 弹窗的标题
	refreshList: Function, // 更新列表的方法
	otherForm?: any, // 其他表单属性
	otherInitMethod?: Function, // 运行其他方法
}

export default function({
		createPath,
		updatePath,
		viewPath,
		title,
		refreshList,
		otherForm,
		otherInitMethod,
	}: IInitModal) {
	const state = reactive({
		isShowDialog: false,
		title: '',
		ruleForm: {
			id: '',
		},
		formModalRef: {} as any, // 表单实例
	});
	// 回显表单数据
	const setFormValue = formData => {
		for (const o in formData) {
			if (state.formModalRef.state.ruleForm.hasOwnProperty(o)) {
				state.formModalRef.state.ruleForm[o] = formData[o];
			}
		}
	};
	const closeDialog = () => {
		state.isShowDialog = false;
	};
	const openDialog = ({
			dataId,
			childRef,
		}: IOpenModal) => {
		state.isShowDialog = true;
		state.ruleForm.id = '';
		nextTick(() => {
			state.formModalRef = childRef.value;
			state.formModalRef.formRef.resetFields();
			if (dataId) {
				state.ruleForm.id = dataId;
				state.title = '修改' + title;
				getAction(`${viewPath}/${dataId}`, '').then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						setFormValue(res.data);
						if (otherInitMethod) {
							otherInitMethod(res.data);
						}
					}
				});
			} else {
				state.title = '新增' + title;
				if (otherInitMethod) {
					otherInitMethod();
				}
			}
		});
	};
	const clickConfirm = () => {
		state.formModalRef.formRef.validate((valid: boolean) => {
			if (valid) {
				postAction(state.ruleForm.id ? updatePath : createPath, {
					...state.ruleForm,
					...state.formModalRef.state.ruleForm,
					...otherForm,
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success(res.message);
						closeDialog();
						refreshList();
					}
				});
			}
		});
	};
	return {
		...toRefs(state),
		openDialog,
		closeDialog,
		clickConfirm,
	};
}
