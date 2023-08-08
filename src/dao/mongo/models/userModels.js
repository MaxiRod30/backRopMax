import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
	last_name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
	email: {
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true,
	},	
    age: {
        type: Number,
        required: [true, 'La edad es obligatoria']
    },
	password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
	rol: {
        type: String,
        required: true,
		default: 'USER_ROLE'
    }
});

const userModel = mongoose.model('Users', userSchema);

export default userModel;