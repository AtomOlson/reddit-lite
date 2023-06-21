import React from "react"
import Header from "../header/header.js"
import { Outlet } from "react-router-dom"
import DataHandler from "../data/dataHandler.js"

export default function Root() {
    return (
        <>
            <DataHandler />
            <Header />
            <Outlet />
        </>
    )
}