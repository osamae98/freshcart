"use client";

import { useAppSelector } from "@/store/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { 
    personalInfoSchema, 
    passwordSchema, 
    PersonalInfoValues, 
    PasswordFormValues 
} from "../schemas/profile.schema";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AccountDetailsScreen() {
    const { userInfo } = useAppSelector((state) => state.auth);
    const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

    // Personal Info Form
    const {
        register: registerInfo,
        handleSubmit: handleSubmitInfo,
        formState: { errors: infoErrors },
    } = useForm<PersonalInfoValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            firstName: userInfo?.name.split(" ")[0] || "",
            lastName: userInfo?.name.split(" ").slice(1).join(" ") || "",
            email: userInfo?.email || "",
            phone: "",
            dateOfBirth: "",
        }
    });

    // Password Form
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: passwordErrors },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    });

    const onInfoSubmit = async (data: PersonalInfoValues) => {
        setIsUpdatingInfo(true);
        console.log("Updating info:", data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Profile information updated successfully!");
        setIsUpdatingInfo(false);
    };

    const onPasswordSubmit = async (data: PasswordFormValues) => {
        setIsUpdatingPassword(true);
        console.log("Updating password:", data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Password updated successfully!");
        setIsUpdatingPassword(false);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Account Details</h1>

                {/* Profile Picture Section */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Profile Picture</h2>
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md relative">
                                <Image 
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" 
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-primary-700 transition-colors">
                                <FontAwesomeIcon icon={faCamera} size="xs" />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500">Upload a new profile picture</p>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                                    Upload New
                                </button>
                                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
                                    Remove
                                </button>
                            </div>
                            <p className="text-xs text-gray-400">JPG, PNG. Max size 2MB</p>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-100 mb-12" />

                {/* Personal Information Form */}
                <section className="mb-12">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Personal Information</h2>
                    <form onSubmit={handleSubmitInfo(onInfoSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">First Name</label>
                                <input 
                                    {...registerInfo("firstName")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    placeholder="Enter first name"
                                />
                                {infoErrors.firstName && <p className="text-xs text-red-500">{infoErrors.firstName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                <input 
                                    {...registerInfo("lastName")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    placeholder="Enter last name"
                                />
                                {infoErrors.lastName && <p className="text-xs text-red-500">{infoErrors.lastName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input 
                                    {...registerInfo("email")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    placeholder="Enter email address"
                                />
                                {infoErrors.email && <p className="text-xs text-red-500">{infoErrors.email.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                <input 
                                    {...registerInfo("phone")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                    placeholder="+1 (555) 000-0000"
                                />
                                {infoErrors.phone && <p className="text-xs text-red-500">{infoErrors.phone.message}</p>}
                            </div>
                            <div className="space-y-2 md:col-span-1">
                                <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                                <input 
                                    type="date"
                                    {...registerInfo("dateOfBirth")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                />
                                {infoErrors.dateOfBirth && <p className="text-xs text-red-500">{infoErrors.dateOfBirth.message}</p>}
                            </div>
                        </div>
                        <button 
                            type="submit"
                            disabled={isUpdatingInfo}
                            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-70"
                        >
                            {isUpdatingInfo ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : null}
                            Save Changes
                        </button>
                    </form>
                </section>

                <hr className="border-gray-100 mb-12" />

                {/* Change Password Form */}
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Change Password</h2>
                    <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-6">
                        <div className="space-y-2 max-w-md">
                            <label className="text-sm font-semibold text-gray-700">Current Password</label>
                            <div className="relative">
                                <input 
                                    type="password"
                                    {...registerPassword("currentPassword")}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 pr-12"
                                    placeholder="••••••••"
                                />
                                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FontAwesomeIcon icon={faEye} size="sm" />
                                </button>
                            </div>
                            {passwordErrors.currentPassword && <p className="text-xs text-red-500">{passwordErrors.currentPassword.message}</p>}
                        </div>
                        <div className="space-y-2 max-w-md">
                            <label className="text-sm font-semibold text-gray-700">New Password</label>
                            <input 
                                type="password"
                                {...registerPassword("newPassword")}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
                                placeholder="••••••••"
                            />
                            {passwordErrors.newPassword && <p className="text-xs text-red-500">{passwordErrors.newPassword.message}</p>}
                        </div>
                        <button 
                            type="submit"
                            disabled={isUpdatingPassword}
                            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors disabled:opacity-70"
                        >
                            {isUpdatingPassword ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : null}
                            Update Password
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
