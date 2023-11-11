'use client'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'


export default function DetailExam({ params }: { params: { slug: string } }) {
    const [formData, setFormData] = useState({})
    function handlerInput(id_question: string, answer: string) {
        setFormData({ ...formData, [id_question]: answer })
    }
    console.log(formData);

    return (
        <div>
            <div className='p-5 flex flex-row items-center' style={{ "background": "linear-gradient(#fff,#f2f5f9)" }}>
                <Image
                    width={250}
                    height={250}
                    src="/logo-study365.png"
                    alt="logo google"
                    className='ml-10'
                />
                <p className='text-[#2e66ad] text-2xl mx-30 font-normal text-center'>Đề thi chính thức Tốt ngiệp THPT môn Toán năm 2020 - Thầy Chính (Có video chữa)</p>
            </div>
            <div className='flex flex-row relative'>
                <div className='py-2 px-10 w-[70%]'>
                    <div className='border-1 border-b border-[#333] py-3'>
                        <p className='text-lg'><span className='font-medium'>Câu 1: </span>Thanh hóa là của nước nào?</p>
                        <div>
                            <ul className="mt-2 text-base text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white" onChange={(e) => {
                                handlerInput('1', e.target.id)
                            }}>
                                <li className="w-full rounded-t-lg flex flex-row items-center">
                                    <div className="flex items-center pl-3">
                                        <input id="A"
                                            type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="list-radio-license" className="w-full py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">A. </label>
                                    </div>
                                    <p>Việt Nam</p>
                                </li>
                                <li className="w-full rounded-t-lg flex flex-row items-center">
                                    <div className="flex items-center pl-3">
                                        <input id="B" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="list-radio-license" className="w-full py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">B. </label>
                                    </div>
                                    <p>Việt Nam</p>
                                </li>
                                <li className="w-full rounded-t-lg flex flex-row items-center">
                                    <div className="flex items-center pl-3">
                                        <input id="C" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="list-radio-license" className="w-full py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">C. </label>
                                    </div>
                                    <p>Việt Nam</p>
                                </li>
                                <li className="w-full rounded-t-lg flex flex-row items-center">
                                    <div className="flex items-center pl-3">
                                        <input id="D" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="list-radio-license" className="w-full py-1 ml-2 text-base font-medium text-gray-900 dark:text-gray-300">D. </label>
                                    </div>
                                    <p>Việt Nam</p>
                                </li>
                            </ul>

                        </div>
                    </div>

                </div>

                <div className='flex-1 mt-5 mr-15'>
                    <div className='text-xl bg-[#f96935] rounded-xl p-2 flex flex-col justify-center items-center'>
                        <div>
                            <div className=''>
                                <span className='text-[#464646] font-medium'>Thời gian còn lại</span>
                                <span className='mx-5'>|</span>
                                <span className='text-white'>50:00</span>
                            </div>
                            <div className='mt-2'>
                                <span className='text-[#464646] font-medium'>Số câu đã làm</span>
                                <span className='mx-5 ml-11'>|</span>
                                <span className='text-white'>20/50</span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 '>
                        <p className='text-[#2e66ad] rounded-md text-center font-medium text-xl p-2 bg-[#e2e2e2]'>Câu hỏi</p>
                        <div className='bg-[#fafafa] p-2 pt-3 grid grid-cols-6 justify-items-center gap-y-3'>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                            <div className='bg-[#f0efef] p-2 w-10 h-10 rounded-full flex justify-center items-center'>
                                1
                            </div>
                        </div>
                        <div className='text-center mt-5'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Nộp bài
                            </button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}