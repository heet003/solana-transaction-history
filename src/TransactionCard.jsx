/* eslint-disable */
import React from "react";

const TransactionCard = ({ transaction }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 text-xl font-semibold">TX</span>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Transaction ID:
            <span className="text-blue-600">
              
              {transaction.transaction.signatures[0]}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Slot: <span className="text-gray-800">{transaction.slot}</span>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 mt-4">
        <p className="text-sm text-gray-600">
          Block Time:
          <span className="text-gray-800">
            {new Date(transaction.blockTime * 1000).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
