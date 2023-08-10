import { Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const LazyLogin = lazy(() => import('./pages/Login/Login'));
const LazyProfile = lazy(() => import('./pages/Profile/Profile'));
const LazyProjectPage = lazy(() => import('./pages/Project/ProjectPage'));
const LazyDocumentPage = lazy(() => import('./pages/Document/DocumentPage'));
const LazyEditProfile = lazy(() => import('./pages/Profile/EditProfile'));
const LazyFeed = lazy(() => import('./pages/Feed/Feed'));
const LazyRegister = lazy(() => import('./pages/Register/Register'));

export const AuthenticatedRoutes = [
  <Route key="/" path="/" element={<LazyFeed />} />,
  <Route key="/login" path="/login" element={<LazyLogin />} />,
  <Route key="/register" path="/register" element={<LazyRegister />} />,
  <Route key="/profile/:id" path="/profile/:id" element={<LazyProfile />} />,
  <Route
    key="/profile/edit"
    path="/profile/edit"
    element={<LazyEditProfile />}
  />,
  <Route
    key="/projects/project/:id"
    path="/projects/project/:id"
    element={<LazyProjectPage />}
  />,
  <Route
    key="/document/:id"
    path="/document/:id"
    element={<LazyDocumentPage />}
  />,
];

export const UnauthenticatedRoutes = [
  <Route key="/" path="/" element={<LazyFeed />} />,
  <Route key="/login" path="/login" element={<LazyLogin />} />,
  <Route key="/register" path="/register" element={<LazyRegister />} />,
];
