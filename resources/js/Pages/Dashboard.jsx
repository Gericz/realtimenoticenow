import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Welcome" />

            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-3xl p-10">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 text-center">
                        Welcome back, {auth.user.name}! 🎉
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 text-center">
                        Manage your appointments with ease. View, schedule, and track all your schedules in one place.
                    </p>

                    {/* ✅ Centered Buttons */}
                    <div className="flex justify-center flex-col sm:flex-row gap-4 mb-10">
                        <Link
                            href="/appointments"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow text-center"
                        >
                            📋 View Appointments
                        </Link>
                        <Link
                            href="/appointments/create"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow text-center"
                        >
                            ➕ Schedule New Appointment
                        </Link>
                    </div>

                    {/* ✅ Centered Stats */}
                    <div className="flex justify-center items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="w-full max-w-xs bg-white border border-yellow-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                                <h2 className="text-3xl font-bold text-yellow-500">5</h2>
                                <p className="text-gray-700 mt-2">Pending Appointments</p>
                            </div>
                            <div className="w-full max-w-xs bg-white border border-green-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition">
                                <h2 className="text-3xl font-bold text-green-600">8</h2>
                                <p className="text-gray-700 mt-2">Accepted Appointments</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
