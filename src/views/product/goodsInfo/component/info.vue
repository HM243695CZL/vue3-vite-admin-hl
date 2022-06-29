<template>
	<div class='goods-info'>
		<div class='title'>商品信息</div>
		<el-form ref='goodsFormRef' :rules='goodsRules' :model='goodsForm' size='default' label-width='120px'>
			<el-form-item prop='name' label='商品名称'>
				<el-input v-model='goodsForm.name' placeholder='请输入商品名称' clearable></el-input>
			</el-form-item>
			<el-form-item prop='goodsSn' label='商品编号'>
				<el-input v-model='goodsForm.goodsSn' placeholder='请输入商品编号' clearable></el-input>
			</el-form-item>
			<el-form-item prop='counterPrice' label='市场售价'>
				<el-input v-model='goodsForm.counterPrice' placeholder='0.00' clearable></el-input>
			</el-form-item>
			<el-form-item prop='isNew' label='是否新品'>
				<el-radio-group v-model="goodsForm.isNew">
					<el-radio :label="true" size="large" border>新品</el-radio>
					<el-radio :label="false" size="large" border>非新品</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop='isHot' label='是否热卖'>
				<el-radio-group v-model="goodsForm.isHot">
					<el-radio :label="true" size="large" border>热卖</el-radio>
					<el-radio :label="false" size="large" border>普通</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop='isOnSale' label='是否在售'>
				<el-radio-group v-model="goodsForm.isOnSale">
					<el-radio :label="true" size="large" border>在售</el-radio>
					<el-radio :label="false" size="large" border>未售</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop='picUrl' label='商品图片'>
				<SingleUpload :source-url='goodsForm.picUrl' @change-source-url='changePicUrl' />
			</el-form-item>
			<el-form-item prop='gallery' label='宣传画廊'>
				<MultiUpload :list='goodsForm.gallery' @change-file-list='changeGallery' />
			</el-form-item>
			<el-form-item prop='unit' label='商品单位'>
				<el-input v-model='goodsForm.unit' placeholder='请输入商品单位' clearable></el-input>
			</el-form-item>
			<el-form-item prop='keywords' label='关键字'>
				<div class='box flex-start'>
					<div class='keywords-box' v-if='keywordsList.length > 0'>
						<el-tag class='tag' v-for='(item, index) in keywordsList' :key='index' closable @close='deleteKeywordsItem(index)'>
							{{item}}
						</el-tag>
					</div>
					<el-input ref='keywordsRef' v-if='keywordsInputVisible' v-model='keywordsValue' clearable
										class='keywords-input' size='small' @blur='setKeywordsValue'></el-input>
					<el-button v-else @click='clickAddKeywords' class='keywords-btn' size='small' type='primary'>增加</el-button>
				</div>
			</el-form-item>
			<el-form-item prop='categoryId' label='所属分类'>
				<el-cascader v-model="goodsForm.categoryId" :options='categoryList' :props='categoryProps' />
			</el-form-item>
			<el-form-item prop='brandId' label='所属品牌商'>
				<el-select v-model='goodsForm.brandId' placeholder='请选择品牌商' clearable filterable>
					<el-option v-for='item of brandList' :key='item.id' :value='item.id' :label='item.name'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop='brief' label='商品简介'>
				<el-input type='textarea' :rows='3' v-model='goodsForm.brief' clearable placeholder='请输入商品简介'></el-input>
			</el-form-item>
			<el-form-item prop='detail' label='商品详细介绍'>
				<HlEditor :content='goodsForm.detail'></HlEditor>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import SingleUpload from '/@/components/Upload/SingleUpload.vue';
import MultiUpload from '/@/components/Upload/MultiUpload.vue';
import HlEditor from '/@/components/Editor/Wangeditor.vue';
import { ElMessage } from 'element-plus';
import { getCategoryListApi } from '/@/api/pms/category';
import { StatusEnum } from '/@/common/status.enun';
import { getBrandListApi } from '/@/api/pms/brand';

export default defineComponent({
	name: 'info',
	components: {
		SingleUpload,
		MultiUpload,
		HlEditor
	},
	setup() {
		const keywordsRef = ref();
		const state = reactive({
			goodsForm: {
				id: '',
				name: '',
				goodsSn: '',
				counterPrice: '',
				isNew: false,
				isHot: false,
				isOnSale: false,
				picUrl: '',
				gallery: ['aa', 'bb'],
				unit: '',
				keywords: '',
				categoryId: '',
				brandId: '',
				brief: '',
				detail: ''
			},
			goodsRules: {
				name: [
					{ required: true, message: '商品名称不能为空', trigger: 'blur'}
				]
			},
			keywordsValue: '',
			keywordsInputVisible: false,
			keywordsList: [] as any,
			categoryList: [] as any,
			categoryProps: {
				label: 'name',
				value: 'id'
			},
			brandList: [] as any
		});
		// 商品图片发生改变时
		const changePicUrl = (url: string) => {
			state.goodsForm.picUrl = url;
		};
		// 宣传画廊发生改变时
		const changeGallery = (fileList: any) => {
			state.goodsForm.gallery = fileList;
		};
		// 关键字输入框失去焦点
		const setKeywordsValue = () => {
			if(state.keywordsValue === '') {
				state.keywordsInputVisible = false;
			} else if (!state.keywordsList.includes(state.keywordsValue)) {
				state.keywordsList.push(state.keywordsValue);
				state.keywordsInputVisible = false;
				state.keywordsValue = '';
			} else {
				ElMessage.warning('关键字不能重复');
			}
		};
		// 删除已添加的关键字
		const deleteKeywordsItem = (index: number) => {
			state.keywordsList.splice(index, 1);
		};
		// 点击新增关键字
		const clickAddKeywords = () => {
			state.keywordsInputVisible = true;
			nextTick(() => {
				keywordsRef.value.focus();
			})
		};
		// 获取商品分类列表
		const getCategoryList = () => {
			getCategoryListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.categoryList = res.data;
				}
			})
		};
		// 获取品牌商列表
		const getBrandList = () => {
			getBrandListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.brandList = res.data;
				}
			});
		};
		onMounted(() => {
			getCategoryList();
			getBrandList();
		});
		return {
			changePicUrl,
			changeGallery,
			setKeywordsValue,
			clickAddKeywords,
			deleteKeywordsItem,
			keywordsRef,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	.goods-info{
		width: 80%;
		margin: 0 auto;
		.title{
			font-weight: 700;
			font-size: 18px;
			margin: 20px 0;
		}
		.box{
			.keywords-box{
				.tag{
					margin-right: 15px;
				}
			}
			.keywords-input{
				width: 100px;
			}
		}
	}
</style>
