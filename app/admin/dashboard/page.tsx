
"use client";
import { useState, useEffect } from "react";
import Input from "@/components/input/input";
import Button from "@/components/button";
import AdminNavbarTemplate from "@/templates/AdminNavbarTemplate";
import { ApiLinks } from "@/gl-const/api-links";
import { UserBackend } from "@/gl-types/user-types";
import { Vehicle } from "@/gl-types/vehicle";
import { ParkingSpotBackend } from "@/gl-types/parkingSpot";
import toast from "react-hot-toast";

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
	const [active, setActive] = useState<"users" | "cars" | "spots">("users");
	const [editModal, setEditModal] = useState<{ type: string; data: any } | null>(null);
	const [deleteModal, setDeleteModal] = useState<{ type: string; data: any } | null>(null);
	const [editForm, setEditForm] = useState<any>({});
	
	// API data states
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [cars, setCars] = useState<AdminCar[]>([]);
	const [parkingSpots, setParkingSpots] = useState<AdminParkingSpot[]>([]);
	const [loading, setLoading] = useState(false);

	// Helper function to get auth header
	const getAuthHeaders = () => {
		const token = localStorage.getItem('access');
		console.log('Token from localStorage:', token ? 'Present' : 'Missing');
		return {
			'Content-Type': 'application/json',
			...(token && { 'Authorization': `Bearer ${token}` })
		};
	};

	// Fetch functions
	const fetchUsers = async () => {
		try {
			setLoading(true);
			const headers = getAuthHeaders();
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
				
				// If unauthorized, redirect to login
				if (response.status === 401) {
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
			const headers = getAuthHeaders();
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
				
				// If unauthorized, redirect to login
				if (response.status === 401) {
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
			const headers = getAuthHeaders();
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
				
				// If unauthorized, redirect to login
				if (response.status === 401) {
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
			setParkingSpots(data.map((spot: any) => ({
				...spot,
				id: spot.spot_number, // Use spot_number as id
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
		try {
			let url = "";
			let method = "PUT";
			let body = {};
			
			if (editModal.type === "users") {
				url = ApiLinks.updateUser(editForm.id);
				body = { ...editForm };
			} else if (editModal.type === "cars") {
				url = ApiLinks.updateCar(editForm.id);
				body = { ...editForm };
			} else if (editModal.type === "spots") {
				url = ApiLinks.updateParkingSpot(editForm.id);
				body = { ...editForm };
			}
			
			const response = await fetch(url, {
				method,
				headers: getAuthHeaders(),
				body: JSON.stringify(body),
			});
			
			if (!response.ok) throw new Error('Update failed');
			
			toast.success('Update successful');
			setEditModal(null);
			
			// Refresh data
			if (editModal.type === "users") fetchUsers();
			else if (editModal.type === "cars") fetchCars();
			else if (editModal.type === "spots") fetchParkingSpots();
			
		} catch (error) {
			console.error('Error updating:', error);
			toast.error('Update failed');
		}
	};
	
	const handleDelete = async () => {
		if (!deleteModal) return;
		try {
			let url = "";
			
			if (deleteModal.type === "users") {
				url = ApiLinks.deleteUser(deleteModal.data.id);
			} else if (deleteModal.type === "cars") {
				url = ApiLinks.deleteCar(deleteModal.data.id);
			} else if (deleteModal.type === "spots") {
				url = ApiLinks.deleteParkingSpot(deleteModal.data.id);
			}
			
			const response = await fetch(url, { 
				method: "DELETE",
				headers: getAuthHeaders()
			});
			
			if (!response.ok) throw new Error('Delete failed');
			
			toast.success('Delete successful');
			setDeleteModal(null);
			
			// Refresh data
			if (deleteModal.type === "users") fetchUsers();
			else if (deleteModal.type === "cars") fetchCars();
			else if (deleteModal.type === "spots") fetchParkingSpots();
			
		} catch (error) {
			console.error('Error deleting:', error);
			toast.error('Delete failed');
		}
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
										<button 
											title="Edit" 
											className="text-blue-500 hover:text-blue-700" 
											onClick={() => { setEditForm(u); setEditModal({ type: "users", data: u }); }}
										>
											<span className="material-icons">edit</span>
										</button>
										<button 
											title="Delete" 
											className="text-red-500 hover:text-red-700" 
											onClick={() => setDeleteModal({ type: "users", data: u })}
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
							parkingSpots.map((s) => (
								<tr key={s.id} className="border-b">
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
