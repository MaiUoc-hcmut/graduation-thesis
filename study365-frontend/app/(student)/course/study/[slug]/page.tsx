/* eslint-disable react/jsx-no-undef */
'use client'
import ReactPlayer from 'react-player'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { DocumentTextIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import chapterApi from '@/app/api/chapterApi'
import courseApi from '@/app/api/courseApi'
import commentApi from '@/app/api/commentApi'
import Link from 'next/link'
import Image from 'next/image'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useAppSelector } from '@/redux/store';
import { Base64UploadAdapter } from '@ckeditor/ckeditor5-upload';


export default function StudyLecture({ params }: { params: { slug: string } }) {
    const [display, setDisplay] = useState({})
    const [course, setCourse] = useState({})
    const [comment, setComment] = useState([])
    const [chapterList, setChapterList] = useState([])
    const [changeData, setChangeData] = useState(false)
    const { user } = useAppSelector(state => state.authReducer);
    const [formData, setFormData] = useState({ id_lecture: params.slug, id_user: user.id })
    let idVideo = ''

    function formatTime(time: string): string {
        const res = new Date(time)
        return res.toLocaleString('vi-VN')
    }

    function time_convert(num: number) {
        const hours = Math.floor(num / 60);
        const minutes = num % 60;
        return `${hours}:${minutes}`;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const chapter = await chapterApi.getFull({ 'id_course': 1 });
                const course = await courseApi.getFull(1)
                const comment = await commentApi.getAll({ id_lecture: params.slug })
                setCourse(course)
                setComment(comment)
                setChapterList(chapter)
            } catch (error) {
                console.log('Failed to fetch chapter list: ', error);
            }
        }

        fetchData();
    }, [changeData]);


    const listComment = comment.map((cmt: Object) => {
        return (
            <div key={cmt.id} className=''>
                <div className='flex mb-2'>
                    <div className=''>
                        <Image
                            width={50}
                            height={50}
                            src="/avatar.png"
                            alt="avatar"
                            className='rounded-full'
                        />
                    </div>
                    <div className=' mx-5'>
                        <div className='bg-[#f2f3f5] rounded-xl'>
                            <div className='p-3'>
                                <div className='flex items-center'>
                                    <p className='mr-2 text-[#184983] font-medium'>Mai Nguyện Ước:</p>
                                    <p className='text-[#828282] text-sm'>{formatTime(cmt.createdAt)}</p>
                                </div>
                                <div>
                                    <p className='mt-2 max-w-3xl min-w-75'>{cmt.content}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <button type='button' className='text-blue-600 hover:text-blue-800' onClick={() => {
                                setDisplay({ ...display, [`edit-cmt${cmt.id}`]: !display[`edit-cmt${cmt.id}`] })
                            }}>Trả lời</button>
                        </div>
                    </div>
                </div>
                <div className={`ml-30 w-4/5 ${display[`edit-cmt${cmt.id}`] ? '' : 'hidden'}`}>
                    <form className=''>
                        <div className='mt-3'>
                            <CKEditor
                                editor={ClassicEditor}
                                data="<p>Bạn có thắc mắc gì về bài giảng này?</p>"
                                onChange={(event, editor) => {
                                    const data = editor.getData().replace('<p>', '').replace('</p>', '');
                                    setFormData({ ...formData, content: data })
                                }} />
                        </div>
                        <div className='flex justify-end mt-4'>
                            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => (setDisplay({ ...display, [`edit-cmt${cmt.id}`]: !display[`edit-cmt${cmt.id}`] }))}>Hủy</button>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Bình luân</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    })
    const listChapter = chapterList.map((chapter: object) => {
        const lectures = chapter.lectures.sort(function (a: Object, b: Object) { return a.order - b.order })
        const listLecture = lectures.map((lecture: Object) => {
            if (params.slug == lecture.id)
                idVideo = lecture.id_video

            return (
                <Link key={lecture.id} href={`/course/study/${lecture.id}`}>
                    <div className={`p-2 pl-8 ${lecture.id == params.slug ? 'bg-blue-100' : ''} `}>
                        <p className='font-medium text-[#29303b]'>{lecture.name}</p>
                        <div className='text-sm text-[#29303b] flex items-center'>
                            <PlayCircleIcon className='w-3 h-3 mr-1' />
                            <p>{time_convert(lecture.duration)}</p>
                        </div>
                    </div>
                </Link>

            )
        })
        return (
            <div key={chapter.id}>
                <div className='bg-[#edeff1] p-1 pl-5'>
                    <div className='flex flex-row items-center justify-between'>
                        <p className='font-medium'>{chapter.name}</p>
                        <button type='button' className='' id="btn-2" onClick={() => {
                            setDisplay({ ...display, [`dis-${chapter.id}`]: !display[`dis-${chapter.id}`] })
                        }}>
                            <ChevronDownIcon className='w-5 h-5 font-black mr-2' />
                        </button>
                    </div>
                    <div className='text-[#29303b] text-sm'>
                        <span>2/{chapter.lectures.length}</span><span className='px-1'>|</span><span>09:20</span>
                    </div>
                </div>
                <hr className='text-slate-400' />
                <div className={`${display[`dis-${chapter.id}`] ? 'hidden' : ''}`}>
                    {listLecture}
                </div>
            </div >
        )
    })

    return (
        <div>
            <div className='p-3 flex items-center shadow-2xl bg-[#29303b]'>
                <div className='ml-5'>
                    <Image
                        width={120}
                        height={120}
                        src="/logo-study365.png"
                        alt="logo google"
                        style={{
                            maxWidth: '200'
                        }}
                    />
                </div>
                <div className='flex-1 flex items-center ml-32'>
                    <p className='font-medium text-xl text-[white]'>{course.name}</p>
                </div>
            </div>
            <div className='flex'>
                <div>
                    <div className='bg-black pl-5'>
                        <ReactPlayer url={idVideo} controls={true} height={490} width={900}
                            onEnded={() => {
                                console.log(1);
                            }}
                        />
                    </div>
                    {/* <div className='p-3 mt-5 bg-slate-200'>
                        <div className='flex items-center'>
                            <DocumentTextIcon className='w-5 h-5' />
                            <p>Tài liệu</p>
                        </div>
                    </div> */}
                    <div className='p-10 '>
                        <p className='font-medium text-xl mb-5'>Bình luận của học sinh</p>
                        <div>
                            <div className='flex'>
                                <div className='mr-4'>
                                    <Image
                                        width={45}
                                        height={45}
                                        src="/avatar.png"
                                        alt="avatar"
                                    />
                                </div>
                                <div className='flex-1 mr-4'>
                                    <form onSubmit={async (e: Event) => {
                                        e.preventDefault()

                                        await commentApi.create(formData)
                                        setChangeData(!changeData)
                                        setFormData({ id_lecture: params.slug, id_user: user.id })
                                    }}>
                                        <div className={`${display[`edit-cmt`] ? 'hidden' : ''}`}>
                                            <input onFocus={() => {
                                                setDisplay({ ...display, [`edit-cmt`]: !display[`edit-cmt`] })
                                            }} type="text" className="bg-gray-50 border-b border-b-[#ccc] mb-2 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Bạn có thắc mắc gì trong bài học này?" />
                                        </div>
                                        <div className={`${display[`edit-cmt`] ? '' : 'hidden'}`}>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data=""

                                                onChange={(event, editor) => {
                                                    const data = editor.getData().replace('<p>', '').replace('</p>', '');
                                                    console.log(data);

                                                    setFormData({ ...formData, content: data })
                                                }} />
                                        </div>
                                        <div className='flex justify-end mt-4'>
                                            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => (setDisplay({ ...display, [`edit-cmt`]: !display[`edit-cmt`] }))}>Hủy</button>
                                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Bình luân</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                        <div className='mt-10  '>
                            <p className='font-medium text-lg mb-10'>{comment.length} bình luận</p>

                            {listComment}
                        </div>

                    </div>
                </div>
                <div className='bg-white flex-1'>
                    <p className='m-4 font-medium text-lg'>Nội dung khóa học</p>
                    <div>

                        {listChapter}

                    </div>
                </div>
            </div>

        </div >
    )
}