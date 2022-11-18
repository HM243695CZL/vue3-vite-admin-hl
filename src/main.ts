import { createApp } from 'vue';
import {
	VXETable,
	Table,
	Icon,
	Column,
	Filter
} from 'vxe-table';
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
import { directive } from '/@/utils/directive';
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import formCreate from '@form-create/element-ui';
import FcDesigner from '@form-create/designer';
import 'vxe-table/lib/style.css';
import '/@/theme/index.scss';
import mitt from 'mitt';

const app = createApp(App);

function useTable(app: any) {
	app.use(Table).use(Icon).use(Column).use(Filter);
}
VXETable.setup({
	table: {
		stripe: true, // 斑马条纹
		border: true, // 边框
		align: 'center', // 文字居中
		highlightHoverRow: true, // 鼠标移入高亮当前行
		showOverflow: true, // 单行显示,
		columnConfig: {
			resizable: true, // 可拖拽列
		},
		filterConfig: {
			remote: true, // 开启后端筛选
			iconNone: 'vxe-icon-search', // 设置筛选图标
			iconMatch: 'vxe-icon-search', // 设置筛选图标
		},
		sortConfig: {
			remote: true // 开启后端排序
		}
	}
});

directive(app);
other.elSvg(app);

// @ts-ignore
app.use(pinia).use(router).use(ElementPlus).use(formCreate).use(FcDesigner).use(useTable).mount('#app');

app.config.globalProperties.mittBus = mitt();
