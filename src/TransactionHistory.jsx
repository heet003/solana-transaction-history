/* eslint-disable */
import React, { useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import TransactionCard from "./TransactionCard";

const TransactionHistory = () => {
  const apiUrl = import.meta.env.VITE_API_KEY;

  console.log(apiUrl);

  const [walletAddress, setWalletAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const connection = new Connection(`${apiUrl}`);
      const publicKey = new PublicKey(walletAddress);
      const signatures = await connection.getSignaturesForAddress(publicKey);
      const transactionDetails = await Promise.all(
        signatures.map(async (signatureInfo) => {
          const transaction = await connection.getTransaction(
            signatureInfo.signature
          );
          return transaction;
        })
      );
      setTransactions(transactionDetails);
      console.log(transactionDetails);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(
        "Failed to fetch transactions. Please check the wallet address."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Solana Wallet Transactions
        </h1>
        <form onSubmit={fetchTransactions} className="mb-8">
          <input
            type="text"
            placeholder="Enter your Solana wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 w-full"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
          >
            Fetch Transactions
          </button>
        </form>

        {loading && <p className="text-center text-blue-700">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {transactions.map((tx, index) => (
            <TransactionCard key={index} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
