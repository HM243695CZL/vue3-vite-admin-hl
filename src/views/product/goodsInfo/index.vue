<template>
	<div class='goods-info-container'>
		<el-card shadow="hover">
			<el-steps :active="stepIndex" finish-status="success" align-center>
				<el-step title="第一步" description="填写商品信息" />
				<el-step title="第二步" description="填写商品规格和库存" />
				<el-step title="第三步" description="填写商品参数" />
			</el-steps>
			<div class='goods-info' v-show='stepIndex === 0'>
				<div class='title'>商品信息</div>
				<el-form :rules='goodsRules' :model='goodsForm' size='default' label-width='120px'>
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
						<HlEditor :content='goodsForm.detail' @editor-blur='changeDetail'></HlEditor>
					</el-form-item>
				</el-form>
			</div>
			<div class='goods-specifications' v-show='stepIndex === 1'>
				<el-divider>
					<div class='title'>商品规格</div>
				</el-divider>
				<el-button size='default' type='default' @click='onOpenAddSpecifications'>添加规格</el-button>
				<el-table :data='specifications'>
					<el-table-column prop='specification' label='规格名' />
					<el-table-column prop='value' label='规格值'>
						<template #default='scope'>
							<el-tag>{{scope.row.value}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop='picUrl' label='规格图片'>
						<template #default='scope'>
							<PreviewImg :img-url='scope.row.picUrl' />
						</template>
					</el-table-column>
					<el-table-column label='操作'>
						<template #default="scope">
							<el-button size="small" type="default" @click='deleteSpecification(scope.row)'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-divider class='stock-divider'>
					<div class='title'>商品库存</div>
				</el-divider>
				<el-table :data='products'>
					<el-table-column prop='specifications' label='货品规格'>
						<template #default='scope'>
							<el-tag>{{scope.row.specifications}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop='price' label='货品售价'  />
					<el-table-column prop='number' label='货品数量'  />
					<el-table-column prop='url' label='货品图片'>
						<template #default='scope'>
							<PreviewImg :img-url='scope.row.url' />
						</template>
					</el-table-column>
					<el-table-column label='操作'>
						<template #default="scope">
							<el-button size="small" type="default" @click='setStockInfo(scope.row)'>设置</el-button>
						</template>
					</el-table-column>
				</el-table>
				<SpecificationsModal ref='specificationsModalRef' @change-specification='changeSpecification' />
				<StockModal ref='stockModalRef' @change-stock='changeStock' />
			</div>

			<div class='params-container' v-show='stepIndex === 2'>
				<div class='title'>商品参数</div>
				<el-button size='default' type='default' @click='onOpenAddParams({}, true)'>添加参数</el-button>
				<el-table :data='attributes'>
					<el-table-column prop='attribute' label='商品参数名称' show-overflow-tooltip />
					<el-table-column prop='value' label='商品参数值' show-overflow-tooltip />
					<el-table-column label='操作'>
						<template #default="scope">
							<el-button size="small" type="default" @click='onOpenAddParams(scope.row, false)'>设置</el-button>
							<el-button size="small" type="default" @click='deleteParams(scope.row)'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<ParamsModal ref='paramsModalRef' @change-params='changeParams' />
			</div>

			<div class='btn-box'>
				<el-button type='default' v-if='stepIndex === 0'>取 消</el-button>
				<el-button type='primary' v-if='stepIndex !== 0' @click='prevStep'>上一步</el-button>
				<el-button type='primary' v-if='stepIndex !== 2' @click='nextStep'>下一步</el-button>
				<el-button type='primary' v-if='stepIndex === 2' @click='onSubmit'>确 定</el-button>
			</div>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import Params from './component/params.vue';
import SingleUpload from '/@/components/Upload/SingleUpload.vue';
import MultiUpload from '/@/components/Upload/MultiUpload.vue';
import HlEditor from '/@/components/Editor/Wangeditor.vue';
import SpecificationsModal from '/@/views/product/goodsInfo/component/specificationsModal.vue';
import PreviewImg from '/@/components/previewImg/index.vue';
import StockModal from '/@/views/product/goodsInfo/component/stockModal.vue';
import ParamsModal from '/@/views/product/goodsInfo/component/paramsModal.vue';

import { getCategoryListApi } from '/@/api/pms/category';
import { getBrandListApi } from '/@/api/pms/brand';
import { saveGoodsApi, viewGoodsApi } from '/@/api/pms/goods';


export default defineComponent({
	name: 'productGoodsInfo',
	components: {
		Params,
		SingleUpload,
		MultiUpload,
		HlEditor,
		SpecificationsModal,
		PreviewImg,
		StockModal,
		ParamsModal
	},
	setup() {
		const route = useRoute();
		const keywordsRef = ref();

		const specificationsModalRef = ref();
		const stockModalRef = ref();

		const paramsModalRef = ref();

		const state = reactive({
			stepIndex: 0,
			goodsForm: {
				id: '',
				name: '',
				goodsSn: '',
				counterPrice: '',
				isNew: false,
				isHot: false,
				isOnSale: false,
				picUrl: '',
				gallery: [],
				unit: '',
				keywords: '',
				categoryId: '',
				brandId: '',
				brief: '',
				detail: '123'
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
			brandList: [] as any,

			specifications: [] as any,
			products: [] as any,
			attributes: [] as any
		});
		const prevStep = () => {
			state.stepIndex -= 1;
		};
		const nextStep = () => {
			state.stepIndex += 1;
		};

		/**
		 * 商品信息
		 */
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
		// 商品详情发生改变时
		const changeDetail = (htmlStr: string) => {
			state.goodsForm.detail = htmlStr;
		}
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
		/**
		 * 商品规格
		 */
		const onOpenAddSpecifications = () => {
			specificationsModalRef.value.openDialog();
		};
		const changeSpecification = (data: any) => {
			data.key = new Date().getTime();
			state.specifications.push(data);
			state.products.push({
				specifications: data.value,
				price: 0,
				number: 0,
				url: data.picUrl
			})
		};
		const deleteSpecification = (row: any) => {
			state.specifications.map((item: any, index: number) => {
				if (row.key === item.key) {
					state.specifications.splice(index, 1);
					state.products.splice(index, 1);
				}
			})
		};
		const setStockInfo = (row: any) => {
			stockModalRef.value.openDialog(row);
		};
		const changeStock = (data: any) => {
			state.products.map((item: any, index: number) => {
				if (item.specifications === data.specifications) {
					state.products[index] = data;
				}
			});
		};

		/**
		 * 商品参数
		 */
		const onOpenAddParams = (row: any, isAdd: boolean) => {
			paramsModalRef.value.openDialog(row, isAdd);
		};
		const changeParams = (data: any, isAdd: boolean) => {
			if (isAdd) {
				data.key = new Date().getTime()
				state.attributes.push(data)
			} else {
				state.attributes.map((item: any, index: number) => {
					if (item.key === data.key) {
						state.attributes[index] = data;
					}
				})
			}
		};
		const deleteParams = (row: any) => {
			state.attributes.map((item: any, index: number) => {
				if (item.key === row.key) {
					state.attributes.splice(index, 1);
				}
			})
		};

		const onSubmit = () => {
			const gallery = [] as  any;
				state.goodsForm.gallery.map(((item: any) => {
				gallery.push(item.url)
			}))
			const obj = {
				goods: {
					...state.goodsForm,
					gallery: JSON.stringify(gallery),
					categoryId: state.goodsForm.categoryId[state.goodsForm.categoryId.length - 1],
					keywords: state.keywordsList.join(',')
				},
				specifications: state.specifications,
				products: state.products,
				attributes: state.attributes
			};
			saveGoodsApi(obj).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('操作成功');
				}
			})
		};
		onMounted(() => {
			getCategoryList();
			getBrandList();
			if (route.params.id === 'add') {
				console.log('新增');
			} else {
				viewGoodsApi({
					id: route.params.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						const { goods, specifications, products, attributes} = res.data;
						state.goodsForm = goods;
						const galleryList = [] as any;
						JSON.parse(goods.gallery).map((item: string) => {
							galleryList.push({
								url: item,
							})
						});
						state.goodsForm.gallery = galleryList;
						state.keywordsList = goods.keywords.split(',');

						state.specifications = specifications;
						state.products = products;
						state.attributes = attributes;
					}
				})
			}
		});
		return {

			changePicUrl,
			changeGallery,
			setKeywordsValue,
			clickAddKeywords,
			deleteKeywordsItem,
			changeDetail,
			keywordsRef,

			specificationsModalRef,
			stockModalRef,
			changeSpecification,
			onOpenAddSpecifications,
			deleteSpecification,
			setStockInfo,
			changeStock,

			changeParams,
			onOpenAddParams,
			deleteParams,
			paramsModalRef,

			onSubmit,
			nextStep,
			prevStep,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	.goods-info-container{
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
		.goods-specifications{
			width: 80%;
			margin: 0 auto;
			.title{
				font-weight: 700;
				font-size: 18px;
				margin: 20px 0;
			}
			.stock-divider{
				margin-top: 50px;
			}
		}
		.params-container{
			width: 80%;
			margin: 0 auto;
			.title{
				font-weight: 700;
				font-size: 18px;
				margin: 20px 0;
			}
		}
		.btn-box{
			margin: 10px 0;
			text-align: center;
		}
	}
</style>
