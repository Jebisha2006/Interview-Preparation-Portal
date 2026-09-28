import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Test from "./pages/Test";
import JavaTest from "./pages/JavaTest";
import DBMSTest from "./pages/DBMSTest";
import AptitudeTest from "./pages/AptitudeTest";
import OperatingSystemTest from "./pages/OperatingSystemTest";
import ComputerNetworksTest from "./pages/ComputerNetworksTest";
import Result from "./pages/Result";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import DSATest from "./pages/DSATest";
import ReactTest from "./pages/ReactTest";
import SQLTest from "./pages/SQLTest";
import DjangoTest from "./pages/DjangoTest";
import WebTest from "./pages/WebTest";
import HRTest from "./pages/HRTest";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        <Route
          path="/python-test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />

        <Route
          path="/java-test"
          element={
            <ProtectedRoute>
              <JavaTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dbms-test"
          element={
            <ProtectedRoute>
              <DBMSTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aptitude-test"
          element={
            <ProtectedRoute>
              <AptitudeTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/os-test"
          element={
            <ProtectedRoute>
              <OperatingSystemTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cn-test"
          element={
            <ProtectedRoute>
              <ComputerNetworksTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/dsa-test"
  element={
    <ProtectedRoute>
      <DSATest />
    </ProtectedRoute>
  }
/>

<Route
  path="/react-test"
  element={
    <ProtectedRoute>
      <ReactTest />
    </ProtectedRoute>
  }
/>

<Route
  path="/sql-test"
  element={
    <ProtectedRoute>
      <SQLTest />
    </ProtectedRoute>
  }
/>

<Route
  path="/django-test"
  element={
    <ProtectedRoute>
      <DjangoTest />
    </ProtectedRoute>
  }
/>

<Route
  path="/web-test"
  element={
    <ProtectedRoute>
      <WebTest />
    </ProtectedRoute>
  }
/>

<Route
  path="/hr-test"
  element={
    <ProtectedRoute>
      <HRTest />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;