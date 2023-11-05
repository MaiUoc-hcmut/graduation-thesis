'use client'
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Loader from "@/components/teacher/common/Loader";

import ECommerce from "@/components/teacher/Dashboard/E-commerce";

import { useAppSelector } from "@/redux/store";

export default function TeacherLayout() {
    const [loading, setLoading] = useState<boolean>(true);

    const { isAuthTeacher } = useAppSelector(state => state.authReducer);

    useEffect(() => {
        if (!isAuthTeacher) {
            redirect('/teacher/login');
        }
    }, [isAuthTeacher, redirect]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <ECommerce />
    )
}