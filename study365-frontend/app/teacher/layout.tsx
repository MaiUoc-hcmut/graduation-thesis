"use client";
import "@/styles/teacher/index.css";
import { useState, useEffect } from "react";
import Loader from "@/components/teacher/common/Loader";

import { ReduxProvider } from '@/redux/provider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </body>
        </html>
    );
}
