'use client'
import { useParams } from 'next/navigation';
import { useState, Fragment } from 'react';
import ExamLayout from '@/components/teacher/Layout/Exam';

const DetailExam = () => {
    const params = useParams();
    const id = params.id;

    return (
        <ExamLayout>
            <Fragment>

            </Fragment>
        </ExamLayout>
    );
}

export default DetailExam;