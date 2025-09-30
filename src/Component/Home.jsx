import React, { useState, useEffect } from "react";
import {
  Shield,
  Map,
  Users,
  AlertTriangle,
  Phone,
  Activity,
  HeartHandshake,
  Zap,
  Bell,
  CheckCircle,
  XCircle,
  Mail,
  Settings,
  Lock,
  MapPin,
  TrendingUp,
  UserCheck,
  Smartphone,
  Clock,
  Edit,
  ToggleRight,
  ClipboardList,
  Wifi,
  Truck,
  Plus,
} from "lucide-react";

// --- MOCK FIREBASE/AUTH SETUP (Required for Canvas Environment) ---
// Note: These globals are provided by the environment, but we define them here
// for clarity in the file's scope.
const MOCK_USER_ID = "mock-user-12345";
// @ts-ignore
const FIREBASE_CONFIG =
  typeof __firebase_config !== "undefined" ? JSON.parse(__firebase_config) : {};
// @ts-ignore
const APP_ID =
  typeof __app_id !== "undefined" ? __app_id : "default-safeguard-app";

// Mock Auth State & Firestore functions
const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Simulate Firebase Auth initialization
    console.log("Firebase/Auth Initializing...");

    // In a real app, you'd initialize Firebase here and sign in
    // const auth = getAuth(app);
    // signInWithCustomToken(auth, __initial_auth_token || '').catch(() => signInAnonymously(auth));

    setTimeout(() => {
      // Simulate successful sign-in
      setUserId(MOCK_USER_ID);
      setIsAuthReady(true);
      console.log(`Mock User ID: ${MOCK_USER_ID}`);
    }, 500);
  }, []);

  return { userId, isAuthReady };
};

// --- MOCK DATA ---

const FEATURE_CARDS = [
  {
    title: "Safe Routes",
    description: "Find well-lit, secure paths to your destination.",
    icon: Map,
    color: "text-purple-600", // Secondary: Purple
  },
  {
    title: "Guardians",
    description: "Manage your trusted emergency contacts.",
    icon: Users,
    color: "text-blue-600", // Primary: Deep Blue
  },
  {
    title: "Police Stations",
    description: "Locate nearest police stations and help centers.",
    icon: Shield,
    color: "text-green-600", // Success: Green
  },
  {
    title: "Helplines",
    description: "Quick access to emergency numbers.",
    icon: Phone,
    color: "text-orange-600", // Warning: Orange
  },
];

const SAFETY_TIPS = [
  {
    id: 1,
    text: "Always share your location with trusted contacts when traveling alone",
  },
  { id: 2, text: "Keep emergency contacts easily accessible" },
  {
    id: 3,
    text: "Trust your instincts - if something feels wrong, seek help immediately",
  },
  { id: 4, text: "Let someone know your ETA and travel method" },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    title: "Safe Arrival",
    location: "Downtown Mall",
    time: "2 hours ago",
    status: "resolved",
  },
  {
    id: 2,
    title: "Route Alert",
    location: "Park Avenue",
    time: "30 mins ago",
    status: "active",
  },
  {
    id: 3,
    title: "Check-in Missed",
    location: "Home Area",
    time: "1 hour ago",
    status: "new",
  },
];

// --- Utility Components ---

