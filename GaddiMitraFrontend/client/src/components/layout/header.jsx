import { useState  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import SignUpModal from "../../pages/SignUpModal.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import { Bell, User, LogOut, Settings, Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select.jsx";
import LoginModal from "../../pages/LoginModal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Header() {
  const { user, isAuthenticated,logout } = useAuth();
  console.log(user);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const navigate = useNavigate();
  

  const { data: notifications } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: isAuthenticated,
  });

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  const navigation = [
    { name: "Browse Cars", to: "/cars" },
    { name: "Service Centers", to: "/servicecenters" },
    ...(isAuthenticated
      ? [
          { name: "Dashboard", to: "/dashboard" },
          { name: "Home", to: "/home" },
        ]
      : []),
  ];

  const handleLogout = () => {
    navigate("/");
    logout();
    
    // setMobileMenuOpen(false);
    // alert("Logged out successfully.");
  };


  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-orange-600 text-white px-3 py-1 rounded-lg font-bold">GAADDI</div>
            <span className="font-semibold text-xl">Mitra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-gray-700 hover:text-orange-600 font-medium transition-colors ${
                  location.pathname === item.to ? "text-orange-600" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl} alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name || "User"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a onClick={() => handleLogout()}className="w-full">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => setShowLogin(true)}>
                  Login
                </Button>

                <Select onValueChange={(value) => setSelectedRole(value)}>
                  <SelectTrigger className="w-[120px] focus:ring-0 focus:ring-gray-300">
                    <SelectValue placeholder="Sign Up As" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer">Customer</SelectItem>
                    <SelectItem value="Dealer">Dealer</SelectItem>
                    <SelectItem value="ServiceCenter">Service Center</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  disabled={!selectedRole}
                  onClick={() => setShowSignUp(true)}
                  className="bg-orange-600 text-white hover:bg-black"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Login Modal */}
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

            {/* Sign Up Modal */}
            <SignUpModal
              isOpen={showSignUp}
              onClose={() => setShowSignUp(false)}
              role={selectedRole}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-gray-700 hover:text-orange-600 font-medium transition-colors ${
                    location.pathname === item.to ? "text-orange-600" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button variant="ghost" onClick={() => setShowLogin(true)}>
                    Login
                  </Button>

                  <Select onValueChange={(value) => setSelectedRole(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sign Up As" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Customer">Customer</SelectItem>
                      <SelectItem value="Dealer">Dealer</SelectItem>
                      <SelectItem value="ServiceCenter">Service Center</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    disabled={!selectedRole}
                    onClick={() => {
                      setShowSignUp(true);
                      setMobileMenuOpen(false);
                    }}
                    className="bg-orange-600 text-white w-full"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
