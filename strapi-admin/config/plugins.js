module.exports = () => ({
  io: {
		enabled: true,
		config: {
			contentTypes: ['api::product.product'],
      socket: {
				serverOptions: {
					cors: { origin: '*', methods: ['GET', 'POST'] },
				},
			},
		},
	},
});