const StatusBadge = ({ status }) => {
  let colorClass = "";
  let text = "";

  switch (status) {
    case "resolved":
      colorClass = "bg-green-100 text-green-700";
      text = "Resolved";
      break;
    case "active":
      colorClass = "bg-red-100 text-red-700";
      text = "Active";
      break;
    case "new":
      colorClass = "bg-yellow-100 text-yellow-700";
      text = "New Alert";
      break;
    default:
      colorClass = "bg-gray-100 text-gray-700";
      text = "Unknown";
  }

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClass}`}
    >
      {text}
    </span>
  );
};

const FeatureCard = ({ title, description, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer border border-gray-100 hover:border-gray-200">
    <Icon
      className={`w-8 h-8 md:w-10 md:h-10 mb-3 ${color}`}
      strokeWidth={2.5}
    />
    <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

const ToggleSwitch = ({ label, checked, onChange, description }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex-1 mr-4">
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      onClick={onChange}
      className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        checked ? "bg-purple-600" : "bg-gray-200"
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      ></span>
    </button>
  </div>
);

// --- Page Components ---

const DashboardPage = ({ userId, activeTab, setActiveTab }) => {
  return (
    <div className="space-y-8">
      {/* 1. Emergency Alert Banner (Red/Pink Gradient - DC2626) */}
      <div
        className="relative p-6 md:p-8 rounded-2xl shadow-xl overflow-hidden cursor-pointer 
                         bg-gradient-to-r from-[#DC2626] to-pink-600 text-white 
                         hover:shadow-2xl transition-all duration-300"
        onClick={() => console.log("SOS Button Clicked!")} // Placeholder action
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-1">
              Emergency Alert
            </h2>
            <p className="text-lg md:text-xl font-medium opacity-90">
              Tap to immediately alert all your guardians
            </p>
          </div>
          <div className="p-4 md:p-6 bg-white bg-opacity-10 rounded-full border-2 border-white">
            <AlertTriangle
              className="w-8 h-8 md:w-10 md:h-10 text-white"
              fill="white"
            />
          </div>
        </div>
      </div>

      {/* 2. Feature Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {FEATURE_CARDS.map((card) => (
          <FeatureCard
            key={card.title}
            {...card}
            onClick={() => setActiveTab(card.title)}
          />
        ))}
      </div>

      {/* 3. Activity and Tips Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity (2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Your latest safety alerts and updates
          </p>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-gray-700">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.location}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <StatusBadge status={item.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips (1/3 width on desktop) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <HeartHandshake className="w-5 h-5 mr-2 text-purple-600" />
            Safety Tips
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Daily reminders to stay safe
          </p>
          <ul className="space-y-3">
            {SAFETY_TIPS.map((tip) => (
              <li
                key={tip.id}
                className="flex items-start text-sm text-gray-600"
              >
                <CheckCircle className="w-4 h-4 mt-1 mr-2 flex-shrink-0 text-green-500" />
                {tip.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const PoliceStationsPage = () => {
  const policeStations = [
    {
      name: "Downtown Police Station",
      status: "Open",
      distance: "0.8 km",
      rating: 4.8,
      services: ["Women's Help Desk", "Crime Reporting"],
      specials: ["Women Officers Available", "Safe Room", "24/7 Helpline"],
    },
    {
      name: "University District Police",
      status: "Open",
      distance: "1.2 km",
      rating: 4.6,
      services: ["Campus Security", "Emergency Response", "Student Safety"],
      specials: ["Campus Patrol", "Student Liaison Offices"],
    },
    {
      name: "Central Police Headquarters",
      status: "Open",
      distance: "2.5 km",
      rating: 4.9,
      services: ["All Services", "Detective Unit", "Cyber Crime"],
      specials: ["Full Service", "Specialized Units", "Command Center"],
    },
    {
      name: "Riverside Police Outpost",
      status: "Closed",
      distance: "3.5 km",
      rating: 4.4,
      services: ["Basic Services", "Community Policing"],
      specials: ["Community Programs"],
    },
  ];

  const emergencyServices = [
    {
      name: "Fire Department",
      icon: Truck,
      distance: "1.1 km",
      type: "Emergency",
    },
    {
      name: "Hospital Emergency",
      icon: ClipboardList,
      distance: "0.9 km",
      type: "Medical",
    },
    {
      name: "Women's Crisis Center",
      icon: HeartHandshake,
      distance: "1.8 km",
      type: "Support",
    },
  ];

  const ActionCard = ({
    title,
    description,
    icon: Icon,
    color,
    actionText,
  }) => (
    <div
      className={`p-5 rounded-xl shadow-md border ${color.border} ${color.bg}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <Icon className={`w-6 h-6 ${color.text} mb-1`} />
          <h3 className={`font-semibold ${color.text}`}>{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
        <button
          className={`text-xs px-3 py-1 rounded-full font-medium ${color.btnText} ${color.btnBg}`}
        >
          {actionText}
        </button>
      </div>
    </div>
  );

  const PoliceStationItem = ({ station }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            {station.name}
          </h4>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              station.status === "Open"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {station.status}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            {station.distance} away | {station.rating} ★
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Call
          </button>
          <span className="text-gray-300">|</span>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Directions
          </button>
        </div>
      </div>
      <div className="text-xs text-gray-500 mb-3">
        <p>
          Services Available:{" "}
          <span className="font-medium text-gray-700">
            {station.services.join(", ")}
          </span>
        </p>
        <p>
          Special Features:{" "}
          <span className="font-medium text-gray-700">
            {station.specials.join(", ")}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pt-3 border-t">
        <button className="text-xs font-medium px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Report Incident
        </button>
        <button className="text-xs font-medium px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
          Request Escort
        </button>
        <button className="text-xs font-medium px-3 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
          File Complaint
        </button>
      </div>
    </div>
  );

  const OtherServiceItem = ({ service }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
      <div className="flex items-center">
        <service.icon className="w-5 h-5 text-gray-600 mr-3" />
        <div>
          <h4 className="font-medium text-gray-800">{service.name}</h4>
          <p className="text-xs text-gray-500">{service.distance} away</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <span className="text-xs font-medium px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full">
          {service.type}
        </span>
        <button className="text-xs font-medium px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Call
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Police Stations & Emergency Services
      </h2>
      <p className="text-gray-500">
        Find the nearest help when you need it most.
      </p>

      <input
        type="text"
        placeholder="Search by location or service type"
        className="w-full p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["Near Me", "24/7 Only", "Women's Services"].map((tag) => (
          <button
            key={tag}
            className="flex-shrink-0 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionCard
          title="Emergency - Call 911"
          description="Immediate help for emergencies"
          icon={AlertTriangle}
          color={{
            text: "text-red-700",
            bg: "bg-red-50",
            border: "border-red-200",
            btnText: "text-white",
            btnBg: "bg-red-500",
          }}
          actionText="Call 911"
        />
        <ActionCard
          title="Women's Helpline"
          description="24/7 support and safety advice"
          icon={HeartHandshake}
          color={{
            text: "text-purple-700",
            bg: "bg-purple-50",
            border: "border-purple-200",
            btnText: "text-white",
            btnBg: "bg-purple-500",
          }}
          actionText="Call Helpline"
        />
        <ActionCard
          title="Share Location"
          description="Send your location to emergency services"
          icon={MapPin}
          color={{
            text: "text-blue-700",
            bg: "bg-blue-50",
            border: "border-blue-200",
            btnText: "text-white",
            btnBg: "bg-blue-500",
          }}
          actionText="Share Location"
        />
      </div>

      {/* Nearby Police Stations */}
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Nearby Police Stations
        </h3>
        {policeStations.map((station, index) => (
          <PoliceStationItem key={index} station={station} />
        ))}
      </div>

      {/* Other Emergency Services */}
      <div className="pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Phone className="w-5 h-5 mr-2 text-purple-600" />
          Other Emergency Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyServices.map((service, index) => (
            <OtherServiceItem key={index} service={service} />
          ))}
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          When to Contact Police:{" "}
          <span className="underline cursor-pointer hover:text-blue-600">
            Know how and when to seek help
          </span>
        </p>
      </div>
    </div>
  );
};

