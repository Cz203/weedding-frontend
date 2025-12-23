import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/LandingPage";
import Studio from "./pages/Studio";
import Contact from "./pages/Contact";
import Album from "./pages/Album";
import Dresses from "./pages/Dresses";
import Suits from "./pages/Suits";
import DressManagement from "./pages/admin/DressManagement";
import VestManagement from "./pages/admin/VestManagement";
import AlbumManagement from "./pages/admin/AlbumManagement";
import ContactManagement from "./pages/admin/ContactManagement";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Toaster position="top-right" />
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route index path="/" element={<LandingPage />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/album" element={<Album />} />
          <Route path="/dresses" element={<Dresses />} />
          <Route path="/suits" element={<Suits />} />
          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Dashboard Layout - Protected */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Home />} />

            {/* Admin Management */}
            <Route path="/admin/dresses" element={<DressManagement />} />
            <Route path="/admin/vests" element={<VestManagement />} />
            <Route path="/admin/albums" element={<AlbumManagement />} />
            <Route path="/admin/contacts" element={<ContactManagement />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
