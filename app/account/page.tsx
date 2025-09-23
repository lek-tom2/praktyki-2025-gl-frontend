"use client";

import PageTemplateAfterLogin from "@/templates/PageTemplateAfterLogin";
import Input from "@/components/input/input";
import Button from "@/components/button";
import { useState, useEffect } from "react";
import useUserContext from "@/gl-context/UserContextProvider";
import toast from "react-hot-toast";
import { Vehicle } from "@/gl-types/vehicle";
import { Reservation } from "@/gl-types/reservation";
import PageTemplate from "@/templates/PageTemplate";
import Themes from "@/gl-const/themes";
import Languages from "@/gl-const/languages";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateFullName = (name: string) =>
  /^[A-Z][a-z]+(?: [A-Z][a-z]+(?:-[A-Z][a-z]+)?)$/.test(name.trim());
const validatePhone = (phone: string) =>
  /^\d{3}-\d{3}-\d{3}$/.test(phone.trim());
export default function Home() {
  const [loading, setLoading] = useState(false);
  const { User, UserDispatch } = useUserContext();
  const [email, setEmail] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editBrand, setEditBrand] = useState("");
  const [editRegNum, setEditRegNum] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmNewPassword(e.target.value);
  };
  useEffect(() => {
    if (User.email) setEmail(User.email);
  }, [User.email]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await fetch("/api/reservations");
        if (res.ok) {
          const data = await res.json();
          setReservations(data.reservations);
        } else {
          setReservations([]);
        }
      } catch {
        setReservations([]);
      }
    };

    const fetchVehicles = async () => {
      try {
        const res = await fetch("/api/vehicles");
        if (res.ok) {
          const data = await res.json();
          setVehicles(data.vehicles);
        } else {
          setVehicles([
            {
              id: 1,
              spot: 1,
              registration_number: "KR12345",
              brand: "Toyota",
              model: "Corolla",
              year: 2020,
              color: "White",
            },
            // { registration_number: "WX54321", brand: "Ford Focus" },
            //{ registration_number: "GD98765", brand: "Tesla Model 3" },
          ]);
        }
      } catch {
        setVehicles([
          {
            id: 1,
            spot: 1,
            registration_number: "KR12345",
            brand: "Toyota",
            model: "Corolla",
            year: 2020,
            color: "White",
          },
          //  { registration_number: "WX54321", brand: "Ford Focus" },
          //  { registration_number: "GD98765", brand: "Tesla Model 3" },
        ]);
      }
    };

    fetchReservations();
    fetchVehicles();
  }, []);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() && !email.trim() && !phone.trim()) {
      toast.success("No changes made.", {
        duration: 5000,
      });

      return;
    }
    if (fullName.trim() && !validateFullName(fullName)) {
      toast.error("Full name must be in format: 'John Doe'", {
        duration: 5000,
      });
      return;
    }
    if (email.trim() && !validateEmail(email)) {
      toast.error("Invalid email format.", {
        duration: 5000,
      });
      return;
    }
    if (phone.trim() && !validatePhone(phone)) {
      toast.error("Phone number must be in format: 123-456-789", {
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload: any = {};
      let changedFields: string[] = [];

      if (email.trim()) {
        payload.email = email;
        changedFields.push("Email");
      }
      if (fullName.trim()) {
        payload.fullName = fullName;
        changedFields.push("Full name");
      }
      if (phone.trim()) {
        payload.phone = phone;
        changedFields.push("Phone number");
      }

      const response = await fetch("/api/updateInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (email.trim()) UserDispatch({ type: "setEmail", value: email });
        if (fullName.trim())
          UserDispatch({ type: "setUsername", value: fullName });
        if (changedFields.length > 0) {
          toast.success(`Updated: ${changedFields.join(", ")}`, {
            duration: 5000,
          });
        } else {
          toast.success("No changes made.", {
            duration: 5000,
          });
        }
      } else {
        toast.error("Failed to update information. Try again later.", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Unexpected error. Try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword.trim()) {
      toast.error("Current password is required.", {
        duration: 5000,
      });
      return;
    }
    if (!newPassword.trim()) {
      toast.error("New password is required.", {
        duration: 5000,
      });
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.", {
        duration: 5000,
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirmation must match!", {
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      if (response.ok) {
        toast.success("Password changed successfully!", {
          duration: 5000,
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error("Failed to change password. Try again later.", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Unexpected error. Try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await fetch("/api/deleteAccount", {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Your account has been permanently deleted.", {
          duration: 5000,
        });
      } else {
        toast.error("Failed to delete account. Try again later.", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Unexpected error. Try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (registration_number: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/vehicles/${registration_number}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVehicles((prev) =>
          prev.filter((v) => v.registration_number !== registration_number)
        );
        toast.success("Vehicle has been removed from your account.", {
          duration: 5000,
        });
      } else {
        toast.error("Failed to delete vehicle. Try again later.", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Unexpected error. Try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleEditClick = (idx: number) => {
    setEditIdx(idx);
    setEditBrand(vehicles[idx].brand);
    setEditRegNum(vehicles[idx].registration_number);
  };

  const handleEditSave = async () => {
    if (!editBrand.trim()) {
      toast.error("Brand is required.", {
        duration: 5000,
      });
      return;
    }
    if (!editRegNum.trim()) {
      toast.error("Registration number is required.", {
        duration: 5000,
      });
      return;
    }

    setLoading(true);
    try {
      const updatedVehicle: Vehicle = {
        id: vehicles[editIdx!].id,
        spot: vehicles[editIdx!].spot,
        registration_number: editRegNum,
        brand: editBrand,
        model: vehicles[editIdx!].model,
        year: vehicles[editIdx!].year,
        color: vehicles[editIdx!].color,
      };

      const response = await fetch(
        `/api/vehicles/${vehicles[editIdx!].registration_number}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedVehicle),
        }
      );

      if (response.ok) {
        setVehicles((prev) =>
          prev.map((v, idx) => (idx === editIdx ? updatedVehicle : v))
        );
        setEditIdx(null);
        setEditBrand("");
        setEditRegNum("");
        toast.success("Vehicle details have been updated!", {
          duration: 5000,
        });
      } else {
        toast.error("Failed to update vehicle. Try again later.", {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error("Unexpected error. Try again later.", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditBrand("");
    setEditRegNum("");
  };

  const logout = () => {
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
        is_active: false,
        is_staff: false,
        phone_number: null,
        full_name: null,
      },
    });
    localStorage.clear();
  };

  return (
    <PageTemplate>
      <main className="overflow-auto flex flex-col items-center mb-4   ">
        <header className=" ml-[-34rem] mx-0 p-0 mb-4 mt-4">
          {/*<p className="text-sm text-gray-400">Current email in context: {User.email}</p>
  <p className="text-sm text-gray-400">Current full name in context: {User.username}</p>
   <h4 className="text-sm text-gray-400">Current vehicles in context:</h4>
  {User.vechicles && User.vechicles.length > 0 ? (
    <ul className="text-xs text-gray-400">
      {User.vechicles.map((v, idx) => (
        <li key={idx}>
          {v.brand} 
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-xs text-gray-400">No vehicles in context.</p>
  )}*/}
          <h1 className="text-4xl font-bold  text-base-content">
            Account Management
          </h1>
          <p className="text-gray-400">
            View and manage your personal information, vehicles, and reservation
            history.
          </p>
        </header>
        <div className="flex flex-row items-start">
          <article className="text-base-content p-8 rounded-[0.5rem] bg-base-200 w-[757px] ">
            <h2 className="text-3xl font-bold text-base-content mb-4">
              Personal Information
            </h2>
            <form onSubmit={handleInfoSubmit}>
              <section className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <h4 className="text-sm text-base-content">Full name</h4>
                  <Input
                    name="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={handleFullNameChange}
                    type="text"
                    className="text-base-content bg-primary rounded-[0.25rem]"
                    required={false}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h4 className="text-sm text-base-content">Email Address</h4>
                  <Input
                    name="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={handleEmailChange}
                    type="text"
                    className="text-base-content bg-primary rounded-[0.25rem]"
                    required={false}
                  />
                </div>
                <div className="flex flex-col col-span-2 gap-y-2">
                  <h4 className="text-sm text-base-content">Phone Number</h4>
                  <Input
                    name="phone"
                    placeholder="123-456-789"
                    value={phone}
                    onChange={handlePhoneChange}
                    type="text"
                    className="w-full text-base-content bg-primary rounded-[0.25rem]"
                    required={false}
                  />
                </div>
                <div className="flex justify-end col-span-2">
                  <Button
                    type="submit"
                    className="text-base-content bg-accent rounded-sm  w-50 "
                    value="Update Information"
                  />
                </div>
              </section>
            </form>

            <h2 className="text-3xl font-bold text-base-content  mb-4">
              Change Password
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <section className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <h4 className="text-sm text-base-content">
                    Current Password
                  </h4>
                  <Input
                    name="currentPassword"
                    value={currentPassword}
                    onChange={handleCurrentPasswordChange}
                    type="password"
                    className="w-full text-base-content bg-primary rounded-[0.25rem]"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <h4 className="text-sm text-base-content">New Password</h4>
                  <Input
                    name="newPassword"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    type="password"
                    className="w-full text-base-content bg-primary rounded-[0.25rem]"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="flex flex-col col-span-2 gap-y-2">
                  <h4 className="text-sm text-base-content">
                    Confirm New Password
                  </h4>
                  <Input
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    type="password"
                    className="w-full text-base-content bg-primary rounded-[0.25rem]"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="flex justify-end col-span-2">
                  <Button
                    type="submit"
                    className="text-base-content bg-accent rounded-sm h-10 w-50 "
                    value="Change Password"
                  />
                </div>
              </section>
            </form>
            <h2 className="text-3xl font-bold text-base-content mb-4 ">
              Registered Vehicles
            </h2>
            <section className="grid grid-cols-2 gap-x-8 gap-y-4 overflow-auto max-h-[200px]">
              {vehicles.length === 0 ? (
                <div className="col-span-2 text-base-content">
                  No vehicles registered.
                </div>
              ) : (
                vehicles.map((vehicle, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20 "
                  >
                    <div className="flex flex-row items-center justify-between h-20 w-full px-4">
                      {editIdx === idx ? (
                        <div className="flex flex-row items-center w-full">
                          <Input
                            type="text"
                            name="editBrand"
                            value={editBrand}
                            onChange={(e) => setEditBrand(e.target.value)}
                            className="w-50% text-base-content bg-primary rounded-[0.25rem] mr-4"
                            placeholder="Brand"
                          />
                          <Input
                            type="text"
                            name="editRegistrationNumber"
                            value={editRegNum}
                            onChange={(e) => setEditRegNum(e.target.value)}
                            className="w-50% text-base-content bg-primary rounded-[0.25rem] mr-4"
                            placeholder="Registration"
                          />
                          <Button
                            type="button"
                            className="text-base-content bg-accent rounded-sm h-10 w-20 "
                            onClick={handleEditSave}
                            value="Save"
                          />

                          <Button
                            type="button"
                            className="text-base-content bg-gray-400 rounded-sm h-10 w-20 ml-2 "
                            onClick={handleEditCancel}
                            value="Cancel"
                          />
                        </div>
                      ) : (
                        <>
                          <span className="font-bold">{vehicle.brand}</span>
                          <span className="ml-4">
                            {vehicle.registration_number}
                          </span>
                          <div className="flex flex-row items-center">
                            <img
                              src="/pencil.png"
                              alt="edit"
                              className="w-6 h-6 mr-2 cursor-pointer"
                              onClick={() => handleEditClick(idx)}
                            />
                            <img
                              src="/bin.png"
                              alt="delete"
                              className="w-6 h-6 mr-6 cursor-pointer"
                              onClick={() =>
                                handleDeleteVehicle(vehicle.registration_number)
                              }
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div className="flex flex-col col-span-2 gap-y-2">
                <button
                  type="button"
                  className="border-2 border-dashed border-base-content rounded-[0.25rem] px-6 py-3 text-base-content flex items-center justify-center w-full"
                >
                  + Add New Vehicle
                </button>
              </div>
            </section>

            <h2 className="text-3xl font-bold  mb-4 mt-6 text-base-content">
              Manage Account
            </h2>
            <form onSubmit={handleDeleteAccount}>
              <section className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] h-20">
                  <div className="flex items-center justify-start col-span-2 h-20 ml-4">
                    <Button
                      type="submit"
                      className="text-base-content rounded-sm h-10 w-40 bg-red-600 pd-10"
                      value="Delete account"
                      hoverEffect={true}
                    />
                    <h4 className="text-sm m-5 text-base-content">
                      be aware that this action is permanent
                    </h4>
                  </div>
                </div>
              </section>
            </form>

            <section className="flex items-center justify-center col-span-2 h-20 ml-4">
              <Button
                type="button"
                className="text-base-content rounded-sm h-10 w-40 bg-red-600 pd-10"
                value="Logout"
                hoverEffect={true}
                onClick={() => {
                  logout();
                }}
              />
            </section>
          </article>
          <nav className="flex items-center justify-between  ml-5 ">
            <article className="overflow-y-auto text-base-content p-8 rounded-[0.5rem]  w-[362px] h-[800px] bg-base-200">
              <h2 className="text-3xl font-bold mb-6">Reservation History</h2>
              <section className="grid grid-cols-2 gap-x-8 gap-y-4 ">
                {reservations.length === 0 ? (
                  <div className="col-span-2 text-base-content">
                    No reservations found.
                  </div>
                ) : (
                  reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex flex-col col-span-2 gap-y-2 text-base-content bg-primary rounded-[0.25rem] w-[306px] h-[140px] p-4"
                    >
                      <div>
                        <span className="font-bold">
                          Reservation #{reservation.id}
                        </span>
                      </div>
                      <div>
                        <span>
                          Start:{" "}
                          {new Date(reservation.start_date).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span>
                          End: {new Date(reservation.end_date).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span>
                          User:{" "}
                          {reservation.user.username ||
                            reservation.user.email ||
                            "Unknown"}
                        </span>{" "}
                        | <span>Spot: {reservation.spot}</span>
                      </div>
                    </div>
                  ))
                )}

                <div className="flex justify-end col-span-2">
                  <Button
                    type="submit"
                    className=" text-base-content bg-accent rounded-sm h-10 w-50 "
                    value="View all History"
                  />
                </div>
              </section>
            </article>
          </nav>
        </div>
      </main>
    </PageTemplate>
  );
}
