// jshint esversion:6
import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";
// import { useMutation } from "react-query";
// import { UseMutateFunction, useMutation, useQueryClient } from "react-query";
// import { projectAPI } from "./projectsAPI";
// import { queryClient } from "../contexts";

interface ProjectFormProps {
    project: Project,
    onCancel(): void,
    onSave(arg0: Project): void
}

function ProjectForm({ onCancel, onSave, project: initialProject }: ProjectFormProps) {

    const [project, setProject] = useState<Project>(initialProject);
    const [errors, setErrors] = useState({ name: '', description: '', budget: '' });

    // // Get instance of global queryClient
    // const queryClient = useQueryClient();

    // Query key
    // const _queryKey = 'projects';

    // const editPostMutation = useMutation({
    //     mutationFn: (project: Project): Promise<any> => {
    //         return projectAPI.put(project);
    //     },
    //     onMutate: async (project: Project) => {
    //         // Cancel all outgoing queries
    //         // await queryClient.cancelQueries([_queryKey]);

    //         // Get snapshot of old data incase query fails
    //         const previousData = await queryClient.getQueryData(_queryKey);
    //         console.log("previous Data");
    //         console.log(previousData);


    //         // Optimistic update on query
    //         queryClient.setQueryData([_queryKey], (oldData: any) => {
    //             console.log("old Data");
    //             console.log(oldData);

    //             const newData = [].concat(oldData).map((p: any) => p.id === project.id ? project : p);
    //             return newData;
    //         });

    //         // Return snapshot of cache 
    //         return { previousData };
    //     },
    //     onError: async (error: TypeError, project, context) => {
    //         // Logging all values
    //         console.log(`Error`);
    //         console.log(error.message);

    //         console.log(`Project to update`);
    //         console.log(project);

    //         console.log(`Context`);
    //         console.log(context);

    //         // Revert old data because of failure
    //         queryClient.setQueryData([_queryKey], context?.previousData);
    //     },
    //     onSettled: async () => {
    //         // Invalide related queries
    //         queryClient.invalidateQueries([_queryKey]);
    //     }
    // })

    // Generate error report and store it
    function validate(project: Project) {
        // Create Error object
        let errors = { name: '', description: '', budget: '' };

        if (project.name.length === 0) {
            errors.name = 'Name is required.';
        }
        else if (project.name.length < 3) {
            errors.name = "Name needs to be at least 3 characters long"
        }

        if (project.description.length === 0) {
            errors.description = 'Description is required';
        }

        if (project.budget <= 0) {
            errors.budget = 'Budget must be at least $0';
        }

        return errors;
    }


    // Create a check to make sure Errors are cleared before submission
    function inValid(errors: { name: string, description: string, budget: string }) {
        return !((errors.name.length === 0) && (errors.description.length === 0) && (errors.budget.length === 0));
    }

    function handleChange(event: any) {
        // Get the type, name, value of the event
        const { name, type, value, checked } = event.target;

        // Checkbox changed ? assigned the checked value
        let updatedValue = type === 'checkbox' ? checked : value;

        // Covert string to number type
        if (type === 'number') updatedValue = Number(updatedValue);

        // An object containing the updated value property
        const change = {
            [name]: updatedValue
        };

        // To store updated project
        let updatedProject: Project;

        // Get the previous project, merge changes and save
        setProject((prevProject) => {
            updatedProject = new Project({ ...prevProject, ...change });
            return updatedProject;
        })

        setErrors(() => validate(updatedProject));
    }

    function handleSubmit(event: SyntheticEvent) {
        event.preventDefault();
        if (inValid(errors)) return;
        // editPostMutation.mutate(project);
        onSave(project);
    }

    return (
        <form className="input-group vertical">
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
            {errors.name &&
                <div className="card error" >
                    <p>{errors.name}</p>
                </div>}

            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange}></textarea>
            {errors.description &&
                <div className="card error" >
                    <p>{errors.description}</p>
                </div>}

            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
            {errors.budget &&
                <div className="card error" >
                    <p>{errors.budget}</p>
                </div>}

            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

            <div className="input-group">
                <button className="primary bordered medium" onClick={handleSubmit} >Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>cancel</button>
            </div>
        </form>
    )
}

export default ProjectForm;