import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Layout from './Layout/layout';
import PianoCardHolder from './Pages/pianoCardHolder';
import Intervals from './Pages/Intervals';
import Scales from './Pages/Scales';
import Chords from './Pages/Chords';
import Theory from './Pages/Theory';
import RhythmQuiz from './Pages/RhythmQuiz';
import About from './Pages/About';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './Pages/Login';
import Register from './Pages/Register';
import NotFound from './Pages/NotFound';
import CardWrapper from './components/CardWrapper'; // Import CardWrapper
import UserProfile from './Pages/UserProfile'; // Import the UserProfile component

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <ProtectedRoute>
              <CardWrapper>
                <HomePage />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/absolute-pitch" element={
            <ProtectedRoute>
              <CardWrapper>
                <PianoCardHolder />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/ear-training" element={
            <ProtectedRoute>
              <CardWrapper>
                <Intervals />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/scale-exercises" element={
            <ProtectedRoute>
              <CardWrapper>
                <Scales />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/chord-recognition" element={
            <ProtectedRoute>
              <CardWrapper>
                <Chords />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/theory" element={
            <ProtectedRoute>
              <CardWrapper>
                <Theory />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/rhythm-practice" element={
            <ProtectedRoute>
              <CardWrapper>
                <RhythmQuiz />
              </CardWrapper>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <CardWrapper>
                <About />
              </CardWrapper>
            </ProtectedRoute>
          } />

          {/* Add the UserProfile route */}
          <Route path="/user-profile" element={
            <ProtectedRoute>
              <CardWrapper>
                <UserProfile />  {/* UserProfile component */}
              </CardWrapper>
            </ProtectedRoute>
          } />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
