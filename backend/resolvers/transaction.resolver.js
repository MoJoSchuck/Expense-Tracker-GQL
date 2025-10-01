import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) throw new Error("Unauthenticated");
        const userId = await context.getUser()._id;

        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        throw new Error("Failed to fetch transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error) {
        console.error("Error fetching transaction:", error);
        throw new Error("Failed to fetch transaction");
      }
    },

    categoryStatistics: async (_, __, context) => {
      if (!context.getUser()) throw new Error("Unauthenticated");

      const userId = await context.getUser()._id;
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      transactions.forEach((transaction) => {
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        categoryMap[transaction.category] += transaction.amount;
      });

      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error creating transaction:", error);
        throw new Error("Failed to create transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true });
        return updatedTransaction;
      } catch (error) {
        console.error("Error updating transaction:", error);
        throw new Error("Failed to update transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (error) {
        console.error("Error deleting transaction:", error);
        throw new Error("Failed to delete transaction");
      }
    },
  },
  // TODO => ADD TRANSACTION/USER RELATIONSHIP
};

export default transactionResolver;
