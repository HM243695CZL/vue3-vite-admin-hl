import { onMounted, reactive, ref, toRefs } from 'vue';
import { PageEntity } from '/@/common/page.entity';
import { ElMessage } from 'element-plus';
import { postAction } from '/@/api/common';
import { StatusEnum } from '/@/common/status.enum';
import _ from 'lodash';

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
		postAction(uris.page, {
			...state.pageInfo,
			...state.searchParams
		}).then(res => {
			if (res.status === StatusEnum.SUCCESS) {
				if (parentRef) {
					state.tableHeight = parentRef.value.getBoundingClientRect().height;
				}
				state.dataList = res.data.list;
				state.pageInfo.totalRecords = res.data.total;
			}
		})
	};
	/**
	 * 点击新增
	 */
	const clickAdd = () => {
		modalFormRef.value.openDialog();
	};
	/**
	 * 点击编辑
	 * @param row 当前行的数据
	 */
	const clickEdit = (row: any) => {
		modalFormRef.value.openDialog(_.cloneDeep(row));
	};
	/**
	 * 点击查看
	 * @param row 当前行的数据
	 */
	const clickView = (row: any) => {
		modalFormRef.value.openDialog(_.cloneDeep(row), true);
	};
	/**
	 * 点击查询
	 */
	const clickSearch = () => {
		state.pageInfo.pageIndex = 1;
		getDataList();
	};
	/**
	 * 点击重置
	 */
	const clickReset = () => {
		state.searchParams = {};
		state.pageInfo = new PageEntity();
		getDataList();
	};
	/**
	 * 切换第几页
	 * @param index 第几页
	 */
	const changePageIndex = (index: number) => {
		state.pageInfo.pageIndex = index;
		getDataList();
	};
	/**
	 * 切换每页条数
	 * @param size 每页几条
	 */
	const changePageSize = (size: number) => {
		state.pageInfo.pageIndex = 1;
		state.pageInfo.pageSize = size;
		getDataList();
	}
	onMounted(() => {
		getDataList();
	});
	return {
		tableRef,
		modalFormRef,
		...toRefs(state),
		clickAdd,
		clickEdit,
		clickSearch,
		clickReset,
		clickView,
		changePageIndex,
		changePageSize
	}
}