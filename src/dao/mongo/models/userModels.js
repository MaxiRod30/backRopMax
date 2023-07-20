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
	password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
	rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
		default: 'USER_ROLE'
    }
});

export const userModel = mongoose.model('Users', userSchema);