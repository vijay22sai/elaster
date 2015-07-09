module.exports = {
    mongo: {
        connection: 'mongodb://localhost:27017/snapdealDB'
    },

    elastic: {
        host: {
            host: 'localhost'
        },

        requestTimeout: 5000
    },

    collections: [ {
        name: 'products',
        index: 'products',
        query: {},
        dropExistingIndex: false,
        type: 'product',
        mappings: {
            'product': {
                'properties': {
                    'title': {
                        'type': 'multi_field',
                        'fields': {
                            "title" : {"type" : "string", "index" : "analyzed"},
                            "title_raw" : {"type" : "string", "index" : "not_analyzed"}
                        }
                    },
                    'category': {
                        'type': 'multi_field',
                        'fields': {
                            "category" : {"type" : "string", "index" : "analyzed"},
                            "category_raw" : {"type" : "string", "index" : "not_analyzed"}
                        }
                    },
                    'description': {
                        'type': 'string'
                    },
                    'sellingPrice': {
                        'type': 'double'
                    },
                    'originalPrice': {
                        'type': 'double'
                    },
                    'voodooPrice': {
                        'type': 'double'
                    },
                    'pid': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    },
                    'productUrl': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    },
                    'deeplinkUrl': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    },
                    'imgUrl': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    },
                    'merchant': {
                        'type': 'string',
                        'index': 'not_analyzed'
                    },
                    'offers': {
                        'type': 'object',
                        'index': 'not_analyzed'
                    }
                }
            }
        },
        docId: function (item) {
            //return item._id.toString();
            return "snapdeal_" + item.productId;
        },


        body: function(item){
            delete item._id;

            doc = {};
            //doc.raw_json = item;

            // Normalized fields
            doc.title = item.title;
            doc.category = item.categories[0];
            doc.pid = item.productId;
            doc.originalPrice = item.sp;
            doc.sellingPrice = item.mrp;
            doc.voodooPrice = item.mrp;
            doc.merchant = "snapdeal";
            doc.description = item.productDetails;
            doc.productUrl = item.url;
            doc.deeplinkUrl = "android-app://com.snapdeal.main/snapdeal/m" + item.url.split("http://www")[1];
            doc.offers = [];
            doc.imgUrl = item.imgUrl;
            // deep link url = android-app://com.snapdeal.main/snapdeal/m.snapdeal.com/product/naysha-handicrafts-brass-decorative-flower/498747886
            return doc;
        }
    }]
};