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
    templateDesc: [{
            label: "swiper",
            value: "轮播图",
            default: [{
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "" // 跳转链接
                },
                {
                    imgSrc: "",
                    type: "1",
                    location: ""
                },
                {
                    imgSrc: "",
                    type: "1",
                    location: ""
                }
            ]
        },
        {
            label: "threePic",
            value: "三张图片",
            default: [{ imgSrc: "", type: "1", location: "" }, { imgSrc: "", type: "1", location: "" }, { imgSrc: "", type: "1", location: "" }]
        },
        {
            label: "twoPic",
            value: "两张图片",
            default: [{ imgSrc: "", type: "1", location: "" }, { imgSrc: "", type: "1", location: "" }]
        },
        {
            label: "onePic",
            value: "一张图片",
            default: [{ imgSrc: "", type: "1", location: "" }]
        },
        {
            label: "product",
            value: "商品列表",
            default: [{
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "", // 跳转链接
                    name: "", // 产品名称
                    productDesc: "", // 产品描述
                    price: "", // 价格
                    marketPrice: "", // 市场价格
                },
                {
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "", // 跳转链接
                    name: "", // 产品名称
                    productDesc: "", // 产品描述
                    price: "", // 价格
                    marketPrice: "", // 市场价格
                },
                {
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "", // 跳转链接
                    name: "", // 产品名称
                    productDesc: "", // 产品描述
                    price: "", // 价格
                    marketPrice: "", // 市场价格
                },
                {
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "", // 跳转链接
                    name: "", // 产品名称
                    productDesc: "", // 产品描述
                    price: "", // 价格
                    marketPrice: "", // 市场价格
                },
                {
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "", // 跳转链接
                    name: "", // 产品名称
                    productDesc: "", // 产品描述
                    price: "", // 价格
                    marketPrice: "", // 市场价格
                },
                {
                    imgSrc: "", // 图片链接
                    type: "1", // 1 产品 2 频道
                    location: "", // 跳转链接
                    name: "", // 产品名称
                    productDesc: "", // 产品描述
                    price: "", // 价格
                    marketPrice: "", // 市场价格
                }
            ]
        }
    ]
}
export { channel }