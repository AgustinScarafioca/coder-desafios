class ProductDto {
	constructor({ timestamp, name, description, code, price, photo, stock }) {
		this.timestamp = timestamp
		this.name = name
		this.description = description
		this.code = code
		this.price = price
		this.photo = photo
		this.stock = stock
	}
}

export default function DtoProduct(Product) {
	if (Array.isArray(Product)) {
		return Product.map((p) => new ProductDto(p))
	} else {
		return new ProductDto(Product)
	}
}
