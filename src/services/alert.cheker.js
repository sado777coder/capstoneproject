const alert = require("../models/alert.model");
const Transaction = require("../models/transaction.model");

const checkAlert = async (transaction) => {
    try {
        if (transaction.amount > 5000) {
            await alert.create({
                userId : transaction.userId,
                transactionId : transaction._id,
                rule : "HIGH_AMOUNT",
                message : "Transacton exceeds $5000",
                severity : "High",
            });
        }

        const recentTx = await Transaction.countDocuments({
            userId : transaction.userId,
            createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
        });

        if (recentTx > 3) {
            await Alert.create({
                userId: transaction.userId,
                transactionId: transaction._id,
                rule: 'RAPID_TX',
                message: 'Multiple transactions in short time',
                severity: 'medium'
});
}
        

    } catch (error) {
        console.error(error , error.message.details[0]);
        exist [1];
    }
};

// export chechAlert
module.exports = checkAlert;