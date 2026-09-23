import { useEffect, useState } from "react";
import ProjectForm, {
    type Project,
} from "./ProjectsForm";

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] =
        useState<Project | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/projects`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }

            const data = await response.json();

            setProjects(data);
        } catch (error) {
            console.error(
                "Failed to fetch projects:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const deleteProject = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete project");
            }

            await fetchProjects();
        } catch (error) {
            console.error(
                "Failed to delete project:",
                error
            );
        }
    };

    const handleNewProject = () => {
        setEditingProject(null);
        setShowForm(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingProject(null);
    };

    const handleProjectSaved = async () => {
        handleCloseForm();
        await fetchProjects();
    };

    const sortedProjects = projects
        .slice()
        .sort((a, b) => a.order - b.order);

    return (
        <section>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">
                        Projects
                    </h1>

                    <p className="mt-1 text-xs text-[#8D99A8]">
                        Manage projects displayed in File Manager.
                    </p>
                </div>

                <button
                    onClick={handleNewProject}
                    className="border border-[#5DADE2] px-4 py-2 text-xs text-[#5DADE2] transition hover:bg-[#5DADE2]/10"
                >
                    + NEW PROJECT
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <ProjectForm
                    project={editingProject}
                    onClose={handleCloseForm}
                    onSaved={handleProjectSaved}
                />
            )}

            {/* Project table */}
            <div className="overflow-hidden border border-[#3A4656]">
                <div className="grid grid-cols-[3fr_2fr_1fr_1fr_1fr_1.5fr] border-b border-[#3A4656] bg-[#202837] px-4 py-3 text-xs text-[#8D99A8]">
                    <span>PROJECT</span>
                    <span>TECHNOLOGIES</span>
                    <span>ORDER</span>
                    <span>LIVE</span>
                    <span>VIDEO</span>
                    <span>ACTIONS</span>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-xs text-[#8D99A8]">
                        Loading projects...
                    </div>
                ) : sortedProjects.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#8D99A8]">
                        No projects found.
                    </div>
                ) : (
                    sortedProjects.map((project) => (
                        <div
                            key={project._id}
                            className="grid grid-cols-[3fr_2fr_1fr_1fr_1fr_1.5fr] items-center border-b border-[#2A3442] px-4 py-4 text-xs last:border-b-0"
                        >
                            <span>{project.title}</span>

                            <span className="truncate text-[#8D99A8]">
                                {project.technologies.join(" · ")}
                            </span>

                            <span>
                                {String(project.order).padStart(
                                    2,
                                    "0"
                                )}
                            </span>

                            <span
                                className={
                                    project.liveUrl
                                        ? "text-[#6F9D62]"
                                        : "text-[#536071]"
                                }
                            >
                                {project.liveUrl ? "Yes" : "No"}
                            </span>

                            <span
                                className={
                                    project.videoUrl
                                        ? "text-[#6F9D62]"
                                        : "text-[#536071]"
                                }
                            >
                                {project.videoUrl ? "Yes" : "No"}
                            </span>

                            <div className="flex gap-3">
                                <button
                                    onClick={() =>
                                        handleEditProject(
                                            project
                                        )
                                    }
                                    className="text-[#5DADE2] hover:underline"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteProject(
                                            project._id
                                        )
                                    }
                                    className="text-red-400 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default Projects