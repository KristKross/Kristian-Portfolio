import { useEffect, useRef, useState } from "react";

function useDraggable<T extends HTMLElement = HTMLElement>(initialX = 0, initialY = 0) {
    const draggableRef = useRef<T>(null);

    const [position, setPosition] = useState({
        x: initialX,
        y: initialY,
    });

    const [dragging, setDragging] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    const lastPointerPosition = useRef({
        x: 0,
        y: 0,
    });

    const pointerId = useRef<number | null>(null);

    const getContainerDelta = (deltaX = 0, deltaY = 0) => {
        const element = draggableRef.current;
        if (!element) return { x: deltaX, y: deltaY };

        const margin = 8;
        const container = element.parentElement;
        const elementBounds = element.getBoundingClientRect();
        const containerBounds = container?.getBoundingClientRect();

        if (!containerBounds) return { x: deltaX, y: deltaY };

        const { left, right, top, bottom } = elementBounds;

        if (left + deltaX < containerBounds.left + margin) {
            deltaX += containerBounds.left + margin - (left + deltaX);
        }

        if (right + deltaX > containerBounds.right - margin) {
            deltaX -= right + deltaX - (containerBounds.right - margin);
        }

        if (top + deltaY < containerBounds.top + margin) {
            deltaY += containerBounds.top + margin - (top + deltaY);
        }

        if (bottom + deltaY > containerBounds.bottom - margin) {
            deltaY -= bottom + deltaY - (containerBounds.bottom - margin);
        }

        return {
            x: deltaX,
            y: deltaY,
        };
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");

        const updateBreakpoint = () => {
            setIsDesktop(mediaQuery.matches);
        };

        updateBreakpoint();
        mediaQuery.addEventListener("change", updateBreakpoint);

        return () => {
            mediaQuery.removeEventListener("change", updateBreakpoint);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        const keepWindowVisible = () => {
            const correction = getContainerDelta();

            if (correction.x === 0 && correction.y === 0) return;

            setPosition((current) => ({
                x: current.x + correction.x,
                y: current.y + correction.y,
            }));
        };

        const frame = window.requestAnimationFrame(() => {
            keepWindowVisible();
        });

        window.addEventListener("resize", keepWindowVisible);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener("resize", keepWindowVisible);
        };
    }, [isDesktop]);

    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!isDesktop) return;

        if (event.button !== 0) return;

        const target = event.target as HTMLElement;

        if (target.closest("button, a, input, textarea, select")) {
            return;
        }

        pointerId.current = event.pointerId;

        lastPointerPosition.current = {
            x: event.clientX,
            y: event.clientY,
        };

        setDragging(true);

        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (!isDesktop || !dragging) return;

        if (pointerId.current !== event.pointerId) return;

        const deltaX =
            event.clientX - lastPointerPosition.current.x;

        const deltaY =
            event.clientY - lastPointerPosition.current.y;

        const clampedDelta = getContainerDelta(deltaX, deltaY);

        setPosition((previous) => ({
            x: previous.x + clampedDelta.x,
            y: previous.y + clampedDelta.y,
        }));

        lastPointerPosition.current = {
            x: event.clientX,
            y: event.clientY,
        };
    };

    const handlePointerUp = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (pointerId.current !== event.pointerId) return;

        pointerId.current = null;
        setDragging(false);

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handlePointerCancel = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (pointerId.current !== event.pointerId) return;

        pointerId.current = null;
        setDragging(false);

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    return {
        draggableRef,
        position,
        dragging,
        isDesktop,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handlePointerCancel,
    };
}

export default useDraggable;