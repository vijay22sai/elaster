module.exports = {
    mongo: {
        connection: 'mongodb://localhost:27017/jabongDB'
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
                        'type': 'string'
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
            return item._id.toString();
        },
        body: function(item){
            delete item._id;

            doc = {};
            //doc.raw_json = item;

            // Normalized fields
            doc.title = item.title;
            doc.pid = item.productId;
            doc.originalPrice = item.sp;
            doc.sellingPrice = item.mrp;
            doc.voodooPrice = item.mrp;
            doc.merchant = "snapdeal";
            doc.description = item.productDetails;
            doc.productUrl = "android-app://com.snapdeal.main/snapdeal/m" + item.url.split("http://www")[1];
            doc.offers = [];
            // deep link url = android-app://com.jabong.android/http/jabong.com/in/d/HE422HO77XRUINDFAS
            // android-app://com.jabong.android/http/jabong.com/in/d/HA742SH99OSQINDFAS
            return doc;
        }
    }]
};
