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
    phone: {
        type: Number,
        required: [true, 'El telefono es obligatorio']
    },
	password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"carts",
    },
    documents:
        [{name : String , reference: String, category: String}] 
    ,
	rol: {
        type: String,
        required: true,
		default: 'USER_ROLE'
    },
    last_connection:{
        type: String,
        default: ''
    }
});

const userModel = mongoose.model('Users', userSchema);

export default userModel;