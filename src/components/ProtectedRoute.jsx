import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children, adminOnly=false}) {
    const user = useSelector((state) => state.user.user);
    console.log("user from protected route", user);
    
    if(user == null){
        return <Navigate to="/login"/>;
    }
    if(adminOnly && user.role !== "admin"){
        return <Navigate to="/"/>
    }
    return children;
}
