<template>
	<div class='file-container'>
		<el-card shadow='hover'>
			<el-button size='default' type='primary' class='ml10' @click='addFile'>新增</el-button>
			<el-button size='default' type='default' class='ml10' @click='getFilePageList'>查询</el-button>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号' width='60'></el-table-column>
				<el-table-column label='预览图'>
					<template #default='scope'>
						<img @click='prevImg(scope.row)' class='prev-img' :src='prevFileUrl + scope.row.name' alt=''>
					</template>
				</el-table-column>
				<el-table-column prop='originName' label='文件名' show-overflow-tooltip></el-table-column>
				<el-table-column prop='size' label='文件大小'></el-table-column>
				<el-table-column label='操作' width='100'>
					<template #default='scope'>
						<el-button size='small' type='text' @click='handleDownload(scope.row)'>下载</el-button>
						<el-button size='small' type='text' @click='handleDelete(scope.row)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<prev-img-model ref='prevImgRef' />
			<add-file ref='addFileRef' />
		</el-card>
	</div>
</template>

<script>
import { getFilePageApi, deleteFileApi } from '../../../api/file';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { StatusEnum } from '/@/common/status.enum';
import { prevFileUrl } from '/@/utils/config';
import PrevImgModel from './component/prevImg.vue';
import AddFile from './component/addFile.vue';
export default defineComponent({
	name: 'systemFile',
	components: {
		PrevImgModel,
		AddFile
	},
	setup () {
		const prevImgRef = ref();
		const addFileRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0,
			prevFileUrl
		});
		const getFilePageList = () => {
			getFilePageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.records;
					state.total = res.data.total;
				}
			})
		};
		const handleDownload = row => {
			window.open(row.downloadUrl, '_blank')
		};
		const handleDelete = row => {
			deleteFileApi([row.id]).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					getFilePageList()
				}
			})
		};
		const prevImg = row => {
			prevImgRef.value.openDialog(prevFileUrl + row.name);
		};
		const addFile = () => {
			addFileRef.value.isShowDialog = true;
		};
		onMounted(() => {
			getFilePageList()
		});
		return {
			...toRefs(state),
			handleDownload,
			handleDelete,
			prevImg,
			addFile,
			prevImgRef,
			addFileRef,
			getFilePageList
		}
	}
})
</script>

<style scoped lang='scss'>
	.prev-img{
		width: 50px;
		height: 50px;
		cursor: pointer;
	}
</style>