const ProfileSettingsPage = () => {
  const [settings, setSettings] = useState({
    locationSharing: true,
    autoCheckIn: false,
    routeSharing: true,
    anonymousReports: true,
    emergencyAlerts: true,
    routeUpdates: true,
    guardianNotifications: true,
    communityAlerts: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ProfileStat = ({ value, label, icon: Icon, color }) => (
    <div className="text-center p-3 rounded-xl border border-gray-200 shadow-sm">
      <Icon className={`w-6 h-6 mx-auto mb-1 ${color}`} />
      <p className="text-xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );

  const SystemStatusItem = ({ icon: Icon, label, statusText, statusColor }) => (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
      <Icon className={`w-5 h-5 mr-3 ${statusColor}`} />
      <div className="flex-1">
        <p className="font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-500">{statusText}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Profile & Settings</h2>
      <p className="text-gray-500">
        Manage your account and safety preferences
      </p>

      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-purple-200 text-purple-800 text-2xl font-bold rounded-full flex items-center justify-center mr-4">
              JM
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                Jessica Martinez
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Mail className="w-4 h-4 mr-1" /> jessicamartinez@email.com
              </p>
              <p className="text-sm text-gray-500 flex items-center">
                <Smartphone className="w-4 h-4 mr-1" /> +1 (555) 234-5678
              </p>
              <p className="text-xs text-gray-400 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> Downtown Area, City
              </p>
            </div>
          </div>
          <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            <Edit className="w-4 h-4 mr-1" /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <ProfileStat
            value={3}
            label="Guardians"
            icon={Users}
            color="text-blue-600"
          />
          <ProfileStat
            value={127}
            label="Safe Trips"
            icon={Map}
            color="text-green-600"
          />
          <ProfileStat
            value={2}
            label="Alerts Sent"
            icon={AlertTriangle}
            color="text-red-600"
          />
        </div>
      </div>

      {/* Safety Status */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 flex items-center">
          <UserCheck className="w-5 h-5 mr-2 text-green-600" /> Safety Status:{" "}
          <span className="ml-2 text-green-600 font-bold">
            All Systems Active
          </span>
        </h3>
        <p className="text-sm text-gray-500">
          Your safety network is fully operational and secure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SystemStatusItem
            icon={Shield}
            label="Guardian Network"
            statusText="Active & Monitoring"
            statusColor="text-blue-600"
          />
          <SystemStatusItem
            icon={MapPin}
            label="Location Services"
            statusText="Enabled & Accurate"
            statusColor="text-purple-600"
          />
          <SystemStatusItem
            icon={AlertTriangle}
            label="Emergency Alerts"
            statusText="Ready & Configured"
            statusColor="text-red-600"
          />
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-purple-600" /> Privacy Settings
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Control how your data is used and shared
        </p>
        <ToggleSwitch
          label="Location Sharing"
          description="Allow guardians to see your real-time location"
          checked={settings.locationSharing}
          onChange={() => handleToggle("locationSharing")}
        />
        <ToggleSwitch
          label="Auto Check-ins"
          description="Automatic safety check-ins during late hours"
          checked={settings.autoCheckIn}
          onChange={() => handleToggle("autoCheckIn")}
        />
        <ToggleSwitch
          label="Route Sharing"
          description="Share your planned routes with guardians"
          checked={settings.routeSharing}
          onChange={() => handleToggle("routeSharing")}
        />
        <ToggleSwitch
          label="Anonymous Safety Reports"
          description="Contribute to community safety data anonymously"
          checked={settings.anonymousReports}
          onChange={() => handleToggle("anonymousReports")}
        />
      </div>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" /> Notification
          Preferences
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Choose what alerts you want to receive
        </p>
        <ToggleSwitch
          label="Emergency Alerts"
          description="Critical safety notifications"
          checked={settings.emergencyAlerts}
          onChange={() => handleToggle("emergencyAlerts")}
        />
        <ToggleSwitch
          label="Route Updates"
          description="Safety updates on your planned routes"
          checked={settings.routeUpdates}
          onChange={() => handleToggle("routeUpdates")}
        />
        <ToggleSwitch
          label="Guardian Notifications"
          description="Updates from your guardian network"
          checked={settings.guardianNotifications}
          onChange={() => handleToggle("guardianNotifications")}
        />
        <ToggleSwitch
          label="Community Alerts"
          description="Local safety updates and warnings"
          checked={settings.communityAlerts}
          onChange={() => handleToggle("communityAlerts")}
        />
      </div>

      {/* Account Security */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2 text-orange-600" /> Account Security
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Manage your account security settings
        </p>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">Change Password</p>
            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Change
          </button>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-800">
              Two-Factor Authentication
            </p>
            <p className="text-sm text-gray-500">
              Add an extra layer of security
            </p>
          </div>
          <button className="text-sm font-medium text-green-600 hover:text-green-800">
            Enable
          </button>
        </div>

        <div className="flex justify-between items-center py-2">
          <div>
            <p className="font-medium text-gray-800">Emergency PIN</p>
            <p className="text-sm text-gray-500">
              Set a PIN for quick emergency access
            </p>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
            Set PIN
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App = () => {
  const { userId, isAuthReady } = useAuth();
  const [activeTab, setActiveTab] = useState("Dashboard"); // Initial tab is Dashboard

  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse text-xl font-semibold text-blue-700">
          Loading SafeGuard...
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <DashboardPage
            userId={userId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      case "Police Stations":
        return <PoliceStationsPage />;
      case "Profile":
        return <ProfileSettingsPage />;
      // Fallback placeholders for other pages
      case "Safe Routes":
      case "Guardians":
      default:
        return (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <Zap className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab} Page
            </h2>
            <p className="text-gray-500 mt-2">
              This area is reserved for future development in your hackathon
              plan. You can start building the features for the **{activeTab}**
              section next!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-purple-700 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">SafeGuard</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-1">
            {[
              "Dashboard",
              "Safe Routes",
              "Guardians",
              "Police Stations",
              "Profile",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  activeTab === item
                    ? "bg-blue-800 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700" />
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {userId ? userId.substring(0, 1).toUpperCase() : "S"}
            </div>
            {/* Mock User ID Display for Collaboration */}
            <div className="hidden md:block text-xs text-gray-400">
              <span className="font-medium text-gray-600">User:</span> {userId}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Navigation (Condensed) */}
        <nav className="sm:hidden mb-6">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {[
              "Dashboard",
              "Safe Routes",
              "Guardians",
              "Police Stations",
              "Profile",
            ].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </nav>

        {renderPage()}
      </main>
    </div>
  );
};

export default App;
