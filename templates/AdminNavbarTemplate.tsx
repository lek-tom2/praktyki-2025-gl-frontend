import Image from "next/image";
import React from "react";

const AdminNavbarTemplate = () => {
			return (
				<nav className="bg-secondary h-16 w-full flex flex-row items-center text-neutral px-6">
			{/* Logo i napis */}
			<div className="relative flex flex-row items-center gap-6 ml-20">
				<div className="w-20 h-6 relative">
					<Image src="/logo.png" fill alt="GlobalPark" />
				</div>
				<span className="text-xl font-bold tracking-wide">Admin Panel</span>
			</div>
				<div className="ml-auto mr-20">
					<a href="/admin/signup">
						<button className="btn btn-accent font-semibold px-6 py-2 rounded-4xl hover:scale-105 duration-300">
							Login
						</button>
					</a>
				</div>
			</nav>
	);
};

export default AdminNavbarTemplate;
