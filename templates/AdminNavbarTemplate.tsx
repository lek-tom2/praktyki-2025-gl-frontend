import Image from "next/image";
import React from "react";
import useUserContext from "@/gl-context/UserContextProvider";
import { useRouter } from "next/navigation";
import Themes from "@/gl-const/themes";
import Languages from "@/gl-const/languages";

const AdminNavbarTemplate = () => {
	const { User, UserDispatch } = useUserContext();
	const router = useRouter();
	
	// Check if user is logged in and is admin
	const isLoggedInAdmin = User.username && User.is_staff;
	const displayName = User.full_name || User.username || "Admin";

	const handleLogout = () => {
		// Clear user context
		UserDispatch({
			type: "setUser",
			value: {
				username: null,
				profilePicture: null,
				theme: Themes.glLight,
				userId: null,
				email: null,
				accountVerified: null,
				passwordLength: null,
				authorities: null,
				accountNonLocked: null,
				token: null,
				languageIso2: Languages.en,
				phone_number: null,
				is_active: false,
				is_staff: false,
				full_name: null,
			},
		});
		
		// Clear JWT tokens
		localStorage.removeItem('access');
		localStorage.removeItem('refresh');
		localStorage.clear();
		
		// Redirect to admin login
		router.push('/admin/signup');
	};

	return (
		<nav className="bg-secondary h-16 w-full flex flex-row items-center text-neutral px-6">
			{/* Logo i napis */}
			<div className="relative flex flex-row items-center gap-6 ml-20">
				<div className="w-20 h-6 relative">
					<Image src="/logo.png" fill alt="GlobalPark" />
				</div>
				<span className="text-xl font-bold tracking-wide">Admin Panel</span>
			</div>
			
			<div className="ml-auto mr-20 flex items-center gap-4">
				{isLoggedInAdmin ? (
					<>
						<span className="text-neutral font-medium">
							Hello, {displayName}
						</span>
						<button 
							onClick={handleLogout}
							className="btn btn-accent font-semibold px-6 py-2 rounded-4xl hover:scale-105 duration-300"
						>
							Logout
						</button>
					</>
				) : (
					<a href="/admin/signup">
						<button className="btn btn-accent font-semibold px-6 py-2 rounded-4xl hover:scale-105 duration-300">
							Login
						</button>
					</a>
				)}
			</div>
		</nav>
	);
};

export default AdminNavbarTemplate;
