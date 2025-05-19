// import React, { useState } from 'react';
// import { LogIn, Eye, EyeOff, Mail, Lock, UserPlus, Phone, UserCheck } from "lucide-react";
// import './Login.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import io, { Socket } from "socket.io-client";

// let socket: Socket;

// const Signup: React.FC = () => {
//   const [username, setUsername] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [mobileNumber, setMobileNumber] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowPConfirmpassword] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [userRole, setUserRole] = useState<string >();

//   const navigate = useNavigate(); 
//   const socketUrl = "http://localhost:3000";


//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (password !== confirmPassword) {
//       setError("Passwords don't match.");
//       return;
//     }

//     try {
//       const res = await axios.post('http://localhost:3000/api/signup', {
//         username,
//         email,
//         mobileNumber,
//         password,
//       });
//       if(userRole === '2'){
//         const id = 1;
//         const response = await axios.get(
//           `http://localhost:3000/api/adminNumber/${id}`
//         );
//         localStorage.setItem("adminMobileNumber", response.data.mobileNumber)
//         const adminMobile = localStorage.getItem("adminMobileNumber")
//       const  roomname = `${adminMobile}_${mobileNumber}`

//       if (res.data.signup) {
//         socket = io(socketUrl);
//         socket.emit(
//           "join",
//           {
//             roomname,
//             senderMobileNumber: adminMobile,
//             receiverMobileNumber: mobileNumber,
//           },
//           (err: string) => {
//             if (err) {
//               console.log(err);
//             }
//           }
//         );
//       }
//     }      
//     navigate('/login'); 
//     alert(res.data.message);
//     } catch (error: any) {
//       if (error.response && error.response.data && error.response.data.message) {
//         setError(error.response.data.message);
//       } else {
//         setError("Error creating account. Please try again.");
//       }
//     }
//   };

//   return (
//     <motion.div 
//       className="login-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <motion.div 
//         className="login-card"
//         initial={{ y: 30, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="login-header">
//           <UserPlus className="w-16 h-16 mx-auto text-white" data-testid="title-icon" />
//           <h2 className="login-title">Create Account</h2>
//           <p className="login-subtitle">Sign up for a new account</p>
//         </div>
//         <motion.form 
//           onSubmit={handleSignup} 
//           data-testid="form-test"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div 
//             className="input-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Mail className="input-icon" data-testid="username-icon" />
//             <input
//               type="text"
//               className="input-field"
//               placeholder="Enter the Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </motion.div>
//           <motion.div 
//             className="input-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Mail className="input-icon" data-testid="mail-icon" />
//             <input
//               type="email"
//               className="input-field"
//               placeholder="Enter the Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </motion.div>
//           <motion.div 
//             className="input-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Phone className="input-icon" data-testid="mail-icon" />
//             <input
//               type="Text"
//               className="input-field"
//               placeholder="Enter the Mobile Number"
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//               required
//             />
//           </motion.div>
//           <motion.div 
//             className="input-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Lock className="input-icon" data-testid="password-icon" />
//             <input
//               type={showPassword ? "text" : "password"}
//               className="input-field"
//               placeholder="Enter the Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               className="password-toggle"
//               data-testid="password-toggle-icon"
//               onClick={() => setShowPassword(!showPassword)}
//               tabIndex={-1} 
//               aria-label={showPassword ? "Hide password" : "Show password"} 
//             >
//               {showPassword ? <EyeOff /> : <Eye />}
//             </button>
//           </motion.div>
//           <motion.div 
//             className="input-group"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Lock className="input-icon" data-testid="con-password-icon"/>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               className="input-field"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               className="password-toggle"
//               data-testid="con-toggle-icon"
//               onClick={() => setShowPConfirmpassword(!showConfirmPassword)}
//               tabIndex={-1} 
//               aria-label={showConfirmPassword ? "Hide password" : "Show password"} 
//             >
//               {showConfirmPassword ? <EyeOff /> : <Eye />}
//             </button>
//           </motion.div>
//           <motion.div
//               className="input-group"
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.8, duration: 0.2 }}
//             >
//                <UserCheck className="input-icon" data-testid="password-icon" />
//               <select
//                 className="input-field"
//                 id="userRole"
//                 value={userRole}
//                 onChange={(e) => setUserRole(e.target.value)}
//                 required
//               >
//                 <option value="">Select Role</option>
//                 <option value="1">Admin</option>
//                 <option value="2">Customer</option>
//               </select>
//             </motion.div>
//           {error && <p className="error-message">{error}</p>}
//           <motion.button 
//             type="submit" 
//             className="submit-button" 
//             data-testid="signup-btn"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <LogIn data-testid="Signup-icon"/>Sign up
//           </motion.button>
//           <p style={{ color: "white", textDecoration: "none", fontWeight: "lighter", fontSize: "13px" }}>
//             You have an Account? <a style={{fontSize:"14px",fontWeight:"bold", color:"DodgerBlue", textDecoration: "underline DodgerBlue" }} href="/login"> Click here</a> to Log In
//           </p>
//         </motion.form>
//         <div className="divider">
//           <span className="divider-text">Or continue with</span>
//         </div>
//         <div className="social-buttons">
//           <motion.button 
//             className="social-button" 
//             data-testid="google-btn"
//             whileHover={{ scale: 1.05 }}
//           >
//             Google Account
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Mail, Lock, UserPlus, Phone, UserCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import io, { Socket } from "socket.io-client";

let socket: Socket;
const socketUrl = "http://localhost:3000";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${socketUrl}/api/signup`, {
        username,
        email,
        mobileNumber,
        password,
      });

      if (userRole === '2') {
        const response = await axios.get(`${socketUrl}/api/adminNumber/1`);
        const adminMobile = response.data.mobileNumber;
        const roomname = `${adminMobile}_${mobileNumber}`;
        
        if (res.data.signup) {
          socket = io(socketUrl);
          socket.emit(
            "join",
            {
              roomname,
              senderMobileNumber: adminMobile,
              receiverMobileNumber: mobileNumber,
            },
            (err: string) => {
              if (err) console.log(err);
            }
          );
        }
      }

      alert(res.data.message);
      navigate("/login");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error signing up. Please try again.");
      }
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#022644] to-[#806702] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="text-center mb-6">
          {/* <UserPlus className="w-12 h-12 text-white mx-auto" /> */}
          <h2 className="text-white text-2xl font-bold mt-2">Create Account</h2>
          <p className="text-gray-300 text-sm">Sign up for a new account</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Username */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full pl-10 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full pl-10 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Enter Mobile Number"
              className="w-full pl-10 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full pl-10 pr-10 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-black"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-2 rounded-md bg-white/20 text-white placeholder-gray-300 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-black"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* User Role */}
          <div className="relative">
            <UserCheck className="absolute left-3 top-3 text-gray-900" />
            <select
              className="w-full pl-10 py-2 rounded-md bg-white/20 text-white outline-none"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Customer</option>
            </select>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md flex justify-center items-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Sign up
          </motion.button>

          <p className="text-white text-sm text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 underline">
              Login here
            </a>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
