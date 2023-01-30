// jshint esversion:6
import { useState } from "react";
import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import { Project } from "./Project";
import ProjectList from "./ProjectList";
import { projectAPI } from "./projectsAPI";
import { Spinner } from "../spinners";
// import { queryClient } from "../contexts";

function ProjectsPage() {
    // Set Page number
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Get instance of global queryClient
    const queryClient = useQueryClient();

    // Query key
    const _queryKey = 'projects';

    // Get query data
    const { isLoading, isError, data: projects, error, isPreviousData, isFetching } = useQuery({
        queryKey: [_queryKey, currentPage],
        queryFn: (): Promise<any> => {
            return projectAPI.get(currentPage);
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        retryDelay: 1000
    });

    // Perform Server side effects - CRUD operations in server
    const mutation = useMutation(
        {
            mutationKey: ['save_project-PUT'],
            mutationFn: (project: Project): Promise<any> => {
                return projectAPI.put(project);
            },
            // Fires before mutationFn is called with same args!
            onMutate: async (project: Project) => {
                // Cancel any outgoing refetches (so they don't overrite our optimistic update)
                await queryClient.cancelQueries('projects')

                console.log("On mutate function called!");

                // snapshot the previous value
                const previousProjects: Project[] | undefined = await queryClient.getQueryData(_queryKey);

                console.log(`Previous projects`);
                console.log(previousProjects)

                const newProject: Project[] = projects.map((p: Project) => {
                    return p.id === project.id ? project : p
                });

                // Optimistically update to the new value locally before performed online
                queryClient.setQueryData(_queryKey, newProject);

                const newProjects: Project[] | undefined = await queryClient.getQueryData(_queryKey);

                console.log(`New project`);
                console.log(newProjects);
                // Return an object with the snapshotted value
                return { previousProjects };
            },
            // if mutation fails, use the context returned from onMutate to roll back update done locally
            onError: (error: TypeError, project, context) => {
                console.log(`An error ocurred, rolling back updates`);
                console.log(error.message);

                console.log(`Project causing error`);
                console.log(project);

                console.log(`context gotten`)
                console.log(context);

                console.log(`Current cache data`)
                const currentProjects: Project[] | undefined = queryClient.getQueryData(_queryKey);
                console.log(currentProjects)
                // queryClient.setQueryData(_queryKey, context?.previousProjects);
            },
            // Always refetch after error or success
            onSuccess: () => {
                console.log("Trying to invalidate queries")
                // invalidate query that start with _queryKey in their query key
                queryClient.invalidateQueries(_queryKey);
            }
        }
    )

    // function saveProject(project: Project) {
    //     projectAPI.put(project)
    //     .then((updatedProject) => {
    //         const updatedProjects: Project[] = projects.map((p) => {
    //             return p.id === project.id ? project : p
    //         })
    //         setProjects(updatedProjects);
    //     })
    //     .catch((error) => {
    //         setError(error.message);
    //     })
    // }

    // Handle pagination click to fetchmore projects - cause re-render, projects updated
    function handleMoreClick() {
        const maxPage = 5;
        setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
    }

    return (
        <>
            <h1>Projects</h1>

            {isLoading && (<div className="center-page">
                <span className="spinner-primary"></span>
                <p>Loading...</p>
                <Spinner color={"#52bfd9"} size={150} loading={isLoading} />
            </div>)}

            {isFetching && (<div>
                <span className="spinner-primary"></span>
                <p>Refetching data</p>
            </div>)}

            {isError && (<div className="row">
                <div className="card large error">
                    <section>
                        <p>
                            <>
                                <span className="icon-alert inverse "></span>
                                {error instanceof Error && error.message}
                            </>
                        </p>
                    </section>
                </div>
            </div>)}

            <ProjectList projects={projects} onSave={mutation.mutate} />

            {!isLoading && !isError && (
                <div className="row">
                    <div className="col-sm">
                        <div className="button-group fluid">
                            <button
                                className="button default"
                                onClick={handleMoreClick}
                                disabled={isPreviousData && true}
                            >More...</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProjectsPage;