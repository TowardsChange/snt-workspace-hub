import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/conversations")({
  component: () => <Navigate to="/home" />,
});
