import { useState } from "react"
import { FormWrapper } from "../FormWrapper"

type ContentData = {
    chapters: Array<object>;
}

type TimeFormProps = ContentData & {
    updateFields: (fields: Partial<ContentData>) => void
}

export function TimeForm({
    chapters,
    updateFields,
}: TimeFormProps) {

    const [openForm, setOpenForm] = useState({})
    return (
        <FormWrapper title="">
            <div>
                <div className="border-[1px] border-slate-400 py-2 px-5 mb-5">
                    <p className="text-lg font-medium">Chương 1</p>
                </div>
                <div className={`${openForm['form-chapter'] ? '' : 'hidden'} border-dashed border-[1px] py-2 px-5`}>

                    <p className="text-xl font-medium">Chương mới</p>
                    <div className="p-2">
                        <div className="text-left">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900">
                                        Tên chương
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            onChange={e => updateFields({ name: e.target.value })}
                                            type="text"
                                            name="name"
                                            id="name"
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
                                            onChange={(e) => handlerInput(e, 0)}
                                            id="status"
                                            name="status"
                                            autoComplete="country-name"
                                            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-input_primary ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6"
                                        >
                                            <option value={true}>Công khai</option>
                                            <option value={false}>Riêng tư</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 py-3 sm:flex sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="inline-flex w-full justify-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    onClick={() => {
                                        setOpenForm({ [`form-chapter`]: false })
                                        updateFields({ chapters: e.target.value })
                                    }}
                                >
                                    Thêm
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-red-700 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => {
                                        setOpenForm({ [`form-chapter`]: false })
                                    }}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
                <button type="button" className="mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={() => {
                        setOpenForm({ [`form-chapter`]: true })
                    }}>Thêm chương</button>

            </div >



            {/* <div className="mb-5">
                <h4 className="font-medium text-xl">Thời gian phù hợp</h4>
                <p className="my-2">Hãy cho học sinh biết thời gian phù hợp nhất để đăng ký và hoàn thành khóa học, ngoài ra còn
                    là khoảng thời gian nên dành ra để học.
                    <br />
                    Điều này sẽ giúp khóa học của bạn trở nên có ích hơn đối với học sinh.</p>
            </div>
            <div className="mb-5">
                <p className="text-base font-medium">Thời gian hoàn thành khóa học</p>
                <p className="my-2">Là thời gian phù hợp để hoàn thành khóa học tùy theo mục tiêu mà bạn đã đề ra cho khóa học.
                    Mốc thời gian không cần quá chính xác, nhưng hãy đảm bảo nó giúp ích cho học sinh khi đăng
                    ký khóa học của bạn.</p>
                <div className="relative max-w-sm">
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chọn ngày" onChange={e => updateFields({ start_time: e.target.value })} />
                </div>

            </div>
            <div className="mb-5">
                <p className="text-base font-medium">Thời gian dành cho khóa học</p>
                <p className="my-2">Là khoảng thời gian mà học sinh dành ra để học khóa học của bạn. Bạn cần ước tính thời gian
                    phù hợp để giúp học sinh kiểm soát tiến độ khi học khóa học của bạn.</p>
                <div className="relative max-w-sm">
                    <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chọn ngày" onChange={e => updateFields({ end_time: e.target.value })} />
                </div>
            </div> */}
        </FormWrapper >
    )
}