class UserDto {
	constructor({ name, lastName, address, age, phoneNumber, photo, username, password }) {
		this.name = name
		this.lastName = lastName
		this.address = address
		this.age = age
		this.phoneNumber = phoneNumber
		this.photo = photo
		this.username = username
		this.password = password
	}
}

export default function DtoUser(User) {
	if (Array.isArray(User)) {
		return User.map((p) => new UserDto(p))
	} else {
		return new UserDto(User)
	}
}