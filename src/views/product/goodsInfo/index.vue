<template>
	<div class='goods-info-container'>
		<el-card shadow="hover">
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
			</el-form>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import SingleUpload from '/@/components/Upload/SingleUpload.vue';
import MultiUpload from '/@/components/Upload/MultiUpload.vue';

export default defineComponent({
	name: 'productGoodsInfo',
	components: {
		SingleUpload,
		MultiUpload
	},
	setup() {
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
				gallery: [],
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
			}
		});
		const changePicUrl = (url: string) => {
			state.goodsForm.picUrl = url;
		};
		const changeGallery = (fileList: any) => {
			// console.log(fileList);
		}
		return {
			changePicUrl,
			changeGallery,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	.goods-info-container{
		.title{
			font-weight: 700;
			font-size: 18px;
			margin: 20px 0;
		}
	}
</style>
