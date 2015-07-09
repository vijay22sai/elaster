module.exports = {
	mongo: {
		connection: 'mongodb://localhost:27017/myntraDB'
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
					/*'details': {
						'type': 'object',
						'index': 'not_analyzed'
					},
					'productId': {
						'type': 'long'
					},
*/
                    //
					//'raw_json' : {
					//	'type': 'object',
					//	'index': 'not_analyzed'
					//},

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
			return "myntra_" + item.details.styleid;
		},
		body: function(item){
			delete item._id;

			item.productId = item.productId.toString();

			doc = {};
			//doc.raw_json = item;

			// Normalized fields
			doc.title = item.details.product;
			doc.category = item.details.dre_landing_page_url.split("/")[0];
			doc.description = item.details.product;
			doc.originalPrice = item.details.price;
			doc.sellingPrice = item.details.discounted_price;
			doc.voodooPrice = item.details.discounted_price;
			doc.pid = item.details.styleid;
			doc.imgUrl = item.details.search_image;
			doc.productUrl = item.details.dre_landing_page_url;
			doc.deeplinkUrl = "android-app://com.myntra.android/myntra/myntra.com/" + item.details.dre_landing_page_url;
			doc.merchant = "myntra";
			doc.offers = [];

			return doc;
		}
	}]
};