/* eslint-disable react/jsx-key */
'use client'
import courseApi from "@/app/api/courseApi"
import Image from "next/image"
import Link from "next/link"
import { Fragment, useRef, useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/store';
import { PencilIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'

export default function OverviewCourse() {
    const [courseList, setCourseList] = useState([])
    const [openModal, setOpenModal] = useState({})
    const { user } = useAppSelector(state => state.authReducer);
    useEffect(() => {
        const fetchCourseList = async () => {
            try {
                const response = await courseApi.getAllByTeacher({ id_teacher: user.id });
                setCourseList(response);
            } catch (error) {
                console.log('Failed to fetch course list: ', error);
            }
        }
        fetchCourseList();
    }, []);

    const listCourse = courseList.map((course) => {
        return (
            <div key={course.id}>
                {/* Modal delete course */}
                <Transition.Root show={openModal[`btn-cd${course.id}`] ? true : false} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-50 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className="bg-slate-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                </div>
                                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                        Cảnh báo
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Bạn có chắc muốn xóa chương này
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                onClick={async () => {
                                                    setOpenModal(false)
                                                    await courseApi.delete(course.id)
                                                    // setChangeData(!changeData)
                                                }}
                                            >
                                                Xóa
                                            </button>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                onClick={() => setOpenModal(false)}

                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
                {/* Modal update course */}
                <Transition.Root show={openModal[`btn-c${course.id}`] ? true : false} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={setOpenModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                >
                                    <Dialog.Panel className="relative top-10 first-letter:transform overflow-hidden rounded-lg shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                        <div className=" bg-slate-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mt-3 w-full">
                                                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 text-center text-lg">
                                                        Sửa chương
                                                    </Dialog.Title>

                                                    <div className="mt-2 overflow-y-auto no-scrollbar h-80 mb-10">
                                                        <form onSubmit={async (e) => {
                                                            e.preventDefault()
                                                            const data = { ...course, ...dataForm[course.id] }
                                                            delete data['createdAt']
                                                            delete data['updatedAt']
                                                            await courseApi.update(data, course.id)
                                                            setChangeData(!changeData)
                                                        }}>
                                                            <div className="p-5">
                                                                <div className="text-left">
                                                                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900">
                                                                                Tên chương
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    onChange={(e) => handlerInput(e, course.id)}
                                                                                    type="text"
                                                                                    name="name"
                                                                                    defaultValue={course.name}
                                                                                    id="name"
                                                                                    autoComplete="given-name"
                                                                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-input_primary ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900">
                                                                                Mô tả
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    onChange={(e) => handlerInput(e, course.id)}
                                                                                    type="text"
                                                                                    name="description"
                                                                                    defaultValue={course.description}
                                                                                    id="description"
                                                                                    autoComplete="given-name"
                                                                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-input_primary ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="sm:col-span-6">
                                                                            <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900">
                                                                                Thứ tự
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    onChange={(e) => handlerInput(e, course.id)}
                                                                                    type="number"
                                                                                    name="order"
                                                                                    defaultValue={course.order}
                                                                                    id="order"
                                                                                    autoComplete="given-name"
                                                                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-input_primary ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="sm:col-span-3">
                                                                            <label htmlFor="country" className="block text-base font-medium leading-6 text-gray-900">
                                                                                Trạng thái
                                                                            </label>
                                                                            <div className="mt-2">
                                                                                <select
                                                                                    onChange={(e) => handlerInput(e, course.id)}
                                                                                    id="status"
                                                                                    name="status"
                                                                                    defaultValue={course.status}
                                                                                    autoComplete="country-name"
                                                                                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-input_primary ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
                                                                                >
                                                                                    <option value={true}>Mở</option>
                                                                                    <option value={false}>Khóa</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="absolute bottom-0 right-0 bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                <button
                                                                    type="submit"
                                                                    className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                                                    onClick={() => setOpenModal(false)}
                                                                >
                                                                    Lưu
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-red-700 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                                    onClick={() => setOpenModal(false)}

                                                                >
                                                                    Hủy
                                                                </button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="w-full flex flex-row p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="mr-5">
                        <Image
                            src={`${course.thumbnail}`}
                            width={120}
                            height={120}
                            alt="logo facebook"
                            style={{ width: '100%', height: '100%', maxWidth: '140px' }}
                        />
                    </div>

                    <div className="flex flex-col flex-1">
                        <div className="flex">
                            <a href="#">
                                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{course.name}</h5>
                            </a>
                            <div className='ml-5 flex flex-row'>
                                <button type='button' onClick={() => setOpenModal({ [`btn-c${course.id}`]: true })}>
                                    <PencilIcon className='w-5 h-5 mr-2 text-blue-600' />
                                </button>
                                <button type='button' onClick={() => setOpenModal({ [`btn-cd${course.id}`]: true })}>
                                    <TrashIcon className='w-5 h-5 text-red-600' />
                                </button>
                            </div>
                        </div>

                        <div className="mb-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">lớp {course.grade}</span>
                            <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{course.subject}</span>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{course.level}</span>
                        </div>
                        <div className="mb-5">
                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">Công khai</span>
                        </div>
                        <Link href={`course/${course.id}`} className="mt-2 w-32 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Xem khóa học
                        </Link>
                    </div>
                </div>
            </div>

        )
    })


    return (
        <div>
            <div className="py-5 pr-5 flex flex-row justify-between items-center">
                <h3 className="font-medium text-2xl py-2 px-5">Quản lý khóa học</h3>
                <Link href='course/create'>
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Tạo khóa học</button>
                </Link>
            </div>
            <div className="flex flex-row justify-between items-center mt-4 pr-5">
                <form className="flex items-center flex-1">
                    <select id="countries" className="bg-gray-50 mx-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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


            <div className="grid grid-cols-2 gap-6 p-5 mt-10">
                {listCourse}
            </div>
        </div>
    )
}
