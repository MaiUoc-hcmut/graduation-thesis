import { FormWrapper } from "../FormWrapper"

type IntroduceData = {
    name: string
    subject: string
    grade: string
    level: string
    thumbnail: File
}

type IntroduceFormProps = IntroduceData & {
    updateFields: (fields: Partial<IntroduceData>) => void
}

export function IntroduceForm({
    updateFields,
}: IntroduceFormProps) {
    return (
        <FormWrapper title="">
            <div className="mb-5">
                <p className="text-lg font-medium mb-1">Tiêu đề cho khóa học của bạn là gì?</p>
                <p className="mb-3">Đừng lo nếu bạn chưa nghĩ được tiêu đề phù hợp,
                    bạn có thể chỉnh sửa sau này.</p>
                <textarea id="message" required className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ví dụ: Giải tích 12 nâng cao" onChange={e => updateFields({ name: e.target.value })}></textarea>
            </div>
            <div className="mb-5">
                <p className="text-lg font-medium mb-1">Ảnh bìa cho khóa học của bạn là gì?</p>
                <input className="block w-full bg-white rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-input_primary ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-1 sm:text-sm sm:leading-6" aria-describedby="file_input_help" name="thumbnail" id="file_input" type="file" onChange={e => updateFields({ thumbnail: e.target.files[0] })} />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
            <div className="mb-5">
                <p className="text-lg font-medium mb-1">Những kiến thức mà bạn chia sẻ phù hợp cho học sinh lớp mấy?</p>
                <p className="mb-3">Bạn có thể chỉnh sửa lớp học phù hợp cho khóa học này, tuy nhiên hãy chắc chắn về lớp học phù hợp
                    vì nó phản ánh sự chuyên nghiệp đối với một giáo viên.</p>

                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFields({ grade: e.target.value })}>
                    <option selected>Chọn lớp học</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
            <div className="mb-5">
                <p className="text-lg font-medium mb-1">Môn học nào phù hợp cho kiến thức mà bạn sẽ chia sẻ?</p>
                <p className="mb-3">Hãy chọn môn học phù hợp với kiến thức mà bạn sẽ chia sẻ và chắc chắn rằng bạn sẽ không chỉnh sửa trong tương lai
                    vì nó thể hiện kiến thức chuyên môn cũng như sự chuyên nghiệp của một giáo viên.</p>

                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFields({ subject: e.target.value })}>
                    <option selected>Chọn môn học</option>
                    <option value="toán">Toán</option>
                    <option value="lý">Lý</option>
                    <option value="hóa">Hóa</option>
                </select>
            </div>
            <div className="mb-5">
                <p className="text-lg font-medium mb-1">Bạn nghĩ khóa học của bạn nằm ở mức độ nào?</p>
                <p className="mb-3">Mức độ của khóa học giúp học sinh xác định liệu khóa học có phù hợp với năng lực của bản thân hay không.</p>

                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => updateFields({ level: e.target.value })}>
                    <option selected>Chọn mức độ</option>
                    <option value="basic">Cơ bản</option>
                    <option value="advance">Nâng cao</option>
                </select>
            </div>




        </FormWrapper>
    )
}