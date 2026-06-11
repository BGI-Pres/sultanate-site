"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  method: string;
  donor_name: string;
  donor_email: string;
  description: string;
  created_at: string;
  status: string;
}

export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransactions() {
      const supabase = createClient();
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setTransactions(data as Transaction[]);
      }
      setLoading(false);
    }
    loadTransactions();
  }, []);

  const totalDonations = transactions
    .filter((t) => t.type === "donation" && t.status === "completed")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const totalOrders = transactions
    .filter((t) => t.type === "order" && t.status === "completed")
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--gray-900)]">Finances</h1>
        <p className="text-[var(--gray-500)] mt-1">
          Track donations, gifts, and merchandise orders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-lg border border-[var(--gray-200)]">
          <p className="text-sm text-[var(--gray-500)] mb-1">Total Donations</p>
          <p className="text-2xl font-bold text-[var(--forest-green)]">
            ${totalDonations.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[var(--gray-200)]">
          <p className="text-sm text-[var(--gray-500)] mb-1">Merchandise Sales</p>
          <p className="text-2xl font-bold text-[var(--gray-900)]">
            ${totalOrders.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[var(--gray-200)]">
          <p className="text-sm text-[var(--gray-500)] mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-[var(--cherry-red)]">
            ${(totalDonations + totalOrders).toFixed(2)}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">
          Loading transactions...
        </div>
      ) : transactions.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)] mb-2">No transactions recorded yet.</p>
          <p className="text-sm text-[var(--gray-500)]">
            Create a <code className="bg-[var(--gray-100)] px-1 rounded">transactions</code> table
            in Supabase with columns:{" "}
            <code className="bg-[var(--gray-100)] px-1 rounded">
              id, type, amount, method, donor_name, donor_email, description, created_at, status
            </code>
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">From</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Method</th>
                  <th className="text-right px-4 py-3 font-medium text-[var(--gray-700)]">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-[var(--gray-700)]">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]">
                    <td className="px-4 py-3 text-[var(--gray-500)]">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          tx.type === "donation"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--gray-900)]">{tx.donor_name || "—"}</td>
                    <td className="px-4 py-3 text-[var(--gray-500)]">{tx.method}</td>
                    <td className="px-4 py-3 text-right font-medium text-[var(--gray-900)]">
                      ${tx.amount?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          tx.status === "completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
