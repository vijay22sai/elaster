module.exports = {
	mongo: {
		connection: 'mongodb://localhost:27017/likeastoreproddb'
	},

	elastic: {
		host: {
			host: 'localhost'
		},

		requestTimeout: 5000
	},

	collections: [ {
		name: 'collections',
		index: 'collections',
		dropExistingIndex: true,
		type: 'collection',
		fields: ['_id', 'public', 'title', 'description', 'user', 'userData'],
		mappings: {
			'collection': {
				'properties': {
					'public': {
						'type': 'boolean',
						'index': 'not_analyzed'
					},
					'title': {
						'type': 'string'
					},
					'description': {
						'type': 'string'
					},
					'user': {
						'type': 'string',
						'index': 'not_analyzed'
					},
					'userData': {
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
			return item;
		}

	},
	{
		name: 'items',
		index: 'items',
		query: {user: 'alexander.beletsky@gmail.com'},
		type: 'item',
		mappings: {
			'item': {
				'properties': {
					'authorName': {
						'type': 'string'
					},
					'itemId': {
						'type': 'string',
						'index': 'not_analyzed'
					},
					'idInt': {
						'type': 'string',
						'store': 'false',
						'index': 'not_analyzed'
					},
					'created': {
						'type': 'date',
						'format': 'dateOptionalTime'
					},
					'date': {
						'type': 'date',
						'format': 'dateOptionalTime'
					},
					'description': {
						'type': 'string'
					},
					'source': {
						'type': 'string',
					},
					'type': {
						'type': 'string',
						'index': 'not_analyzed'
					},
					'user': {
						'type': 'string',
						'index': 'not_analyzed'
					},
					'userData': {
						'type': 'object',
						'index': 'not_analyzed'
					}
				}
			}
		}
	}]
};