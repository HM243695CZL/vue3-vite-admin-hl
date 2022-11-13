import { onMounted, reactive, ref, toRefs } from 'vue';
import { PageEntity } from '/@/common/page.entity';
import { ElMessage } from 'element-plus';
import { postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';

interface ICrudParams {
	uris: {
		page?: string, // 分页查询接口
	},
	parentRef?: any, // 父级ref
}

export default function({
		uris,
		parentRef
	}: ICrudParams) {
	const tableRef = ref();
	const modalFormRef = ref();
	const state = reactive({
		pageInfo: new PageEntity(),
		dataList: [],
		searchParams: {} as any,
		selectedRowKeys: [] as any, // 被选中的数据主键
		selectionRows: [], // 被选中的数据行
		tableHeight: 300
	});
	/**
	 * 加载表格数据
	 */
	const getDataList = () => {
		if(!uris.page) {
			ElMessage.error('请设置uris.page属性！');
			return false;
		}
		postAction(uris.page, state.pageInfo).then(res => {
			if (res.status === StatusEnum.SUCCESS) {
				if (parentRef) {
					state.tableHeight = parentRef.value.getBoundingClientRect().height;
				}
				state.dataList = res.data.list;
				state.pageInfo.totalRecords = res.data.total;
			}
		})
	};
	onMounted(() => {
		getDataList();
	});
	return {
		tableRef,
		modalFormRef,
		...toRefs(state)
	}
}
