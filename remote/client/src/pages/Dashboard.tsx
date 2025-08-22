// src/pages/Dashboard.tsx
import { useState } from "react";
import TabBar from "../components/TabBar";
import LoginModal from "../components/LoginModal";
import { getStoredAuth, logout } from "../services/authService";

import HostList from "./HostList";
import StarCat from "./StarCats"
import SearchBranch from "./SearchBranch";

function Dashboard() {
    const stored = getStoredAuth();
    const [token, setToken] = useState<string | null>(stored?.authToken || null);
    const [username, setUsername] = useState<string | null>(stored?.username || null);
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        setToken(null);
        setUsername(null);
    };

    const [activeTab, setActiveTab] = useState("hostlist");

    const renderTabContent = () => {
        console.log(`token is ${token}`);
        switch (activeTab) {
            case "hostlist":
                return <HostList username={username} token={token} />;
            case "starcat":
                return <StarCat username={username} token={token} />;
            case "searchbranch":
                return <SearchBranch username={username} token={token} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">My Dashboard</h1>
                <div className="flex items-center space-x-2">

                    {/* Display Username and Logout button if Logged In */}
                    {token && username ? (
                        <>
                            <span className="text-green-600 font-medium">👤 {username}</span>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* ##############   TabBar and Tab Content  #################*/}
            <div className="mt-6">
                <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
                <div className="mt-4">
                    {renderTabContent()}
                </div>
            </div>

            {showModal && (
                <LoginModal
                    onClose={() => setShowModal(false)}
                    onLoginSuccess={(token, username) => {
                        setToken(token);
                        setUsername(username);
                    }}
                />
            )}
        </div>
    );
}

export default Dashboard;
