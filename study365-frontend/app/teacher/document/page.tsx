'use client'
import React, { useEffect, useState } from "react";
import { useAppSelector } from '@/redux/store';
import { redirect } from "next/navigation";
import { Dropdown } from 'antd';
import ContextMenuPage from '@/components/teacher/ContextMenu/page';
import FolderList from "@/components/teacher/List/Folder";
import DocumentList from "@/components/teacher/List/File";
import DocumentLayout from "@/components/teacher/Layout/Document";
import CreateDocumentModal from '@/components/teacher/Modal/createDocument';
import NewFolder from '@/components/teacher/Modal/newFolder';

const Document = () => {
    const { isAuthTeacher } = useAppSelector(state => state.authReducer);

    useEffect(() => {
        if (!isAuthTeacher) {
            redirect('/teacher/login');
        }
    }, [isAuthTeacher, redirect]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showCreateFolder, setShowCreateFolder] = useState(false);

    return (
        <DocumentLayout>
            <Dropdown
                overlay={
                    <ContextMenuPage 
                        setShowCreateModal = {() => setShowCreateModal(true)}
                        setShowCreateFolder = {() => setShowCreateFolder(true)}
                    />
                }
            >
                <div className="gap-4 p-5 mt-10">
                    <FolderList currentFolderId={-1} />
                </div>
                <div className="gap-4 p-5 mt-10">
                    <DocumentList currentFolderId={-1} />
                </div>
            </Dropdown>
            <CreateDocumentModal 
                isVisible={showCreateModal} 
                parentId={-1}
                onClose={() => setShowCreateModal(false)} 
            />
            <NewFolder 
                isVisible={showCreateFolder}
                onClose={() => setShowCreateFolder(false)}
                folderId={-1}
            />
        </DocumentLayout>
    )
}

export default Document;