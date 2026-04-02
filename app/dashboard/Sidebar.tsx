export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#111] text-white p-6 flex flex-col gap-6 border-r border-[#333]">
      <h2 className="text-2xl font-bold">Menu</h2>

      <nav className="flex flex-col gap-4 text-gray-300">
        <a href="/dashboard" className="hover:text-cyan-400">Dashboard</a>
        <a href="/rewards" className="hover:text-cyan-400">Rewards</a>
        <a href="/wallet" className="hover:text-cyan-400">Wallet</a>
        <a href="/transactions" className="hover:text-cyan-400">Transactions</a>
        <a href="/settings" className="hover:text-cyan-400">Settings</a>
        <a href="/login" className="hover:text-red-400 mt-6">Logout</a>
      </nav>
    </div>
  );
}
