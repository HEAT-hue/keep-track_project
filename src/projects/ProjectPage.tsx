// jshint esversion:6
// import { projectAPI } from "./projectsAPI";
// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProjectDetail } from "./ProjectDetail";
import { useQuery } from "react-query";
import { projectAPI } from "./projectsAPI";
import { toast } from "react-toastify";

function ProjectPage() {

    // Get params from url
    const params = useParams();
    const id = Number(params.id);

    // Query to get data
    const { isLoading, isError, data: project, error } = useQuery({
        queryKey: ['project', id],
        queryFn: (): Promise<any> => {
            return projectAPI.find(id)
        },
        refetchOnWindowFocus: false,
        retryDelay: 500
    });

    // Clear all toasts
    toast.dismiss();

    if (isError) {
        // Toast new error
        toast.error(("NetworkError when attempting to fetch resource."), { position: "top-center", autoClose: false });
    }

    return (
        <div>
            <>
                <h1>Project Detail</h1>

                {/* Display loading component while data loads */}
                {isLoading && (
                    <div className="center-page">
                        <span className="spinner primary"></span>
                        <p>Loading...</p>
                    </div>
                )}

                {/* Display error component */}
                {isError && (
                    <div className="row">
                        <div className="card large error">
                            <section>
                                <p>
                                    <>
                                        <span className="icon-alert inverse"></span>
                                        {error instanceof Error && error.message}
                                    </>
                                </p>
                            </section>
                        </div>
                    </div>
                )}

                {project && <ProjectDetail project={project} />}
            </>
        </div>
    )
}

export { ProjectPage };