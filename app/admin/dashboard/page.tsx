
"use client";
import { useState, useEffect } from "react";
import Input from "@/components/input/input";
import Button from "@/components/button";
import AdminNavbarTemplate from "@/templates/AdminNavbarTemplate";
import { ApiLinks } from "@/gl-const/api-links";
import { UserBackend, User } from "@/gl-types/user-types";
import { Vehicle } from "@/gl-types/vehicle";
import { ParkingSpotBackend } from "@/gl-types/parkingSpot";
import useUserContext from "@/gl-context/UserContextProvider";
import { toast } from "react-hot-toast";

// Types for API responses
type AdminUser = UserBackend & { id: number };
type AdminCar = Vehicle & { user: string };
type AdminParkingSpot = ParkingSpotBackend & { id: number; lastReservation?: string };

const BUTTONS = [
	{ key: "users", label: "All Users", title: "All Users" },
	{ key: "cars", label: "All Users Cars", title: "All Users Cars" },
	{ key: "spots", label: "All Parking Spots", title: "All Parking Spots" },
];

export default function AdminDashboard() {
	const { User, UserDispatch } = useUserContext();
	
	const [active, setActive] = useState<"users" | "cars" | "spots">("users");
	const [editModal, setEditModal] = useState<{ type: string; data: any } | null>(null);
	const [deleteModal, setDeleteModal] = useState<{ type: string; data: any } | null>(null);
	const [editForm, setEditForm] = useState<any>({});
	
	// API data states
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [cars, setCars] = useState<AdminCar[]>([]);
	const [parkingSpots, setParkingSpots] = useState<AdminParkingSpot[]>([]);
	const [loading, setLoading] = useState(false);
	
	// Undo delete functionality
	const [recentlyDeleted, setRecentlyDeleted] = useState<{
		type: 'users' | 'cars' | 'spots';
		data: any;
		timeoutId: NodeJS.Timeout;
	} | null>(null);

	// Helper function to refresh token if needed
	const refreshTokenIfNeeded = async () => {
		const refreshToken = localStorage.getItem('refresh');
		if (!refreshToken) {
			throw new Error('No refresh token available');
		}

		try {
			const response = await fetch('/api/proxy?endpoint=' + encodeURIComponent('/api/token/refresh/'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					refresh: refreshToken
				})
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('access', data.access);
				console.log('Token refreshed successfully');
				return data.access;
			} else {
				throw new Error('Token refresh failed');
			}
		} catch (error) {
			console.error('Token refresh error:', error);
			// Clear tokens and redirect to login
			localStorage.removeItem('access');
			localStorage.removeItem('refresh');
			window.location.href = '/admin/signup';
			throw error;
		}
	};

	// Function to restore user data from token
	const restoreUserDataFromToken = async () => {
		try {
			const token = localStorage.getItem('access');
			if (!token) {
				console.log('No access token found');
				return false;
			}

			// Try to get user info from the employees endpoint
			// since the admin user should be in this list
			try {
				const headers = await getAuthHeaders();
				const response = await fetch(ApiLinks.listUsers, {
					headers: headers
				});

				if (response.ok) {
					const users = await response.json();
					// Find the current user (admin should be in the list)
					const currentUser = users.find((user: UserBackend) => user.is_staff && user.username);
					
					if (currentUser) {
						console.log('Restoring user data:', currentUser);
						const user: User = {
							...currentUser,
							languageIso2: "en",
							theme: "light",
							is_active: true,
							profilePicture: null,
							accountVerified: null,
							passwordLength: null,
							authorities: null,
							accountNonLocked: null,
							token: null,
						};

						UserDispatch({ type: "setUser", value: user });
						return true;
					}
				}
			} catch (error) {
				console.log('Could not fetch user data:', error);
			}

			return false;
		} catch (error) {
			console.error('Error restoring user data:', error);
			return false;
		}
	};

	// Helper function to get auth header with automatic token refresh
	const getAuthHeaders = async () => {
		let token = localStorage.getItem('access');
		console.log('Token from localStorage:', token ? 'Present' : 'Missing');
		
		// If no token, try to refresh
		if (!token) {
			token = await refreshTokenIfNeeded();
		}

		return {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		};
	};

	// Fetch functions
	const fetchUsers = async () => {
		try {
			setLoading(true);
			const headers = await getAuthHeaders();
			console.log('Making request to:', ApiLinks.listUsers);
			console.log('Headers:', headers);
			
			const response = await fetch(ApiLinks.listUsers, {
				headers: headers
			});
			
			console.log('Response status:', response.status);
			console.log('Response ok:', response.ok);
			
			if (!response.ok) {
				const errorText = await response.text();
				console.log('Error response:', errorText);
				
				// If unauthorized, try to refresh token and retry once
				if (response.status === 401) {
					console.log('Unauthorized, attempting token refresh...');
					try {
						await refreshTokenIfNeeded();
						// Retry the request with new token
						const newHeaders = await getAuthHeaders();
						const retryResponse = await fetch(ApiLinks.listUsers, {
							headers: newHeaders
						});
						
						if (retryResponse.ok) {
							const data = await retryResponse.json();
							console.log('Users data (retry):', data);
							setUsers(data);
							return;
						}
					} catch (refreshError) {
						console.error('Token refresh failed:', refreshError);
					}
					
					toast.error('Session expired. Please log in again.');
					localStorage.removeItem('access');
					localStorage.removeItem('refresh');
					window.location.href = '/admin/signup';
					return;
				}
				
				throw new Error(`Failed to fetch users: ${response.status} - ${errorText}`);
			}
			const data = await response.json();
			console.log('Users data:', data);
			setUsers(data);
		} catch (error) {
			console.error('Error fetching users:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			toast.error(`Failed to fetch users: ${errorMessage}`);
		} finally {
			setLoading(false);
		}
	};

	const fetchCars = async () => {
		try {
			setLoading(true);
			const headers = await getAuthHeaders();
			console.log('Making request to:', ApiLinks.listCars);
			console.log('Headers:', headers);
			
			const response = await fetch(ApiLinks.listCars, {
				headers: headers
			});
			
			console.log('Cars response status:', response.status);
			console.log('Cars response ok:', response.ok);
			
			if (!response.ok) {
				const errorText = await response.text();
				console.log('Cars error response:', errorText);
				
				// If unauthorized, try to refresh token and retry once
				if (response.status === 401) {
					console.log('Cars unauthorized, attempting token refresh...');
					try {
						await refreshTokenIfNeeded();
						// Retry the request with new token
						const newHeaders = await getAuthHeaders();
						const retryResponse = await fetch(ApiLinks.listCars, {
							headers: newHeaders
						});
						
						if (retryResponse.ok) {
							const data = await retryResponse.json();
							console.log('Cars data (retry):', data);
							setCars(data);
							return;
						}
					} catch (refreshError) {
						console.error('Token refresh failed:', refreshError);
					}
					
					toast.error('Session expired. Please log in again.');
					localStorage.removeItem('access');
					localStorage.removeItem('refresh');
					window.location.href = '/admin/signup';
					return;
				}
				
				throw new Error(`Failed to fetch cars: ${response.status} - ${errorText}`);
			}
			const data = await response.json();
			console.log('Cars data:', data);
			setCars(data);
		} catch (error) {
			console.error('Error fetching cars:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			toast.error(`Failed to fetch cars: ${errorMessage}`);
		} finally {
			setLoading(false);
		}
	};

	const fetchParkingSpots = async () => {
		try {
			setLoading(true);
			const headers = await getAuthHeaders();
			console.log('Making request to:', ApiLinks.listParkingSpaces);
			console.log('Headers:', headers);
			
			const response = await fetch(ApiLinks.listParkingSpaces, {
				headers: headers
			});
			
			console.log('Parking spots response status:', response.status);
			console.log('Parking spots response ok:', response.ok);
			
			if (!response.ok) {
				const errorText = await response.text();
				console.log('Parking spots error response:', errorText);
				
				// If unauthorized, try to refresh token and retry once
				if (response.status === 401) {
					console.log('Parking spots unauthorized, attempting token refresh...');
					try {
						await refreshTokenIfNeeded();
						// Retry the request with new token
						const newHeaders = await getAuthHeaders();
						const retryResponse = await fetch(ApiLinks.listParkingSpaces, {
							headers: newHeaders
						});
						
						if (retryResponse.ok) {
							const data = await retryResponse.json();
							console.log('Parking spots data (retry):', data);
							console.log('First parking spot structure (retry):', data[0]); // Debug: see actual data structure
							setParkingSpots(data.map((spot: any) => ({
								...spot,
								// Keep original ID if it exists, otherwise use spot_number for display purposes only
								id: spot.id || spot.spot_number,
								lastReservation: spot.lastReservation || 'N/A'
							})));
							return;
						}
					} catch (refreshError) {
						console.error('Token refresh failed:', refreshError);
					}
					
					toast.error('Session expired. Please log in again.');
					localStorage.removeItem('access');
					localStorage.removeItem('refresh');
					window.location.href = '/admin/signup';
					return;
				}
				
				throw new Error(`Failed to fetch parking spots: ${response.status} - ${errorText}`);
			}
			const data = await response.json();
			console.log('Parking spots data:', data);
			console.log('First parking spot structure:', data[0]); // Debug: see actual data structure
			setParkingSpots(data.map((spot: any) => ({
				...spot,
				// Keep original ID if it exists, otherwise use spot_number for display purposes only
				id: spot.id || spot.spot_number,
				lastReservation: spot.lastReservation || 'N/A'
			})));
		} catch (error) {
			console.error('Error fetching parking spots:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			toast.error(`Failed to fetch parking spots: ${errorMessage}`);
		} finally {
			setLoading(false);
		}
	};

	// Load data on component mount and when active tab changes
	useEffect(() => {
		// Check if user is logged in
		const token = localStorage.getItem('access');
		if (!token) {
			toast.error('Please log in as administrator');
			window.location.href = '/admin/signup';
			return;
		}

		// Restore user data if not already set
		if (!User.username) {
			restoreUserDataFromToken();
		}

		if (active === 'users') {
			fetchUsers();
		} else if (active === 'cars') {
			fetchCars();
		} else if (active === 'spots') {
			fetchParkingSpots();
		}
	}, [active]);

	const handleEdit = async () => {
		if (!editModal) return;
		
		// Users are not editable - should not reach here
		if (editModal.type === "users") {
			toast.error("User editing is not available for security reasons");
			setEditModal(null);
			return;
		}
		
		try {
			let url = "";
			let methods = ["PATCH", "PUT", "POST"]; // Try multiple methods
			let body = { ...editForm };
			
			if (editModal.type === "cars") {
				url = ApiLinks.updateCar(editForm.id);
			} else if (editModal.type === "spots") {
				url = ApiLinks.updateParkingSpot(editForm.id);
			}
			
			console.log('=== EDIT REQUEST ===');
			console.log('Type:', editModal.type);
			console.log('URL:', url);
			console.log('Body:', JSON.stringify(body, null, 2));
			console.log('Will try methods:', methods);
			
			let lastError = null;
			let allowedMethodsInfo = '';
			
			// Try each method until one works
			for (const method of methods) {
				console.log(`Trying method: ${method}`);
				
				const response = await fetch(url, {
					method,
					headers: await getAuthHeaders(),
					body: JSON.stringify(body),
				});
				
				console.log(`${method} Response status:`, response.status);
				console.log(`${method} Response ok:`, response.ok);
				
				const allowedMethods = response.headers.get('Allow');
				if (allowedMethods) {
					console.log(`${method} Allowed methods:`, allowedMethods);
					allowedMethodsInfo = ` (Server allows: ${allowedMethods})`;
				}
				
				if (response.ok) {
					const responseData = await response.json();
					console.log(`${method} Success response:`, responseData);
					console.log('=== END EDIT REQUEST ===');
					
					toast.success('Update successful');
					setEditModal(null);
					
					// Refresh data
					if (editModal.type === "cars") fetchCars();
					else if (editModal.type === "spots") fetchParkingSpots();
					
					return; // Success! Exit function
				}
				
				// If not successful, log the error and try next method
				const errorText = await response.text();
				console.log(`${method} Error response:`, errorText);
				console.log(`${method} Error status:`, response.status);
				
				lastError = `${method} failed: ${response.status} - ${errorText}`;
				
				// If this is 404 Not Found, the endpoint doesn't exist
				if (response.status === 404) {
					console.log('404 - Endpoint does not exist');
					break;
				}
				
				// If this is 405 Method Not Allowed, continue to try other methods
				if (response.status !== 405) {
					// If it's not a method issue, don't try other methods
					break;
				}
			}
			
			console.log('=== END EDIT REQUEST ===');
			throw new Error(`All methods failed. Last error: ${lastError}${allowedMethodsInfo}`);
			
		} catch (error) {
			console.error('Error updating:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			toast.error(`Update failed: ${errorMessage}`);
		}
	};
	
	const handleDelete = async () => {
		if (!deleteModal) return;
		
		// Users are not deletable 
		if (deleteModal.type === "users") {
			toast.error("User deletion is not available for security reasons");
			setDeleteModal(null);
			return;
		}
		
		// First, remove from UI immediately and set up undo
		const deletedItem = deleteModal.data;
		const itemType = deleteModal.type as 'cars' | 'spots';
		
		// Remove from UI
		if (itemType === "cars") {
			setCars(prev => prev.filter(car => car.id !== deletedItem.id));
		} else if (itemType === "spots") {
			setParkingSpots(prev => prev.filter(spot => spot.id !== deletedItem.id));
		}
		
		setDeleteModal(null);
		
		// Clear any existing undo timeout
		if (recentlyDeleted?.timeoutId) {
			clearTimeout(recentlyDeleted.timeoutId);
		}
		
		// Set up undo functionality (5 seconds to undo)
		const timeoutId = setTimeout(async () => {
			// After 5 seconds, actually delete from backend
			try {
				let url = "";
				let methods = ["DELETE", "POST"]; // Try multiple methods
				
				if (itemType === "cars") {
					url = ApiLinks.deleteCar(deletedItem.id);
				} else if (itemType === "spots") {
					url = ApiLinks.deleteParkingSpot(deletedItem.id);
				}
				
				console.log('=== DELETE REQUEST ===');
				console.log('URL:', url);
				console.log('Item ID:', deletedItem.id);
				console.log('Will try methods:', methods);
				
				let lastError = null;
				
				// Try each method until one works
				for (const method of methods) {
					console.log(`Trying delete method: ${method}`);
					
					const fetchOptions: RequestInit = {
						method,
						headers: await getAuthHeaders()
					};
					
					// DELETE method doesn't need body for RESTful endpoints
					const response = await fetch(url, fetchOptions);
					
					console.log(`${method} Delete response status:`, response.status);
					console.log(`${method} Delete response ok:`, response.ok);
					
					if (response.ok) {
						console.log(`${method} Delete successful`);
						console.log('Item permanently deleted from backend');
						console.log('=== END DELETE REQUEST ===');
						setRecentlyDeleted(null);
						return; // Success! Exit function
					}
					
					// If not successful, log the error and try next method
					const errorText = await response.text();
					console.log(`${method} Delete error response:`, errorText);
					
					const allowedMethods = response.headers.get('Allow');
					if (allowedMethods) {
						console.log(`${method} Delete allowed methods:`, allowedMethods);
					}
					
					lastError = `${method} failed: ${response.status} - ${errorText}`;
					
					// If this is 405 Method Not Allowed, continue to try other methods
					if (response.status !== 405) {
						// If it's not a method issue, don't try other methods
						break;
					}
				}
				
				console.log('=== END DELETE REQUEST ===');
				
				// If all methods failed, restore the item
				handleUndoDelete();
				throw new Error(`All delete methods failed. Last error: ${lastError}`);
				
			} catch (error) {
				console.error('Error deleting from backend:', error);
				toast.error('Failed to delete from server. Item restored.');
			}
		}, 5000);
		
		setRecentlyDeleted({
			type: itemType,
			data: deletedItem,
			timeoutId: timeoutId
		});
		
		toast.success(
			<div className="flex items-center justify-between">
				<span>Item deleted</span>
				<button 
					onClick={handleUndoDelete}
					className="ml-3 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
				>
					UNDO
				</button>
			</div>,
			{ duration: 5000 }
		);
	};
	
	const handleUndoDelete = () => {
		if (!recentlyDeleted) return;
		
		// Clear the timeout
		clearTimeout(recentlyDeleted.timeoutId);
		
		// Restore item to UI
		if (recentlyDeleted.type === "cars") {
			setCars(prev => [...prev, recentlyDeleted.data]);
		} else if (recentlyDeleted.type === "spots") {
			setParkingSpots(prev => [...prev, recentlyDeleted.data]);
		}
		
		setRecentlyDeleted(null);
		toast.success('Delete cancelled');
	};

		let content = null;
		if (active === "users") {
			content = (
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-[#f3f4f6]">
							<th className="px-4 py-2 text-left">User ID</th>
							<th className="px-4 py-2 text-left">Username</th>
							<th className="px-4 py-2 text-left">Full Name</th>
							<th className="px-4 py-2 text-left">Email</th>
							<th className="px-4 py-2 text-left">Status</th>
							<th className="px-4 py-2 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={6} className="px-4 py-8 text-center">Loading users...</td>
							</tr>
						) : users.length === 0 ? (
							<tr>
								<td colSpan={6} className="px-4 py-8 text-center">No users found</td>
							</tr>
						) : (
							users.map((u) => (
								<tr key={u.id} className="border-b">
									<td className="px-4 py-2">{u.id}</td>
									<td className="px-4 py-2">{u.username}</td>
									<td className="px-4 py-2">{u.full_name || 'N/A'}</td>
									<td className="px-4 py-2">{u.email}</td>
									<td className="px-4 py-2">
										<span className={`px-2 py-1 rounded-full text-xs ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
											{u.is_active ? 'Active' : 'Inactive'}
										</span>
									</td>
									<td className="px-4 py-2 flex justify-end gap-2">
										{/* Users are view-only - no edit/delete buttons for security */}
										<span className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
											View Only
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			);
		} else if (active === "cars") {
			content = (
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-[#f3f4f6]">
							<th className="px-4 py-2 text-left">Car ID</th>
							<th className="px-4 py-2 text-left">Brand</th>
							<th className="px-4 py-2 text-left">Model</th>
							<th className="px-4 py-2 text-left">Year</th>
							<th className="px-4 py-2 text-left">License Plate</th>
							<th className="px-4 py-2 text-left">Color</th>
							<th className="px-4 py-2 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={7} className="px-4 py-8 text-center">Loading cars...</td>
							</tr>
						) : cars.length === 0 ? (
							<tr>
								<td colSpan={7} className="px-4 py-8 text-center">No cars found</td>
							</tr>
						) : (
							cars.map((c) => (
								<tr key={c.id} className="border-b">
									<td className="px-4 py-2">{c.id}</td>
									<td className="px-4 py-2">{c.brand}</td>
									<td className="px-4 py-2">{c.model}</td>
									<td className="px-4 py-2">{c.year}</td>
									<td className="px-4 py-2">{c.registration_number}</td>
									<td className="px-4 py-2">{c.color}</td>
									<td className="px-4 py-2 flex justify-end gap-2">
										<button 
											title="Edit" 
											className="text-blue-500 hover:text-blue-700" 
											onClick={() => { setEditForm(c); setEditModal({ type: "cars", data: c }); }}
										>
											<span className="material-icons">edit</span>
										</button>
										<button 
											title="Delete" 
											className="text-red-500 hover:text-red-700" 
											onClick={() => setDeleteModal({ type: "cars", data: c })}
										>
											<span className="material-icons">delete</span>
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			);
		} else if (active === "spots") {
			content = (
				<table className="min-w-full table-auto">
					<thead>
						<tr className="bg-[#f3f4f6]">
							<th className="px-4 py-2 text-left">Spot Number</th>
							<th className="px-4 py-2 text-left">Floor</th>
							<th className="px-4 py-2 text-left">Status</th>
							<th className="px-4 py-2 text-left">Aisle</th>
							<th className="px-4 py-2 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td colSpan={5} className="px-4 py-8 text-center">Loading parking spots...</td>
							</tr>
						) : parkingSpots.length === 0 ? (
							<tr>
								<td colSpan={5} className="px-4 py-8 text-center">No parking spots found</td>
							</tr>
						) : (
							parkingSpots.map((s, index) => (
								<tr key={`parking-${s.spot_number}-${s.floor}-${index}`} className="border-b">
									<td className="px-4 py-2">{s.spot_number}</td>
									<td className="px-4 py-2">{s.floor}</td>
									<td className="px-4 py-2">
										<span className={`px-2 py-1 rounded-full text-xs capitalize ${
											s.status === 'FREE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
										}`}>
											{s.status.toLowerCase()}
										</span>
									</td>
									<td className="px-4 py-2">{s.aisle}</td>
									<td className="px-4 py-2 flex justify-end gap-2">
										<button 
											title="Edit" 
											className="text-blue-500 hover:text-blue-700" 
											onClick={() => { setEditForm(s); setEditModal({ type: "spots", data: s }); }}
										>
											<span className="material-icons">edit</span>
										</button>
										<button 
											title="Delete" 
											className="text-red-500 hover:text-red-700" 
											onClick={() => setDeleteModal({ type: "spots", data: s })}
										>
											<span className="material-icons">delete</span>
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			);
		}

		const activeTitle = BUTTONS.find((b) => b.key === active)?.title || "";

			return (
				<div className="flex flex-col w-[100vw] h-[100vh] bg-white">
					<AdminNavbarTemplate />
					<main className="flex-1 bg-white flex flex-col items-center pt-8">
						<div className="flex w-full">
							<div className="flex flex-row gap-4 items-start mt-2 ml-20">
								{BUTTONS.map((btn) => (
									<div key={btn.key} className="flex flex-col items-center relative">
										<button
											className={`px-8 py-2 font-semibold rounded-none border-none focus:outline-none transition-colors duration-200 text-left ${
												active === btn.key
													? "text-[#7F8CAA]"
													: "text-gray-500 hover:text-[#7F8CAA]"
											}`}
											style={{ background: "#fff", minWidth: 180 }}
											onClick={() => setActive(btn.key as any)}
										>
											{btn.label}
										</button>
										{active === btn.key && (
											<div
												className="absolute left-0 right-0"
												style={{
													height: "3px",
													background: "#7F8CAA",
													bottom: "-6px",
													width: "80%",
													marginLeft: 0,
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col items-center w-full mt-12">
							<div className="mb-4 text-2xl font-bold text-[#7F8CAA] text-left w-[60%]">
								{activeTitle}
							</div>
							<section className="w-[60%] bg-base-200 rounded-xl shadow-lg p-8 flex flex-col justify-center min-h-[200px] mx-auto">
								{content}
							</section>
						</div>

						{editModal && (
							<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
								<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] w-[90vw] max-w-[400px] flex flex-col gap-4">
									<h3 className="text-xl font-bold mb-2">Edit {editModal.type.slice(0, -1)}</h3>
									{Object.keys(editForm).map((key) => {
										const getInputType = () => {
											if (key === 'year' || key === 'floor' || key === 'id') return 'number';
											if (key === 'email') return 'email';
											if (key === 'is_active' || key === 'is_staff') return 'checkbox';
											return 'text';
										};
										
										const inputType = getInputType();
										
										if (inputType === 'checkbox') {
											return (
												<div key={key} className="flex items-center gap-2">
													<input
														type="checkbox"
														id={key}
														checked={!!editForm[key]}
														onChange={e => setEditForm({ ...editForm, [key]: e.target.checked })}
														className="rounded"
													/>
													<label htmlFor={key} className="text-sm font-semibold text-gray-600">
														{key.charAt(0).toUpperCase() + key.slice(1)}
													</label>
												</div>
											);
										}
										
										return (
											<div key={key} className="flex flex-col gap-1">
												<label className="text-xs font-semibold text-gray-600">
													{key.charAt(0).toUpperCase() + key.slice(1)}
												</label>
												<Input
													className="bg-base-200 rounded-md p-2"
													type={inputType}
													name={key}
													value={editForm[key] || ''}
													onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
													disabled={key === 'id'} // Disable ID editing
												/>
											</div>
										);
									})}
									<div className="flex gap-4 mt-4">
										<Button 
											value={loading ? "Saving..." : "Save"} 
											type="button" 
											onClick={handleEdit} 
											customWidth="50%" 
											disabled={loading}
										/>
										<Button 
											value="Cancel" 
											type="button" 
											onClick={() => setEditModal(null)} 
											customWidth="50%" 
											disabled={loading}
										/>
									</div>
								</div>
							</div>
						)}

						{deleteModal && (
							<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
								<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] w-[90vw] max-w-[400px] flex flex-col gap-4">
									<h3 className="text-xl font-bold mb-2">Confirm delete</h3>
									<p>Are you sure you want to delete this {deleteModal.type.slice(0, -1)}?</p>
									<div className="flex gap-4 mt-4">
										<Button 
											value={loading ? "Deleting..." : "Delete"} 
											type="button" 
											onClick={handleDelete} 
											customWidth="50%" 
											disabled={loading}
										/>
										<Button 
											value="Cancel" 
											type="button" 
											onClick={() => setDeleteModal(null)} 
											customWidth="50%" 
											disabled={loading}
										/>
									</div>
								</div>
							</div>
						)}
					</main>
				</div>
			);
	}
