/**
 * @Author: user
 * @Date:2019/2/1
 * @Last Modified time: 2019/2/1
 * @Description: 描述
 * @Query: 页面参数
 * @Props: 组件参数
 * @Remark:
 - 备注一
 */

const channel = {
  templateType: {
    swiper: 'swiper', // 轮播图
    threePic: "threePic", // 三张图片
    twoPic: "twoPic", // 两张图片
    onePic: "onePic", // 一张图片
    product: "product", // 商品列表
  },
  templateDesc: [
    {
      label: "swiper",
      value: "轮播图",
      default: [{imgSrc: "", location: ""}, {imgSrc: "", location: ""}, {imgSrc: "", location: ""}]
    },
    {
      label: "threePic",
      value: "三张图片",
      default: [{imgSrc: "", location: ""}, {imgSrc: "", location: ""}, {imgSrc: "", location: ""}]
    },
    {label: "twoPic", value: "两张图片", default: [{imgSrc: "", location: ""}, {imgSrc: "", location: ""}]},
    {label: "onePic", value: "一张图片", default: [{imgSrc: "", location: ""}]},
    {label: "product", value: "商品列表", default: [{imgSrc: "", location: ""}, {imgSrc: "", location: ""}]},
  ]
}
export {channel}
