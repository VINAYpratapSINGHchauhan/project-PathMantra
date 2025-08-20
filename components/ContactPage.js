'use client';
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { db } from '@/lib/firebase';
import { doc, addDoc, collection } from 'firebase/firestore';


export default function ContactPage() {
    const [QueryForm, setQueryForm] = useState({ name: "", email: "", query: "" })
    const handlechange = (e) => {
        setQueryForm({ ...QueryForm, [e.target.id]: e.target.value })
    }
    const createQuery = async (data) => {

        await addDoc(collection(db, "queries"), {
            name: data.name,
            email: data.email,
            query: data.query,
            createdAt: new Date()
        });
    }
    const handlesubmit = async (e) => {
        e.preventDefault();

        if (!QueryForm.name.trim() || !QueryForm.email.trim() || !QueryForm.query.trim()) {
            toast.error("Please fill all fields before submitting!");
            return;
        }

        try {
            await createQuery(QueryForm);
            toast.success(
                <div>
                    <strong>Query Submitted!</strong>
                    <div>We will solve it soon</div>
                </div>
                );
        } catch (error) {
            console.error("Error saving query: ", error);
            toast.error("Something went wrong. Please try again.");
        }
        setQueryForm({ name: "", email: "", query: "" }); 
    }
    return (
        <div className="max-w-5xl mx-auto px-6 py-12 ">
            <h1 className="text-5xl font-extrabold text-center mb-6">Contact Us</h1>
            <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
                Have questions, feedback, or just want to say hello? We’d love to hear from you! Use the form below to write your query or reach us directly through our contact info.
            </p>

            <div className="bg-gray-100 border border-gray-700 rounded-xl shadow-lg p-8 md:p-10 grid md:grid-cols-2 gap-10">
                {/* Contact Form */}
                <form className="space-y-6 " onSubmit={handlesubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={QueryForm.name}
                            onChange={handlechange}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your Name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={QueryForm.email}
                            onChange={handlechange}
                            className="w-full px-4 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="query" className="block text-sm font-medium mb-1">
                            Write your query
                        </label>
                        <textarea
                            id="query"
                            rows="5"
                            value={QueryForm.query}
                            onChange={handlechange}
                            className="w-full px-4 py-2 rounded-md  border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Write your query here..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold transition"
                    >
                        Send Message
                    </button>
                </form>

                {/* Contact Info */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">📞 Reach Us</h2>
                        <div className="pl-6 text-sm mt-5">
                            <p className="text-gray-500">Email: <a href="mailto:binnu4321vinay@gmail.com" className="text-gray-700">binnu4321vinay@gmail.com</a></p>
                            <p className="text-gray-500">Phone: <a href="tel:+919958234205" className="text-gray-700">+91 99582 34205</a></p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">🏢 Office</h2>
                        <div className=" pl-6 text-sm mt-5">
                            <p className="text-gray-500">vikas kunj, Uttam nagar east</p>
                            <p className="text-gray-500">Delhi, India – 110059</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">🔗 Follow Us</h2>
                        <div className="flex flex-col gap-2 mt-5 md:flex-row">
                            <div className="flex flex-col gap-2 pl-6 text-sm  text-gray-500">
                                <a href="https://project-path-mantra.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">Website</a>
                                <a href="http://www.linkedin.com/in/vinay-pratap-singh-chauhan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">LinkedIn</a>
                            </div>
                            <div className="flex flex-col gap-2 pl-6 text-sm  text-gray-500">
                                <a href="https://github.com/VINAYpratapSINGHchauhan" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">GitHub</a>
                                <a href="https://x.com/vinaychauhan214" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">X</a>
                            </div>
                        </div>

                    </div>
                </div>

            </div>


        </div>
    );
}