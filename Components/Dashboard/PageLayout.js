import QuizList from "../Lists/QuizList";
import React, {useState} from "react";
import AssignmentList from "../Lists/AssignmentList";
import Navbar from "./Navbar";
import ActivityFeed from "./ActivityFeed";
import Transition from "../Transition";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {DialogContentText} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

const PageLayout = ({userId, sidebar}) => {




    return (<div>

        {/* Background color split screen for large screens */}
        <div className="fixed top-0 left-0 w-1/2 h-full bg-white" />
        <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-50" />
        <div className="relative min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar/>
            {/* 3 column wrapper */}
            <div className="flex-grow w-full max-w-7xl mx-auto xl:px-8 lg:flex">
                {/* Left sidebar & main wrapper */}
                <div className="flex-1 min-w-0 bg-white xl:flex">
                    {sidebar}
                </div>
                {/* Activity feed */}
                <ActivityFeed/>
            </div>
        </div>
    </div>)
}

export default PageLayout
