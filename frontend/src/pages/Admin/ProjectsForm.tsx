import { useEffect, useState } from "react";

export interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    demo: string;
    githubUrl: string;
    order: number;
}

interface ProjectFormProps {
    project: Project | null;
    onClose: () => void;
    onSaved: () => void;
}

function ProjectForm({
    project,
    onClose,
    onSaved,
}: ProjectFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [demo, setDemo] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [order, setOrder] = useState("0");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const editing = project !== null;

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setTechnologies(project.technologies.join(", "));
            setDemo(project.demo);
            setGithubUrl(project.githubUrl);
            setOrder(String(project.order));
        } else {
            setTitle("");
            setDescription("");
            setTechnologies("");
            setDemo("");
            setGithubUrl("");
            setOrder("0");
        }

        setError("");
    }, [project]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (loading) return;

        setError("");
        setLoading(true);

        const projectData = {
            title: title.trim(),
            description: description.trim(),

            technologies: technologies
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean),

            demo: demo.trim(),
            githubUrl: githubUrl.trim(),
            order: Number(order),
        };

        try {
            const url = editing
                ? `http://localhost:5000/api/projects/${project._id}`
                : "http://localhost:5000/api/projects";

            const response = await fetch(url, {
                method: editing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(projectData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                        `Failed to ${
                            editing ? "update" : "create"
                        } project`
                );

                return;
            }

            onSaved();
        } catch (error) {
            console.error("Project save error:", error);

            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-6 border border-[#3A4656] bg-[#202837]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#3A4656] bg-[#252E3C] px-5 py-3">
                <span className="text-sm text-[#5DADE2]">
                    {editing ? "edit-project" : "new-project"}
                </span>

                <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="text-xs text-[#8D99A8] hover:text-[#F5F7FA]"
                >
                    [ CLOSE ]
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
            >
                {/* Error */}
                {error && (
                    <div className="border border-red-400/30 bg-red-400/5 px-3 py-2 text-xs text-red-400">
                        [ ERROR ] {error}
                    </div>
                )}

                {/* Title */}
                <div>
                    <label
                        htmlFor="project-title"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        TITLE
                    </label>

                    <input
                        id="project-title"
                        type="text"
                        value={title}
                        onChange={(event) =>
                            setTitle(event.target.value)
                        }
                        placeholder="Green Cuisine"
                        required
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* Description */}
                <div>
                    <label
                        htmlFor="project-description"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        DESCRIPTION
                    </label>

                    <textarea
                        id="project-description"
                        value={description}
                        onChange={(event) =>
                            setDescription(event.target.value)
                        }
                        placeholder="A full-stack recipe website..."
                        required
                        disabled={loading}
                        rows={5}
                        className="w-full resize-y border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* Technologies */}
                <div>
                    <label
                        htmlFor="project-technologies"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        TECHNOLOGIES
                    </label>

                    <input
                        id="project-technologies"
                        type="text"
                        value={technologies}
                        onChange={(event) =>
                            setTechnologies(event.target.value)
                        }
                        placeholder="Node.js, Express, MySQL, Webpack, Edamam API"
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />

                    <p className="mt-1 text-[10px] text-[#536071]">
                        Separate technologies with commas.
                    </p>
                </div>

                {/* Demo */}
                <div>
                    <label
                        htmlFor="project-demo"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        DEMO URL
                    </label>

                    <input
                        id="project-demo"
                        type="url"
                        value={demo}
                        onChange={(event) =>
                            setDemo(event.target.value)
                        }
                        placeholder="https://www.youtube.com/embed/..."
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* GitHub */}
                <div>
                    <label
                        htmlFor="project-github"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        GITHUB URL
                    </label>

                    <input
                        id="project-github"
                        type="url"
                        value={githubUrl}
                        onChange={(event) =>
                            setGithubUrl(event.target.value)
                        }
                        placeholder="https://github.com/..."
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* Order */}
                <div>
                    <label
                        htmlFor="project-order"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        DISPLAY ORDER
                    </label>

                    <input
                        id="project-order"
                        type="number"
                        min="0"
                        value={order}
                        onChange={(event) =>
                            setOrder(event.target.value)
                        }
                        disabled={loading}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none focus:border-[#5DADE2] disabled:opacity-50"
                    />

                    <p className="mt-1 text-[10px] text-[#536071]">
                        Lower numbers appear first.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-[#3A4656] pt-5">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="border border-[#3A4656] px-4 py-2 text-xs text-[#8D99A8] hover:border-[#5DADE2] hover:text-[#5DADE2] disabled:opacity-50"
                    >
                        [ CANCEL ]
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="border border-[#5DADE2] bg-[#5DADE2]/10 px-4 py-2 text-xs text-[#5DADE2] hover:bg-[#5DADE2]/20 disabled:opacity-50"
                    >
                        {loading
                            ? "[ SAVING... ]"
                            : editing
                              ? "[ UPDATE PROJECT ]"
                              : "[ CREATE PROJECT ]"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProjectForm