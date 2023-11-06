import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
	code: {
        type: String,
        required: [true, 'El code es obligatorio']
    },
	purchase_datetime: {
        type: String,
        required: [true, 'El dateTime es obligatorio']
    },
	amount: {
		type: Number,
		required: [true, 'El amount es obligatorio'],
	},	
    purchaser: {
        type: String,
        required: [true, 'La comprador es obligatorio']
    },
    productsPurchase:{
        type: Array
    }
});

const ticketModel = mongoose.model('Tickets', ticketSchema);

export default ticketModel;