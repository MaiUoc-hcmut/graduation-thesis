'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import courseApi from '@/app/api/courseApi'

export default function ListCourse() {
    const [courseList, setCourseList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const courses = await courseApi.getAll({})
                setCourseList(courses)
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }

        fetchData();
    }, []);
    const listCourseDisplay = courseList.map((course: object) => {
        return (
            <div key={course.id} className='bg-slate-50 p-3 rounded-lg'>
                <div className='flex'>
                    <div>
                        <Image
                            width={100}
                            height={100}
                            src={`${course.thumbnail}`}
                            alt="avatar"
                        />
                    </div>
                    <div className='flex flex-col mx-5'>
                        <div className=''>
                            <p className='font-medium text-lg text-[#0043a8]'>{course.name}</p>
                            <p className='font-medium'>Thầy Nguyễn Văn A</p>
                        </div>
                        <div className='mt-2'>
                            <Link href={`/course/${course.id}`}>
                                <button type="button" className="text-[#008a00] bg-white border border-[#008a00] focus:outline-none hover:bg-[#008a0096] font-medium rounded-xl text-sm px-5 py-2 mr-2 mb-2">Xem ngay</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className='mx-12 mt-10'>
            <div className="flex flex-row justify-between items-center mt-5">
                <form className="flex items-center flex-1">
                    <select id="countries" className="bg-gray-50 mr-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn lớp</option>
                        <option value="toán">Toán</option>
                    </select>
                    <select id="countries" className="bg-gray-50 mx-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn môn học</option>
                        <option value="toán">Toán</option>
                    </select>
                    <select id="countries" className="bg-gray-50 mx-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Chọn mức độ</option>
                        <option value="toán">Toán</option>
                    </select>

                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="w-full">
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm khóa học..." />
                    </div>
                    <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </form>


            </div>
            <div className='mt-10'>
                <div className='grid grid-cols-2 gap-4 gap-x-10'>
                    {listCourseDisplay}
                </div>
            </div>
        </div>
    )
}