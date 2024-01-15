'use client'
import { useState, useEffect } from "react";
import Loader from "@/components/teacher/common/Loader";
import ECommerce from "@/components/teacher/Dashboard/E-commerce";
import { useAppSelector } from "@/redux/store";
import { redirect } from "next/navigation";

export default function TeacherLayout() {
    const [loading, setLoading] = useState<boolean>(true);

    const { isAuthTeacher } = useAppSelector(state => state.authReducer);

    useEffect(() => {
        if (!isAuthTeacher) {
            redirect('/teacher/login');
        }
    }, [isAuthTeacher, redirect]);

    return (
        <ECommerce />
    )
}