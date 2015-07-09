module.exports = {
    mongo: {
        connection: 'mongodb://localhost:27017/flipkartDB'
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
            return "flipkart_" + item.productId;
            //return item._id.toString();
        },
        body: function(item){
            delete item._id;

            doc = {};
            //doc.raw_json = item;

            // Normalized fields
            doc.title = item.productBaseInfo.productAttributes.title;
            doc.category = item.category;
            doc.description = item.productBaseInfo.productAttributes.productDescription;
            doc.originalPrice = item.productBaseInfo.productAttributes.maximumRetailPrice.amount;
            doc.sellingPrice = item.productBaseInfo.productAttributes.sellingPrice.amount;
            doc.voodooPrice = item.productBaseInfo.productAttributes.sellingPrice.amount;
            doc.pid = item.productId;
            doc.merchant = "flipkart";
            doc.productUrl = item.productBaseInfo.productAttributes.productUrl;
            doc.deeplinkUrl = item.productBaseInfo.productAttributes.productUrl;
            doc.imgUrl = item.productBaseInfo.productAttributes.imageUrls["125x125"];
            //deep link url = http://dl.flipkart.com/dl/amaze-fashion-blackberry-torch-9810-usb-data-cable/p/itme6kdtbbzfuwb9?pid=ACCE6KDTCDXFVGXF&affid=krishnate7
            doc.offers = item.productBaseInfo.productAttributes.offers;

            return doc;
        }
    }]
};