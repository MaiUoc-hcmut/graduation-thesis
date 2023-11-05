'use client'
import Link from 'next/link'
import Image from 'next/image'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { RectangleStackIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import chapterApi from '@/app/api/chapterApi'
import courseApi from '@/app/api/courseApi'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export default function DetailCourse({ params }: { params: { slug: string } }) {
    const [display, setDisplay] = useState({})
    const [course, setCourse] = useState({})
    const [chapterList, setChapterList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const chapter = await chapterApi.getFull({ 'id_course': params.slug });
                const course = await courseApi.getFull(params.slug)

                setCourse(course)
                setChapterList(chapter);
            } catch (error) {
                console.log('Failed to fetch chapter list: ', error);
            }
        }

        fetchData();
    }, []);
    const listChapter = chapterList.map((chapter: object) => {
        const lectures = chapter.lectures.sort(function (a: Object, b: Object) { return a.order - b.order })
        const listLecture = lectures.map((lecture: Object) => {

            return (
                <Link key={lecture.id} href={`/course/study/${lecture.id}`}>
                    <div className={`p-3 pl-8`}>
                        <p className='font-medium text-[#29303b]'>{lecture.name}</p>
                    </div>
                    <hr className='text-[#ededed] ml-8 ' />
                </Link>

            )
        })
        return (
            <div key={chapter.id}>
                <div className='p-3'>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='font-medium'>{chapter.name}</p>
                        <button type='button' className='' id="btn-2" onClick={() => {
                            setDisplay({ ...display, [`dis-${chapter.id}`]: !display[`dis-${chapter.id}`] })
                        }}>
                            <ChevronDownIcon className='w-5 h-5 font-black mr-2' />
                        </button>
                    </div>
                </div>
                <hr className='text-[#ededed]' />
                <div className={`${display[`dis-${chapter.id}`] ? 'hidden' : ''}`}>
                    {listLecture}
                </div>
            </div >
        )
    })
    return (
        <div className='mx-10 mt-2 '>
            <div className='w-3/4'>
                <div className='border-[1px] border-[#ededed] p-2'>
                    <div className='flex'>

                        <Image
                            width={250}
                            height={250}
                            src="/teacher.png"
                            alt="avatar"
                        />

                        <div>
                            <p className='text-[#0043a8] font-semibold text-lg mt-2'>[S3] - LUYỆN ĐỀ THI THỬ TN THPT & ĐH TOÁN 2024 - CÓ VIDEO CHỮA - THẦY NGUYỄN CÔNG CHÍNH</p>
                            <p className='mt-2'>Giáo viên: <span className='text-[#0043a8] font-semibold'>Thầy Nguyễn Công Chính</span></p>
                            <div className='flex font-normal items-center mt-2'>
                                <div className='flex items-center mr-5 bg'>
                                    <RectangleStackIcon className='w-5 h-5 text-[#333]' />
                                    <p className='ml-2'>10 chương</p>
                                </div>
                                <div className='flex items-center'>
                                    <BookOpenIcon className='w-5 h-5 text-[#333]' />
                                    <p className='ml-2'>120 bài giảng</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <Image
                                    width={16}
                                    height={16}
                                    src="/schedule-icon.png"
                                    alt="icon"
                                />
                                <p className='ml-2'>Ngày khai giảng: 01/12/2023</p>
                            </div>
                            <div className='flex items-center mr-2'>
                                <Image
                                    width={16}
                                    height={16}
                                    src="/schedule-icon.png"
                                    alt="icon"
                                />
                                <p className='ml-2'>Ngày hết hạn: 31/07/2024</p>
                            </div>

                            <hr className='text-[#ededed] my-3' />
                            <div className='flex items-center '>
                                <p className='text-[#ff0000] font-medium text-lg mr-10'>Giá: 799,000 đ</p>
                                <button className='py-2 px-4 bg-[#27963a] text-white font-medium rounded-xl'>Đặt mua</button>
                            </div>

                        </div>
                    </div>

                    <div className='m-5'>
                        <div className='flex mb-2'>
                            <CheckIcon className='w-5 h-5 mr-2' />
                            <p> <span className='font-medium'>Mục tiêu: </span>Luyện nhiều dạng toán xuất hiện trong đề thi, đạt điểm cao và đỗ vào các trường ĐH nổi tiếng, chất lượng.</p>
                        </div>
                        <div className='flex mb-2'>
                            <CheckIcon className='w-5 h-5 mr-2' />
                            <p> <span className='font-medium'>Mục tiêu: </span>Luyện nhiều dạng toán xuất hiện trong đề thi, đạt điểm cao và đỗ vào các trường ĐH nổi tiếng, chất lượng.</p>
                        </div>
                        <div className='flex mb-2'>
                            <CheckIcon className='w-5 h-5 mr-2' />
                            <p> <span className='font-medium'>Mục tiêu: </span>Luyện nhiều dạng toán xuất hiện trong đề thi, đạt điểm cao và đỗ vào các trường ĐH nổi tiếng, chất lượng.</p>
                        </div>
                    </div>
                </div>
                <div className='mt-2'>
                    <div className='py-2 bg-[#dfe8f4]'>
                        <button className='p-2 font-medium text-[#0043a8] mx-5'>Chương trình đào tạo</button>
                        <button className='p-2 font-medium text-[#0043a8] mx-5'>Đánh giá</button>
                    </div>
                    <div className='mt-2 mx-4 mb-10'>
                        {listChapter}
                    </div>
                </div>
            </div>
        </div>
    )
}