'use client'
import React, { useEffect, useState, Fragment } from "react";
import { useAppSelector } from '@/redux/store';
import { redirect } from "next/navigation";
import ExamLayout from "@/components/teacher/Layout/Exam";

const Exam = () => {
    // const { isAuthTeacher } = useAppSelector(state => state.authReducer);

    // useEffect(() => {
    //     if (!isAuthTeacher) {
    //         redirect('/teacher/login');
    //     }
    // }, [isAuthTeacher, redirect]);

    return (
        <ExamLayout>
            <Fragment>

            </Fragment>
        </ExamLayout>
    )
}

export default Exam;