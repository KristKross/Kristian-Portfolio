import { useEffect, useRef, useState } from "react";

export interface Project {
    _id: string;
    title: string;
    description: string;
    technologies: string[];
    liveUrl: string;
    videoUrl: string;
    githubUrl: string;
    order: number;
    images: string[];
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
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [technologies, setTechnologies] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [order, setOrder] = useState("0");
    const [images, setImages] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [error, setError] = useState("");

    const editing = project !== null;

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setTechnologies(project.technologies.join(", "));
            setLiveUrl(project.liveUrl);
            setVideoUrl(project.videoUrl);
            setGithubUrl(project.githubUrl);
            setOrder(String(project.order));
            setImages(project.images || []);
        } else {
            setTitle("");
            setDescription("");
            setTechnologies("");
            setLiveUrl("");
            setVideoUrl("");
            setGithubUrl("");
            setOrder("0");
            setImages([]);
        }

        setError("");
    }, [project]);

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            return;
        }

        setError("");
        setUploadingImages(true);

        try {
            const uploadedImages: string[] = [];

            for (const file of Array.from(files)) {
                if (!file.type.startsWith("image/")) {
                    throw new Error(
                        `${file.name} is not a valid image file`
                    );
                }

                const formData = new FormData();

                formData.append("image", file);

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/upload/image`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData,
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to upload image"
                    );
                }

                if (!data.url) {
                    throw new Error(
                        "Image uploaded but no URL was returned"
                    );
                }

                uploadedImages.push(data.url);
            }

            setImages((currentImages) => [
                ...currentImages,
                ...uploadedImages,
            ]);
        } catch (error) {
            console.error("Image upload error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload images"
            );
        } finally {
            setUploadingImages(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((currentImages) =>
            currentImages.filter(
                (_, imageIndex) => imageIndex !== index
            )
        );
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (loading || uploadingImages) {
            return;
        }

        setError("");
        setLoading(true);

        const projectData = {
            title: title.trim(),
            description: description.trim(),

            technologies: technologies
                .split(",")
                .map((technology) => technology.trim())
                .filter(Boolean),

            liveUrl: liveUrl.trim(),
            videoUrl: videoUrl.trim(),
            githubUrl: githubUrl.trim(),

            order: Number(order),
            images,
        };

        try {
            const url = editing
                ? `${import.meta.env.VITE_API_URL}/api/projects/${project._id}`
                : `${import.meta.env.VITE_API_URL}/api/projects`;

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
                    disabled={loading || uploadingImages}
                    className="text-xs text-[#8D99A8] hover:text-[#F5F7FA] disabled:opacity-50"
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
                        disabled={loading || uploadingImages}
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
                        disabled={loading || uploadingImages}
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
                        disabled={loading || uploadingImages}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />

                    <p className="mt-1 text-[10px] text-[#536071]">
                        Separate technologies with commas.
                    </p>
                </div>

                {/* Live Demo */}
                <div>
                    <label
                        htmlFor="project-live"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        LIVE DEMO URL
                    </label>

                    <input
                        id="project-live"
                        type="url"
                        value={liveUrl}
                        onChange={(event) =>
                            setLiveUrl(event.target.value)
                        }
                        placeholder="https://my-project.com"
                        disabled={loading || uploadingImages}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />

                    <p className="mt-1 text-[10px] text-[#536071]">
                        Link to the deployed project, if available.
                    </p>
                </div>

                {/* Video Demo */}
                <div>
                    <label
                        htmlFor="project-video"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        VIDEO DEMO URL
                    </label>

                    <input
                        id="project-video"
                        type="url"
                        value={videoUrl}
                        onChange={(event) =>
                            setVideoUrl(event.target.value)
                        }
                        placeholder="https://www.youtube.com/watch?v=..."
                        disabled={loading || uploadingImages}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />

                    <p className="mt-1 text-[10px] text-[#536071]">
                        Optional walkthrough video.
                    </p>
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
                        disabled={loading || uploadingImages}
                        className="w-full border border-[#3A4656] bg-[#171E29] px-3 py-2 text-sm outline-none placeholder:text-[#536071] focus:border-[#5DADE2] disabled:opacity-50"
                    />
                </div>

                {/* Images */}
                <div>
                    <label
                        htmlFor="project-images"
                        className="mb-2 block text-xs text-[#8D99A8]"
                    >
                        PROJECT IMAGES
                    </label>

                    <div className="border border-dashed border-[#3A4656] bg-[#171E29] p-4">
                        <input
                            ref={fileInputRef}
                            id="project-images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            disabled={loading}
                            className="block w-full cursor-pointer text-xs text-[#8D99A8] file:mr-3 file:cursor-pointer file:border-0 file:bg-[#252E3C] file:px-3 file:py-2 file:text-xs file:text-[#5DADE2] hover:file:bg-[#303B4A] disabled:cursor-not-allowed disabled:opacity-50"
                        />

                        <p className="mt-2 text-[10px] text-[#536071]">
                            Select one or more screenshots.
                        </p>
                    </div>

                    {uploadingImages && (
                        <p className="mt-2 text-xs text-[#5DADE2]">
                            [ UPLOADING IMAGES... ]
                        </p>
                    )}

                    {/* Uploaded images */}
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {images.map((image, index) => (
                                <div
                                    key={`${image}-${index}`}
                                    className="relative overflow-hidden border border-[#3A4656] bg-[#171E29]"
                                >
                                    <img
                                        src={image}
                                        alt={`Project screenshot ${
                                            index + 1
                                        }`}
                                        className="h-32 w-full object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveImage(index)
                                        }
                                        disabled={
                                            loading ||
                                            uploadingImages
                                        }
                                        className="absolute right-1 top-1 bg-[#171E29]/90 px-2 py-1 text-[10px] text-red-400 hover:text-red-300 disabled:opacity-50"
                                    >
                                        [ X ]
                                    </button>

                                    <div className="border-t border-[#3A4656] px-2 py-1 text-[10px] text-[#536071]">
                                        image-{index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                        disabled={loading || uploadingImages}
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
                        disabled={loading || uploadingImages}
                        className="border border-[#3A4656] px-4 py-2 text-xs text-[#8D99A8] hover:border-[#5DADE2] hover:text-[#5DADE2] disabled:opacity-50"
                    >
                        [ CANCEL ]
                    </button>

                    <button
                        type="submit"
                        disabled={loading || uploadingImages}
                        className="border border-[#5DADE2] bg-[#5DADE2]/10 px-4 py-2 text-xs text-[#5DADE2] hover:bg-[#5DADE2]/20 disabled:opacity-50"
                    >
                        {loading
                            ? "[ SAVING... ]"
                            : uploadingImages
                              ? "[ UPLOADING... ]"
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